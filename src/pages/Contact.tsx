import React, { useState } from 'react';
import { storage } from '../lib/storage';
import { ContactMessage } from '../types';
import { Send, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contacts = storage.getContacts();
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      date: new Date().toISOString(),
    };
    
    storage.saveContacts([...contacts, newMessage]);
    setSubmitted(true);
    setFormData({ name: '', email: '', address: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-6">Get in Touch</h1>
            <p className="text-[#4a4a4a] leading-relaxed">
              Have questions about an exchange? Need help with your account? 
              Our team is here to help you navigate the Libris community.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#e5e5e0]">
                <MapPin className="h-5 w-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9e9e9e]">Address</h4>
                <p className="text-sm text-[#1a1a1a]">123 Library Lane, Booktown, BK 54321</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#e5e5e0]">
                <Mail className="h-5 w-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9e9e9e]">Email</h4>
                <p className="text-sm text-[#1a1a1a]">hello@libris-exchange.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#e5e5e0]">
                <Phone className="h-5 w-5 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#9e9e9e]">Phone</h4>
                <p className="text-sm text-[#1a1a1a]">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#e5e5e0]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">Message Sent!</h2>
                <p className="text-[#4a4a4a]">We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#5A5A40] font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Address</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                    placeholder="123 Street, City"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40] resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#5A5A40] text-white rounded-2xl font-bold text-sm hover:bg-[#4a4a30] transition-all shadow-lg shadow-[#5A5A40]/20 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
