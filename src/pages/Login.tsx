import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../lib/storage';
import { User } from '../types';
import { BookOpen, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#e5e5e0] w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-[#f5f5f0] rounded-3xl mb-4">
            <BookOpen className="h-8 w-8 text-[#5A5A40]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a]">Welcome Back</h1>
          <p className="text-sm text-[#9e9e9e] mt-2">Continue your literary journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-2xl text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
              <input 
                required
                type="email" 
                className="w-full pl-12 pr-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
              <input 
                required
                type="password" 
                className="w-full pl-12 pr-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#5A5A40] text-white rounded-2xl font-bold text-sm hover:bg-[#4a4a30] transition-all shadow-lg shadow-[#5A5A40]/20 flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#4a4a4a]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#5A5A40] font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
