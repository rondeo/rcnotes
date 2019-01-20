// @flow
/* eslint-disable import/prefer-default-export */

type placeholdersType = {
  title: string,
  text: string,
}

const placeholders: Array<placeholdersType> = [
  {
    title: 'I solemnly swear',
    text: 'That I am up to no good',
  },
  {
    title: 'Great new note',
    text: 'Relax and write something',
  },
  {
    title: 'Сome up with a name',
    text: 'Аnd just start writing',
  },
  {
    title: 'Just start',
    text: 'A good text does not write itself',
  },
  {
    title: 'A long time ago',
    text: 'In a galaxy far, far away...',
  },
  {
    title: 'Once upon a time',
    text: 'And they all lived happily ever after',
  },
];

export function getRandomPlaceholder(): placeholdersType {
  const index = Math.round(Math.random() * (placeholders.length - 1));
  return placeholders[index];
}

export function downloadFile(data: string, filename: string, type: string) {
  const file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}


export function readFile(file) {
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');

  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = event => reject(event);
  });
}
