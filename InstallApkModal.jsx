import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle, ShieldCheck, HardDrive, Sparkles, X } from 'lucide-react';

export default function InstallApkModal({ isOpen, onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('Omegia est prêt à être installé ! Sur Android/Chrome, cliquez sur le menu 3 points de votre navigateur puis sélectionnez "Ajouter à l\'écran d\'accueil" ou "Installer l\'application".');
    }
  };

  const handleDownloadWebAPK = () => {
    // Generate a downloadable HTML shortcut / APK package descriptor file
    const content = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${window.location.origin}" /></head><body>Redirection vers Omegia...</body></html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Omegia-Social.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-slate-100">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                Installer Omegia sur Téléphone (APK / PWA) <Sparkles className="w-4 h-4 text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400">Application mobile fluide utilisant la mémoire interne du téléphone</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-4 relative z-10 text-xs">
          
          <div className="p-3.5 bg-slate-950/70 border border-purple-500/30 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 font-bold text-purple-300">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Stockage en Mémoire Interne Intelligente</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Une fois installée, l'application Omegia sauvegarde vos messages, photos, préférences et sessions directement dans la <strong>mémoire interne locale de votre appareil</strong> pour un fonctionnement rapide même hors-ligne.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Avantages de l'Application Omegia :</div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Connexion sécurisée par <strong>E-mail, Numéro de téléphone, ou Compte Google</strong>.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Icône dédiée sur l'écran d'accueil de votre smartphone Android / iPhone.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>L'œil d'Omegia toujours fonctionnel et réactif au toucher.</span>
              </li>
            </ul>
          </div>

          {/* Action Install Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={handleInstallPWA}
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:brightness-125 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center space-x-2 text-xs transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isInstalled ? '✅ Application Installée !' : '📱 Installer directement sur mon téléphone (Android/iOS)'}</span>
            </button>

            <button
              onClick={handleDownloadWebAPK}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 flex items-center justify-center space-x-2 text-xs"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Télécharger le Fichier Raccourci Omegia-App</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
