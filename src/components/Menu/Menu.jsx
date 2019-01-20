// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { noteImportAction, noteExportAction } from 'store/actions';
import { readFile } from 'utils';
import routes from 'routes';

import styles from './menu.styl';

const Menu = ({ importHandler, exportHandler }) => (
  <div >
    <NavLink
      to={routes.list.path}
      className={styles.rootItem}
      activeClassName={styles.rootItemActive}
    >
      {routes.list.name}
    </NavLink>
    <div>
      <label>
        import
        <input type="file" onChange={e => importHandler(e.target.files[0])} />
      </label>
    </div>
    <div onClick={exportHandler}>export</div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  importHandler: file => dispatch(noteImportAction(file)),
  exportHandler: () => dispatch(noteExportAction()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Menu);
