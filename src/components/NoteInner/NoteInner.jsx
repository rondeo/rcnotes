// @flow
import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import Toolbar from 'components/NoteInner/Toolbar';
import ControllPanel from 'components/NoteInner/ControllPanel';

import styles from './note-inner.styl';

class NoteInner extends Component {
  state = {
    value: '',
    showToolbar: true,
  };

  componentDidMount() {
    this.editor = new Quill(
      this.editorElement,
      {
        modules: {
          toolbar: {
            container: "#toolbar"
          },
          clipboard: {
            matchVisual: false
          },
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value.id === nextProps.value.id) return;
    this.setState({
      value: '',
    });
  }

  render() {
    const { value, showToolbar } = this.state;
    const { placeholder } = this.props;

    return (
      <Fragment>
        <Toolbar id="toolbar" open={showToolbar} />
        <div
          id="editor"
          className={styles.editor}
          ref={(el) => this.editorElement = el}
        />
        <ControllPanel
          onClick={this.onSave}
          onDelete={() => null}
          toggleToolbar={this.toggleToolbar}
          openedToolbar={showToolbar}
        />
      </Fragment>
    );
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  onKeyDown = (event, change) => {
    const mark = getMarkFromHotkey(event);

    if (!mark) return;

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  }

  onSave = () => {
    const { submitHandler } = this.props;
    const value = this.state.value.toJSON();
    const title = getTtile(value);
    const preview = getPreview(value);
    const fullText = html.serialize(this.state.value);
    console.log(fullText);

    submitHandler({
      ...this.props.value,
      title,
      preview,
      fullText,
    });
  }

  toggleToolbar = () => {
    this.setState(prevState => ({
      showToolbar: !prevState.showToolbar,
    }));
  }
}

export default NoteInner;
