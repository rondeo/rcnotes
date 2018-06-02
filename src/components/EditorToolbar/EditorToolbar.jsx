import React from 'react';

import ControllButton from './ControllButton';

import styles from './editor-toolbar.styl';

type Props = {
  value: object,
  changeHandler: (value: object) => void,
}

const EditorToolbar = ({ value, changeHandler }: Props) => {
  const DEFAULT_NODE = 'paragraph';

  const hasMark = type => value.activeMarks.some(mark => mark.type === type);

  const hasBlock = type => value.blocks.some(node => node.type === type);

  const onClickMark = (event, type) => {
    event.preventDefault();
    const change = value.change().toggleMark(type);
    changeHandler(change);
  };

  const onClickBlock = (event, type) => {
    event.preventDefault();
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    changeHandler(change);
  };

  const renderMarkButton = (type, icon) => {
    const active = hasMark(type);
    const onClick = event => onClickMark(event, type);

    return <ControllButton active={active} onClick={onClick} icon={icon} />;
  };

  const renderBlockButton = (type, icon) => {
    let active = hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const parent = value.document.getParent(value.blocks.first().key);
      active = hasBlock('list-item') && parent && parent.type === type;
    }
    const onClick = event => onClickBlock(event, type);

    return <ControllButton active={active} onClick={onClick} icon={icon} />;
  };

  return (
    <div className={styles.wrapper}>
      {renderMarkButton('bold', 'format_bold')}
      {renderMarkButton('italic', 'format_italic')}
      {renderMarkButton('underlined', 'format_underlined')}
      {renderMarkButton('strike', 'strikethrough_s')}
      <br />
      {renderBlockButton('h1', 'text_fields')}
      {renderBlockButton('h2', 'text_fields')}
      {renderBlockButton('h3', 'text_fields')}
      {renderBlockButton('h4', 'text_fields')}
      {renderBlockButton('h5', 'text_fields')}
      <br />
      {renderMarkButton('code', 'code')}
      {renderBlockButton('block-quote', 'format_quote')}
      {renderBlockButton('numbered-list', 'format_list_numbered')}
      {renderBlockButton('bulleted-list', 'format_list_bulleted')}
    </div>
  );
};


export default EditorToolbar;
