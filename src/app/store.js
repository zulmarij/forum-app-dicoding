import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './states/authUser/reducer';
import isPreloadReducer from './states/isPreload/reducer';
import threadsReducer from './states/threads/reducer';
import usersReducer from './states/users/reducer';
import detailThreadReducer from './states/detailThread/reducer';
import leaderboardsReducer from './states/leaderboards/reducer';

export default configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
  },
});
