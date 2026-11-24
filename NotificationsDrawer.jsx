import React from 'react';
import { Bell, Heart, MessageSquare, Crown, Radio, Sparkles, Check } from 'lucide-react';

export default function NotificationsDrawer({ onOpenNotif }) {
  const notifications = [
    {
      id: 1,
      type: 'admin',
      title: '👑 Annonce officielle d\'Omegia',
      message: 'L\'œil d\'omniscience suit les activités en direct. Bienvenue !',
      time: 'Il y a 5 min',
      read: false
    },
    {
      id: 2,
      type: 'like',
      title: '❤️ Sarah Connor a aimé votre publication',
      message: '"Mise à jour majeure du réseau social..."',
      time: 'Il y a 15 min',
      read: false
    },
    {
      id: 3,
      type: 'message',
      title: '💬 Nouveau message WhatsApp de Lokonon Beno',
      message: '"Tout fonctionne à la perfection."',
      time: 'Il y a 1h',
      read: true
    }
  ];

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="font-bold text-base text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" /> Notifications Omegia
        </h2>
        <span className="text-xs text-purple-400 font-semibold">2 non lues</span>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
              !n.read ? 'bg-purple-950/30 border-purple-500/40' : 'bg-slate-950/50 border-slate-800'
            }`}
          >
            <div className="p-2 rounded-xl bg-purple-900/40 text-purple-300">
              {n.type === 'admin' ? <Crown className="w-5 h-5 text-amber-400" /> : <MessageSquare className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs text-white">{n.title}</div>
              <div className="text-xs text-slate-300 mt-0.5">{n.message}</div>
              <div className="text-[10px] text-slate-500 mt-1">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
