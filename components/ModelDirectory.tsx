"use client";

import {useState} from "react";

import {Search, ArrowUpRight} from "lucide-react";
import {VIDEO_PROVIDERS, VIDEO_VARIANTS, variantRate} from "@/lib/video-plans";

export default function ModelDirectory() {
  const [query,setQuery]=useState("");
  const [platform,setPlatform]=useState("all");
  const filtered=VIDEO_VARIANTS.filter(v=>(platform==="all"||v.provider===platform)&&`${v.model} ${v.setting}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="model-directory"><div className="directory-controls"><label className="directory-search"><Search size={18}/><input type="search" aria-label="Search video models" placeholder="Search Kling, Seedance, Sora, Veo…" value={query} onChange={e=>setQuery(e.target.value)}/></label><label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value)}><option value="all">All platforms</option>{VIDEO_PROVIDERS.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label></div><p className="directory-count" role="status">{filtered.length} configurations · credit units belong to each platform</p>{VIDEO_PROVIDERS.filter(p=>filtered.some(v=>v.provider===p.id)).map(p=><details key={p.id} className="provider-directory" open={platform!=="all"||!!query||p.id==="higgsfield"}><summary><span className={`provider-mark mark-${p.id}`}>{p.mark}</span><strong>{p.name}</strong><span>{filtered.filter(v=>v.provider===p.id).length} settings</span></summary><div className="table-scroll" tabIndex={0} aria-label={`${p.name} model prices`}><table><thead><tr><th scope="col">Video model</th><th scope="col">Output / mode</th><th scope="col">Published rate</th><th scope="col"><span className="sr-only">Official source</span></th></tr></thead><tbody>{filtered.filter(v=>v.provider===p.id).map(v=><tr key={v.id}><th scope="row">{v.model}</th><td>{v.setting}</td><td>{variantRate(v)}</td><td><a href={p.url} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight size={14}/></a></td></tr>)}</tbody></table></div><p><a href={p.url} target="_blank" rel="noopener noreferrer">Verify on {p.name} ↗</a> · Approximate figures are marked ≈. Model access and prices can change.</p></details>)}{!filtered.length&&<p className="directory-empty">No matching models. Try a model family or clear the platform filter.</p>}</div>;
}
