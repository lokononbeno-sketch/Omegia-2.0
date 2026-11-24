import React, { useState } from 'react';
import { 
  Rss, MessageSquare, Radio, Bell, Crown, Search, 
  ChevronDown, Check, LogOut, User, Smartphone, Key, Sparkles
} from 'lucide-react';
import OmegiaEye from './OmegiaEye';
import InstallApkModal from './InstallApkModal';
import AuthModal from './AuthModal';
import { useAuth } from './AuthContext.jsx';

export default function Navbar({ activeTab, setActiveTab, unreadMessagesCount = 2, unreadNotifsCount = 3 }) {
  const { profile, allProfiles, switchAccount, broadcastAlert } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-purple-900/40 text-slate-100 shadow-xl">
      {/* Broadcast Banner */}
      {broadcastAlert && broadcastAlert.active && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 border-b border-purple-500/30 py-1 px-4 text-xs font-medium text-purple-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-300">ANNONCE :</span>
            <span>{broadcastAlert.message}</span>
          </div>
          <span className="text-[10px] text-purple-300/70 hidden sm:inline">Par Lokonon Beno (Fondateur)</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between gap-2">
        
        {/* LEFT: Omegia Logo + L'Œil + Facebook-style Search */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* L'Œil d'Omegia */}
          <OmegiaEye size="medium" />

          <button 
            onClick={() => setActiveTab('feed')}
            className="text-left group flex items-center space-x-1.5"
          >
            <span className="font-extrabold text-xl sm:text-2xl tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              OMEGIA
            </span>
          </button>

          {/* Facebook-style Search Input */}
          <div className="hidden md:flex items-center relative w-48 lg:w-60 ml-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher sur Omegia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* CENTER: Facebook-Style Big Icon Navigation Tabs */}
        <nav className="flex items-center justify-center flex-1 max-w-md mx-2 space-x-1 sm:space-x-2">
          
          {/* Actualités / Feed (Facebook style) */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`relative flex-1 py-2.5 flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'feed'
                ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Fil d'Actualités (Facebook)"
          >
            <Rss className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] font-bold mt-0.5 hidden md:inline">Actualités</span>
          </button>

          {/* Statuts & Stories (WhatsApp & FB hybrid) */}
          <button
            onClick={() => setActiveTab('stories')}
            className={`relative flex-1 py-2.5 flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'stories'
                ? 'text-emerald-400 border-b-2 border-emerald-500 bg-emerald-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Statuts & Stories (WhatsApp)"
          >
            <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            <span className="text-[10px] font-bold mt-0.5 hidden md:inline">Statuts</span>
          </button>

          {/* Messagerie Directe (WhatsApp style) */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`relative flex-1 py-2.5 flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'chat'
                ? 'text-cyan-400 border-b-2 border-cyan-500 bg-cyan-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Messagerie (WhatsApp)"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1.5 right-3 bg-emerald-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
            <span className="text-[10px] font-bold mt-0.5 hidden md:inline">Discussions</span>
          </button>

          {/* Admin Portal (Creator Lokonon Beno) */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`relative flex-1 py-2.5 flex flex-col items-center justify-center rounded-xl transition-all ${
              activeTab === 'admin'
                ? 'text-amber-400 border-b-2 border-amber-500 bg-amber-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Panneau Administrateur"
          >
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            <span className="text-[10px] font-bold mt-0.5 hidden md:inline">Admin</span>
          </button>

        </nav>

        {/* RIGHT: Notifications, APK Install & Profile Menu */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          
          {/* Notifications Button */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative p-2 rounded-full transition-colors ${
              activeTab === 'notifications' ? 'bg-purple-900/50 text-purple-300' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-purple-500 rounded-full ring-2 ring-slate-950" />
            )}
          </button>

          {/* Installer APK Button */}
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-125 text-white rounded-full text-xs font-bold shadow-lg flex items-center space-x-1"
            title="Installer l'application Omegia (APK / PWA)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden xl:inline">Installer APK</span>
          </button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 p-1 rounded-full hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <img
                src={profile?.avatar_url}
                alt={profile?.full_name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/50"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl py-2 z-50 text-slate-200">
                <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40">
                  <div className="flex items-center space-x-3">
                    <img src={profile?.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500" />
                    <div className="overflow-hidden">
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
                  onClick={() => { setIsAuthModalOpen(true); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Key className="w-4 h-4 text-cyan-400" />
                  <span>Changer de Connexion (E-mail / Tél / Google)</span>
                </button>

                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-800 mt-1">
                  Changer de compte (Test Démo)
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1 px-2">
                  {allProfiles.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => { switchAccount(acc); setDropdownOpen(false); }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        acc.id === profile?.id ? 'bg-purple-900/40 text-purple-200 font-semibold' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <img src={acc.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="truncate">{acc.full_name}</span>
                      </div>
                      {acc.id === profile?.id && <Check className="w-4 h-4 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modals */}
      <InstallApkModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
