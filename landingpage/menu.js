// Menu.js

import React from 'react';

const Menu = ({ onTabClick, activeTab }) => {
  return (
    <aside className="menu">
      <div className="menu-header">
        <p>Navigation</p>
      </div>

      <div className="menu-items">
        <a href="#tab1" className={`menu-item ${activeTab === 'tab1' && 'active'}`} onClick={() => onTabClick('tab1')}>
          Home
        </a>
        <a href="#tab2" className={`menu-item ${activeTab === 'tab2' && 'active'}`} onClick={() => onTabClick('tab2')}>
          Explore
        </a>
        {/* Add more menu items as needed */}
        <a href="#tab3" className={`menu-item ${activeTab === 'tab3' && 'active'}`} onClick={() => onTabClick('tab3')}>
          Dashboard
        </a>
      </div>
    </aside>
  );
};

export default Menu;
