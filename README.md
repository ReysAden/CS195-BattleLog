# Battle Log

A full-stack web application for tracking Pokémon TCG match performance. Players can log their matches, analyze deck statistics, and share results with the community.

## Features

- **User Authentication** - Register and sign in with username/password
- **Deck Management** - Create and manage custom decks
- **Match Tracking** - Submit match results including deck used, opponent's deck, turn order, and outcome
- **Statistics Dashboard** - View detailed performance metrics per deck:
  - Total games played
  - Games going first vs second
  - Winrate going first
  - Winrate going second
- **Community Sharing** - Share deck statistics with other players

## Tech Stack

**Frontend:**
- React 19
- Vite
- React Router
- CSS3

**Backend:**
- Node.js
- Express 5
- MongoDB
- Mongoose

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

## Deployment Link

[Add your deployment link here]

## Reflection

This project was built to help Pokémon TCG players track and analyze their competitive performance. The focus was on creating a simple, straightforward interface that prioritizes functionality over complexity.

Key learning outcomes:
- Building a full-stack MERN application
- Implementing user authentication
- Managing and calculating statistics from user data
- Creating a community feature for sharing results

Future improvements could include more detailed analytics, deck archetype categorization, and match history visualization.
