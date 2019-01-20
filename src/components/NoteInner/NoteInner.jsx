// @flow
import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import Toolbar from 'components/NoteInner/Toolbar';
import ControllPanel from 'components/NoteInner/ControllPanel';

import type { NoteType } from 'types';
import styles from './note-inner.styl';

type Props = {
  value: NoteType,
  titlePlaceholder: string,
  textPlaceholder: string,
  deleteHandler: (id: number) => void
};

type State = {
  showToolbar: boolean,
  showTitlePlaceholder: boolean,
  showTextPlaceholder: boolean,
};

class NoteInner extends Component<Props, State> {
  state = {
    showToolbar: true,
    showTitlePlaceholder: !this.value || !this.value.id,
    showTextPlaceholder: !this.value || !this.value.preview,
  };

  componentDidMount() {
    this.editor = new Quill(
      this.editorElement,
      {
        modules: {
          toolbar: {
            container: '#toolbar',
          },
          clipboard: {
            matchVisual: false,
          },
        },
        theme: 'snow',
      },
    );

    this.editor.on('text-change', this.onChange);
    this.setValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value && this.props.value.id === nextProps.value.id) return;
    this.setValue(nextProps);
  }

  render() {
    const {
      showToolbar, showTitlePlaceholder, showTextPlaceholder,
    } = this.state;
    const { titlePlaceholder, textPlaceholder, deleteHandler } = this.props;
    return (
      <Fragment>
        <div
          className={cx(
            styles.editor,
            showTitlePlaceholder && styles.editorTitlePlaceholder,
            showTextPlaceholder && styles.editorTextPlaceholder,
          )}
          ref={el => this.editorElement = el}
          data-placeholder-title={titlePlaceholder}
          data-placeholder-text={textPlaceholder}
        />
        <ControllPanel
          onSave={this.onSave}
          deleteHandler={deleteHandler}
          toggleToolbar={this.toggleToolbar}
          openedToolbar={showToolbar}
        />
        <Toolbar id="toolbar" open={showToolbar} />
      </Fragment>
    );
  }

  onChange = (delta, oldDelta, source) => {
    if (source === 'api') return;
    const secondLineIndex = this.editor.getLine(0)[0].cache.length;
    const secondLineFormat = this.editor.getFormat(secondLineIndex);
    const title = this.getTitle();
    const preview = this.getPreview();
    const { showTitlePlaceholder, showTextPlaceholder } = this.state;

    if (this.editor.getFormat(0).header !== 1) {
      this.editor.formatLine(0, 'header', 1);
    }
    if (secondLineFormat.header === 1) {
      this.editor.formatLine(secondLineIndex, 'header', 0);
    }

    this.setState({
      showTextPlaceholder: !preview,
      showTitlePlaceholder: !title || title === ' ' || title === '\n',
    });
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
    const { value } = props;
    let text;
    if (value.fullText) text = value.fullText;
    else text = '<h1><br/></h1>';

    this.editor.root.innerHTML = text;
  }

  getTitle = () => this.editor.getLine(0)[0].domNode.innerText;

  getPreview = () => {
    const title = this.getTitle();
    const preview = this.editor.root.innerText;
    return preview.slice(title.length).trim();
  }

  toggleToolbar = () => {
    this.setState(prevState => ({
      showToolbar: !prevState.showToolbar,
    }));
  }
}

export default NoteInner;
