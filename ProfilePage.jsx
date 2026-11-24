import React, { useState } from 'react';
import { 
  Crown, ShieldCheck, MapPin, Calendar, Users, Heart, 
  MessageSquare, UserPlus, UserCheck, Settings, Edit3 
} from 'lucide-react';
import PostCard from '../Feed/PostCard';

export default function ProfilePage({ profile, posts, currentUser }) {
  const [activeTab, setActiveTab] = useState('feed'); // feed, media, info
  const [isFollowing, setIsFollowing] = useState(false);

  const isSelf = currentUser?.id === profile?.id || currentUser?.username === profile?.username;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16 text-slate-100">
      
      {/* Profile Card & Cover Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Cover Banner */}
        <div className="h-44 sm:h-56 relative bg-slate-950">
          <img
            src={profile?.banner_url || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Profile Info Container */}
        <div className="px-6 pb-6 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            
            <div className="flex items-end space-x-4">
              <img
                src={profile?.avatar_url}
                alt={profile?.full_name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-purple-500 shadow-2xl bg-slate-950"
              />
              <div className="mb-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black text-white">{profile?.full_name}</h1>
                  
                  {profile?.is_admin && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 fill-amber-400" /> Fondateur
                    </span>
                  )}

                  {profile?.is_verified && !profile?.is_admin && (
                    <ShieldCheck className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                  )}
                </div>

                <div className="text-xs text-purple-400 font-medium">@{profile?.username}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {!isSelf ? (
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                    isFollowing
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isFollowing ? 'Abonné' : 'Suivre'}</span>
                </button>
              ) : (
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center space-x-2">
                  <Edit3 className="w-4 h-4" />
                  <span>Éditer le Profil</span>
                </button>
              )}
            </div>

          </div>

          {/* Bio */}
          <div className="mt-4 text-xs text-slate-300 leading-relaxed max-w-xl">
            {profile?.bio || 'Membre passionné de la communauté Omegia.'}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="font-bold text-white text-sm">{profile?.followers_count || 1420}</span>
              <span className="text-slate-400 ml-1.5">Abonnés</span>
            </div>
            <div>
              <span className="font-bold text-white text-sm">342</span>
              <span className="text-slate-400 ml-1.5">Abonnements</span>
            </div>
            <div>
              <span className="font-bold text-white text-sm">{posts.length || 18}</span>
              <span className="text-slate-400 ml-1.5">Publications</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'feed' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Publications Omegia
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'media' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Galerie Médias
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            author={profile}
            currentUser={currentUser}
          />
        ))}
      </div>

    </div>
  );
}
