import { useState } from 'react';
import AddDeck from './AddDeck';
import DeckSelector from './DeckSelector';
import MatchForm from './MatchForm';
import './Submission.css';

function Submission() {
  const [yourDeck, setYourDeck] = useState('');
  const [oppDeck, setOppDeck] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDeckAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="submission-container">
      <h2>Submit Match</h2>

      <div className="submission-form">
        <AddDeck onDeckAdded={handleDeckAdded} />
        
        <div className="deck-row">
          <DeckSelector 
            key={`your-${refreshKey}`}
            label="Your Deck" 
            value={yourDeck} 
            onChange={setYourDeck}
          />
          <DeckSelector 
            key={`opp-${refreshKey}`}
            label="Opponent's Deck" 
            value={oppDeck} 
            onChange={setOppDeck}
          />
        </div>

        <MatchForm yourDeck={yourDeck} oppDeck={oppDeck} />
      </div>
    </div>
  );
}

export default Submission;