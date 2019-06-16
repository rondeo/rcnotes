import React from 'react';
import { connect } from 'react-redux';
import {toggleMenuAction} from 'store/menu/actions';

import Icon from 'components/Icon';
import Button from 'components/Button';

const BurgerButton = ({iconClassName, clickHandler}) => (
    <Button
        onClick={clickHandler}
        theme="transparent"
      >
      <Icon type="menu" className={iconClassName} />
    </Button>
);


const mapDispatchToProps = dispatch => ({
  clickHandler: () => dispatch(toggleMenuAction()),
})

export default connect(
  null,
  mapDispatchToProps,
)(BurgerButton);