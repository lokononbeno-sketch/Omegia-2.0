import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabase';

const AuthContext = createContext({
  user: null,
  profile: null,
  allProfiles: [],
  loading: true,
  currentAccount: null,
  switchAccount: () => {},
  refreshProfiles: () => {},
  broadcastAlert: null,
  setBroadcastAlert: () => {},
  eyeStats: { totalViews: 14280, activeWatchers: 342, trackingSpeed: '99.8%' }
});

export const DEMO_ACCOUNTS = [
  {
    id: 'usr_lokononbeno',
    username: 'lokononbeno',
    full_name: 'Lokonon Beno',
    title: 'Fondateur & Créateur d\'Omegia',
    avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    banner_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: '⚡ Créateur Officiel d\'Omegia. L\'œil omniscient veille sur la communauté.',
    is_admin: true,
    is_verified: true,
    status: 'Online',
    followers_count: 14200
  },
  {
    id: 'usr_sarah',
    username: 'sarah_design',
    full_name: 'Sarah Connor',
    title: 'Lead Product Designer',
    avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    banner_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: '🎨 Visualizing the future of social interaction on Omegia.',
    is_admin: false,
    is_verified: true,
    status: 'En train d\'écrire...',
    followers_count: 3890
  },
  {
    id: 'usr_alex',
    username: 'alex_vance',
    full_name: 'Alex Vance',
    title: 'Tech Lead & AI Dev',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    banner_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: '💻 Code, AI & real-time messaging architecture. Passionate about privacy & tech.',
    is_admin: false,
    is_verified: true,
    status: 'Online',
    followers_count: 2450
  },
  {
    id: 'usr_elena',
    username: 'elena_rostova',
    full_name: 'Elena Rostova',
    title: 'Content Creator & Photographer',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    banner_url: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: '📸 Traveling the world & sharing stories live on Omegia. Tap for daily status updates!',
    is_admin: false,
    is_verified: false,
    status: 'Occupé',
    followers_count: 8900
  },
  {
    id: 'usr_marcus',
    username: 'marcus_brody',
    full_name: 'Marcus Brody',
    title: 'Journaliste & Podcaster',
    avatar_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    banner_url: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bio: '🎙️ Actualités en temps réel et notes vocales exclusives sur Omegia.',
    is_admin: false,
    is_verified: true,
    status: 'Online',
    followers_count: 5120
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(DEMO_ACCOUNTS[0]);
  const [allProfiles, setAllProfiles] = useState(DEMO_ACCOUNTS);
  const [loading, setLoading] = useState(true);
  const [broadcastAlert, setBroadcastAlert] = useState({
    id: 'b1',
    message: '🎉 Bienvenue sur le nouveau réseau social Omegia ! L\'œil observe et protège la communauté.',
    type: 'announcement',
    active: true
  });
  const [eyeStats, setEyeStats] = useState({
    totalViews: 18450,
    activeWatchers: 429,
    trackingAccuracy: '99.9%'
  });

  const fetchProfiles = async () => {
    try {
      const res = await fetch('/api/profiles');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAllProfiles(data);
          const found = data.find(p => p.username === currentAccount.username || p.id === currentAccount.id);
          if (found) setCurrentAccount(found);
        }
      }
    } catch (err) {
      console.warn('Using default fallback profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();

    // Supabase auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const switchAccount = (accountOrId) => {
    let target = accountOrId;
    if (typeof accountOrId === 'string') {
      target = allProfiles.find(p => p.id === accountOrId || p.username === accountOrId) || DEMO_ACCOUNTS[0];
    }
    setCurrentAccount(target);
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile: currentAccount,
      currentAccount,
      allProfiles,
      loading,
      switchAccount,
      refreshProfiles: fetchProfiles,
      broadcastAlert,
      setBroadcastAlert,
      eyeStats,
      setEyeStats
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
