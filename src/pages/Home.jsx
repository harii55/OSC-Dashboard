import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import useToast from "../hooks/useToast";
import ToastContainer from "../components/ToastContainer";
import {
  Users,
  GitPullRequest,
  Star,
  Trophy,
  Medal,
  Award,
  Bell,
  BarChart,
  LogOut,
} from "lucide-react";

function Home({ user, signOut }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toasts, removeToast, showSuccess, showWarning, showInfo } =
    useToast();

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("users")
        .select("id, username, full_name, email, is_active, created_at")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  // Sort users by created_at and simulate PR counts for demo
  const sortedUsers = users
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((user, index) => ({
      ...user,
      prCount: Math.max(15 - index, 1), // Simulate PR counts
      contributionScore: Math.max(1250 - index * 150, 100), // Simulate scores
    }));

  // Mock stats based on user data
  const stats = {
    totalMembers: users.length || 25,
    totalPRs: sortedUsers.reduce((acc, user) => acc + user.prCount, 0) || 156,
    activeContributors: users.filter((u) => u.is_active).length || 18,
  };

  const testToasts = () => {
    showSuccess("This is a success message!");
    setTimeout(() => {
      showWarning("This is a warning message!");
    }, 1000);
    setTimeout(() => {
      showInfo("This is an info message!");
    }, 2000);
  };

  const getRankIcon = (rank) => {
    if (rank === 1)
      return <Trophy className="rank-icon" size={20} color="#ffd700" />;
    if (rank === 2)
      return <Medal className="rank-icon" size={20} color="#c0c0c0" />;
    if (rank === 3)
      return <Award className="rank-icon" size={20} color="#cd7f32" />;
    return <span className="rank-number">#{rank}</span>;
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
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart className="logo-icon" size={24} />
            <span>OSC Leaderboard</span>
          </div>
          <div className="user-section">
            <button className="sign-out-btn" onClick={signOut}>
              <LogOut size={16} />
              Sign out
            </button>
            <div className="user-avatar" style={{ marginLeft: 16 }}>
              <img
                src={
                  user?.user_metadata?.avatar_url
                    ? user.user_metadata.avatar_url
                    : `https://ui-avatars.com/api/?name=${
                        user?.user_metadata?.full_name ||
                        user?.user_metadata?.user_name ||
                        "User"
                      }&background=6366f1&color=ffffff&size=40`
                }
                alt="User"
              />
            </div>
            <div className="user-details">
              <div className="user-name">
                {user?.user_metadata?.full_name ||
                  user?.user_metadata?.user_name ||
                  "User"}
              </div>
              <div className="user-email">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">Welcome to OSC Leaderboard!</h1>
          <p className="dashboard-subtitle">
            Here's how our club members are contributing to open source
          </p>

          <button className="toast-test-btn" onClick={testToasts}>
            <Bell size={16} />
            Test Toast Notifications
          </button>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <Users className="stat-icon" size={32} />
            <div className="stat-number">{stats.totalMembers}</div>
            <div className="stat-label">TOTAL MEMBERS</div>
          </div>
          <div className="stat-card">
            <GitPullRequest className="stat-icon" size={32} />
            <div className="stat-number">{stats.totalPRs}</div>
            <div className="stat-label">TOTAL PULL REQUESTS</div>
          </div>
          <div className="stat-card">
            <Star className="stat-icon" size={32} />
            <div className="stat-number">{stats.activeContributors}</div>
            <div className="stat-label">ACTIVE CONTRIBUTORS</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="dashboard-leaderboard">
          <div className="leaderboard-header">
            <h2 className="leaderboard-title">Top Contributors</h2>
            <div className="leaderboard-badge">
              <Trophy size={14} />
              Updated daily
            </div>
          </div>

          {error ? (
            <div className="error-state">
              <p>Error loading users: {error}</p>
            </div>
          ) : (
            <div className="leaderboard-table-container">
              <table className="contributors-table">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>MEMBER</th>
                    <th>PULL REQUESTS</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.slice(0, 10).map((u, index) => (
                    <tr key={u.id} className={index < 3 ? "top-rank" : ""}>
                      <td className="rank-cell">{getRankIcon(index + 1)}</td>
                      <td className="member-cell">
                        <div className="member-info">
                          <div className="member-avatar">
                            <img
                              src={`https://ui-avatars.com/api/?name=${
                                u.full_name || u.username || "User"
                              }&background=6366f1&color=ffffff&size=48`}
                              alt={u.full_name || u.username}
                            />
                          </div>
                          <div className="member-details">
                            <div className="member-name">
                              {u.full_name || u.username || "Anonymous"}
                            </div>
                            <div className="member-handle">
                              @{u.username || "user"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="pr-cell">
                        <span className="pr-count">{u.prCount} PRs</span>
                      </td>
                      <td className="status-cell">
                        <span
                          className={`status-badge ${
                            u.is_active ? "active" : "inactive"
                          }`}
                        >
                          {u.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
