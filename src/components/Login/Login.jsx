import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function Login({ onLogin }) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body gap-3">
          <LoginForm onLogin={onLogin} />
          <p>
            Dont have an account yet?
            {' '}
            <Link className="link font-bold" to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
