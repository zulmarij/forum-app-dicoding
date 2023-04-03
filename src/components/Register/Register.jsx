import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

export default function Register({ onRegister }) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body gap-3">
          <RegisterForm onRegister={onRegister} />
          <p>
            Already have an account?
            {' '}
            <Link className="link font-bold" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
