import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Payment() {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a]">Premium Membership</h1>
          <p className="text-sm text-[#9e9e9e] mt-2">Support the community and get unlimited exchanges</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#e5e5e0]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">Payment Successful!</h2>
                <p className="text-[#4a4a4a]">Welcome to Libris Premium.</p>
                <a href="/" className="mt-8 inline-block text-[#5A5A40] font-bold hover:underline">Back to Home</a>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Cardholder Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
                    <input 
                      required
                      type="text" 
                      className="w-full pl-12 pr-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Expiry Date</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">CVV</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-4 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 py-4 border-t border-[#f0f0f0]">
                  <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e]">
                    <Lock className="h-3 w-3" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e]">
                    <ShieldCheck className="h-3 w-3" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#5A5A40] text-white rounded-2xl font-bold text-sm hover:bg-[#4a4a30] transition-all shadow-lg shadow-[#5A5A40]/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Pay $9.99</span>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
