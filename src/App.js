import React, { useEffect } from 'react';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import ThreadsPage from './pages/ThreadsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncIsPreload } from './app/states/isPreload/action';
import ThreadPage from './pages/ThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import { Navbar } from './components';
import { asyncLogout } from './app/states/authUser/action';

function App() {
  const dispatch = useDispatch();
  const { authUser, isPreload } = useSelector((state) => state);
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogout()).then(({ status }) => {
      if (status === 'success') navigate('/login');
    });
  };

  useEffect(() => {
    dispatch(asyncIsPreload());
  }, []);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Navbar authUser={authUser} onLogout={onLogout} />
      <LoadingBar className="bg-primary h-1 absolute" />
      <main className="mx-auto max-w-7xl p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/threads" />} />
          <Route path="/threads" element={<ThreadsPage />} />
          <Route path="/thread/:id" element={<ThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/login" element={authUser ? <Navigate to="/threads" /> : <LoginPage />} />
          <Route path="/register" element={authUser ? <Navigate to="/threads" /> : <RegisterPage />} />
        </Routes>
      </main>
    </>

  );
}

export default App;
