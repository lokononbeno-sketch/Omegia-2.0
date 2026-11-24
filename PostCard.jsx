import React, { useState } from 'react';
import { 
  Heart, Flame, ThumbsUp, MessageSquare, Share2, Crown, 
  ShieldCheck, MoreVertical, Play, Pause, BarChart2, Check, Sparkles, Pin 
} from 'lucide-react';

export default function PostCard({ post, author, currentUser, onLike, onComment, onShare }) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [votedOption, setVotedOption] = useState(null);
  const [userReaction, setUserReaction] = useState(post.user_reaction || null);
  const [reactionsCount, setReactionsCount] = useState(post.likes_count || 12);

  const reactions = [
    { emoji: '❤️', label: 'J\'adore', name: 'heart' },
    { emoji: '🔥', label: 'Feu', name: 'flame' },
    { emoji: '😂', label: 'Rire', name: 'laugh' },
    { emoji: '😮', label: 'Whaou', name: 'wow' },
    { emoji: '👏', label: 'Bravo', name: 'clap' }
  ];

  const handleReactionClick = (r) => {
    if (userReaction === r.name) {
      setUserReaction(null);
      setReactionsCount(prev => prev - 1);
    } else {
      if (!userReaction) setReactionsCount(prev => prev + 1);
      setUserReaction(r.name);
    }
    if (onLike) onLike(post.id, r.name);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (onComment) onComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl hover:border-purple-500/30 transition-all text-slate-100 relative overflow-hidden">
      
      {/* Pinned post banner */}
      {post.pinned && (
        <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-semibold mb-3 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 w-fit">
          <Pin className="w-3.5 h-3.5 fill-amber-400" />
          <span>Épinglé par le Fondateur (Lokonon Beno)</span>
        </div>
      )}

      {/* Author Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={author?.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'}
            alt={author?.full_name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/60"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm text-white hover:underline cursor-pointer">
                {author?.full_name || 'Utilisateur Omegia'}
              </span>

              {/* Founder / Admin Badge */}
              {author?.is_admin && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Fondateur</span>
                </span>
              )}

              {/* Verified Badge */}
              {author?.is_verified && !author?.is_admin && (
                <ShieldCheck className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>@{author?.username || 'omegia_user'}</span>
              <span>•</span>
              <span>{post.created_at || 'Il y a 10 min'}</span>
            </div>
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Main Post Content */}
      <div className="space-y-3 mb-4">
        {post.content && (
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        )}

        {/* Media Image */}
        {post.image_url && (
          <div className="rounded-xl overflow-hidden border border-slate-800 max-h-96 bg-slate-950">
            <img src={post.image_url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        )}

        {/* Voice Note Audio Component */}
        {post.media_type === 'voice' && (
          <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-3.5 flex items-center space-x-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full shadow-lg"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold text-purple-300">🎙️ Note Vocale Omegia</span>
                <span>0:45</span>
              </div>
              {/* Simulated Waveform Bar */}
              <div className="flex items-center space-x-1 h-6">
                {[40, 75, 30, 90, 60, 100, 45, 80, 65, 30, 85, 95, 40, 70, 50, 80, 60].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all ${
                      isPlayingAudio ? 'bg-purple-400 animate-pulse' : 'bg-slate-700'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Poll Component */}
        {post.media_type === 'poll' && post.poll_options && (
          <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5 mb-2">
              <BarChart2 className="w-4 h-4" /> Sondage Communautaire Omegia :
            </div>
            {post.poll_options.map((option) => (
              <button
                key={option.id}
                onClick={() => setVotedOption(option.id)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  votedOption === option.id
                    ? 'bg-purple-900/50 border-purple-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{option.text}</span>
                {votedOption === option.id && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2 mb-2">
        <div className="flex items-center space-x-1">
          <span className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">❤️</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">🔥</span>
          </span>
          <span>{reactionsCount} réactions</span>
        </div>

        <div className="flex items-center space-x-3">
          <span>{post.comments?.length || 3} commentaires</span>
          <span>•</span>
          <span>{post.shares_count || 5} partages</span>
        </div>
      </div>

      {/* Interactive Reactions & Actions Buttons */}
      <div className="flex items-center justify-around text-xs font-semibold text-slate-400 pt-1">
        
        {/* Reaction Bar */}
        <div className="relative group/reactions">
          <button
            onClick={() => handleReactionClick({ name: 'heart' })}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all ${
              userReaction ? 'text-red-400 font-bold bg-red-500/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${userReaction ? 'fill-red-400 text-red-400' : ''}`} />
            <span>J'aime</span>
          </button>

          {/* Floating Emoji Selector */}
          <div className="absolute left-0 bottom-full mb-1 hidden group-hover/reactions:flex items-center space-x-1.5 bg-slate-950 border border-purple-500/40 p-2 rounded-full shadow-2xl animate-fade-in z-20">
            {reactions.map((r, i) => (
              <button
                key={i}
                onClick={() => handleReactionClick(r)}
                className="text-lg hover:scale-130 transition-transform p-1 hover:bg-slate-800 rounded-full"
                title={r.label}
              >
                {r.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Comment toggle button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all"
        >
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>Commenter</span>
        </button>

        {/* Share button */}
        <button
          onClick={() => onShare && onShare(post)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all"
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>Partager</span>
        </button>

      </div>

      {/* Comment Drawer Section */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
          
          {/* Add comment input */}
          <form onSubmit={handleAddComment} className="flex items-center space-x-2">
            <img src={currentUser?.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
            <input
              type="text"
              placeholder="Écrivez un commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-full py-1.5 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-1.5 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-500"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Sample comments */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {(post.comments && post.comments.length > 0 ? post.comments : [
              { id: 'c1', user_name: 'Sarah Connor', text: 'Superbe mise à jour d\'Omegia ! L\'œil d\'omniscience est une fonctionnalité brillante.', time: 'Il y a 5m' },
              { id: 'c2', user_name: 'Alex Vance', text: 'La vitesse de la messagerie WhatsApp couplée au fil FB est parfaite.', time: 'Il y a 2m' }
            ]).map((c, idx) => (
              <div key={idx} className="flex items-start space-x-2 bg-slate-950/60 p-2 rounded-xl text-xs">
                <div className="w-6 h-6 rounded-full bg-purple-900/50 text-purple-300 font-bold flex items-center justify-center flex-shrink-0">
                  {c.user_name ? c.user_name[0] : 'U'}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{c.user_name}</div>
                  <div className="text-slate-300">{c.text}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </article>
  );
}
