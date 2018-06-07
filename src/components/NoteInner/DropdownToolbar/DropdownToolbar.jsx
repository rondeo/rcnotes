// @flow
import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import { ControllButton } from 'components/NoteInner/ControllButton';

import styles from './dropdown-toolbar.styl';

class DropdownToolbar extends Component {
  state = {
    open: false,
  }

  render() {
    const { open } = this.state;
    const { icon, title, children } = this.props;
    return (
      <div className={styles.wrapper}>
        {open &&
          <div className={styles.dropdown}>
            <div className={styles.title}>{title}</div>
            {children}
          </div>
        }
        <ControllButton icon={icon} onClick={this.clickHandler} />
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
