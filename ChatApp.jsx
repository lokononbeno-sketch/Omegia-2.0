import React, { useState } from 'react';
import { 
  Search, Phone, Video, Send, Mic, Image, CheckCheck, 
  MoreVertical, Check, Crown, ShieldCheck, Smile, Paperclip 
} from 'lucide-react';
import CallModal from './CallModal';

export const CONVERSATIONS = [
  {
    id: 'conv_1',
    user: {
      id: 'usr_lokononbeno',
      name: 'Lokonon Beno (Fondateur)',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'En ligne',
      is_admin: true
    },
    lastMessage: 'Bonjour ! L\'œil d\'Omegia fonctionne parfaitement. Tout est sécurisé.',
    time: '14:32',
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Bienvenue sur la messagerie directe d\'Omegia !', time: '14:30', is_read: true },
      { id: 2, sender: 'them', text: 'J\'ai intégré la messagerie style WhatsApp avec appel vocal/vidéo et double coche bleue.', time: '14:31', is_read: true },
      { id: 3, sender: 'them', text: 'Bonjour ! L\'œil d\'Omegia fonctionne parfaitement. Tout est sécurisé.', time: '14:32', is_read: false }
    ]
  },
  {
    id: 'conv_2',
    user: {
      id: 'usr_sarah',
      name: 'Sarah Connor',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'En train d\'écrire...',
      is_admin: false
    },
    lastMessage: '🎙️ Note vocale (0:24)',
    time: '12:15',
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: 'me', text: 'Salut Sarah, tu as vu la nouvelle version du fil d\'actualité ?', time: '12:10', is_read: true },
      { id: 2, sender: 'them', text: 'Oui c\'est incroyable ! J\'ai écouté ta note vocale aussi.', time: '12:14', is_read: true },
      { id: 3, sender: 'them', type: 'voice', audio_url: 'demo.mp3', duration: '0:24', time: '12:15', is_read: true }
    ]
  },
  {
    id: 'conv_3',
    user: {
      id: 'usr_alex',
      name: 'Alex Vance',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Hors ligne',
      is_admin: false
    },
    lastMessage: 'La base de données Supabase répond en 20ms.',
    time: 'Hier',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'La base de données Supabase répond en 20ms.', time: 'Hier', is_read: true }
    ]
  }
];

export default function ChatApp({ currentUser }) {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(CONVERSATIONS[0].id);
  const [messageText, setMessageText] = useState('');
  const [callState, setCallState] = useState({ isOpen: false, type: 'video' });
  const [isRecording, setIsRecording] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() && !isRecording) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      is_read: true
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: messageText,
              time: 'À l\'instant',
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setMessageText('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[78vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex text-slate-100">
      
      {/* Left Sidebar Conversation List */}
      <div className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-950/60">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-sm text-white flex items-center gap-2">
            Discussions WhatsApp <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Direct</span>
          </h2>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher une discussion..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full p-3 flex items-center space-x-3 text-left transition-colors ${
                conv.id === activeConvId ? 'bg-purple-950/40 border-l-4 border-purple-500' : 'hover:bg-slate-900'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={conv.user.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                {conv.user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white truncate flex items-center gap-1">
                    {conv.user.name}
                    {conv.user.is_admin && <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />}
                  </span>
                  <span className="text-[10px] text-slate-500">{conv.time}</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Right Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-950/90 relative">
        
        {/* Chat Active User Header */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={activeConv.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/50" />
            <div>
              <div className="font-bold text-xs text-white flex items-center gap-1.5">
                {activeConv.user.name}
                {activeConv.user.is_admin && <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
              </div>
              <div className="text-[10px] text-emerald-400">{activeConv.user.status}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCallState({ isOpen: true, type: 'audio' })}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Appel Vocal WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCallState({ isOpen: true, type: 'video' })}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Appel Vidéo WhatsApp"
            >
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px]">
          {activeConv.messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs leading-relaxed shadow-md ${
                  m.sender === 'me'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                }`}
              >
                {m.type === 'voice' ? (
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-cyan-300" />
                    <span>Note Vocale ({m.duration})</span>
                  </div>
                ) : (
                  <p>{m.text}</p>
                )}
                
                <div className={`flex items-center justify-end space-x-1 mt-1 text-[9px] ${
                  m.sender === 'me' ? 'text-purple-200' : 'text-slate-400'
                }`}>
                  <span>{m.time}</span>
                  {m.sender === 'me' && (
                    <CheckCheck className={`w-3.5 h-3.5 ${m.is_read ? 'text-cyan-300' : 'text-slate-400'}`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Controls */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <button type="button" className="p-2 text-slate-400 hover:text-white">
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Tapez un message WhatsApp..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-full py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />

            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-full ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'text-slate-400 hover:text-white'}`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:brightness-125 transition-all shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Audio/Video Call Simulation Modal */}
      <CallModal
        isOpen={callState.isOpen}
        onClose={() => setCallState({ ...callState, isOpen: false })}
        callType={callState.type}
        targetUser={activeConv.user}
      />

    </div>
  );
}
