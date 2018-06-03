// @flow
import React from 'react';

import DropdownToolbar from 'components/NoteEditor/DropdownToolbar';
import { MarkButton, BlockButton } from 'components/NoteEditor/ControllButton';

import styles from './toolbar.styl';

type Props = {
  value: object,
  changeHandler: (value: object) => void,
}

const EditorToolbar = ({ value, changeHandler }: Props) => {
  const renderMarkButton = (type, icon) => MarkButton({
    type, icon, value, changeHandler,
  });
  const renderColorButton = type => MarkButton({
    type, value, changeHandler, mode: 'color',
  });
  const renderBlockButton = (type, icon) => BlockButton({
    type, icon, value, changeHandler,
  });

  return (
    <div className={styles.wrapper}>
      {renderMarkButton('bold', 'format_bold')}
      {renderMarkButton('italic', 'format_italic')}
      {renderMarkButton('underlined', 'format_underlined')}
      {renderMarkButton('strike', 'format_strikethrough')}

      <DropdownToolbar icon="text_fields" title="Font size">
        {renderBlockButton('h1', 'text_fields')}
        {renderBlockButton('h2', 'text_fields')}
        {renderBlockButton('h3', 'text_fields')}
        {renderBlockButton('h4', 'text_fields')}
        {renderBlockButton('h5', 'text_fields')}
      </DropdownToolbar>

      <DropdownToolbar icon="format_color_text" title="Text color">
        {renderColorButton('color_red')}
        {renderColorButton('color_pink')}
        {renderColorButton('color_orange')}
        {renderColorButton('color_yellow')}
        {renderColorButton('color_green')}
        {renderColorButton('color_light-blue')}
        {renderColorButton('color_blue')}
        {renderColorButton('color_purple')}
        {renderColorButton('color_black')}
        {renderColorButton('color_gray')}
        {renderColorButton('color_white')}
      </DropdownToolbar>

      <DropdownToolbar icon="format_color_fill" title="Text fill color">
        {renderColorButton('fill_red')}
        {renderColorButton('fill_pink')}
        {renderColorButton('fill_orange')}
        {renderColorButton('fill_yellow')}
        {renderColorButton('fill_green')}
        {renderColorButton('fill_light-blue')}
        {renderColorButton('fill_blue')}
        {renderColorButton('fill_purple')}
        {renderColorButton('fill_black')}
        {renderColorButton('fill_gray')}
        {renderColorButton('fill_white')}
      </DropdownToolbar>

      {renderBlockButton('block-quote', 'format_quote')}
      {renderMarkButton('code', 'code')}
      {renderBlockButton('pre', 'settings_ethernet')}
      {renderBlockButton('numbered-list', 'format_list_numbered')}
      {renderBlockButton('bulleted-list', 'format_list_bulleted')}
      {renderBlockButton('check-list', 'check_box')}
      {renderBlockButton('indent-decrease', 'format_indent_decrease')}
      {renderBlockButton('indent-increase', 'format_indent_increase')}
      {renderBlockButton('attach', 'attach_file')}
    </div>
  );
};


export default EditorToolbar;
