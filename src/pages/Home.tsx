import React, { useState, useEffect } from 'react';
import { Book, User, BookRequest } from '../types';
import { storage } from '../lib/storage';
import { Search, Plus, Filter, Book as BookIcon, User as UserIcon, Calendar, Building, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  user: User | null;
}

export default function Home({ user }: HomeProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'my-requests'>('browse');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [publisherFilter, setPublisherFilter] = useState('');
  const [uploaderFilter, setUploaderFilter] = useState<'all' | 'me'>('all');

  // New Book Form
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    publisher: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    setBooks(storage.getBooks());
    setRequests(storage.getRequests());
  }, []);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const book: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title: newBook.title,
      author: newBook.author,
      year: parseInt(newBook.year),
      publisher: newBook.publisher,
      datePublished: new Date().toISOString().split('T')[0],
      uploaderId: user.id,
      uploaderName: user.name,
      description: newBook.description,
      imageUrl: newBook.imageUrl || `https://picsum.photos/seed/${newBook.title}/400/600`,
      status: 'available',
    };

    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    storage.saveBooks(updatedBooks);
    setShowAddForm(false);
    setNewBook({ title: '', author: '', year: '', publisher: '', description: '', imageUrl: '' });
  };

  const handleRequestBook = (book: Book) => {
    if (!user) {
      alert('Please login to request a book');
      return;
    }

    const request: BookRequest = {
      id: Math.random().toString(36).substr(2, 9),
      bookId: book.id,
      bookTitle: book.title,
      requesterId: user.id,
      requesterName: user.name,
      status: 'pending',
      requestDate: new Date().toISOString(),
    };

    const updatedRequests = [...requests, request];
    setRequests(updatedRequests);
    storage.saveRequests(updatedRequests);

    // Update book status
    const updatedBooks = books.map(b => b.id === book.id ? { ...b, status: 'requested' as const } : b);
    setBooks(updatedBooks);
    storage.saveBooks(updatedBooks);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter ? book.year.toString() === yearFilter : true;
    const matchesPublisher = publisherFilter ? book.publisher.toLowerCase().includes(publisherFilter.toLowerCase()) : true;
    const matchesUploader = uploaderFilter === 'me' ? book.uploaderId === user?.id : true;
    
    return matchesSearch && matchesYear && matchesPublisher && matchesUploader;
  });

  const myRequests = requests.filter(req => req.requesterId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4 tracking-tight">
          Exchange Stories, <span className="text-[#5A5A40] italic">Discover Worlds</span>
        </h1>
        <p className="text-[#4a4a4a] max-w-2xl mx-auto text-lg">
          Join our community of book lovers. Share your collection and find your next great read.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e5e5e0] mb-8">
        <button 
          onClick={() => setActiveTab('browse')}
          className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-all ${
            activeTab === 'browse' 
              ? 'border-b-2 border-[#5A5A40] text-[#5A5A40]' 
              : 'text-[#9e9e9e] hover:text-[#4a4a4a]'
          }`}
        >
          Browse Books
        </button>
        {user && (
          <button 
            onClick={() => setActiveTab('my-requests')}
            className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-all ${
              activeTab === 'my-requests' 
                ? 'border-b-2 border-[#5A5A40] text-[#5A5A40]' 
                : 'text-[#9e9e9e] hover:text-[#4a4a4a]'
            }`}
          >
            My Requests
          </button>
        )}
      </div>

      {activeTab === 'browse' ? (
        <div className="space-y-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-[#e5e5e0]">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9e9e9e]" />
              <input 
                type="text" 
                placeholder="Search by title or author..."
                className="w-full pl-10 pr-4 py-2 bg-[#f5f5f0] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5A5A40] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 bg-[#f5f5f0] px-3 py-2 rounded-xl">
                <Calendar className="h-4 w-4 text-[#5A5A40]" />
                <input 
                  type="number" 
                  placeholder="Year"
                  className="bg-transparent border-none text-sm w-16 focus:ring-0 p-0"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 bg-[#f5f5f0] px-3 py-2 rounded-xl">
                <Building className="h-4 w-4 text-[#5A5A40]" />
                <input 
                  type="text" 
                  placeholder="Publisher"
                  className="bg-transparent border-none text-sm w-24 focus:ring-0 p-0"
                  value={publisherFilter}
                  onChange={(e) => setPublisherFilter(e.target.value)}
                />
              </div>

              {user && (
                <select 
                  className="bg-[#f5f5f0] border-none rounded-xl text-sm py-2 px-3 focus:ring-0"
                  value={uploaderFilter}
                  onChange={(e) => setUploaderFilter(e.target.value as any)}
                >
                  <option value="all">All Uploaders</option>
                  <option value="me">My Uploads</option>
                </select>
              )}

              {user && (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-[#5A5A40] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#4a4a30] transition-all shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Book</span>
                </button>
              )}
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <motion.div 
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#e5e5e0]"
                >
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <img 
                      src={book.imageUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        book.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-[#5A5A40] font-medium mb-3">{book.author}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-[#9e9e9e] mb-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{book.year}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <UserIcon className="h-3 w-3" />
                        <span>{book.uploaderName}</span>
                      </span>
                    </div>

                    <p className="text-xs text-[#4a4a4a] line-clamp-2 mb-6 leading-relaxed">
                      {book.description}
                    </p>

                    <button 
                      onClick={() => handleRequestBook(book)}
                      disabled={book.status !== 'available' || book.uploaderId === user?.id}
                      className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                        book.status === 'available' && book.uploaderId !== user?.id
                          ? 'bg-[#f5f5f0] text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {book.uploaderId === user?.id ? 'Your Book' : book.status === 'available' ? 'Request Exchange' : 'Requested'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white inline-block p-8 rounded-full mb-4">
                <BookIcon className="h-12 w-12 text-[#e5e5e0]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">No books found</h3>
              <p className="text-[#9e9e9e]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a]">My Exchange Requests</h2>
          <div className="grid gap-4">
            {myRequests.length > 0 ? (
              myRequests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-3xl border border-[#e5e5e0] flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#f5f5f0] p-3 rounded-2xl">
                      <BookIcon className="h-6 w-6 text-[#5A5A40]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a1a]">{req.bookTitle}</h4>
                      <p className="text-xs text-[#9e9e9e]">Requested on {new Date(req.requestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {req.status === 'pending' && <Clock className="h-4 w-4 text-amber-500" />}
                    {req.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      req.status === 'pending' ? 'text-amber-600' : req.status === 'approved' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#e5e5e0]">
                <p className="text-[#9e9e9e]">You haven't made any requests yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">Add a New Book</h2>
                <form onSubmit={handleAddBook} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Title</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                        value={newBook.title}
                        onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Author</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                        value={newBook.author}
                        onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Year</label>
                      <input 
                        required
                        type="number" 
                        className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                        value={newBook.year}
                        onChange={(e) => setNewBook({...newBook, year: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Publisher</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                        value={newBook.publisher}
                        onChange={(e) => setNewBook({...newBook, publisher: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Image URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40]"
                      value={newBook.imageUrl}
                      onChange={(e) => setNewBook({...newBook, imageUrl: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e9e] ml-2">Description</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-[#f5f5f0] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#5A5A40] resize-none"
                      value={newBook.description}
                      onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 py-4 rounded-2xl text-sm font-bold text-[#4a4a4a] bg-[#f5f5f0] hover:bg-[#e5e5e0] transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 rounded-2xl text-sm font-bold text-white bg-[#5A5A40] hover:bg-[#4a4a30] transition-all shadow-lg shadow-[#5A5A40]/20"
                    >
                      Add Book
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
