import React, { useState, useEffect } from 'react';
import { Phone, Video, Mic, MicOff, Camera, CameraOff, X, Volume2, Shield } from 'lucide-react';

export default function CallModal({ isOpen, onClose, callType = 'video', targetUser }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setCallTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg h-[80vh] bg-slate-900 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between text-white z-10">
          <div className="flex items-center space-x-2 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold">Chiffrement de bout en bout Omegia</span>
          </div>
          <span className="text-xs font-mono text-purple-300 font-bold bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            {formatTime(callTimer)}
          </span>
        </div>

        {/* Center Display / Video Grid */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-6 relative">
          
          {callType === 'video' && !isCamOff ? (
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-purple-500/30 bg-slate-950">
              <img
                src={targetUser?.avatar}
                alt=""
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white">
                {targetUser?.name}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-2xl animate-pulse" />
                <img
                  src={targetUser?.avatar}
                  alt=""
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-purple-500 shadow-2xl relative z-10"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{targetUser?.name}</h3>
                <p className="text-xs text-purple-300">Appel {callType === 'video' ? 'Vidéo' : 'Vocal'} HD en cours...</p>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Control Actions */}
        <div className="flex items-center justify-center space-x-6 z-10">
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all shadow-lg ${
              isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button
            onClick={onClose}
            className="p-5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
            title="Raccrocher"
          >
            <Phone className="w-7 h-7 rotate-[135deg]" />
          </button>

          {callType === 'video' && (
            <button
              onClick={() => setIsCamOff(!isCamOff)}
              className={`p-4 rounded-full transition-all shadow-lg ${
                isCamOff ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isCamOff ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
