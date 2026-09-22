# [DRAFT] Deploy an Open-Source LLM on Red Hat OpenShift AI

> **Status**: UNPUBLISHED DRAFT (Excluded from sitemap & active catalog pending cluster environment verification)
> **Target Query**: `deploy llm red hat openshift ai`, `openshift ai vllm kserve deployment`
> **Target Audience**: Enterprise platform engineers, MLOps specialists running Kubernetes on-premise.

## 1. Core Architecture & Prerequisites
* **Platform**: Red Hat OpenShift Container Platform 4.14+ with Red Hat OpenShift AI (RHOAI) operator enabled.
* **Serving Runtime**: KServe with vLLM serving runtime container image.
* **Hardware**: NVIDIA GPU Operator with minimum 1x NVIDIA A10G (24GB) or L40S for 8B–14B models.

## 2. Research Notes & Deployment Workflow
1. Install NVIDIA GPU Operator and Node Feature Discovery (NFD) to expose GPU devices to worker nodes.
2. In RHOAI dashboard, create a Data Science Project and select the vLLM Serving Runtime template.
3. Configure ModelMesh / Single-Model Serving with S3-compatible storage containing model weights (`Llama-3.1-8B-Instruct` in safe-tensors).
4. Set resource requests: `nvidia.com/gpu: 1`, memory limit `32Gi`.
5. Expose gRPC / REST inference endpoint via OpenShift Route with TLS termination.

## 3. Primary Sources
* Red Hat OpenShift AI Official Documentation: `https://docs.redhat.com/en/documentation/red_hat_openshift_ai/`
* KServe vLLM Runtime Guidelines: `https://kserve.github.io/website/latest/modelserving/v1beta1/llm/vllm/`

## 4. Remaining Verification Blockers
* Hands-on validation required on active OpenShift cluster to record actual pod startup timings, cold-start latency from S3 storage, and autoscaling thresholds under synthetic load.
