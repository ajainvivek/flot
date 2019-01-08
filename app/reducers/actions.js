import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  videos: [],
  count: 0
}];

const actionsMap = {
  [ActionTypes.ADD_PLAYING_VIDEO](state, action) {
    return [];
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
