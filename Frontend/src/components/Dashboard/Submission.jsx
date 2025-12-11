import { useState, useEffect } from 'react';
import './Submission.css';

function Submission() {
  const [yourDeck, setYourDeck] = useState('');
  const [oppDeck, setOppDeck] = useState('');
  const [firstSecond, setFirstSecond] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [decks, setDecks] = useState([]);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch("http://localhost:3001/Decks");
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error("Error fetching decks:", error);
      setMessage("Error loading decks");
    }
  };

  const handleAddDeck = async (e) => {
    e.preventDefault();

    if (!newDeckName.trim()) {
      setMessage("Please enter a deck name");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/Decks/NewDeck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DeckName: newDeckName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Deck added successfully! ✅");
        setNewDeckName("");
        setShowAddDeck(false);
        fetchDecks();
      } else {
        setMessage(`Error: ${data.message || "Failed to add deck"}`);
      }
    } catch (error) {
      console.error("Add deck error:", error);
      setMessage("Network error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!yourDeck || !oppDeck || !firstSecond || !result) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch("http://localhost:3001/Game/Submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          yourDeck,
          oppDeck,
          firstSecond,
          result
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Match submitted successfully! ✅');
        setYourDeck('');
        setOppDeck('');
        setFirstSecond('');
        setResult('');
      } else {
        setMessage(`Error: ${data.message || "Submission failed"}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submission-container">
      <h2>Submit Match</h2>

      <div className="submission-form">
        <div className="deck-row">
          <div className="form-group">
            <div className="label-row">
              <label>Your Deck</label>
              <button 
                className="add-deck-btn" 
                onClick={() => setShowAddDeck(!showAddDeck)}
                type="button"
              >
                {showAddDeck ? "Cancel" : "+ Add Deck"}
              </button>
            </div>
            {showAddDeck ? (
              <div className="add-deck-form">
                <input
                  type="text"
                  placeholder="Enter deck name"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleAddDeck}
                  disabled={isLoading}
                  className="add-btn"
                >
                  {isLoading ? "Adding..." : "Add"}
                </button>
              </div>
            ) : (
              <select 
                value={yourDeck} 
                onChange={(e) => setYourDeck(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select your deck</option>
                {decks.map((deck) => (
                  <option key={deck._id} value={deck.DeckName}>{deck.DeckName}</option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Opponent's Deck</label>
            <select 
              value={oppDeck} 
              onChange={(e) => setOppDeck(e.target.value)}
              disabled={isLoading}
            >
            <option value="">Select opponent's deck</option>
              {decks.map((deck) => (
                <option key={deck._id} value={deck.DeckName}>{deck.DeckName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Did you go first or second?</label>
          <select 
            value={firstSecond} 
            onChange={(e) => setFirstSecond(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Select</option>
            <option value="first">First</option>
            <option value="second">Second</option>
          </select>
        </div>

        <div className="form-group">
          <label>Result</label>
          <div className="result-buttons">
            <button
              className={`result-btn win ${result === 'win' ? 'active' : ''}`}
              onClick={() => setResult('win')}
              disabled={isLoading}
            >
              Win
            </button>
            <button
              className={`result-btn loss ${result === 'loss' ? 'active' : ''}`}
              onClick={() => setResult('loss')}
              disabled={isLoading}
            >
              Loss
            </button>
          </div>
        </div>

        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {message && (
          <p style={{ 
            color: message.includes('successfully') ? 'green' : 'red',
            marginTop: '10px'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Submission;