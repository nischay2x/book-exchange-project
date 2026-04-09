import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { BookOpen, LogOut, User as UserIcon, Shield } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

import { useState } from 'react';

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setMobileOpen(false);
  };

  const handleMobileToggle = () => setMobileOpen((open) => !open);
  const handleMobileClose = () => setMobileOpen(false);

  return (
    <nav className="bg-white border-b border-[#e5e5e0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={handleMobileClose}>
            <BookOpen className="h-8 w-8 text-[#5A5A40]" />
            <span className="text-2xl font-serif font-bold text-[#1a1a1a] tracking-tight">Libris</span>
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
            onClick={handleMobileToggle}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6 text-[#5A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-[#4a4a4a] hover:text-[#5A5A40] transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-[#4a4a4a] hover:text-[#5A5A40] transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-[#4a4a4a] hover:text-[#5A5A40] transition-colors">Contact</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 text-sm font-medium text-amber-700 hover:text-amber-800">
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 px-3 py-1 bg-[#f5f5f0] rounded-full">
                  <UserIcon className="h-4 w-4 text-[#5A5A40]" />
                  <span className="text-xs font-semibold text-[#5A5A40]">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-[#4a4a4a] hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-[#4a4a4a] hover:text-[#5A5A40]">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-[#5A5A40] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#4a4a30] transition-all shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40" onClick={handleMobileClose}>
          <div
            className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-6 flex flex-col space-y-6 animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="self-end mb-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
              onClick={handleMobileClose}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6 text-[#5A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link to="/" className="text-base font-medium text-[#4a4a4a] hover:text-[#5A5A40]" onClick={handleMobileClose}>Home</Link>
            <Link to="/about" className="text-base font-medium text-[#4a4a4a] hover:text-[#5A5A40]" onClick={handleMobileClose}>About</Link>
            <Link to="/contact" className="text-base font-medium text-[#4a4a4a] hover:text-[#5A5A40]" onClick={handleMobileClose}>Contact</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-2 text-base font-medium text-amber-700 hover:text-amber-800" onClick={handleMobileClose}>
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 px-3 py-1 bg-[#f5f5f0] rounded-full">
                  <UserIcon className="h-4 w-4 text-[#5A5A40]" />
                  <span className="text-xs font-semibold text-[#5A5A40]">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 p-2 text-[#4a4a4a] hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-base font-medium text-[#4a4a4a] hover:text-[#5A5A40]" onClick={handleMobileClose}>Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-[#5A5A40] text-white px-4 py-2 rounded-full text-base font-medium hover:bg-[#4a4a30] transition-all shadow-sm"
                  onClick={handleMobileClose}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
