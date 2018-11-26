import React from 'react';
import styles from './Header.css';

import Logo from '../Logo/Logo';

export const Header = () => (
  <div className={styles.header}>
    <Logo />
    <div className={styles.title}>Fighter Pilot</div>
  </div>
);

export default Header;
