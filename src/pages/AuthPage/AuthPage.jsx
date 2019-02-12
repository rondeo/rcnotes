// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import {loginAction, registerAction} from 'store/user/actions';

import styles from './AuthPage.styl';

class AuthPage extends Component {
  state = {
    isLogin: true,
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h1 className={styles.title}>{isLogin ? 'Login' : 'Register'}</h1>
          <Input placeholder="Login" name="login" type="text" />
          {!isLogin && <Input placeholder="Email" name="email" type="email" /> }
          <Input placeholder="Password" name="password" type="password" />
          {!isLogin && <Input placeholder="Confirm password" name="password" type="password" /> }
          <Button
            size="wide"
            className={styles.button}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <div className={styles.footer}>
            {isLogin ? 'No account?' : 'Already have an account?'}
            <Button onClick={this.toggleTab} type="transparent">
              {isLogin ? 'Create one' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  onClick = () => {
    const { onLogin, onRegister } = this.props;
    const { isLogin } = this.state;
    if (isLogin) return onLogin();
    return onRegister();
  }

  toggleTab = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
    }));
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(loginAction(data)),
  onRegister: data => dispatch(registerAction(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
