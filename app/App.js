import React from 'react';
import styles from './App.css';

import Header from './components/Header/Header';
import Content from './components/Content/Default/Content';
import Profile from './components/Content/Profile/Profile';

const App = () => (
  <div className={styles.app}>
    {/*<Header />*/}
    {/*<Profile />*/}
    <Content />
  </div>
    );

export default App;
