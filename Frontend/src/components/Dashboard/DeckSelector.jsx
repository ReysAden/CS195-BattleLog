import { useState, useEffect } from 'react';

function DeckSelector({ label, value, onChange, disabled }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Decks`);
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select a deck</option>
        {decks.map((deck) => (
          <option key={deck._id} value={deck.DeckName}>{deck.DeckName}</option>
        ))}
      </select>
    </div>
  );
}

export default DeckSelector;
