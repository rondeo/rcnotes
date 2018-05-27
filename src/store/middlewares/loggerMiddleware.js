export default store => next => (action) => {
  next(action);
  console.log('---- LOGGER ---');
  console.log('action: ', action);
  console.log('store: ', store.getState());
  console.log('---- LOGGER ---');
};
