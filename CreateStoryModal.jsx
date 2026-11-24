import React, { useState } from 'react';
import { Image, Sparkles, X, Palette } from 'lucide-react';

export default function CreateStoryModal({ isOpen, onClose, onSubmit, currentUser }) {
  const [storyType, setStoryType] = useState('text'); // text, image
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bgColor, setBgColor] = useState('from-purple-900 to-indigo-950');

  if (!isOpen) return null;

  const gradients = [
    'from-purple-900 to-indigo-950',
    'from-indigo-900 via-purple-900 to-pink-900',
    'from-cyan-900 to-blue-950',
    'from-emerald-900 to-teal-950'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storyType === 'text' && !textContent.trim()) return;
    if (storyType === 'image' && !imageUrl) return;

    onSubmit({
      user_name: currentUser?.full_name,
      user_avatar: currentUser?.avatar_url,
      text_content: textContent,
      media_url: storyType === 'image' ? imageUrl : '',
      bg_color: bgColor,
      is_admin: currentUser?.is_admin
    });

    setTextContent('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            Ajouter un Statut / Story Omegia <Sparkles className="w-4 h-4 text-purple-400" />
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2 border-b border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setStoryType('text')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                storyType === 'text' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              Statut Texte
            </button>
            <button
              type="button"
              onClick={() => setStoryType('image')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${
                storyType === 'image' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              Statut Photo
            </button>
          </div>

          {storyType === 'text' ? (
            <>
              <div className={`h-40 rounded-xl bg-gradient-to-br ${bgColor} p-4 flex items-center justify-center text-center border border-purple-500/30`}>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Écrivez votre statut ici..."
                  className="w-full bg-transparent text-white placeholder-slate-300 font-bold text-sm text-center focus:outline-none resize-none"
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 mb-1 block">Couleur d'arrière-plan :</span>
                <div className="flex space-x-2">
                  {gradients.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBgColor(g)}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 ${
                        bgColor === g ? 'border-white' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Lien de l'image (URL photo)..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Légende facultative..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            Publier la Story (Valide 24h)
          </button>
        </form>
      </div>
    </div>
  );
}
