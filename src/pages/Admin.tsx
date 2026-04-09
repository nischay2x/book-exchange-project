import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { User, BookRequest, ContactMessage } from '../types';
import { Users, BookOpen, MessageSquare, CheckCircle, XCircle, Shield, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [activeView, setActiveView] = useState<'users' | 'requests' | 'contacts'>('users');

  useEffect(() => {
    setUsers(storage.getUsers());
    setRequests(storage.getRequests());
    setContacts(storage.getContacts());
  }, []);

  const handleRequestStatus = (requestId: string, status: 'approved' | 'rejected') => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    storage.saveRequests(updatedRequests);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-3 mb-12">
        <div className="bg-amber-100 p-3 rounded-2xl">
          <Shield className="h-8 w-8 text-amber-700" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a]">Admin Dashboard</h1>
          <p className="text-sm text-[#9e9e9e]">Manage users, requests, and community messages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveView('users')}
            className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
              activeView === 'users' ? 'bg-[#5A5A40] text-white shadow-lg' : 'bg-white text-[#4a4a4a] hover:bg-[#f5f5f0]'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Registered Users</span>
          </button>
          <button 
            onClick={() => setActiveView('requests')}
            className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
              activeView === 'requests' ? 'bg-[#5A5A40] text-white shadow-lg' : 'bg-white text-[#4a4a4a] hover:bg-[#f5f5f0]'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Exchange Requests</span>
          </button>
          <button 
            onClick={() => setActiveView('contacts')}
            className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
              activeView === 'contacts' ? 'bg-[#5A5A40] text-white shadow-lg' : 'bg-white text-[#4a4a4a] hover:bg-[#f5f5f0]'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Contact Messages</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div 
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-[#e5e5e0] overflow-hidden shadow-sm"
          >
            {activeView === 'users' && (
              <div className="divide-y divide-[#f0f0f0]">
                <div className="p-8 bg-[#fcfcfb]">
                  <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Community Members</h3>
                </div>
                {users.map((user) => (
                  <div key={user.id} className="p-8 flex items-center justify-between hover:bg-[#fcfcfb] transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-[#f5f5f0] rounded-2xl flex items-center justify-center font-bold text-[#5A5A40]">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a]">{user.name}</h4>
                        <div className="flex items-center space-x-3 text-xs text-[#9e9e9e] mt-1">
                          <span className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Shield className="h-3 w-3" />
                            <span className="capitalize">{user.role}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {user.address && (
                      <div className="hidden md:flex items-center space-x-2 text-xs text-[#4a4a4a] bg-[#f5f5f0] px-3 py-1.5 rounded-full">
                        <MapPin className="h-3 w-3 text-[#5A5A40]" />
                        <span>{user.address}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeView === 'requests' && (
              <div className="divide-y divide-[#f0f0f0]">
                <div className="p-8 bg-[#fcfcfb]">
                  <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Exchange Requests</h3>
                </div>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <div key={req.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fcfcfb] transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-[#f5f5f0] rounded-2xl flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-[#5A5A40]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1a1a1a]">{req.bookTitle}</h4>
                          <p className="text-xs text-[#9e9e9e]">Requested by <span className="text-[#5A5A40] font-semibold">{req.requesterName}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                          req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                          req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status}
                        </span>
                        
                        {req.status === 'pending' && (
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleRequestStatus(req.id, 'approved')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                            >
                              <CheckCircle className="h-6 w-6" />
                            </button>
                            <button 
                              onClick={() => handleRequestStatus(req.id, 'rejected')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <XCircle className="h-6 w-6" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center text-[#9e9e9e]">No requests to manage</div>
                )}
              </div>
            )}

            {activeView === 'contacts' && (
              <div className="divide-y divide-[#f0f0f0]">
                <div className="p-8 bg-[#fcfcfb]">
                  <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Community Messages</h3>
                </div>
                {contacts.length > 0 ? (
                  contacts.map((msg) => (
                    <div key={msg.id} className="p-8 hover:bg-[#fcfcfb] transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-[#f5f5f0] rounded-xl flex items-center justify-center font-bold text-[#5A5A40]">
                            {msg.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1a1a1a]">{msg.name}</h4>
                            <p className="text-xs text-[#9e9e9e]">{msg.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#9e9e9e] font-bold uppercase tracking-widest">
                          {new Date(msg.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="bg-[#fcfcfb] p-4 rounded-2xl border border-[#f0f0f0]">
                        <p className="text-sm text-[#4a4a4a] leading-relaxed italic">"{msg.message}"</p>
                      </div>
                      <div className="mt-3 flex items-center space-x-2 text-[10px] text-[#9e9e9e] font-bold uppercase tracking-widest">
                        <MapPin className="h-3 w-3" />
                        <span>{msg.address}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center text-[#9e9e9e]">No messages yet</div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
