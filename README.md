# Battle Log

A full-stack web application for tracking Pokémon TCG Deck performance. Players can log their matches, analyze deck statistics, and share results with the community.

## Features

- **User Authentication** - Register and sign in with username/password
- **Deck Management** - Add custom decks
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

## Pictures

<img width="1712" height="1124" alt="Screenshot 2025-12-11 134404" src="https://github.com/user-attachments/assets/02280c94-4aec-4654-9a9c-f213e5b80a59" />
<img width="1706" height="1115" alt="Screenshot 2025-12-11 134350" src="https://github.com/user-attachments/assets/93134ab7-22db-4d8e-a2bb-501811f9c7e3" />
<img width="1712" height="1114" alt="Screenshot 2025-12-11 134334" src="https://github.com/user-attachments/assets/e5feaf17-02e8-41aa-a7fc-08bc7fd662af" />
<img width="1697" height="1113" alt="Screenshot 2025-12-11 134308" src="https://github.com/user-attachments/assets/bc8fea20-a2ab-4dd0-836a-1dc0a73c3683" />


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
CLIENT_ORIGIN=http://localhost:5173
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

3. Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3001
```

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:5173` in your browser

## Deployment Link

https://cs195battlelog.netlify.app

## Reflection

This project was built to help Pokémon TCG players (could easily be any other TCG) track and analyze their deck's performance. The focus was on creating a simple, straightforward interface that prioritizes functionality over complexity.

Key learning outcomes:

- Building a full-stack MERN application
- Implementing user authentication
- Managing and calculating statistics from user data
- Creating a community feature for sharing results

Future improvements could include more detailed analytics with more visuals, deck archetype categorization, and match history visualization.
