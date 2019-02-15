import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.styl';


const Input = ({
  input,
  meta,
  placeholder,
  type = 'text',
  autoComplete = 'on',
  ...rest,
}) => {
  console.log(meta.error);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          {...input}
          type={type}
          className={styles.input}
          autoComplete={autoComplete}
        />
        <span
          className={cx(styles.placeholder, input.value && styles.placeholderFocused)}
        >
          {placeholder}
        </span>
      </label>
      {meta.error && meta.touched && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  );
};

/*
class Input extends Component {
  state = {
    focused: !!this.props.input.value || false,
  }

  render() {
    const {
      input,
      type = 'text',
      placeholder,
      autoComplete = 'on',
      error,
    } = this.props;
    const { focused } = this.state;

    return (
      <label className={styles.label}>
        <span
          className={cx(styles.placeholder, focused && styles.placeholderFocused)}
        >
          {placeholder}
        </span>
        <input
          {...input}
          type={type}
          className={styles.input}
          autoComplete={autoComplete}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onFocus}
        />
        {error && <span className={styles.error}>{error}</span>}
      </label>
    );
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  onFocus = () => {
    this.setState(prevState => ({
      focused: !!prevState.value,
    }), this.props.input.onFocus());
  }
}
*/

export default Input;
