import React, { useState, useEffect } from 'react';
import { X, Heart, Send, Crown, Volume2, VolumeX, Pause, Play } from 'lucide-react';

export default function StoryViewerModal({ story, onClose, onReply }) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (!story || isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onClose();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [story, isPaused, onClose]);

  if (!story) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onReply) onReply(story, replyText);
    setReplyText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-sm h-[85vh] bg-slate-900 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Progress bar header */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center space-x-1">
          <div className="flex-1 h-1 bg-slate-700/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Top User Info Bar */}
        <div className="absolute top-6 inset-x-3 z-30 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
            <img src={story.user_avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500" />
            <div>
              <div className="font-bold text-xs text-white flex items-center gap-1">
                {story.user_name}
                {story.is_admin && <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />}
              </div>
              <div className="text-[10px] text-slate-400">Statut Omegia • En direct</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setIsPaused(!isPaused)} className="p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-800">
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Content Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-slate-950">
          {story.media_url ? (
            <img src={story.media_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${story.bg_color || 'from-purple-900 via-indigo-950 to-slate-950'} p-8 flex items-center justify-center text-center`}>
              <h2 className="text-xl font-extrabold text-white leading-relaxed">{story.text_content}</h2>
            </div>
          )}

          {/* Text Overlay if image exists */}
          {story.media_url && story.text_content && (
            <div className="absolute bottom-20 inset-x-4 bg-slate-950/70 backdrop-blur-md p-3 rounded-2xl border border-purple-500/30 text-xs text-white text-center">
              {story.text_content}
            </div>
          )}
        </div>

        {/* Direct Reply Bar (WhatsApp style story response) */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 z-30">
          <form onSubmit={handleSendReply} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Répondre en message direct...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-full py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:brightness-125"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
