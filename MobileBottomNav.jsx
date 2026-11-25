import React from 'react';
import { Home, Tv, Radio, MessageSquare, Bell, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MobileBottomNav({ activeTab, setActiveTab, unreadMessagesCount = 2, unreadNotifsCount = 3 }) {
  const { profile } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 text-slate-400 shadow-2xl px-1 py-2 flex items-center justify-around">
      
      {/* 1. Home / Fil d'Actualités (Facebook) */}
      <button
        onClick={() => setActiveTab('feed')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
          activeTab === 'feed' ? 'text-purple-400 font-bold border-t-2 border-purple-500 -mt-2 pt-2' : 'hover:text-slate-200'
        }`}
      >
        <Home className="w-6 h-6" />
      </button>

      {/* 2. Statuts (WhatsApp) */}
      <button
        onClick={() => setActiveTab('stories')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
          activeTab === 'stories' ? 'text-emerald-400 font-bold border-t-2 border-emerald-500 -mt-2 pt-2' : 'hover:text-slate-200'
        }`}
      >
        <Radio className="w-6 h-6 text-emerald-400" />
      </button>

      {/* 3. Discussions / Chat (WhatsApp) */}
      <button
        onClick={() => setActiveTab('chat')}
        className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all ${
          activeTab === 'chat' ? 'text-cyan-400 font-bold border-t-2 border-cyan-500 -mt-2 pt-2' : 'hover:text-slate-200'
        }`}
      >
        <MessageSquare className="w-6 h-6" />
        {unreadMessagesCount > 0 && (
          <span className="absolute top-0 right-3 bg-red-600 text-white text-[9px] font-extrabold px-1 rounded-full border border-slate-950">
            {unreadMessagesCount}
          </span>
        )}
      </button>

      {/* 4. Notifications */}
      <button
        onClick={() => setActiveTab('notifications')}
        className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all ${
          activeTab === 'notifications' ? 'text-purple-400 font-bold border-t-2 border-purple-500 -mt-2 pt-2' : 'hover:text-slate-200'
        }`}
      >
        <Bell className="w-6 h-6" />
        {unreadNotifsCount > 0 && (
          <span className="absolute top-0 right-4 w-2 h-2 bg-purple-500 rounded-full" />
        )}
      </button>

      {/* 5. Menu / Profile */}
      <button
        onClick={() => setActiveTab('menu')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
          activeTab === 'menu' ? 'text-purple-400 font-bold border-t-2 border-purple-500 -mt-2 pt-2' : 'hover:text-slate-200'
        }`}
      >
        <img
          src={profile?.avatar_url}
          alt=""
          className={`w-6 h-6 rounded-full object-cover border ${
            activeTab === 'menu' ? 'border-purple-400 ring-2 ring-purple-500' : 'border-slate-700'
          }`}
        />
      </button>

    </div>
  );
}
