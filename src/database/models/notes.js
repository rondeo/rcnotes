const notes = {
  table: 'notes',
  options: {
    keyPath: 'id',
    autoIncrement: true,
  },
  indexes: {
    title: { unique: false },
  },
};

export default notes;
