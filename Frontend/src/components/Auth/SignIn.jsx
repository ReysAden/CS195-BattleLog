import "./Auth.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const SignInUser = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setMessage("Enter Your Username");
      return;
    }
    
    if (!password.trim()) {
      setMessage("Enter Your Password");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/User/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: username,
          Password: password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("Sign in successful! ✅");
        setUsername("");
        setPassword("");
        localStorage.setItem('username', data.Name);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage(`Error: ${data.message || "Sign in failed"}`);
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
      
      <input 
        type="password" 
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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