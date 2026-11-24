import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx';
import ChatApp from './ChatApp.jsx';
import StoryViewerModal from './StoryViewerModal.jsx';
import CreateStoryModal from './CreateStoryModal.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import ProfilePage from './ProfilePage.jsx';
import NotificationsDrawer from './NotificationsDrawer.jsx';
import { handleGoogleRedirect } from './googleAuth.js';

// Initialize google redirect synchronously
handleGoogleRedirect();

const INITIAL_POSTS: any[] = [
  {
    id: 'p_1',
    author: {
      id: 'usr_lokononbeno',
      full_name: 'Lokonon Beno',
      username: 'lokononbeno',
      avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_admin: true,
      is_verified: true
    },
    content: '🚀 Bienvenue sur la toute nouvelle version d\'Omegia !\n\nOmegia fusionne le meilleur de Facebook (fil d\'actualités interactif, sondages, réactions) et de WhatsApp (messagerie en direct, notes vocales, double coche bleue, appels vidéo).\n\nL\'œil situé sur l\'en-tête observe et protège nos échanges en temps réel !👁️✨',
    image_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    media_type: 'image',
    likes_count: 84,
    comments_count: 12,
    shares_count: 24,
    pinned: true,
    created_at: 'Il y a 15 minutes'
  },
  {
    id: 'p_2',
    author: {
      id: 'usr_sarah',
      full_name: 'Sarah Connor',
      username: 'sarah_design',
      avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_admin: false,
      is_verified: true
    },
    content: '🎨 Quel design préférez-vous pour le thème sombre d\'Omegia v2.5 ? Exprimez votre choix dans ce sondage !',
    media_type: 'poll',
    poll_options: [
      { id: 1, text: '💜 Violet Omegia Cosmique (Actuel)', votes: 42 },
      { id: 2, text: '💙 Cyan Électrique WhatsApp', votes: 18 },
      { id: 3, text: '🖤 Noir Profond OLED', votes: 29 }
    ],
    likes_count: 45,
    comments_count: 8,
    shares_count: 6,
    created_at: 'Il y a 45 minutes'
  },
  {
    id: 'p_3',
    author: {
      id: 'usr_marcus',
      full_name: 'Marcus Brody',
      username: 'marcus_brody',
      avatar_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
      is_admin: false,
      is_verified: true
    },
    content: '🎙️ Flash Info Omegia : Écoutez ma nouvelle note vocale sur les fonctionnalités de confidentialité de l\'application !',
    media_type: 'voice',
    likes_count: 29,
    comments_count: 5,
    shares_count: 11,
    created_at: 'Il y a 2 heures'
  }
];

function MainApp() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('feed'); // feed, chat, stories, admin, profile, notifications
  const [posts, setPosts] = useState<any[]>(INITIAL_POSTS);
  const [activeStory, setActiveStory] = useState<any>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);

  // Fetch posts from API if available
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      }
    } catch (err) {
      console.warn('API fetch fallback to sample posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (newPostData: any) => {
    const postObj = {
      id: `p_${Date.now()}`,
      author: profile || INITIAL_POSTS[0].author,
      content: newPostData.content,
      image_url: newPostData.image_url,
      media_type: newPostData.media_type,
      poll_options: newPostData.poll_options,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: 'À l\'instant'
    };

    setPosts(prev => [postObj, ...prev]);

    // Send to serverless API
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postObj)
      });
    } catch (err) {
      console.error('API save error:', err);
    }
  };

  const handleCreateStory = (storyData: any) => {
    setActiveStory({
      id: `st_${Date.now()}`,
      ...storyData
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {activeTab === 'feed' && (
          <Feed
            currentUser={profile}
            posts={posts}
            onCreatePost={handleCreatePost}
            onSelectStory={(s: any) => setActiveStory(s)}
            onCreateStory={() => setIsStoryModalOpen(true)}
            onOpenStoryViewer={(story: any) => setActiveStory(story)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatApp currentUser={profile} />
        )}

        {activeTab === 'stories' && (
          <Feed
            currentUser={profile}
            posts={posts}
            onCreatePost={handleCreatePost}
            onSelectStory={(s: any) => setActiveStory(s)}
            onCreateStory={() => setIsStoryModalOpen(true)}
            onOpenStoryViewer={(story: any) => setActiveStory(story)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            profile={profile}
            posts={posts.filter((p: any) => p.author?.username === (profile as any)?.username || p.author?.id === (profile as any)?.id)}
            currentUser={profile}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsDrawer onOpenNotif={() => {}} />
        )}
      </main>

      {/* Story Modals */}
      {activeStory && (
        <StoryViewerModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
          onReply={() => {}}
        />
      )}

      <CreateStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onSubmit={handleCreateStory}
        currentUser={profile}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
