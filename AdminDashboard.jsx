import React, { useState } from 'react';
import { 
  Crown, ShieldCheck, Activity, Users, Radio, MessageSquare, 
  Send, Eye, Lock, CheckCircle2, AlertTriangle, Pin, Sparkles, Sliders 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { profile, allProfiles, setBroadcastAlert, broadcastAlert, eyeStats } = useAuth();
  const [broadcastInput, setBroadcastInput] = useState('');
  const [usersList, setUsersList] = useState(allProfiles);

  const toggleVerify = (userId) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, is_verified: !u.is_verified } : u));
  };

  const toggleAdmin = (userId) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, is_admin: !u.is_admin } : u));
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastInput.trim()) return;
    setBroadcastAlert({
      id: Date.now(),
      message: broadcastInput,
      active: true
    });
    setBroadcastInput('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 text-slate-100">
      
      {/* Admin Creator Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profile?.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'}
                alt=""
                className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-slate-950">
                <Crown className="w-4 h-4 fill-slate-950" />
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black text-white">Panneau du Fondateur - Lokonon Beno</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                  Master Admin
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-1">
                Contrôle d'Omniscience d'Omegia • Surveillance des activités & gestion réseau social.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/60 p-3 rounded-2xl border border-amber-500/30">
            <Eye className="w-5 h-5 text-amber-400 animate-pulse" />
            <div className="text-xs">
              <div className="font-bold text-white">Œil d'Omegia : 100% Actif</div>
              <div className="text-slate-400">Suivi télémétrique des mouvements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Utilisateurs Totaux</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">1,482</div>
          <div className="text-[10px] text-emerald-400 mt-1">↑ +24 inscris aujourd'hui</div>
        </div>

        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Publications Actives</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">8,940</div>
          <div className="text-[10px] text-cyan-400 mt-1">❤️ 34.2k Réactions</div>
        </div>

        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Messagerie WhatsApp</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">42.1k</div>
          <div className="text-[10px] text-emerald-400 mt-1">Messages instantanés transmis</div>
        </div>

        <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Impressions Œil</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{eyeStats.totalViews}</div>
          <div className="text-[10px] text-amber-400 mt-1">99.9% précision de suivi</div>
        </div>

      </div>

      {/* Broadcast Announcement Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Diffuser une Annonce Officielle à Tous les Membres
        </h3>
        
        <form onSubmit={handleSendBroadcast} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Tapez votre message d'annonce générale en tant que Créateur..."
            value={broadcastInput}
            onChange={(e) => setBroadcastInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5"
          >
            <span>Publier l'Alerte</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* User Management & Badges */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Gestion des Rôles & Badges d'Authenticité
          </h3>
          <span className="text-xs text-slate-400">{usersList.length} comptes de démonstration</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Utilisateur</th>
                <th className="p-3">Statut & Rôle</th>
                <th className="p-3">Badge Certifié</th>
                <th className="p-3">Statut Admin</th>
                <th className="p-3 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-950/40">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-white flex items-center gap-1">
                        {u.full_name}
                        {u.is_admin && <Crown className="w-3 h-3 text-amber-400" />}
                      </div>
                      <div className="text-[10px] text-slate-500">@{u.username}</div>
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 font-medium">
                      {u.title || 'Membre Omegia'}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleVerify(u.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        u.is_verified
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {u.is_verified ? '✔️ Certifié' : '+ Accorder Badge'}
                    </button>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleAdmin(u.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        u.is_admin
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {u.is_admin ? '👑 Administrateur' : 'Rendre Admin'}
                    </button>
                  </td>

                  <td className="p-3">
                    <span className="text-emerald-400 text-[10px] font-semibold">● Actif</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
