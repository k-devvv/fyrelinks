# [DRAFT] Evaluating Enterprise Deepfake Detection APIs: Capabilities & Limits

> **Status**: UNPUBLISHED DRAFT (Excluded from sitemap & active catalog pending benchmark validation)
> **Target Query**: `enterprise deepfake detection api comparison`, `ai video authentication tools`
> **Target Audience**: Trust & safety engineers, KYC identity verification leads, digital media forensic analysts.

## 1. Core Reality & Detection Limitations
* **No Detection Silver Bullet**: Generative diffusion and face-swap models evolve faster than static heuristic detectors. Modern detection APIs operate on statistical probabilities, not binary truth guarantees.
* **False Positive Hazard**: Compressed video, camera sensor noise, and aggressive social media re-encoding (e.g. WhatsApp/Twitter video compression) trigger frequent false positives.
* **Defense-in-Depth Model**: Detection APIs must be combined with C2PA cryptographic provenance metadata (Content Authenticity Initiative), biometric liveness challenges, and multi-frame consistency analysis.

## 2. Vendor Landscape Under Review
* Microsoft Video Authenticator / Azure AI Content Understanding
* Reality Defender Enterprise API
* Sentinel AI Deepfake Protection
* Sensity AI Detection Suite

## 3. Primary Sources
* Coalition for Content Provenance and Authenticity (C2PA) Technical Specifications: `https://c2pa.org/`
* NIST Synthetic Media Identification and Detection Evaluation: `https://www.nist.gov/programs-projects/face-recognition-technology-evaluation-frte`

## 4. Remaining Verification Blockers
* Requires independent testing against a controlled dataset of known authentic vs synthetic compressed videos to record actual precision/recall across compression tiers.
