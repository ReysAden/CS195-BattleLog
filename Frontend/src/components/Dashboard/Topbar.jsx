import { useNavigate } from 'react-router-dom';
import './Topbar.css'

function Topbar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/auth');
  };

  return (
    <div className="topbar">
      <div className="topbar-welcome">
        Welcome, {username}
      </div>
      
      <nav className="topbar-tabs">
        <button 
          className={`tab ${activeTab === 'submission' ? 'active' : ''}`}
          onClick={() => setActiveTab('submission')}
        >
          Submission
        </button>
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
        <button 
          className={`tab ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          Community
        </button>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Topbar;