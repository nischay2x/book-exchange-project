import { Book, User, BookRequest, ContactMessage } from '../types';

const STORAGE_KEYS = {
  BOOKS: 'libris_books',
  USERS: 'libris_users',
  REQUESTS: 'libris_requests',
  CONTACTS: 'libris_contacts',
  CURRENT_USER: 'libris_current_user',
};

const SEED_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    publisher: 'Scribner',
    datePublished: '1925-04-10',
    uploaderId: 'admin-1',
    uploaderName: 'Admin',
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    imageUrl: 'https://picsum.photos/seed/gatsby/400/600',
    status: 'available',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    publisher: 'J.B. Lippincott & Co.',
    datePublished: '1960-07-11',
    uploaderId: 'user-1',
    uploaderName: 'John Doe',
    description: 'A classic novel about racial injustice and the loss of innocence.',
    imageUrl: 'https://picsum.photos/seed/mockingbird/400/600',
    status: 'available',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    publisher: 'Secker & Warburg',
    datePublished: '1949-06-08',
    uploaderId: 'admin-1',
    uploaderName: 'Admin',
    description: 'A dystopian social science fiction novel and cautionary tale.',
    imageUrl: 'https://picsum.photos/seed/1984/400/600',
    status: 'available',
  },
];

const SEED_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    password: 'password123',
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    password: 'password123',
    address: '123 Book St, Library City',
  },
];

export const storage = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(SEED_BOOKS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
    }
  },

  getBooks: (): Book[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKS) || '[]'),
  saveBooks: (books: Book[]) => localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books)),
  
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (users: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)),

  getRequests: (): BookRequest[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]'),
  saveRequests: (requests: BookRequest[]) => localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests)),

  getContacts: (): ContactMessage[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || '[]'),
  saveContacts: (contacts: ContactMessage[]) => localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts)),

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
};
