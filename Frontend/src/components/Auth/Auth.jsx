import { useState } from 'react';
import AuthNav from './AuthNav';
import Register from './Register';
import SignIn from './SignIn';
import './Auth.css';

function Auth() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="auth-container">
      <AuthNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="auth-content">
        {activeTab === 'signin' ? <SignIn /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;