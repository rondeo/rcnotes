const notes = {
  table: 'notes',
  options: {
    keyPath: 'id',
  },
  indexes: {
    title: { unique: false },
    creationDate: { unique: false },
    editingDate: { unique: false },
  },
};

export default notes;
