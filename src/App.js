import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Trophy, 
  Users, 
  GitPullRequest, 
  TrendingUp, 
  LogIn, 
  LogOut, 
  User,
  Star,
  Award,
  Bell
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange,
  saveGitHubUsername,
  getUserProfile
} from './firebase';
import ToastContainer from './Toast';
import useToast from './useToast';
import GitHubModal from './GitHubModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [githubModalLoading, setGithubModalLoading] = useState(false);
  const { toasts, removeToast, showError, showSuccess, showWarning, showInfo } = useToast();

  // Mock data for demonstration - replace with real data from your backend
  const [leaderboardData] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      prCount: 15,
      contributionScore: 1250,
      rank: 1
    },
    {
      id: 2,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      prCount: 12,
      contributionScore: 1100,
      rank: 2
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      username: "miker",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      prCount: 10,
      contributionScore: 950,
      rank: 3
    },
    {
      id: 4,
      name: "Emily Davis",
      username: "emilyd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      prCount: 8,
      contributionScore: 800,
      rank: 4
    },
    {
      id: 5,
      name: "David Kim",
      username: "davidk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      prCount: 7,
      contributionScore: 750,
      rank: 5
    }
  ]);

  const stats = {
    totalMembers: 25,
    totalPRs: 156,
    averageScore: 680,
    activeContributors: 18
  };

  // Load user profile when user changes
  useEffect(() => {
    const loadUserProfile = async (user) => {
      if (user) {
        setProfileLoading(true);
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Show GitHub modal if user doesn't have a GitHub username
          if (!profile || !profile.githubUsername) {
            setShowGitHubModal(true);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          showError('Failed to load user profile', 'Profile Error');
        } finally {
          setProfileLoading(false);
        }
      } else {
        setUserProfile(null);
        setShowGitHubModal(false);
      }
    };

    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        showSuccess(
          `Welcome back, ${user.displayName}!`,
          'Authentication Successful'
        );
        await loadUserProfile(user);
      }
    });

    return () => unsubscribe();
  }, [showSuccess, showError]);

  const handleSignIn = async () => {
    try {
      showInfo('Signing in with Google...', 'Authentication');
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'An unexpected error occurred during sign in.';
      let errorTitle = 'Sign In Failed';
      
      if (error.message.includes('sst.scaler.com')) {
        errorMessage = 'Access is restricted to @sst.scaler.com email addresses only.';
        errorTitle = 'Domain Restriction';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled. Please try again.';
        errorTitle = 'Sign In Cancelled';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
        errorTitle = 'Network Error';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
        errorTitle = 'Too Many Attempts';
      }
      
      showError(errorMessage, errorTitle);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      showSuccess('You have been signed out successfully.', 'Sign Out');
    } catch (error) {
      console.error('Sign out error:', error);
      showError('Failed to sign out. Please try again.', 'Sign Out Error');
    }
  };

  const handleGitHubUsernameSubmit = async (githubUsername) => {
    if (!user) return;
    
    setGithubModalLoading(true);
    try {
      await saveGitHubUsername(user.uid, githubUsername);
      
      // Update local state
      setUserProfile(prev => ({
        ...prev,
        githubUsername,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
      
      setShowGitHubModal(false);
      showSuccess(
        `GitHub username "${githubUsername}" connected successfully!`,
        'GitHub Connected'
      );
    } catch (error) {
      console.error('Error saving GitHub username:', error);
      showError(
        'Failed to save GitHub username. Please try again.',
        'Save Error'
      );
    } finally {
      setGithubModalLoading(false);
    }
  };

  const handleCloseGitHubModal = () => {
    if (!githubModalLoading) {
      setShowGitHubModal(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="rank-icon" style={{ color: '#FFD700' }} />;
      case 2:
        return <Award className="rank-icon" style={{ color: '#C0C0C0' }} />;
      case 3:
        return <Award className="rank-icon" style={{ color: '#CD7F32' }} />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  const testToasts = () => {
    showSuccess('This is a success message!', 'Success');
    setTimeout(() => showWarning('This is a warning message!', 'Warning'), 1000);
    setTimeout(() => showInfo('This is an info message!', 'Info'), 2000);
    setTimeout(() => showError('This is an error message!', 'Error'), 3000);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      {/* GitHub Username Modal */}
      <GitHubModal
        isOpen={showGitHubModal}
        onClose={handleCloseGitHubModal}
        onSubmit={handleGitHubUsernameSubmit}
        loading={githubModalLoading}
      />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Github size={20} />
            </div>
            <span>OSC Leaderboard</span>
          </div>
          
          {user && (
            <div className="auth-section">
              <div className="user-info">
                <img 
                  src={user.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} 
                  alt={user.displayName} 
                  className="user-avatar"
                />
                <div className="user-details">
                  <div className="user-name">{user.displayName}</div>
                  <div className="user-email">{user.email}</div>
                  {userProfile?.githubUsername && (
                    <div className="user-github">
                      <Github size={12} />
                      @{userProfile.githubUsername}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleSignOut} className="logout-btn">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {!user ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-container"
          >
            <div className="auth-welcome">
              <h1 className="welcome-title">Welcome to OSC Leaderboard</h1>
              <p className="welcome-subtitle">
                Track and celebrate the contributions of Open Source Club members
              </p>
              <p className="auth-description">
                Please sign in with your @sst.scaler.com email to access the leaderboard
              </p>
            </div>
            
            <motion.button 
              onClick={handleSignIn} 
              className="login-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn size={20} />
              Sign in with Google
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Welcome Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="welcome-section"
            >
              <h1 className="welcome-title">Welcome back, {user.displayName}!</h1>
              <p className="welcome-subtitle">
                Here's how our club members are contributing to open source
              </p>
              
              {userProfile?.githubUsername && (
                <div className="github-status">
                  <Github size={16} />
                  Connected to GitHub: @{userProfile.githubUsername}
                </div>
              )}
              
              {/* Demo Toast Button */}
              <motion.button
                onClick={testToasts}
                className="demo-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={16} />
                Test Toast Notifications
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="stats-grid"
            >
              <div className="stat-card">
                <div className="stat-value">{stats.totalMembers}</div>
                <div className="stat-label">Total Members</div>
                <Users size={24} className="stat-icon" />
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{stats.totalPRs}</div>
                <div className="stat-label">Total Pull Requests</div>
                <GitPullRequest size={24} className="stat-icon" />
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{stats.averageScore}</div>
                <div className="stat-label">Average Score</div>
                <TrendingUp size={24} className="stat-icon" />
              </div>
              
              <div className="stat-card">
                <div className="stat-value">{stats.activeContributors}</div>
                <div className="stat-label">Active Contributors</div>
                <Star size={24} className="stat-icon" />
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="leaderboard-section"
            >
              <div className="section-header">
                <h2 className="section-title">Top Contributors</h2>
                <div className="section-subtitle">
                  <Trophy size={20} />
                  <span>Updated daily</span>
                </div>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Member</th>
                      <th>Pull Requests</th>
                      <th>Contribution Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((member, index) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="fade-in-up"
                      >
                        <td className="rank">
                          {getRankIcon(member.rank)}
                        </td>
                        <td>
                          <div className="member-info">
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              className="member-avatar"
                            />
                            <div className="member-details">
                              <div className="member-name">{member.name}</div>
                              <div className="member-username">@{member.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="pr-count">{member.prCount} PRs</td>
                        <td className="contribution-score">{member.contributionScore} pts</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
