export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  datePublished: string;
  uploaderId: string;
  uploaderName: string;
  description: string;
  imageUrl: string;
  status: 'available' | 'requested' | 'exchanged';
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  role: 'user' | 'admin';
  password?: string; // In a real app, this would be hashed and handled server-side
}

export interface BookRequest {
  id: string;
  bookId: string;
  bookTitle: string;
  requesterId: string;
  requesterName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  address: string;
  message: string;
  date: string;
}
