import { useState } from 'react';

function MatchForm({ yourDeck, oppDeck }) {
  const [firstSecond, setFirstSecond] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!yourDeck || !oppDeck || !firstSecond || !result) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Game/Submit`, {
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
    <>
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
    </>
  );
}

export default MatchForm;
