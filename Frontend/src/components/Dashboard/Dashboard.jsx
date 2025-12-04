import { useState } from 'react';
import Topbar from '../Dashboard/Topbar';
import Submission from '../Dashboard/Submission';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('submission');

  const renderContent = () => {
    switch(activeTab) {
      case 'submission':
        return <Submission />;
      case 'stats':
        return <div><h2>Stats Coming Soon</h2></div>;
      case 'profile':
        return <div><h2>Profile Coming Soon</h2></div>;
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