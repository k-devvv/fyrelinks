# [DRAFT] Fine-Tuning versus RAG versus Pre-Training: Cost Drivers & Trade-Offs

> **Status**: UNPUBLISHED DRAFT (Excluded from sitemap & active catalog pending cost model validation)
> **Target Query**: `rag vs fine tuning cost comparison`, `when to fine tune vs rag llm`
> **Target Audience**: AI product managers and engineering leaders evaluating model customization budgets.

## 1. Core Economic Framework
* **Pre-Training**: $100,000 to millions. Only applicable when building proprietary foundation models on novel non-English corpora.
* **Fine-Tuning (LoRA/QLoRA)**: $100 to $5,000 for compute + significant engineering labor for high-quality dataset curation. Ideal for teaching **style, tone, output schema, and specialized vocabulary**—NOT for injecting rapidly changing factual knowledge.
* **RAG (Retrieval-Augmented Generation)**: Low upfront capital cost ($50 to $500/month for vector DB and chunking pipelines), variable inference cost per query. Ideal for **dynamic factual knowledge, document retrieval, and verifiable source citations**.

## 2. Decision Rules
* If knowledge changes daily/weekly: **RAG**. Fine-tuning cannot keep up with real-time updates.
* If the task requires structured formatting without repeating complex prompt instructions: **LoRA Fine-Tuning**.
* If both are needed: **Fine-tuned model with RAG retrieval**.

## 3. Primary Sources
* Stanford CRFM Foundation Model Customization Economics: `https://crfm.stanford.edu/`
* Hugging Face PEFT LoRA Documentation: `https://huggingface.co/docs/peft/`

## 4. Remaining Verification Blockers
* Need to quantify exact cloud GPU hourly costs across AWS Trainium vs NVIDIA H100 SXM5 for realistic customer cost projections.
