import React, { useState, useEffect, useRef } from 'react';
import { Eye, Shield, Sparkles, Activity, X, Zap, Lock, RefreshCw } from 'lucide-react';

export default function OmegiaEye({ size = 'medium', className = '', showStatsModal = true }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eyeMode, setEyeMode] = useState('surveillance'); // surveillance, cosmic, founder
  const eyeRef = useRef(null);

  // Mouse tracking listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxOffset = size === 'large' ? 14 : size === 'small' ? 5 : 9;
      const angle = Math.atan2(deltaY, deltaX);

      const offsetX = Math.cos(angle) * Math.min(distance / 15, maxOffset);
      const offsetY = Math.sin(angle) * Math.min(distance / 15, maxOffset);

      setEyeOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  // Periodic blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const dimensions = {
    small: { w: 34, h: 34, iris: 14, pupil: 7 },
    medium: { w: 52, h: 52, iris: 22, pupil: 11 },
    large: { w: 90, h: 90, iris: 38, pupil: 18 }
  }[size] || { w: 52, h: 52, iris: 22, pupil: 11 };

  return (
    <>
      <div
        ref={eyeRef}
        onClick={() => showStatsModal && setModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative inline-flex items-center justify-center cursor-pointer select-none group transition-transform duration-300 ${className}`}
        title="L'Œil d'Omegia - Cliquez pour le Mode Omniscience"
      >
        {/* Glow halo */}
        <div className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
          isHovered ? 'bg-purple-500/60 scale-125' : 'bg-indigo-600/30 scale-100'
        }`} />

        {/* Outer Orbit Ring */}
        <div className="absolute inset-[-4px] rounded-full border border-purple-500/30 animate-spin-slow pointer-events-none" style={{ animationDuration: '12s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
        </div>

        {/* Eye Container */}
        <div 
          className="relative bg-slate-900 border-2 border-purple-500/60 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden flex items-center justify-center transition-all duration-200"
          style={{ width: `${dimensions.w}px`, height: `${dimensions.h}px` }}
        >
          {/* Eyelids / Blinking */}
          <div className={`absolute inset-0 bg-slate-950 z-20 transition-all duration-150 origin-top ${
            isBlinking ? 'scale-y-100' : 'scale-y-0'
          }`} />

          {/* Sclera (Eye White with Radial Mesh) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center">
            {/* Iris */}
            <div
              className="relative rounded-full transition-transform duration-75 flex items-center justify-center shadow-inner"
              style={{
                width: `${dimensions.iris}px`,
                height: `${dimensions.iris}px`,
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                background: isHovered 
                  ? 'radial-gradient(circle, #38bdf8 0%, #818cf8 40%, #4c1d95 100%)'
                  : 'radial-gradient(circle, #a855f7 0%, #6366f1 50%, #1e1b4b 100%)'
              }}
            >
              {/* Iris texture lines */}
              <div className="absolute inset-0 rounded-full opacity-40 border border-cyan-300/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

              {/* Pupil */}
              <div
                className="bg-slate-950 rounded-full flex items-center justify-center transition-all duration-150 shadow-[0_0_6px_rgba(0,0,0,0.9)]"
                style={{
                  width: `${dimensions.pupil}px`,
                  height: `${dimensions.pupil}px`,
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                {/* Catchlight (Gloss reflection) */}
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-90 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Badge indicator */}
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-slate-950"></span>
        </span>
      </div>

      {/* Omniscience Eye Stats Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden">
            
            {/* Background ambient light */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6 relative z-10">
              <div className="flex items-center space-x-3">
                <OmegiaEye size="small" showStatsModal={false} />
                <div>
                  <h3 className="font-bold text-lg bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent flex items-center gap-2">
                    L'Œil d'Omegia <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-slate-400">Système de Surveillance & Telemetrie en temps réel</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 relative z-10">
              
              <div className="bg-slate-950/60 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Position du Regard (Curseur)</div>
                    <div className="font-mono text-sm font-semibold text-cyan-300">
                      X: {mousePos.x}px | Y: {mousePos.y}px
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ● Actif
                  </span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Impressions Visuelles
                  </div>
                  <div className="text-xl font-bold text-white">18,452</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">↑ +14% ce jour</div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" /> Protection Intégrité
                  </div>
                  <div className="text-xl font-bold text-white">99.9%</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">Securité Omegia v2.4</div>
                </div>
              </div>

              {/* Live surveillance message */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-purple-300 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" /> Note du Créateur (Lokonon Beno) :
                </p>
                "L'œil placé au sommet d'Omegia observe les échanges pour maintenir la bienveillance, la sécurité et la fluidité des stories, publications et conversations."
              </div>

              {/* Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg transition-all"
                >
                  Fermer la Vision Omnisciente
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
