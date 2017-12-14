import React from 'react';
import styles from './Content.css';
import UserList from '../List/List';

export const Content = () => (
  <div>
    <div className={styles.content}>
      <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/Dad+Cockpit.jpg" />
      <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/sandman.jpg" />
      <img height={250} resizemode={'contain'} alt="" src="https://s3.amazonaws.com/fighter-pilot-test/Dad+p-47.jpg" />
    </div>
    <UserList />
  </div>
);

export default Content;
