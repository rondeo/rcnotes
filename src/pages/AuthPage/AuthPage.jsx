// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form'
import Input from 'components/Input';
import Button from 'components/Button';
import {loginAction, registerAction} from 'store/user/actions';

import styles from './AuthPage.styl';

class AuthPage extends Component {
  state = {
    isRegistration: false,
    login: '',
    password: '',
    email: '',
    confirmedPassword: '',
  }

  render() {
    const { isRegistration, login, password, confirmedPassword, email } = this.state;
    return (
      <div className={styles.wrapper}>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, pristine, invalid, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.title}>{isRegistration ? 'Register' : 'Login'}</h1>
              <Field
                component={Input}
                placeholder="Login"
                name="login"
                value={login}
              />
              {isRegistration && (
                <Field
                  component={Input}
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                />
              )}
              <Field
                component={Input}
                placeholder="Password"
                name="password"
                type="password"
                value={password}
              />
              {isRegistration && (
                <Field
                  component={Input}
                  placeholder="Confirm password"
                  name="confirmedPassword"
                  type="password"
                  value={confirmedPassword}
                />
              )}
              <Button
                size="wide"
                className={styles.button}
                type="submit"
              >
                {isRegistration ? 'Register' : 'Login'}
              </Button>
              <div className={styles.footer}>
                {isRegistration ? 'Already have an account?' : 'No account?'}
                <Button
                  onClick={this.toggleTab}
                  theme="transparent"
                  className={styles.footerButton}
                >
                  {isRegistration ? 'Login' : 'Create one'}
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }

  onClick = (data) => {
    const { isRegistration } = this.state;
    const { loginHandler, registerHandler } = this.props;
    if (isRegistration) registerHandler(data);
    else loginHandler(data);
    console.log('-----onSubmit', data);
  }

  toggleTab = () => {
    this.setState(prevState => ({
      isRegistration: !prevState.isRegistration,
    }));
  }

  validate = (values) => {
    return {};
    const regxs = {
      login: /^[\w-]{3,16}$/g,
      email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
      password: /^.{6,}$/,
    };
    const { isRegistration } = this.state;
    const errors = {};
    if (!values.login || !values.login.match(regxs.login)) {
      errors.login = 'Invalid';
    }
    if (isRegistration && (!values.email || !values.login.match(regxs.email))) {
      errors.email = 'Invalid';
    }
    if (!values.password || !values.password.match(regxs.password)) {
      errors.password = 'Invalid';
    }
    if (
      isRegistration &&
      !values.confirmedPassword &&
      values.confirmedPassword !== values.password
    ) {
      errors.password = 'Мust match the password';
    }
    return errors;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loginHandler: formData => dispatch(loginAction(formData)),
  registerHandler: formData => dispatch(registerAction(formData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
