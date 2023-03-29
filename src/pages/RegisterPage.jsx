import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../app/states/users/action';
import { useInput } from '../hooks';

export default function RegisterPage() {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async () => {
    dispatch(asyncRegisterUser({ name, email, password })).then(
      ({ status }) => {
        if (status === 'success') navigate('/login');
      },
    );
  };

  return (
    <section className="flex justify-center items-center h-[calc(100vh-7rem)]">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body gap-3">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={name}
            onChange={setName}
          />
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={setEmail}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={setPassword}
          />
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={onRegister}
          >
            Register
          </button>
          <p>
            Already have an account?
            {' '}
            <Link className="link font-bold" to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
