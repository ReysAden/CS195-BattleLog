import { useState } from 'react';

function AddDeck({ onDeckAdded }) {
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddDeck = async (e) => {
    e.preventDefault();

    if (!newDeckName.trim()) {
      setMessage("Please enter a deck name");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Decks/NewDeck`, {
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
        if (onDeckAdded) onDeckAdded();
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

  return (
    <div className="add-deck-container">
      <button 
        className="add-deck-btn" 
        onClick={() => setShowAddDeck(!showAddDeck)}
        type="button"
      >
        {showAddDeck ? "Cancel" : "+ Add Deck"}
      </button>
      {showAddDeck && (
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
      )}
      {message && (
        <p style={{ 
          color: message.includes('successfully') ? 'green' : 'red',
          marginTop: '0.5rem',
          fontSize: '0.9rem'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddDeck;
