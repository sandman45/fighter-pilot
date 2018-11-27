import React from 'react';
import styles from './Header.css';

import Logo from '../Logo/Logo';
import Login from '../Login/Login';

export const Header = () => (
  <div className={styles.header}>
    <Logo />
    <div className={styles.title}>Fighter Pilot</div>
    <Login style={{float: 'right', padding: '12px'}}/>
  </div>
);

export default Header;
