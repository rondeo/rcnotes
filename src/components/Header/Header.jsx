// @flow
import React from 'react';
import styles from './header.styl';

type Props = {
  title: string,
}

const Header = ({ title }: Props) => (
  <header className={styles.root}>
    <div>{title}</div>
  </header>
);

export default Header;
