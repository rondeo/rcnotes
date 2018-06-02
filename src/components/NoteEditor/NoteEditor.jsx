
import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';

import EditorToolbar from 'components/EditorToolbar';

import commonStyle from 'styles/main.styl';
import initialValue from './value.json';
import styles from './note-editor.styl';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class NoteEditor extends Component {
  state = {
    value: Value.fromJSON(initialValue),
  }

  render() {
    return (
      <div>
        <EditorToolbar value={this.state.value} changeHandler={this.onChange} />

        <div className={styles.editor}>
          <Editor
            placeholder="Enter some rich text..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            spellCheck
            autoFocus
          />
        </div>
      </div>
    );
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  onKeyDown = (event, change) => {
    const { value } = change;
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  }

  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'h1':
        return <h1 {...attributes}>{children}</h1>;
      case 'h2':
        return <h2 {...attributes}>{children}</h2>;
      case 'h3':
        return <h3 {...attributes}>{children}</h3>;
      case 'h4':
        return <h4 {...attributes}>{children}</h4>;
      case 'h5':
        return <h5 {...attributes}>{children}</h5>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
    }
  }

  renderMark = (props) => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <b {...attributes}>{children}</b>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <i {...attributes}>{children}</i>;
      case 'underlined':
        return <span className={commonStyle.underlined} {...attributes}>{children}</span>;
      case 'strike':
        return <span className={commonStyle.strike} {...attributes}>{children}</span>;
    }
  }
}

export default NoteEditor;
