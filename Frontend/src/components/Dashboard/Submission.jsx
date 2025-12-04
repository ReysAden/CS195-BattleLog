import { useState } from 'react';
import './Submission.css';

function Submission() {
  const [yourDeck, setYourDeck] = useState('');
  const [oppDeck, setOppDeck] = useState('');
  const [firstSecond, setFirstSecond] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const decks = [
    'Aggro',
    'Control',
    'Midrange',
    'Combo',
    'Tempo'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!yourDeck || !oppDeck || !firstSecond || !result) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      console.log({
        yourDeck,
        oppDeck,
        firstSecond,
        result,
        username: localStorage.getItem('username')
      });

      setMessage('Match submitted successfully! ✅');
      setYourDeck('');
      setOppDeck('');
      setFirstSecond('');
      setResult('');

    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Error submitting match');
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
            <label>Your Deck</label>
            <select 
              value={yourDeck} 
              onChange={(e) => setYourDeck(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select your deck</option>
              {decks.map((deck) => (
                <option key={deck} value={deck}>{deck}</option>
              ))}
            </select>
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
                <option key={deck} value={deck}>{deck}</option>
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