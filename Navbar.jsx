import React, { useState } from 'react';
import { 
  Menu, Plus, Search, MessageSquare, Bell, Crown, Sparkles, X, ChevronDown, Check, User, Smartphone, Key
} from 'lucide-react';
import OmegiaEye from './OmegiaEye';
import InstallApkModal from './InstallApkModal';
import AuthModal from './AuthModal';
import CreatePostModal from './Feed/CreatePostModal';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ activeTab, setActiveTab, unreadMessagesCount = 2, unreadNotifsCount = 3, onCreatePost }) {
  const { profile, allProfiles, switchAccount, broadcastAlert } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      
      {/* Broadcast Banner if present */}
      {broadcastAlert && broadcastAlert.active && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 border-b border-purple-500/30 py-1 px-3 text-[11px] text-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-300">ANNONCE :</span>
            <span className="truncate">{broadcastAlert.message}</span>
          </div>
        </div>
      )}

      {/* Main Facebook Mobile-Style Top Header Bar */}
      <div className="max-w-7xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
        
        {/* LEFT: Menu Hamburger + OMEGIA Logo + L'Œil */}
        <div className="flex items-center space-x-2">
          {/* Hamburger Menu icon opening Menu tab */}
          <button 
            onClick={() => setActiveTab('menu')}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            title="Menu Omegia"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* OMEGIA Logo */}
          <button 
            onClick={() => setActiveTab('feed')}
            className="flex items-center space-x-1.5"
          >
            <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              OMEGIA
            </span>
          </button>

          {/* L'Œil d'Omegia */}
          <OmegiaEye size="small" />
        </div>

        {/* RIGHT: (+) Create Post, (🔍) Search, (💬) Messenger Chat Icon */}
        <div className="flex items-center space-x-2">
          
          {/* (+) Create Post Button */}
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-full border border-slate-800 transition-colors"
            title="Créer une publication"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* (🔍) Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-full border border-slate-800 transition-colors"
            title="Rechercher"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* (💬) Messenger Chat Icon with Badge */}
          <button
            onClick={() => setActiveTab('chat')}
            className="relative p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-full border border-slate-800 transition-colors"
            title="Messagerie WhatsApp"
          >
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-slate-950">
                {unreadMessagesCount}+
              </span>
            )}
          </button>

          {/* User Profile Avatar Dropdown */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-0.5 rounded-full ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all"
          >
            <img src={profile?.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
          </button>

        </div>

      </div>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-800 bg-slate-950 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher sur Omegia, amis, actualités..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* User Profile Quick Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-3 top-16 w-72 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl py-2 z-50 text-slate-200">
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40">
            <div className="flex items-center space-x-3">
              <img src={profile?.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500" />
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1">
                  {profile?.full_name}
                  {profile?.is_admin && <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                </div>
                <div className="text-xs text-purple-400">@{profile?.username}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('profile'); setDropdownOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
          >
            <User className="w-4 h-4 text-purple-400" />
            <span>Voir Mon Profil</span>
          </button>

          <button
            onClick={() => { setIsInstallModalOpen(true); setDropdownOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Installer l'APK Omegia</span>
          </button>

          <button
            onClick={() => { setIsAuthModalOpen(true); setDropdownOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
          >
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Se Connecter / S'inscrire</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={(postData) => { if (onCreatePost) onCreatePost(postData); setIsCreatePostOpen(false); }}
        currentUser={profile}
      />

      <InstallApkModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

    </header>
  );
}
