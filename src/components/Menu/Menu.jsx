// @flow
import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { noteImportAction, noteExportAction } from 'store/notes/actions';
import { closeMenuAction } from 'store/menu/actions';
import { readFile } from 'utils';
import routes from 'routes';

import styles from './menu.styl';

const Menu = ({
  isOpen, importHandler, exportHandler, closeMenuHandler
}) => {
  const onUpload = (e) => {
    importHandler(e.target.files[0]);
    e.value = '';
  };

  return (
    <div className={cx(styles.root, {
        [styles.rootOpen]: isOpen,
    })}>
      <div className={styles.rootContainer}>
        <NavLink
          to={routes.list.path}
          className={styles.rootItem}
          activeClassName={styles.rootItemActive}
        >
          {routes.list.name}
        </NavLink>
        <div className={styles.rootItem}>
          <label>
            <Icon
              type="cloud_upload"
              className={styles.icon}
            />
            import
            <input
              type="file"
              onChange={onUpload}
              className={styles.input}
            />
          </label>
        </div>
        <Button
          onClick={exportHandler}
          type="transparent"
          className={styles.rootItem}
        >
          <Icon
            type="cloud_download"
            className={styles.icon}
          />
          export
        </Button>
      </div>

      <div
        className={cx(styles.overlay, {
          [styles.overlayOpen]: isOpen,
        })}
        onClick={closeMenuHandler}
      />
    </div>
  );
}

const mapStateToProps = ({menu: {isOpen}}) => ({
  isOpen,
});

const mapDispatchToProps = dispatch => ({
  importHandler: file => dispatch(noteImportAction(file)),
  exportHandler: () => dispatch(noteExportAction()),
  closeMenuHandler: () => dispatch(closeMenuAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
