// @flow
import React from 'react';
import cx from 'classnames';

import Icon from 'components/Icon';

import styles from './controll-button.styl';

const DEFAULT_NODE = 'paragraph';

export const ControllButton = ({ active, icon, onClick }) => (
  <button
    type="button"
    className={cx(styles.button, active && styles.button_active)}
    onMouseDown={onClick}
  >
    <Icon type={icon} />
  </button>
);

export const ColorButton = ({ active, color, onClick }) => (
  <button
    type="button"
    className={cx(styles.color, styles[color], active && styles.colorActive)}
    onMouseDown={onClick}
  />
);

export const BlockButton = ({
  type, icon, value, changeHandler,
}) => {
  const hasBlock = eventType => value.blocks.some(node => node.type === eventType);
  const onClickBlock = (event, eventType) => {
    event.preventDefault();
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (eventType !== 'bulleted-list' && eventType !== 'numbered-list') {
      const isActive = hasBlock(eventType);
      const isList = hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : eventType)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : eventType);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === eventType));

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(eventType === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(eventType);
      } else {
        change.setBlocks('list-item').wrapBlock(eventType);
      }
    }

    changeHandler(change);
  };

  let active = hasBlock(type);

  if (['numbered-list', 'bulleted-list'].includes(type)) {
    const parent = value.document.getParent(value.blocks.first().key);
    active = hasBlock('list-item') && parent && parent.type === type;
  }
  const onClick = event => onClickBlock(event, type);

  return <ControllButton active={active} onClick={onClick} icon={icon} />;
};

export const MarkButton = ({
  type, icon, value, changeHandler, mode,
}) => {
  const hasMark = eventType => value.activeMarks.some(mark => mark.type === eventType);
  const onClickMark = (event, eventType) => {
    event.preventDefault();
    const change = value.change().toggleMark(eventType);
    changeHandler(change);
  };

  const active = hasMark(type);
  const onClick = event => onClickMark(event, type);

  if (mode === 'color') {
    return (
      <ColorButton active={active} onClick={onClick} color={type} />
    );
  }

  return <ControllButton active={active} onClick={onClick} icon={icon} />;
};

