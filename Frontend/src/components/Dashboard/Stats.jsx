import { useState, useEffect } from 'react';
import './Stats.css';

function Stats() {
  const [deckStats, setDeckStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:3001/Game/${username}`);
      const games = await response.json();

      // Calculate stats per deck
      const statsMap = {};

      games.forEach(game => {
        if (!statsMap[game.yourDeck]) {
          statsMap[game.yourDeck] = {
            deckName: game.yourDeck,
            totalGames: 0,
            firstGames: 0,
            secondGames: 0,
            firstWins: 0,
            secondWins: 0
          };
        }

        const stats = statsMap[game.yourDeck];
        stats.totalGames++;

        if (game.firstSecond === 'first') {
          stats.firstGames++;
          if (game.result === 'win') stats.firstWins++;
        } else {
          stats.secondGames++;
          if (game.result === 'win') stats.secondWins++;
        }
      });

      setDeckStats(Object.values(statsMap));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateWinrate = (wins, games) => {
    if (games === 0) return '0%';
    return `${((wins / games) * 100).toFixed(1)}%`;
  };

  const handleShare = async (deck) => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch("http://localhost:3001/SharedStat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          deckName: deck.deckName,
          totalGames: deck.totalGames,
          firstGames: deck.firstGames,
          secondGames: deck.secondGames,
          firstWins: deck.firstWins,
          secondWins: deck.secondWins
        }),
      });

      if (response.ok) {
        setMessage(`${deck.deckName} shared to community! ✅`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to share stat');
      }
    } catch (error) {
      console.error('Share error:', error);
      setMessage('Error sharing stat');
    }
  };

  if (isLoading) {
    return <div className="stats-container">Loading...</div>;
  }

  if (deckStats.length === 0) {
    return <div className="stats-container">No games submitted yet. Submit some matches to see stats!</div>;
  }

  return (
    <div className="stats-container">
      <h2>Deck Statistics</h2>
      {message && (
        <p style={{ 
          color: message.includes('shared') ? '#000' : 'red',
          textAlign: 'center',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          {message}
        </p>
      )}
      <div className="deck-stats-grid">
        {deckStats.map((deck) => (
          <div key={deck.deckName} className="deck-stat-card">
            <h3>{deck.deckName}</h3>
            <div className="stat-row">
              <span className="stat-label">Total Games:</span>
              <span className="stat-value">{deck.totalGames}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Going First:</span>
              <span className="stat-value">{deck.firstGames} games</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Going Second:</span>
              <span className="stat-value">{deck.secondGames} games</span>
            </div>
            <div className="stat-row highlight">
              <span className="stat-label">Winrate Going First:</span>
              <span className="stat-value">{calculateWinrate(deck.firstWins, deck.firstGames)}</span>
            </div>
            <div className="stat-row highlight">
              <span className="stat-label">Winrate Going Second:</span>
              <span className="stat-value">{calculateWinrate(deck.secondWins, deck.secondGames)}</span>
            </div>
            <button 
              className="share-btn"
              onClick={() => handleShare(deck)}
            >
              Share to Community
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;