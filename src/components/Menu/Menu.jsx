// @flow
import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { noteImportAction, noteExportAction } from 'store/notes/actions';
import { closeMenuAction } from 'store/menu/actions';
import { readFile } from 'utils';
import routes from 'routes';

import styles from './menu.styl';

class Menu extends PureComponent {
  onUpload = (e) => {
    importHandler(e.target.files[0]);
    e.value = '';
  };

  handleClickOutside = this.props.closeMenuHandler;

  render() {
    const { importHandler, exportHandler } = this.props;
    return (
      <div >
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
              onChange={this.onUpload}
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  importHandler: file => dispatch(noteImportAction(file)),
  exportHandler: () => dispatch(noteExportAction()),
  closeMenuHandler: () => dispatch(closeMenuAction()),
});

export default connect(
  null,
  mapDispatchToProps,
)(onClickOutside(Menu));
