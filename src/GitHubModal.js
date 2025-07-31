import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, User, CheckCircle, Info } from 'lucide-react';

const GitHubModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [githubUsername, setGithubUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!githubUsername.trim()) {
      setError('GitHub username is required');
      return;
    }

    // Basic validation for GitHub username format
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(githubUsername.trim())) {
      setError('Please enter a valid GitHub username');
      return;
    }

    onSubmit(githubUsername.trim());
  };

  const handleClose = () => {
    if (!loading) {
      setGithubUsername('');
      setError('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title">
                <Github size={24} />
                <span>Connect Your GitHub</span>
              </div>
              <button
                className="modal-close"
                onClick={handleClose}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-description">
                <p>
                  To track your contributions and display them on the leaderboard, 
                  we need your GitHub username. This will only be collected once.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="github-form">
                <div className="form-group">
                  <label htmlFor="github-username" className="form-label">
                    <User size={16} />
                    GitHub Username
                  </label>
                  <div className="input-wrapper">
                    <span className="input-prefix">github.com/</span>
                    <input
                      id="github-username"
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="your-username"
                      className={`form-input ${error ? 'error' : ''}`}
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                  {error && <div className="form-error">{error}</div>}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading || !githubUsername.trim()}
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner-small"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Connect GitHub
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="modal-footer">
                <p className="footer-text">
                  <Info size={14} />
                  This information will be used to fetch your public GitHub contributions 
                  and display them on the OSC leaderboard.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GitHubModal; 