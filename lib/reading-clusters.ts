// Editorially selected reader journeys; not measured keyword-volume or SERP clusters.
export const readingClusters = [
  {name: 'Local inference: files, memory and privacy', why: 'Choose compatible files first, then check memory and cloud boundaries.', slugs: [
    'run-local-llm-rtx-4050-laptop-guide', 'gguf-vs-safetensors-format-compatibility',
    'ollama-context-length-vram-slow-model-fix', 'ollama-local-only-mode-cloud-privacy-controls',
    'lfm25-24b-a2b-local-agents-context-memory', 'nemotron35-super-vl-total-active-parameters-memory',
    'comfyui-cuda-out-of-memory-fix-by-stage', 'comfyui-beginner-first-workflow-guide']},
  {name: 'Interactive worlds: controls and deployment', why: 'Compare interaction controls and deployment requirements before treating a demo as a usable local workflow.', slugs: [
    'worldplay2-interactive-world-model-controls-gpu-license', 'hy-nomas-interactive-world-generation-setup',
    'matrix-game4-engine-grounded-world-model-preview', 'multics-multiplayer-world-model-shared-view-consistency',
    'streamrender-h3-realtime-world-render-gb200-hardware', 'streaming-code-world-model-h200-not-realtime',
    'inspatio-world15-camera-controlled-generation', 'viggle-jst2-3d-world-scenes-motion']},
  {name: '3D reconstruction: inputs and asset checks', why: 'Separate reconstruction inputs, editable outputs and motion requirements when evaluating a research release.', slugs: [
    'uniforge3d-sparse-views-reconstruction-generation', 'pure-unlabeled-video-3d-reconstruction',
    'hi3d1-sparc3d-geometry-refinement-license', 'infinisplat2-feed-forward-3dgs-arbitrary-views',
    'genia-3d-reconstruction-test-time-alignment', 'point2part-point-prompts-3d-partition-release',
    'sky001-engineering-world-model-cad-bim', 'codimrecon-deformable-scene-reconstruction-simulation']},
  {name: 'Agents and retrieval: data, state and permissions', why: 'Connect extraction and retrieval decisions to agent memory, permissions and evaluation.', slugs: [
    'ai-web-scraping-pipelines-firecrawl-playwright-rag', 'stateful-agents-vs-simple-rag-workflow-guide',
    'memt10-native-memory-flash-nano-agents', 'openai-dots-always-on-agents-controls',
    'arex2-27b-reflective-agents-budget-feedback', 'step5-preview-architecture-agent-tool-boundaries',
    'sage-a15-scientific-agent-local-deployment', 'astabrief-8b-cited-research-reports-evaluation']}
];
export function readingJourney(slug: string) {
  const cluster = readingClusters.find(c => c.slugs.includes(slug));
  if (!cluster) return null;
  const index = cluster.slugs.indexOf(slug);
  return {...cluster, next: [1, 2].map(offset => cluster.slugs[(index + offset) % cluster.slugs.length])};
}
