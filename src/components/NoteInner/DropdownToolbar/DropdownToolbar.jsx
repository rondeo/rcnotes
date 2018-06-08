// @flow
import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import cx from 'classnames';
import ControllButton from 'components/NoteInner/ControllButton';

import styles from './dropdown-toolbar.styl';

type Props = {
  icon: string,
  title: string,
  type: string,
  children: any,
}

type State = {
  open: boolean,
}

class DropdownToolbar extends Component<Props, State> {
  state = {
    open: false,
  }

  render() {
    const { open } = this.state;
    const { icon, title, type, children } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={cx(styles.dropdown, open && styles.dropdownOpen)}>
          <div className={styles.title}>{title}</div>
          {children}
        </div>
        <ControllButton icon={icon} onClick={this.clickHandler} className={cx} />
      </div>
    );
  }

  clickHandler = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  handleClickOutside = () => {
    this.setState({ open: false });
  }
}

export default onClickOutside(DropdownToolbar);
