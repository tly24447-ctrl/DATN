'use client';
import { UserEntity } from '@/src/domain/entity/user.entity';
import { AuthService } from '@/src/presentation/services/auth.service';
import { AppProviders } from '@/src/provider/provider';
import { BookOpen, LogOut, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [currUser, setCurrUser] = useState<UserEntity | null>(null);
  const router = useRouter();
  // Sync user state with AuthService
  useEffect(() => {
    console.log('Current user:', user);
    if (user) {
      AppProviders.GetUserByEmailUseCase.execute(user.email || '').then(setCurrUser).catch(console.error);
    }
  }, [user]);

  const handleLogout = async () => {
    await AuthService.logout();
    window.location.reload(); // Refresh to clear state
  };

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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by title, author..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative cursor-pointer hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {currUser?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                    {currUser?.name?.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
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
          {user ? (
            <button onClick={handleLogout} className="w-full text-left text-red-500 font-medium">
              Logout
            </button>
          ) : (
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold">
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};