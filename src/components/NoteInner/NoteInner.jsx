// @flow
import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import Toolbar from 'components/NoteInner/Toolbar';
import ControllPanel from 'components/NoteInner/ControllPanel';

import styles from './note-inner.styl';

class NoteInner extends Component {
  state = {
    showToolbar: true,
  };

  componentDidMount() {
    this.editor = new Quill(
      this.editorElement,
      {
        modules: {
          toolbar: {
            container: "#toolbar",
          },
          clipboard: {
            matchVisual: false,
          },
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
      }
    );

    this.editor.on('text-change', this.onChange);
    this.setValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value && this.props.value.id === nextProps.value.id) return;
    this.setValue(nextProps);
  }

  render() {
    const { value, showToolbar } = this.state;
    const { placeholder } = this.props;
    return (
      <Fragment>
        <Toolbar id="toolbar" open={showToolbar} />
        <div
          className={styles.editor}
          ref={(el) => this.editorElement = el}
        />
        <ControllPanel
          onSave={this.onSave}
          onDelete={() => null}
          toggleToolbar={this.toggleToolbar}
          openedToolbar={showToolbar}
        />
      </Fragment>
    );
  }

  onChange = (delta, oldDelta, source) => {
    if (source === 'api') return;
    const secondLineIndex = this.editor.getLine(0)[0].cache.length;
    const secondLineFormat = this.editor.getFormat(secondLineIndex);

    if (this.editor.getFormat(0).header !== 1) {
      this.editor.formatLine(0, 'header', 1);
    }
    if (secondLineFormat.header === 1) {
      this.editor.formatLine(secondLineIndex, 'header', 0);
    }
  }

  onSave = () => {
    const data = this.editor.root;
    const { submitHandler } = this.props;

    const title = this.getTitle();
    const preview = this.getPreview();
    const fullText = data.innerHTML;

    submitHandler({
      ...this.props.value,
      title,
      preview,
      fullText,
    });
  }

  setValue = (props) => {
    const {value} = props;
    let text;
    if (value) text = value.fullText;
    else text = '<h1><br/></h1>';

    this.editor.root.innerHTML = text;
  }

  getTitle = () => {
    return this.editor.getLine(0)[0].domNode.innerText.trim();
  }

  getPreview = () => {
    const title = this.getTitle();
    let preview = this.editor.root.innerText;
    return preview.slice(title.length).trim();
  }

  toggleToolbar = () => {
    this.setState(prevState => ({
      showToolbar: !prevState.showToolbar,
    }));
  }
}

export default NoteInner;
