import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { loginActionCreator } from '../authUser/action';

const ActionType = {
  IS_PRELOAD: 'IS_PRELOAD',
};

function isPreloadActionCreator(isPreload) {
  return {
    type: ActionType.IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncIsPreload() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const user = await api.getOwnProfile();
      dispatch(loginActionCreator(user));
    } catch (error) {
      dispatch(loginActionCreator(null));
    } finally {
      dispatch(isPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  isPreloadActionCreator,
  asyncIsPreload,
};
