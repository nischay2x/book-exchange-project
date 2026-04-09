import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { BookOpen, LogOut, User as UserIcon, Shield } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-[#e5e5e0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-[#5A5A40]" />
            <span className="text-2xl font-serif font-bold text-[#1a1a1a] tracking-tight">Libris</span>
          </Link>

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
    </nav>
  );
}
