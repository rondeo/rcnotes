import { getRandomPlaceholder } from 'utils';
import { LOCATION_CHANGE } from 'store/constants';
import { NOTE_PLACEHOLDER } from 'store/notes/constants';
import routes from 'routes';

export default store => next => (action) => {
  next(action);

  switch (action.type) {
    case LOCATION_CHANGE: {
      if (action.payload.pathname !== routes.new.path) break;
      const { title, text } = getRandomPlaceholder();
      next({
        ...action,
        type: NOTE_PLACEHOLDER,
        payload: {
          titlePlaceholder: title,
          textPlaceholder: text,
        },
      });
    }
  }
};
