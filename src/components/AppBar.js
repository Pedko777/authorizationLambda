import React from 'react';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import withAuth from './hoc/withAuth';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2A363B',
  },
};

const AppBar = ({ isAuthenticated }) => (
  <header style={styles.header}>
    <Navigation />
    {isAuthenticated && <UserMenu />}
  </header>
);

export default withAuth(AppBar);
