// App.js

import React, { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import Landing from './Landing';
import Section from './Section';

const App = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <Header />
      <Menu onTabClick={handleTabClick} activeTab={activeTab} />
      <div className="container">
        <Landing />
        <Section title="Analytics" isActive={activeTab === 'tab1'} />
        <Section title="Reports" isActive={activeTab === 'tab2'} />
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default App;
