// @flow
import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Block, Value } from 'slate';
import Html from 'slate-html-serializer';
import Plain from 'slate-plain-serializer';
import { CHILD_REQUIRED, CHILD_TYPE_INVALID } from 'slate-schema-violations';

import Toolbar from 'components/NoteEditor/Toolbar';
import ControllPanel from 'components/NoteEditor/ControllPanel';

import {
  rules,
  renderMark,
  renderNode,
  getMarkFromHotkey,
  getTtile,
  getPreview,
} from './utils';
import styles from './note-editor.styl';


const html = new Html({ rules });

class NoteEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.createValue(props),
      showToolbar: false,
    };
  }

  schema = {
    document: {
      nodes: [
        { types: ['h1'], min: 1, max: 1 },
        { types: ['div'], min: 1 },
      ],
      normalize: (change, violation, { node, child, index }) => {
        switch (violation) {
          case CHILD_TYPE_INVALID: {
            return change.setNodeByKey(
              child.key,
              index === 0 ? 'h1' : 'div',
            );
          }
          case CHILD_REQUIRED: {
            const block = Block.create(index === 0 ? 'h1' : 'div');
            return change.insertNodeByKey(node.key, index, block);
          }
        }
      },
    },
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value.id === nextProps.value.id) return;
    this.setState({
      value: this.createValue(nextProps),
    });
  }

  render() {
    const { value, showToolbar } = this.state;
    const { placeholder } = this.props;

    return (
      <div>
        <div className={styles.editor}>
          <Editor
            schema={this.schema}
            placeholder={placeholder}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={renderNode}
            renderMark={renderMark}
            spellCheck
            autoFocus
          />
        </div>
        {showToolbar &&
          <Toolbar
            value={this.state.value}
            changeHandler={this.onChange}
          />
        }
        <ControllPanel
          onClick={this.onSave}
          onDelete={() => null}
          toggleToolbar={this.toggleToolbar}
          openedToolbar={showToolbar}
        />
      </div>
    );
  }

  createValue = (props) => {
    const { fullText = '' } = props.value;
    return html.deserialize(fullText);
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

export default NoteEditor;
