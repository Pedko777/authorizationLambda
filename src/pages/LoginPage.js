import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../redux/auth';
import { authSelectors } from '../redux/auth';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
  },
  error: {
    color: 'red',
  },
};

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onLogin({ ...this.state });
    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login page</h1>

        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              placeholder="Your@email.com"
              value={email}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              minLength="8"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </label>
          <p style={styles.error}>
            {this.props.error !== null ? 'Wrong pass or email' : ''}
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: authSelectors.isError(state),
});

export default connect(mapStateToProps, { onLogin: authOperations.logIn })(
  LoginPage,
);
