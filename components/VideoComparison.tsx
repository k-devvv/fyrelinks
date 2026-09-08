'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

export interface ModelClip {
  modelName: string;
  videoSrc?: string;
  posterSrc: string;
  promptUsed: string;
  costInCredits: string;
  renderTime: string;
  strengths: string[];
  failurePoints: string[];
}

export interface VideoComparisonProps {
  title: string;
  promptDescription: string;
  clipA: ModelClip;
  clipB: ModelClip;
}

export default function VideoComparison({
  title,
  promptDescription,
  clipA,
  clipB,
}: VideoComparisonProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const nextPlaying = !isPlaying;
    const vA = videoRefA.current;
    const vB = videoRefB.current;

    if (nextPlaying) {
      if (vA && vB) {
        try {
          // Synchronize time offset between clips for frame-locked inspection
          vB.currentTime = vA.currentTime;
        } catch {
          // Ignore sync error if video not ready
        }
      }
      vA?.play().catch(() => {});
      vB?.play().catch(() => {});
    } else {
      vA?.pause();
      vB?.pause();
    }
    setIsPlaying(nextPlaying);
  };

  const restartBoth = () => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (vA) vA.currentTime = 0;
    if (vB) vB.currentTime = 0;
    if (isPlaying) {
      vA?.play().catch(() => {});
      vB?.play().catch(() => {});
    }
  };

  const renderCard = (clip: ModelClip, ref: React.RefObject<HTMLVideoElement>) => (
    <div className="flex flex-col bg-slate-950/80 border border-white/10 rounded-xl overflow-hidden shadow-md h-full">
      {/* Header Info */}
      <div className="px-4 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
        <span className="font-semibold text-white text-sm tracking-tight">{clip.modelName}</span>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>{clip.renderTime}</span>
          <span>•</span>
          <span className="text-orange-400 font-medium">{clip.costInCredits}</span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        {clip.videoSrc ? (
          <video
            ref={ref}
            src={clip.videoSrc}
            poster={clip.posterSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/60 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-2">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <p className="text-xs font-mono text-slate-400">Render Capture: {clip.modelName}</p>
          </div>
        )}
      </div>

      {/* Observational Findings */}
      <div className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="text-emerald-400 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{clip.strengths.join('; ')}</span>
          </div>
          <div className="text-amber-400/90 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{clip.failurePoints.join('; ')}</span>
          </div>
        </div>

        {clip.promptUsed && clip.promptUsed !== promptDescription && (
          <div className="pt-2.5 mt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono italic leading-relaxed">
            Prompt variation: &ldquo;{clip.promptUsed}&rdquo;
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="my-10 p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Prompt: &ldquo;{promptDescription}&rdquo;</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-orange-400" /> : <Play className="w-3.5 h-3.5 text-orange-400" />}
            <span>{isPlaying ? 'Pause Both' : 'Play Both'}</span>
          </button>
          <button
            type="button"
            onClick={restartBoth}
            title="Synchronize & restart from 0s"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sync Replay</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="flex sm:hidden mb-4 p-1 rounded-lg bg-slate-950 border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab('A')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'A' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {clipA.modelName}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('B')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'B' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {clipB.modelName}
        </button>
      </div>

      {/* Desktop 2-Column Split & Responsive Mobile Tab View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={activeTab === 'A' ? 'block h-full' : 'hidden sm:block h-full'}>
          {renderCard(clipA, videoRefA)}
        </div>
        <div className={activeTab === 'B' ? 'block h-full' : 'hidden sm:block h-full'}>
          {renderCard(clipB, videoRefB)}
        </div>
      </div>
    </section>
  );
}
