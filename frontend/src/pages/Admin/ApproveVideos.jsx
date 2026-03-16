import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config';

export default function ApproveVideos() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingVideos = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/videos/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVideos(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.error || 'Failed to load pending videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVideos();
  }, []);

  const handleApprove = async (id, approved) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/videos/${id}/approve`, { approved }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPendingVideos();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update video');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading pending videos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      <nav className="glass text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/admin" className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Approve Videos
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchPendingVideos}
                className="text-white/80 hover:text-white px-3 py-2 rounded transition"
                title="Refresh"
              >
                ↻ Refresh
              </button>
              <Link to="/admin" className="text-white/80 hover:text-white">Back to Admin</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Pending Video Approvals</h1>
        {error && (
          <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4">
            {error}
            <button onClick={fetchPendingVideos} className="ml-4 underline">Retry</button>
          </div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {videos.length > 0 ? (
              videos.map(video => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{video.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-white/50">
                      <span>Professor: {video.professor?.name}</span>
                      <span>Course: {video.course?.name} ({video.course?.code})</span>
                      <span>Uploaded: {new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={`${API_BASE_URL.replace('/api', '')}${video.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 text-sm inline-block mt-2"
                    >
                      Watch Video →
                    </a>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleApprove(video._id, true)}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-200 px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(video._id, false)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              !error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/70 py-8"
                >
                  No pending videos.
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}