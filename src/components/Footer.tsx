import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e0] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-[#5A5A40]" />
              <span className="text-xl font-serif font-bold text-[#1a1a1a]">Libris</span>
            </div>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              Connecting book lovers through a community-driven exchange platform. 
              Share your stories, discover new worlds.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-[#4a4a4a]">
              <li><a href="/" className="hover:text-[#5A5A40]">Browse Books</a></li>
              <li><a href="/about" className="hover:text-[#5A5A40]">Our Mission</a></li>
              <li><a href="/contact" className="hover:text-[#5A5A40]">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-[#4a4a4a]">
              <li><a href="#" className="hover:text-[#5A5A40]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#5A5A40]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#5A5A40]">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#f0f0f0] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-[#9e9e9e]">
            © {new Date().getFullYear()} Libris Exchange. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-[#9e9e9e]">
            <span>Built with passion for literature.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
