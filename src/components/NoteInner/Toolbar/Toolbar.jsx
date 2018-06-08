// @flow
import React from 'react';
import cx from 'classnames';
import Quill from 'quill';
import icons from 'quill/ui/icons';
import ControllButton from 'components/NoteInner/ControllButton';
import DropdownToolbar from 'components/NoteInner/DropdownToolbar';

import styles from './toolbar.styl';


const HEADRS = [2, 3, 4, 5];
const COLORS = {
  red: '#ce0d07',
  pink: '#f8a2b0',
  orange: '#fa8008',
  yellow: '#ffb74c',
  green: '#60892f',
  lightBlue: '#6db8bb',
  blue: '#05647a',
  purple: '#9b57c1',
  black: '',
  gray: '#c4c4c4',
  white: '#ffffff',
};

Object.keys(icons).map(objectKey => icons[objectKey] = false);

type Props = {
  open: boolean,
}

const EditorToolbar = ({ open }) => (
  <div className={cx(styles.wrapper, open && styles.wrapperOpen)} id="toolbar">
    <ControllButton type="bold" icon="format_bold" />
    <ControllButton type="italic" icon="format_italic" />
    <ControllButton type="underline" icon="format_underlined" />
    <ControllButton type="strike" icon="format_strikethrough"/>

    <DropdownToolbar type="header" icon="text_fields" title="Font size">
      {HEADRS.map((item, index) => (
        <ControllButton type="header" value={item} icon="text_fields" key={index} />
      ))}
    </DropdownToolbar>

    <DropdownToolbar type="color" icon="format_color_text" title="Text color">
      {Object.values(COLORS).map(key => (
        <ControllButton type="color" value={key} color key={key} />
      ))}
    </DropdownToolbar>

    <DropdownToolbar type="background" icon="format_color_fill" title="Text fill color">
      {Object.values(COLORS).map(key => (
        <ControllButton type="background" value={key} color key={key} />
      ))}
    </DropdownToolbar>

    <ControllButton type="blockquote" icon="format_quote" />
    <ControllButton type="code" icon="code" />
    <ControllButton type="code-block" icon="settings_ethernet" />
    <ControllButton type="list" value="ordered" icon="format_list_numbered" />
    <ControllButton type="list" value="bullet" icon="format_list_bulleted" />
    <ControllButton type="indent" value="-1" icon="format_indent_decrease" />
    <ControllButton type="indent" value="+1" icon="format_indent_increase" />

    <ControllButton type="clean" icon="format_clear" />
  </div>
);

export default EditorToolbar;
