import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncLogout } from '../../app/states/authUser/action';

export default function Navbar() {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogout()).then(({ status }) => {
      if (status === 'success') navigate('/login');
    });
  };

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-3xl font-bold">Forum App</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/leaderbords">Leaderbords</Link>
          </li>
          {authUser ? (
            <li>
              <button type="button" onClick={onLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}
