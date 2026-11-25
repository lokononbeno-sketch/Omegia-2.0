import React, { useState } from 'react';
import { Plus, Flame, Rss, Crown, Radio, Sparkles, Filter, Search, Image as ImageIcon } from 'lucide-react';
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';
import StoriesBar from '../Stories/StoriesBar';

export default function Feed({ currentUser, posts, onCreatePost, onSelectStory, onCreateStory, onOpenStoryViewer }) {
  const [filter, setFilter] = useState('all'); // all, admin, media, voice
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = posts.filter(post => {
    if (filter === 'admin') return post.author?.is_admin || post.pinned;
    if (filter === 'media') return post.image_url;
    if (filter === 'voice') return post.media_type === 'voice';
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20">
      
      {/* Facebook Post Creation Pill Bar (Matching Image 1) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-lg flex items-center justify-between space-x-3">
        <img
          src={currentUser?.avatar_url}
          alt=""
          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 text-left bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-full py-2.5 px-4 text-xs text-slate-300 placeholder-slate-500 focus:outline-none transition-all flex items-center justify-between"
        >
          <span>Quoi de neuf ?</span>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-emerald-400 hover:bg-slate-800 rounded-full transition-colors"
          title="Ajouter une photo"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Stories / Statuts Bar at top of Feed (Matching Image 1) */}
      <StoriesBar
        onSelectStory={onSelectStory}
        onCreateStory={onCreateStory}
        onOpenStoryViewer={onOpenStoryViewer}
      />

      {/* Feed Filter Tags */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
            filter === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Fil d'Actualités
        </button>

        <button
          onClick={() => setFilter('admin')}
          className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
            filter === 'admin'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          <span>Annonces Admin</span>
        </button>

        <button
          onClick={() => setFilter('media')}
          className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
            filter === 'media'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          🖼️ Photos
        </button>

        <button
          onClick={() => setFilter('voice')}
          className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
            filter === 'voice'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          🎙️ Notes Vocales
        </button>
      </div>

      {/* Feed Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={post.author || currentUser}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
            <Rss className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">Aucune publication dans cette catégorie</h4>
            <p className="text-xs text-slate-500 mt-1">Soyez le premier à publier sur Omegia !</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onCreatePost}
        currentUser={currentUser}
      />

    </div>
  );
}
