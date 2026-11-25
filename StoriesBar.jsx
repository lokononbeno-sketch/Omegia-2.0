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
  }
];

export default function StoriesBar({ onCreateStory, onOpenStoryViewer }) {
  const { profile } = useAuth();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-lg overflow-hidden">
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-none">
        
        {/* Card 1: "Créer une story" Card (Exactly matching Facebook Image 1) */}
        <div 
          onClick={onCreateStory}
          className="relative flex-shrink-0 w-28 h-48 rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 bg-slate-950 shadow-md transition-transform hover:scale-105 flex flex-col justify-between"
        >
          {/* Top User Photo */}
          <div className="h-32 w-full relative overflow-hidden bg-slate-900">
            <img src={profile?.avatar_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>

          {/* Bottom "Créer une story" with blue (+) button */}
          <div className="h-16 w-full bg-slate-900 px-1 pt-3 pb-1 text-center flex flex-col items-center justify-center relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-white shadow-xl">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white leading-tight mt-1">Créer une story</span>
          </div>
        </div>

        {/* Tall Story Cards (Facebook style with avatar ring in top left) */}
        {SAMPLE_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => onOpenStoryViewer && onOpenStoryViewer(story)}
            className="relative flex-shrink-0 w-28 h-48 rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105 shadow-md border border-slate-800 bg-slate-950"
          >
            {/* Story Image / Preview */}
            {story.media_url ? (
              <img src={story.media_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${story.bg_color || 'from-purple-900 to-indigo-950'} p-2 flex items-center justify-center text-center`}>
                <p className="text-[10px] font-semibold text-white line-clamp-4">{story.text_content}</p>
              </div>
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/90" />

            {/* Avatar Ring top-left */}
            <div className="absolute top-2 left-2 z-10">
              <div className={`p-0.5 rounded-full ${story.viewed ? 'bg-slate-600' : 'ring-2 ring-purple-500 bg-purple-900/80 animate-pulse'}`}>
                <img src={story.user_avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-950" />
              </div>
            </div>

            {/* Admin Badge */}
            {story.is_admin && (
              <div className="absolute top-2 right-2 z-10">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
            )}

            {/* User Name at bottom */}
            <div className="absolute bottom-2.5 inset-x-2 text-[11px] font-bold text-white truncate shadow-sm">
              {story.user_name}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
