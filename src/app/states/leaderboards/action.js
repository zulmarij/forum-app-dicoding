import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

function getLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.GET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    const { status, message, data: { leaderboards } } = await api.getLeaderboards();
    if (status === 'success') dispatch(getLeaderboardsActionCreator(leaderboards));
    dispatch(hideLoading());

    return { status, message };
  };
}

export {
  ActionType,
  getLeaderboardsActionCreator,
  asyncGetLeaderboards,
};
