import React, { useState } from 'react';
import { Image, Mic, BarChart2, Globe, Lock, Users, X, Sparkles, Send } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onSubmit, currentUser }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postType, setPostType] = useState('standard'); // standard, poll, voice
  const [privacy, setPrivacy] = useState('Public');
  
  // Poll options state
  const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2']);
  
  // Voice note simulator state
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  if (!isOpen) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handlePollChange = (idx, value) => {
    const updated = [...pollOptions];
    updated[idx] = value;
    setPollOptions(updated);
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl && postType === 'standard') return;

    onSubmit({
      content,
      image_url: imageUrl,
      media_type: postType === 'poll' ? 'poll' : postType === 'voice' ? 'voice' : imageUrl ? 'image' : 'text',
      poll_options: postType === 'poll' ? pollOptions.map((opt, i) => ({ id: i + 1, text: opt, votes: 0 })) : null,
      audio_url: postType === 'voice' ? (audioUrl || 'demo_voice_note.mp3') : null,
      privacy
    });

    setContent('');
    setImageUrl('');
    setPostType('standard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            Créer une Publication <Sparkles className="w-4 h-4 text-purple-400" />
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge & Privacy */}
        <div className="flex items-center space-x-3 mb-4">
          <img src={currentUser?.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500" />
          <div>
            <div className="font-semibold text-sm text-white">{currentUser?.full_name}</div>
            <div className="flex items-center space-x-2 mt-0.5">
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-0.5 focus:outline-none"
              >
                <option value="Public">🌐 Public</option>
                <option value="Amis">👥 Amis uniquement</option>
                <option value="Admin">🔒 réservé Admin</option>
              </select>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Text Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Quoi de neuf sur Omegia, ${currentUser?.full_name?.split(' ')[0]} ? Exprimez-vous !`}
            className="w-full h-32 bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
          />

          {/* Preset / Custom Image Preview */}
          {imageUrl && (
            <div className="relative rounded-xl overflow-hidden border border-purple-500/40 max-h-48 bg-slate-950">
              <img src={imageUrl} alt="Upload preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute top-2 right-2 p-1 bg-slate-950/80 rounded-full text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image Presets Picker */}
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400">Choisir une image de la galerie :</span>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {sampleImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setImageUrl(img); setPostType('standard'); }}
                  className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0 hover:border-purple-500 transition-colors"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Poll Builder View */}
          {postType === 'poll' && (
            <div className="p-3 bg-slate-950/80 border border-purple-500/30 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" /> Options du Sondage Omegia :
              </div>
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={opt}
                  onChange={(e) => handlePollChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              ))}
              {pollOptions.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddPollOption}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  + Ajouter une option
                </button>
              )}
            </div>
          )}

          {/* Voice Note View */}
          {postType === 'voice' && (
            <div className="p-4 bg-slate-950/80 border border-purple-500/30 rounded-xl text-center space-y-3">
              <div className="text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
                <Mic className="w-4 h-4 text-cyan-400 animate-pulse" /> Note Vocale Omegia (Simulation HD)
              </div>
              <p className="text-xs text-slate-400">Enregistrez un message vocal direct pour votre fil d'actualité.</p>
              <button
                type="button"
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                }}
                className={`px-4 py-2 rounded-full font-bold text-xs flex items-center justify-center space-x-2 mx-auto transition-all ${
                  isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-purple-600 text-white hover:bg-purple-500'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isRecording ? 'Enregistrement en cours...' : 'Démarrer l\'enregistreur vocal'}</span>
              </button>
            </div>
          )}

          {/* Options Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setPostType('standard')}
                className={`p-2 rounded-lg text-xs flex items-center space-x-1 ${
                  postType === 'standard' ? 'bg-purple-900/50 text-purple-300' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Image className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setPostType('poll')}
                className={`p-2 rounded-lg text-xs flex items-center space-x-1 ${
                  postType === 'poll' ? 'bg-purple-900/50 text-purple-300' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Sondage</span>
              </button>

              <button
                type="button"
                onClick={() => setPostType('voice')}
                className={`p-2 rounded-lg text-xs flex items-center space-x-1 ${
                  postType === 'voice' ? 'bg-purple-900/50 text-purple-300' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Mic className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Note Vocale</span>
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <span>Publier</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
