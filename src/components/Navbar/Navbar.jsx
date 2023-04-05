import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import NavbarUser from './NavbarUser';
import { isObjectEmpty } from '../../utils';

export default function Navbar({ authUser, onLogout }) {
  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <div className="dropdown">
          <button
            type="button"
            tabIndex="0"
            className="btn btn-ghost lg:hidden"
          >
            <Bars3CenterLeftIcon className="h-6 w-6" />
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box font-bold">
            {!isObjectEmpty(authUser) && (
            <li>
              <NavbarUser {...authUser} />
            </li>
            )}
            <li>
              <Link to="/leaderboards">Leaderboards</Link>
            </li>
            {!isObjectEmpty(authUser) ? (
              <li>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
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
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Forum App
        </Link>
      </div>
      <div className="hidden lg:flex gap-1">
        <ul className="menu menu-horizontal font-bold px-1">
          <li>
            <Link to="/leaderboards">Leaderboards</Link>
          </li>
          {isObjectEmpty(authUser) && (
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
        {!isObjectEmpty(authUser) && (
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={authUser.avatar} alt={authUser.name} />
              </div>
            </button>
            <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box font-bold">
              <li>
                <NavbarUser {...authUser} />
              </li>
              <li>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  authUser: null,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(PropTypes.string.isRequired),
  onLogout: PropTypes.func.isRequired,
};
