'use client';
import { BookOpen, Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currUser } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Bookie
            </span>
          </div>

          {/* Desktop Search (Centered) */}
          <SearchBar />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <CartIcon />

            {currUser ? (
              <div className="flex items-center gap-4">
                <UserMenu />
              </div>
            ) : (
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
                onClick={() => router.push('/auth')}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded-lg py-2 px-4 text-sm outline-none"
          />
          <div className="flex flex-col space-y-3 font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600">Categories</a>
            <a href="#" className="hover:text-indigo-600">New Arrivals</a>
            <a href="#" className="hover:text-indigo-600">Best Sellers</a>
          </div>
          <hr />
        </div>
      )}
    </nav>
  );
};