import React from 'react';
import { Plus, Crown, Radio } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const SAMPLE_STORIES = [
  {
    id: 'st_1',
    user_name: 'Lokonon Beno',
    user_avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    media_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    text_content: 'Bienvenue sur Omegia v2.5 ! L\'œil veille sur nos histoires.',
    is_admin: true,
    viewed: false
  },
  {
    id: 'st_2',
    user_name: 'Sarah Connor',
    user_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    media_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    text_content: 'Designing the new Omegia interface ✨',
    viewed: false
  },
  {
    id: 'st_3',
    user_name: 'Elena Rostova',
    user_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    media_url: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800',
    text_content: 'Coucher de soleil en live 🌅',
    viewed: true
  },
  {
    id: 'st_4',
    user_name: 'Alex Vance',
    user_avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    media_url: '',
    bg_color: 'from-purple-900 to-indigo-900',
    text_content: 'Code session de nuit. Direct WhatsApp prêt ! 💻',
    viewed: false
  }
];

export default function StoriesBar({ onCreateStory, onOpenStoryViewer }) {
  const { profile } = useAuth();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl overflow-hidden">
      <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-none">
        
        {/* Add My Story Button */}
        <div 
          onClick={onCreateStory}
          className="relative flex-shrink-0 w-24 h-36 rounded-xl overflow-hidden cursor-pointer group border border-purple-500/40 bg-slate-950 transition-transform hover:scale-105"
        >
          <img src={profile?.avatar_url} alt="" className="w-full h-24 object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-slate-900 p-1 text-center flex flex-col items-center justify-end">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-purple-600 rounded-full border-2 border-slate-900 flex items-center justify-center text-white shadow-lg">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-200">Ajouter Story</span>
          </div>
        </div>

        {/* Story List Items */}
        {SAMPLE_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => onOpenStoryViewer && onOpenStoryViewer(story)}
            className="relative flex-shrink-0 w-24 h-36 rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-105 shadow-md border border-slate-800"
          >
            {/* Story Preview Image or Gradient Background */}
            {story.media_url ? (
              <img src={story.media_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${story.bg_color || 'from-purple-900 to-indigo-950'} p-2 flex items-center justify-center text-center`}>
                <p className="text-[10px] font-semibold text-white line-clamp-3">{story.text_content}</p>
              </div>
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/90" />

            {/* Avatar Ring */}
            <div className="absolute top-2 left-2">
              <div className={`p-0.5 rounded-full ${story.viewed ? 'bg-slate-600' : 'bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 animate-pulse'}`}>
                <img src={story.user_avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-slate-950" />
              </div>
            </div>

            {/* Admin Badge */}
            {story.is_admin && (
              <div className="absolute top-2 right-2">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
            )}

            {/* User Name at bottom */}
            <div className="absolute bottom-2 inset-x-2 text-[11px] font-semibold text-white truncate shadow-sm">
              {story.user_name}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
