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
};

class NoteInner extends Component<Props, State> {
  titlePlaceholderClass: string = styles.editorTitlePlaceholder;
  textPlaceholderClass: string = styles.editorTextPlaceholder;

  state = {
    showToolbar: true,
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

    // remove \n on paste
    this.editor.clipboard.addMatcher('h1', (node, delta) => {
      let last = delta.ops[delta.ops.length - 1];
      if (last.insert[last.insert.length - 1] === '\n') {
        last.insert = last.insert.slice(0, last.insert.length - 1);
      }
      return delta
    });

    this.setValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value && this.props.value.id === nextProps.value.id) return;
    this.setValue(nextProps);
  }

  render() {
    const { showToolbar } = this.state;
    const { titlePlaceholder, textPlaceholder, deleteHandler } = this.props;
    return (
      <Fragment>
        <div
          className={styles.editor}
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
    const TITLE_LEVEL = 1;
    if (source === 'api') return;

    this.editorElement.classList.remove(this.titlePlaceholderClass);
    this.editorElement.classList.remove(this.textPlaceholderClass);

    const secondLineIndex = this.editor.getLine(0)[0].cache.length;
    const secondLineFormat = this.editor.getFormat(secondLineIndex);

    if (this.editor.getFormat(0).header !== TITLE_LEVEL) {
      this.editor.formatLine(0, 'header', TITLE_LEVEL);
    }
    if (secondLineFormat.header === TITLE_LEVEL) {
      this.editor.formatLine(secondLineIndex, 'header', 0);
    }

    const title = this.getTitle();
    const preview = this.getPreview();
    const {titlePlaceholder, textPlaceholder} = this.props;
    const titleElement = this.editorElement.querySelector('h1:first-of-type');

    if (!title || title === ' ' || title === '\n') {
      this.editorElement.classList.add(this.titlePlaceholderClass);
      titleElement.setAttribute('data-placeholder-title', titlePlaceholder);
    }
    if (!preview || preview === ' ' || preview === '\n') {
      this.editorElement.classList.add(this.textPlaceholderClass);
      titleElement.setAttribute('data-placeholder-text', textPlaceholder);
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
    const { value, titlePlaceholder, textPlaceholder } = props;
    const emptyTitle = 
      `<h1
        data-placeholder-title='${titlePlaceholder}'
        data-placeholder-text='${textPlaceholder}'><br/></h1>`;
    const emptyText = `<p><br/></p>`;

    let text;
    if (value.fullText) text = value.fullText;
    else text = emptyTitle + emptyText;

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
