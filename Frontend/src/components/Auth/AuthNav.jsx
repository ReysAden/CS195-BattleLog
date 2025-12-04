import { useState } from 'react';
import './AuthNav.css';

function AuthNav({ activeTab, setActiveTab }) {
  return (
    <div className="auth-nav">
      <button 
        className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
        onClick={() => setActiveTab('signin')}
      >
        Sign In
      </button>
      <button 
        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
        onClick={() => setActiveTab('register')}
      >
        Register
      </button>
    </div>
  );
}

export default AuthNav;