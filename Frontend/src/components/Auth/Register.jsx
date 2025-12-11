import "./Auth.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RegisterUser = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setMessage("Please enter a username");
      return;
    }
    
    if (!password.trim()) {
      setMessage("Please enter a password");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch("http://localhost:3001/User/Register", {
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
        setMessage("Registration successful! ✅");
        setUsername("");
        setPassword("");
        localStorage.setItem('username', data.Name);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage(`Error: ${data.message || "Registration failed"}`);
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Network error. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-Box">
      <h1>Register</h1>
      
      <input 
        type="text" 
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      
      <input 
        type="password" 
        placeholder="Enter a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      
      <button
        type="submit" 
        onClick={RegisterUser}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      
      {message && (
        <p style={{ 
          color: message.includes("successful") ? "green" : "red",
          marginTop: "10px"
        }}>
          {message}
        </p>
      )}
      
      <footer onClick={() => navigate('/signin')} style={{cursor: 'pointer'}}>
        click here to sign in
      </footer>
    </div>
  );
}

export default Register;