import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onRegister({ ...this.state });
    this.setState({ email: '', password: '' });
    // <Redirect to={}/>
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Register page</h1>

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
            {this.props.error !== null ? 'Account is already exist' : ''}
          </p>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: authSelectors.isError(state),
  registerSuccess: authSelectors.isRegister(state),
});
export default connect(mapStateToProps, {
  onRegister: authOperations.register,
})(RegisterPage);
