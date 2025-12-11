require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models
const User = require("./models/User");
const Decks = require("./models/Decks");
const Game = require("./models/Game");
const SharedStat = require("./models/SharedStat");


// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Battle Log API",
    status: "Running",
    endpoints: {
      users: "/User",
      Decks: "/Decks"
    },
  });
});

// TODO: users add themselves
// POST /users

app.post("/User/Register", async (req, res) => {
  try {
    const username = req.body.Name.replace(/\s+/g, '');
    const password = req.body.Password;
    
    if (!username) {
      return res.status(400).json({message: "Username cannot be empty"});
    }
    
    if (!password) {
      return res.status(400).json({message: "Password cannot be empty"});
    }
    
    const newUser = new User({ Name: username, Password: password });
    const SavedUser = await newUser.save();
    res.status(201).json(SavedUser);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

app.get("/User", async (req,res) => {
  try {
    const users = await User.find();
    res.json(users);

    }catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get("/User/:name", async (req, res) => {
  try {
    const username = req.params.name.replace(/\s+/g, '');
    
    const user = await User.findOne({ Name: username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/User/SignIn", async (req, res) => {
  try {
    const username = req.body.Name.replace(/\s+/g, '');
    const password = req.body.Password;
    
    if (!username || !password) {
      return res.status(400).json({message: "Username and password are required"});
    }
    
    const user = await User.findOne({ Name: username });
    
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    
    if (user.Password !== password) {
      return res.status(401).json({message: "Invalid password"});
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.post("/Decks/NewDeck", async (req, res) => {
    try {
        const newDeck = new Decks(req.body);

        const SavedDeck = await newDeck.save();

        res.status(201).json(SavedDeck);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.get("/Decks", async (req,res) => {
  try {
    const Deck = await Decks.find();
    res.json(Deck);

    }catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.post("/Game/Submit", async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

app.get("/Game/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const games = await Game.find({ username: username });
    res.json(games);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.post("/SharedStat", async (req, res) => {
  try {
    const newSharedStat = new SharedStat(req.body);
    const savedStat = await newSharedStat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

app.get("/SharedStat", async (req, res) => {
  try {
    const sharedStats = await SharedStat.find().sort({ createdAt: -1 });
    res.json(sharedStats);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
/** 
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);

    const SavedTask = await newTask.save();

    res.status(201).json(SavedTask);
  }catch (error) {
    res.status(400).json({message: error.message});
  }
});
// GET /api/tasks

app.get("/api/tasks", async (req,res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);

    }catch (error) {
    res.status(500).json({message: error.message});
  }
});
// GET /api/tasks/:id
app.get("/api/tasks/:id", async (req,res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    if (!tasks)
      return res.status(404).json({
        message: "Task not found",
    });
    res.json(tasks)
    }catch (error) {
    res.status(500).json({message: error.message});
  }
});
// PUT /api/tasks/:id
app.put("/api/tasks/:id",async (req,res)  => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTask)
    return res.status(404).json({
      message: "Task not found",
    });
  res.json(updatedTask);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
// DELETE /api/tasks/:id

app.delete("/api/tasks/:id", async(req,res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deleteTask)
    return res.status(404).json({
      message: "Task not found",
    });

    res.json({
      message: "Task deleted Succesfully",
      task: deleteTask,
    });
  } catch {
    (400).json({message: error.message})
  }
});

// TODO: Add your Session routes here
// POST /api/sessions
app.post("/api/sessions", async(req,res) => {
  try {
    const newSession = new Session(req.body);
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
// GET /api/sessions
app.get("/api/sessions", async(req,res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

**/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
