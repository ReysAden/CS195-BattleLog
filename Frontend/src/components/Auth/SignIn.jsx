import "./Auth.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const SignInUser = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setMessage("Enter Your Username");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`http://localhost:3001/User/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("Sign in successful! ✅");
        localStorage.setItem('username', data.Name);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage(`Error: ${data.message || "User not found"}`);
      }
      
    } catch (error) {
      console.error("Sign in error:", error);
      setMessage("Network error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-Box">
      <h1>Sign In</h1>
      
      <input 
        type="text" 
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      
      <button 
        type="submit" 
        onClick={SignInUser}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Submit"}
      </button>
      
      {message && (
        <p style={{ 
          color: message.includes("successful") ? "green" : "red",
          marginTop: "10px"
        }}>
          {message}
        </p>
      )}
      
      <footer onClick={() => navigate('/register')} style={{cursor: 'pointer'}}>
        click here to register
      </footer>
    </div>
  )
}

export default SignIn;