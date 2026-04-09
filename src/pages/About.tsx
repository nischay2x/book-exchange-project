import { BookOpen, Heart, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-6">Our Story</h1>
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            Libris was born from a simple idea: books are meant to be shared, not just stored. 
            We believe every book has a journey, and our platform is the map that connects readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl inline-block shadow-sm border border-[#e5e5e0]">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Community First</h3>
            <p className="text-[#4a4a4a] text-sm leading-relaxed">
              We're building a network of trust where book lovers can exchange their favorite titles 
              without the barriers of traditional commerce.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl inline-block shadow-sm border border-[#e5e5e0]">
              <Globe className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Sustainability</h3>
            <p className="text-[#4a4a4a] text-sm leading-relaxed">
              By exchanging books, we reduce waste and promote a circular economy for literature. 
              Give your books a second, third, and fourth life.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-[#e5e5e0] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-6">How it Works</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-[#f5f5f0] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#5A5A40]">1</div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">List your Books</h4>
                  <p className="text-sm text-[#4a4a4a]">Upload details of books you're willing to exchange with others.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-[#f5f5f0] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#5A5A40]">2</div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Browse & Request</h4>
                  <p className="text-sm text-[#4a4a4a]">Find books you're interested in and send an exchange request.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-[#f5f5f0] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#5A5A40]">3</div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Connect & Exchange</h4>
                  <p className="text-sm text-[#4a4a4a]">Once approved, coordinate the exchange and enjoy your new read!</p>
                </div>
              </div>
            </div>
          </div>
          <BookOpen className="absolute -bottom-10 -right-10 h-64 w-64 text-[#f5f5f0] -rotate-12" />
        </div>
      </div>
    </div>
  );
}
