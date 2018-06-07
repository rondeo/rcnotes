import React from 'react';
import { isKeyHotkey } from 'is-hotkey';

import commonStyle from 'styles/main.styl';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
  div: 'div',
};

const MARK_TAGS = {
  i: 'italic',
  b: 'bold',
  bold: 'b',
  u: 'underline',
};

export const rules = [
  // Blocks rules
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (!type) return;
      return {
        object: 'block',
        type,
        data: {
          className: el.getAttribute('class'),
        },
        nodes: next(el.childNodes),
      };
    },
    serialize(obj, children) {
      if (obj.object !== 'block') return;
      switch (obj.type) {
        case 'code':
          return (
            <pre>
              <code>{children}</code>
            </pre>
          );
        case 'paragraph':
          return <p className={obj.data.get('className')}>{children}</p>;
        case 'quote':
          return <blockquote>{children}</blockquote>;
        case 'div':
          return <div>{children}</div>;
        case 'block-quote':
          return <blockquote>{children}</blockquote>;
        case 'bulleted-list':
          return <ul>{children}</ul>;
        case 'h1':
          return <h1>{children}</h1>;
        case 'h2':
          return <h2>{children}</h2>;
        case 'h3':
          return <h3>{children}</h3>;
        case 'h4':
          return <h4>{children}</h4>;
        case 'h5':
          return <h5>{children}</h5>;
        case 'list-item':
          return <li>{children}</li>;
        case 'numbered-list':
          return <ol>{children}</ol>;
        case 'div':
          return <div>{children}</div>;
      }
    },
  },

  // Marks rules
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (!type) return;
      return {
        object: 'mark',
        type,
        nodes: next(el.childNodes),
      };
    },
    serialize(obj, children) {
      if (obj.object !== 'mark') return;
      switch (obj.type) {
        case 'bold':
          return <b>{children}</b>;
        case 'italic':
          return <em>{children}</em>;
        case 'underline':
          return <u>{children}</u>;
      }
    },
  },
];

export const renderMark = (props) => {
  const { children, mark, attributes } = props;
  console.log('----- attributes', attributes);
  switch (mark.type) {
    case 'bold':
      return <b >{children}</b>;
    case 'code':
      return <code {...attributes}>{children}</code>;
    case 'italic':
      return <i {...attributes}>{children}</i>;
    case 'underlined':
      return <span className={commonStyle.underlined} {...attributes}>{children}</span>;
    case 'strike':
      return <span className={commonStyle.strike} {...attributes}>{children}</span>;
  }
};

export const renderNode = (props) => {
  const { attributes, children, node } = props;
  switch (node.type) {
    case 'div':
      return <div {...attributes}>{children}</div>;
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
};

export const getMarkFromHotkey = (event) => {
  const isBoldHotkey = isKeyHotkey('mod+b');
  const isItalicHotkey = isKeyHotkey('mod+i');
  const isUnderlinedHotkey = isKeyHotkey('mod+u');
  const isCodeHotkey = isKeyHotkey('mod+`');

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
    mark = null;
  }
  return mark;
};

export const getPreview = (value) => {
  const text = value.document.nodes;
  let preview = '';
  for (let line = 1; line < text.length; line++) {
    console.log('line', line, 'text', text[line].nodes[0]);
    const chunk = text[line].nodes[0].leaves.reduce((summ, current) => summ += current.text, '');
    chunk.trim();
    preview += `${chunk} `;
    if (preview.length > 100) return preview;
  }
  return preview;
};

export const getTtile = (value) => {
  let title = value.document.nodes[0].nodes[0].leaves[0].text;
  title.trim();
  if (!title) {
    title = getPreview(value);
    title = title.substr(0, 50);
  }
  return title;
};
