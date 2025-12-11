import { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  const [sharedStats, setSharedStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSharedStats();
  }, []);

  const fetchSharedStats = async () => {
    try {
      const response = await fetch("http://localhost:3001/SharedStat");
      const data = await response.json();
      setSharedStats(data);
    } catch (error) {
      console.error('Error fetching shared stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateWinrate = (wins, games) => {
    if (games === 0) return '0%';
    return `${((wins / games) * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return <div className="community-container">Loading...</div>;
  }

  if (sharedStats.length === 0) {
    return <div className="community-container">No shared stats yet. Be the first to share!</div>;
  }

  return (
    <div className="community-container">
      <h2>Community Shared Stats</h2>
      <div className="community-stats-grid">
        {sharedStats.map((stat) => (
          <div key={stat._id} className="community-stat-card">
            <div className="stat-header">
              <h3>{stat.deckName}</h3>
              <span className="username">by {stat.username}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total Games:</span>
              <span className="stat-value">{stat.totalGames}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Going First:</span>
              <span className="stat-value">{stat.firstGames} games</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Going Second:</span>
              <span className="stat-value">{stat.secondGames} games</span>
            </div>
            <div className="stat-row highlight">
              <span className="stat-label">Winrate Going First:</span>
              <span className="stat-value">{calculateWinrate(stat.firstWins, stat.firstGames)}</span>
            </div>
            <div className="stat-row highlight">
              <span className="stat-label">Winrate Going Second:</span>
              <span className="stat-value">{calculateWinrate(stat.secondWins, stat.secondGames)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
