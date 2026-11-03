"""Reproducible single-device Qwen3 context/memory experiment.
Requires installed torch, transformers, safetensors and a CUDA GPU.
Downloads only official pinned model data files (~1.5 GB); no remote Python code.
Run: python qwen-memory-check.py --cache PATH --output PATH
Do not compare these end-to-end rates with pure decode benchmarks.
"""
import os
os.environ['HF_HUB_DISABLE_TELEMETRY']='1'
os.environ['HF_HUB_DISABLE_XET']='1'
import argparse,json,time,hashlib,platform,statistics,gc
from pathlib import Path
import requests

MODEL='Qwen/Qwen3-0.6B'
REVISION='c1899de289a04d12100db370d81485cdf75e47ca'
FILES=['config.json','generation_config.json','tokenizer.json','tokenizer_config.json','merges.txt','vocab.json','model.safetensors','LICENSE']

def download(folder):
    hashes={}
    for name in FILES:
        target=folder/name
        if not target.exists():
            print('Downloading '+name,flush=True)
            response=requests.get(f'https://huggingface.co/{MODEL}/resolve/{REVISION}/{name}',stream=True,timeout=(30,120))
            response.raise_for_status()
            part=target.with_suffix(target.suffix+'.partial')
            with part.open('wb') as f:
                for chunk in response.iter_content(1024*1024):
                    if chunk:f.write(chunk)
            part.replace(target)
        digest=hashlib.sha256()
        with target.open('rb') as f:
            for block in iter(lambda:f.read(4*1024*1024),b''):digest.update(block)
        hashes[name]={'sha256':digest.hexdigest(),'bytes':target.stat().st_size}
    return hashes

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--cache',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    args=parser.parse_args();args.cache.mkdir(parents=True,exist_ok=True)
    hashes=download(args.cache)
    print('Loading installed PyTorch and Transformers',flush=True)
    import torch,transformers
    from transformers import AutoTokenizer,AutoModelForCausalLM
    assert torch.cuda.is_available(),'CUDA GPU required; no silent CPU fallback'
    torch.manual_seed(7)
    tokenizer=AutoTokenizer.from_pretrained(str(args.cache),local_files_only=True,trust_remote_code=False)
    started=time.perf_counter()
    model=AutoModelForCausalLM.from_pretrained(str(args.cache),local_files_only=True,trust_remote_code=False,dtype=torch.float16,attn_implementation='sdpa').to('cuda').eval()
    torch.cuda.synchronize();load_seconds=time.perf_counter()-started
    device=torch.cuda.get_device_properties(0)
    result={'run_date_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'model':MODEL,'revision':REVISION,'files':hashes,'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'environment':{'python':platform.python_version(),'torch':torch.__version__,'transformers':transformers.__version__,'cuda_runtime':torch.version.cuda,'gpu':device.name,'gpu_total_mib':round(device.total_memory/2**20,2),'dtype':'float16','attention':'sdpa','platform':platform.system()},'load_seconds_excluding_download':round(load_seconds,4),'protocol':{'thinking':False,'do_sample':False,'max_new_tokens':64,'use_cache':True,'trials_per_case':3,'warmup_per_case':1,'timing':'CUDA-synchronized end-to-end generate; includes prefill and decode, excludes tokenize/load/download','memory':'Peak PyTorch allocator allocated and reserved, not total GPU usage','input':'Repeated neutral padding plus identical ten-item checklist question; actual token counts recorded'},'cases':[],'limitations':['One RTX 4050 laptop, one small FP16 model; not a GPU ranking or model-quality benchmark.','No quantization, Ollama, offloading or multi-user inference tested.','Concurrent system activity, power mode and cooling were not controlled.','Allocated/reserved PyTorch memory does not represent total process or system GPU memory.','End-to-end output tokens per second is not pure decode throughput.']}
    question='Write ten short numbered checks before running a local AI model. Keep each check brief.'
    for target in [128,1024,4096]:
        padding=tokenizer.encode(('This is a neutral setup note. '*1000),add_special_tokens=False)[:max(0,target-50)]
        content=tokenizer.decode(padding,skip_special_tokens=True)+'\n'+question
        encoded=tokenizer.apply_chat_template([{'role':'user','content':content}],tokenize=True,add_generation_prompt=True,enable_thinking=False,return_tensors='pt',return_dict=True).to('cuda')
        input_tokens=int(encoded['input_ids'].shape[-1])
        print(f'Case target {target}, actual {input_tokens} input tokens',flush=True)
        with torch.inference_mode():
            warm=model.generate(**encoded,max_new_tokens=64,do_sample=False,use_cache=True)
        del warm;gc.collect();torch.cuda.empty_cache()
        trials=[]
        for trial in range(3):
            torch.cuda.reset_peak_memory_stats();torch.cuda.synchronize();start=time.perf_counter()
            with torch.inference_mode():
                output=model.generate(**encoded,max_new_tokens=64,do_sample=False,use_cache=True)
            torch.cuda.synchronize();elapsed=time.perf_counter()-start
            generated=output[0,input_tokens:];count=int(generated.numel())
            trials.append({'trial':trial+1,'seconds':round(elapsed,6),'output_tokens':count,'end_to_end_output_tokens_per_second':round(count/elapsed,3),'peak_allocated_mib':round(torch.cuda.max_memory_allocated()/2**20,3),'peak_reserved_mib':round(torch.cuda.max_memory_reserved()/2**20,3),'output':tokenizer.decode(generated,skip_special_tokens=True)})
            del output,generated;gc.collect();torch.cuda.empty_cache()
        result['cases'].append({'target_input_tokens':target,'actual_input_tokens':input_tokens,'prompt':content,'trials':trials,'median_seconds':round(statistics.median(t['seconds'] for t in trials),6),'median_peak_allocated_mib':statistics.median(t['peak_allocated_mib'] for t in trials),'median_end_to_end_output_tokens_per_second':statistics.median(t['end_to_end_output_tokens_per_second'] for t in trials)})
        args.output.write_text(json.dumps(result,indent=2),encoding='utf-8')
        print(json.dumps({k:v for k,v in result['cases'][-1].items() if k not in ['prompt','trials']}),flush=True)
        del encoded
    print('Completed: '+str(args.output),flush=True)

if __name__=='__main__':main()
