import React, { useState } from 'react';
import { Mail, Phone, Lock, Sparkles, X, Check, Globe } from 'lucide-react';
import { signInWithGoogle } from './googleAuth.js';
import supabase from './supabase';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsSent, setSmsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
      }
      if (onLoginSuccess) onLoginSuccess({ email });
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = (e) => {
    e.preventDefault();
    if (!smsSent) {
      if (!phone.trim()) return;
      setSmsCodeSent(true);
      setErrorMsg('');
    } else {
      if (smsCode === '123456' || smsCode.length >= 4) {
        if (onLoginSuccess) onLoginSuccess({ phone });
        onClose();
      } else {
        setErrorMsg('Code SMS invalide (Utilisez 123456 pour le test).');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-slate-100">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              Se Connecter à Omegia <Sparkles className="w-4 h-4 text-purple-400" />
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 ${
              authMethod === 'email' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'
            }`}
          >
            ✉️ Par E-mail
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 ${
              authMethod === 'phone' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'
            }`}
          >
            📱 Par Numéro de Téléphone
          </button>
        </div>

        {errorMsg && (
          <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 mb-3">
            {errorMsg}
          </div>
        )}

        {authMethod === 'email' ? (
          <form onSubmit={handleEmailAuth} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Adresse E-mail :</label>
              <input
                type="email"
                required
                placeholder="votre.nom@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Mot de passe :</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-125 text-white font-bold rounded-xl shadow-lg"
            >
              {loading ? 'Connexion...' : 'Se Connecter / S\'inscrire'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePhoneAuth} className="space-y-3 text-xs">
            {!smsSent ? (
              <div>
                <label className="block text-slate-400 mb-1">Numéro de téléphone :</label>
                <input
                  type="tel"
                  required
                  placeholder="+229 90 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-slate-400 mb-1">Code de vérification SMS (Code démo: 123456) :</label>
                <input
                  type="text"
                  required
                  placeholder="123456"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-center text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-125 text-white font-bold rounded-xl shadow-lg"
            >
              {!smsSent ? 'Recevoir le Code SMS' : 'Valider le Code SMS'}
            </button>
          </form>
        )}

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative bg-slate-900 px-3 text-[11px] text-slate-500">ou avec un compte tiers</span>
        </div>

        {/* Google Sign-in button */}
        <button
          onClick={() => signInWithGoogle('Omegia Social')}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-colors"
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Continuer avec Google</span>
        </button>

      </div>
    </div>
  );
}
