import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed/Feed';
import ChatApp from './components/Messaging/ChatApp';
import StoryViewerModal from './components/Stories/StoryViewerModal';
import CreateStoryModal from './components/Stories/CreateStoryModal';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProfilePage from './components/Profile/ProfilePage';
import NotificationsDrawer from './components/Notifications/NotificationsDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import MenuDrawer from './components/MenuDrawer';
import InstallApkModal from './components/InstallApkModal';
import AuthModal from './components/AuthModal';
import { handleGoogleRedirect } from './lib/googleAuth';

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
  }
];

function MainApp() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('feed'); // feed, chat, stories, admin, profile, notifications, menu
  const [posts, setPosts] = useState<any[]>(INITIAL_POSTS);
  const [activeStory, setActiveStory] = useState<any>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

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
    <div className="min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreatePost={handleCreatePost}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-20 max-w-full overflow-x-hidden">
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

        {activeTab === 'menu' && (
          <MenuDrawer
            setActiveTab={setActiveTab}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Facebook App style) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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

      <InstallApkModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {}}
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
