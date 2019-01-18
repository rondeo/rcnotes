// @flow

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