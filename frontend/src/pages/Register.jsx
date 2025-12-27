import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheckIcon, UserIcon, LockClosedIcon, EnvelopeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            await register({ name: formData.name, email: formData.email, password: formData.password });
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md p-8 m-4 space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative z-10 transition-all">
                <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl mb-4">
                        <ShieldCheckIcon className="w-12 h-12 text-cyan-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">Join GearGuard and start tracking today</p>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2 text-red-200 text-sm animate-pulse">
                            <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-slate-600 transition-all"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-slate-600 transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-slate-600 transition-all"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 hover:border-slate-600 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-slate-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
