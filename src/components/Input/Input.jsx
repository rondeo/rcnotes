import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.styl';

class Input extends Component {
  state = {
    value: this.props.value || '',
    focused: !!this.props.value || false,
  }

  render() {
    const {
      name,
      type = 'text',
      placeholder,
      autoComplete = 'on',
    } = this.props;
    const { value, focused } = this.state;

    return (
      <label className={styles.label}>
        <input
          type={type}
          name={name}
          className={styles.input}
          autoComplete={autoComplete}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onFocus}
        />
        <span
          className={cx(styles.placeholder, focused && styles.placeholderFocused)}
        >
          {placeholder}
        </span>
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
    }));
  }
}

export default Input;
