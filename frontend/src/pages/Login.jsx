import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // No backend authentication yet, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white/10 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="flex flex-col items-center text-center text-white">
          <ShieldCheckIcon className="w-16 h-16 text-sky-400" />
          <h1 className="mt-4 text-4xl font-bold tracking-wider">
            GearGuard
          </h1>
          <p className="text-sm text-slate-300">Admin Dashboard</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@example.com"
              className="block w-full px-4 py-3 mt-1 text-white bg-white/10 border border-slate-600 rounded-lg shadow-sm appearance-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-1 text-white bg-white/10 border border-slate-600 rounded-lg shadow-sm appearance-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-bold text-white uppercase bg-sky-500 border border-transparent rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
