import React, { useState } from 'react';
import { 
  ArrowLeft, Phone, Video, Send, Mic, Image as ImageIcon, CheckCheck, 
  MoreVertical, Check, Smile, Paperclip, Camera, Search, Crown
} from 'lucide-react';
import CallModal from './CallModal';

export const WHATSAPP_SAMPLE_MESSAGES = [
  { id: 1, sender: 'me', text: 'Oui oui', time: '22:37', is_read: true },
  { id: 2, sender: 'me', text: 'Je vais mm loué là bas si possible', time: '22:37', is_read: true },
  { id: 3, sender: 'them', text: 'D\'accord', time: '23:05', is_read: true },
  { id: 4, sender: 'me', text: 'Kabi tu as quelqu\'un là bas qui va me trouver job a faire', time: '23:05', is_read: true },
  { id: 5, type: 'date', text: 'Aujourd\'hui' },
  { id: 6, sender: 'them', text: 'Non non pas sûr', time: '08:20', is_read: true },
  { id: 7, sender: 'me', text: 'D\'accord, je comprends 😌 on va voir comment faire alors, t\'inquiète.', time: '08:37', is_read: true }
];

export const CONVERSATIONS = [
  {
    id: 'conv_1',
    user: {
      id: 'usr_besty',
      name: 'Besty 💕💕💕',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'En ligne',
      is_admin: false
    },
    lastMessage: 'D\'accord, je comprends 😌 on va voir...',
    time: '08:37',
    unread: 0,
    online: true,
    messages: WHATSAPP_SAMPLE_MESSAGES
  },
  {
    id: 'conv_2',
    user: {
      id: 'usr_lokononbeno',
      name: 'Lokonon Beno (Fondateur)',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'En ligne',
      is_admin: true
    },
    lastMessage: 'Bonjour ! Omegia fonctionne parfaitement.',
    time: '14:32',
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Bienvenue sur la messagerie WhatsApp d\'Omegia !', time: '14:30', is_read: true },
      { id: 2, sender: 'them', text: 'Bonjour ! L\'œil d\'Omegia fonctionne parfaitement. Tout est sécurisé.', time: '14:32', is_read: false }
    ]
  },
  {
    id: 'conv_3',
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
      { id: 1, sender: 'me', text: 'Salut Sarah, tu as vu la nouvelle version ?', time: '12:10', is_read: true },
      { id: 2, sender: 'them', text: 'Oui c\'est exactement comme WhatsApp !', time: '12:14', is_read: true }
    ]
  }
];

export default function ChatApp({ currentUser }) {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(CONVERSATIONS[0].id);
  const [messageText, setMessageText] = useState('');
  const [callState, setCallState] = useState({ isOpen: false, type: 'video' });
  const [showChatListMobile, setShowChatListMobile] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

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
    <div className="max-w-5xl mx-auto h-[82vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex text-slate-100 relative">
      
      {/* Sidebar Chat Conversations List */}
      <div className={`w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-900 ${
        showChatListMobile ? 'flex' : 'hidden md:flex'
      }`}>
        
        {/* Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h2 className="font-bold text-sm text-white flex items-center gap-2">
            Discussions WhatsApp <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">Direct</span>
          </h2>
        </div>

        {/* Search */}
        <div className="p-2.5 border-b border-slate-800 bg-slate-900">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-slate-950 border border-slate-800 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setActiveConvId(conv.id);
                setShowChatListMobile(false);
              }}
              className={`w-full p-3 flex items-center space-x-3 text-left transition-colors ${
                conv.id === activeConvId ? 'bg-slate-800/80 border-l-4 border-emerald-500' : 'hover:bg-slate-800/40'
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

      {/* Main WhatsApp Chat Room (Matching Image 2) */}
      <div className={`flex-1 flex flex-col bg-[#0b141a] relative ${
        showChatListMobile ? 'hidden md:flex' : 'flex'
      }`}>
        
        {/* WhatsApp Top Header (Matching Image 2) */}
        <div className="p-3 bg-[#111b21] border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowChatListMobile(true)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <img src={activeConv.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-emerald-500/40" />
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                {activeConv.user.name}
              </div>
              <div className="text-[10px] text-slate-400">{activeConv.user.status}</div>
            </div>
          </div>

          {/* Action Icons (Video, Phone, 3-dots) */}
          <div className="flex items-center space-x-3 text-slate-300">
            <button 
              onClick={() => setCallState({ isOpen: true, type: 'video' })}
              className="p-1 hover:text-white"
            >
              <Video className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCallState({ isOpen: true, type: 'audio' })}
              className="p-1 hover:text-white"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-1 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Body with Doodle Pattern Background (Matching Image 2) */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 bg-[#0b141a] bg-[radial-gradient(#202c33_1px,transparent_1px)] [background-size:20px_20px]">
          {activeConv.messages.map((m) => {
            if (m.type === 'date') {
              return (
                <div key={m.id} className="flex justify-center my-3">
                  <span className="bg-[#182229] border border-[#202c33] text-[11px] font-semibold text-slate-400 px-3 py-1 rounded-lg shadow-sm">
                    {m.text}
                  </span>
                </div>
              );
            }

            const isMe = m.sender === 'me';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-md p-2.5 rounded-xl text-xs leading-relaxed shadow-sm relative ${
                    isMe
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="pr-12 text-[13px]">{m.text}</p>
                  
                  {/* Timestamp & Double Blue Checkmark */}
                  <div className="absolute bottom-1 right-2 flex items-center space-x-1 text-[10px] text-slate-300/80">
                    <span>{m.time}</span>
                    {isMe && (
                      <CheckCheck className={`w-3.5 h-3.5 ${m.is_read ? 'text-[#53bdeb]' : 'text-slate-400'}`} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Bottom Input Pill + White Circular Mic (Matching Image 2) */}
        <div className="p-2.5 bg-[#111b21] flex items-center space-x-2 z-10">
          
          <form onSubmit={handleSendMessage} className="flex-1 bg-[#202c33] rounded-full px-3 py-1.5 flex items-center space-x-2">
            <button type="button" className="text-slate-400 hover:text-slate-200">
              <Smile className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            />

            <button type="button" className="text-slate-400 hover:text-slate-200">
              <Paperclip className="w-5 h-5" />
            </button>

            <button type="button" className="text-slate-400 hover:text-slate-200">
              <Camera className="w-5 h-5" />
            </button>
          </form>

          {/* Floating White Mic / Send Button (Exact match from Image 2) */}
          <button
            onClick={messageText.trim() ? handleSendMessage : () => {}}
            className="w-10 h-10 bg-white hover:bg-slate-100 text-slate-950 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 flex-shrink-0"
          >
            {messageText.trim() ? (
              <Send className="w-4 h-4 text-slate-950 ml-0.5" />
            ) : (
              <Mic className="w-5 h-5 text-slate-950" />
            )}
          </button>

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
