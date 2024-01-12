import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Landing from './Landing';
import Section from './Section';

const App = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <Landing />
        <Section title="Section 1" />
        <Section title="Section 2" />
      </div>
    </div>
  );
};

export default App;
