import { useState } from 'react';
import Topbar from '../Dashboard/Topbar';
import Submission from '../Dashboard/Submission';
import Stats from '../Dashboard/Stats';
import Community from '../Dashboard/Community';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('submission');

  const renderContent = () => {
    switch(activeTab) {
      case 'submission':
        return <Submission />;
      case 'stats':
        return <Stats />;
      case 'community':
        return <Community />;
      default:
        return <Submission />;
    }
  };

  return (
    <div className="dashboard">
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;