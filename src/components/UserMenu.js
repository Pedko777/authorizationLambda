import React from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../redux/auth';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
};

const UserMenu = ({ onLogout }) => (
  <div style={styles.container}>
    <span style={styles.name}>Welcome </span>
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  </div>
);

// export default UserMenu;

export default connect(null, { onLogout: authOperations.logOut })(UserMenu);
