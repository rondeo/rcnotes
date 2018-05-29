const notes = {
  table: 'notes',
  options: {
    keyPath: 'id',
    autoIncrement: true,
  },
  indexes: {
    title: { unique: false },
    creationDate: { unique: false },
    editingDate: { unique: false },
  },
};

export default notes;
