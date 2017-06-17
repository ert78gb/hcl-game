import {Actions, ActionTypes} from '../actions/user-register.actions';

export interface State {
  error?: string;
  processing: boolean;
}

export const initialState: State = {
  processing: false
};

export function reducer(state = initialState, action: Actions) {

  switch (action.type) {
    case ActionTypes.REGISTER_USER: {
      return Object.assign({}, state,
        {
          processing: true,
          error: null
        });
    }

    case ActionTypes.REGISTER_USER_SUCCESS: {
      return Object.assign({}, state, initialState);
    }

    case ActionTypes.REGISTER_USER_FAILED: {
      return Object.assign({}, state,
        {
          processing: false,
          error: action.payload
        });
    }

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
