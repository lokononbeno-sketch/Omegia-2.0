import React from 'react';
import { 
  User, Rss, Radio, MessageSquare, Crown, Smartphone, 
  Settings, Shield, Bell, HelpCircle, LogOut, Sparkles, Check, Key
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MenuDrawer({ setActiveTab, onOpenInstallModal, onOpenAuthModal }) {
  const { profile, allProfiles, switchAccount } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20 text-slate-100 animate-fade-in">
      
      {/* User Profile Card */}
      <div 
        onClick={() => setActiveTab('profile')}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition-all"
      >
        <div className="flex items-center space-x-3">
          <img src={profile?.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500" />
          <div>
            <h2 className="font-bold text-base text-white flex items-center gap-1.5">
              {profile?.full_name}
              {profile?.is_admin && <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />}
            </h2>
            <p className="text-xs text-purple-400">Voir votre profil personnel</p>
          </div>
        </div>
        <User className="w-5 h-5 text-slate-400" />
      </div>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-2 gap-3">
        
        <button
          onClick={() => setActiveTab('feed')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-purple-500/40 rounded-2xl flex flex-col items-start space-y-2 text-left shadow-lg transition-all"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Rss className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Fil d'Actualités</div>
            <div className="text-[10px] text-slate-400">Publications & Réactions</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl flex flex-col items-start space-y-2 text-left shadow-lg transition-all"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Discussions WhatsApp</div>
            <div className="text-[10px] text-slate-400">Messagerie & Appels HD</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('stories')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl flex flex-col items-start space-y-2 text-left shadow-lg transition-all"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Statuts & Stories</div>
            <div className="text-[10px] text-slate-400">Mises à jour 24h</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl flex flex-col items-start space-y-2 text-left shadow-lg transition-all"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Panneau Créateur</div>
            <div className="text-[10px] text-slate-400">Lokonon Beno (Admin)</div>
          </div>
        </button>

      </div>

      {/* APK & App Features */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
        <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">Application Mobile & Authentification</div>
        
        <button
          onClick={onOpenInstallModal}
          className="w-full p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl text-xs flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Installer l'APK Omegia sur Téléphone</span>
          </div>
          <Sparkles className="w-4 h-4 text-cyan-300" />
        </button>

        <button
          onClick={onOpenAuthModal}
          className="w-full p-3 bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-slate-200 rounded-2xl text-xs font-semibold flex items-center space-x-2"
        >
          <Key className="w-4 h-4 text-purple-400" />
          <span>Connexion (E-mail, Numéro SMS, Compte Google)</span>
        </button>
      </div>

      {/* Account Switcher Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 shadow-xl">
        <div className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Changer de Compte (Test Démo)</div>
        
        {allProfiles.map((acc) => (
          <button
            key={acc.id}
            onClick={() => switchAccount(acc)}
            className={`w-full p-2.5 rounded-2xl text-xs flex items-center justify-between transition-colors ${
              acc.id === profile?.id ? 'bg-purple-950 border border-purple-500/40 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img src={acc.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div className="text-left">
                <div className="font-semibold text-white flex items-center gap-1">
                  {acc.full_name}
                  {acc.is_admin && <Crown className="w-3 h-3 text-amber-400" />}
                </div>
                <div className="text-[10px] text-slate-400">@{acc.username}</div>
              </div>
            </div>
            {acc.id === profile?.id && <Check className="w-4 h-4 text-purple-400" />}
          </button>
        ))}
      </div>

    </div>
  );
}
