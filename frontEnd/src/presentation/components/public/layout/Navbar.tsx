'use client';

import { Menu, X, Languages } from 'lucide-react'; // Added Languages icon
import * as Icons from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useWebSettings } from '@/src/presentation/context/WebSettingContext';
import CartIcon from './CartIcon';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Image from 'next/image';
import { useTranslation } from '@/src/presentation/context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currUser } = useAuth();
  const router = useRouter();
  const { t, setLanguage, language } = useTranslation();
  
  const { settings, loading } = useWebSettings();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DynamicIcon = (settings?.headerIcon && (Icons as any)[settings.headerIcon]) 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (Icons as any)[settings.headerIcon] 
    : Icons.BookOpen;

  // Helper to toggle language
  const toggleLanguage = () => setLanguage(language === 'en' ? 'vi' : 'en');

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => router.push("/")}
          >
            {settings?.logoUrl ? (
              <div className="relative h-8 w-8">
                <Image 
                  src={settings.logoUrl} 
                  alt="Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            ) : (
              <DynamicIcon className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
            )}

            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              {loading ? "..." : (settings?.webName || "BookHaven")}
            </span>
          </div>

          {/* Desktop Search */}
          <SearchBar />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language Toggle Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Languages className="h-4 w-4 text-indigo-500" />
              <span>{language === 'en' ? 'Tiếng Việt' : 'English'}</span>
            </button>

            <CartIcon />

            {currUser ? (
              <div className="flex items-center gap-4">
                <UserMenu />
              </div>
            ) : (
              <button 
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
                onClick={() => router.push('/auth')}
              >
                {t.auth.login}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             {/* Small Language Toggle for Mobile Header */}
             <button onClick={toggleLanguage} className="p-1 text-gray-500">
                <span className="text-xs font-bold uppercase">{language}</span>
             </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-xl">
          <SearchBar />
          <div className="flex flex-col space-y-3 font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600">Categories</a>
            <a href="#" className="hover:text-indigo-600">New Arrivals</a>
            
            {/* Language Toggle in Mobile List */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-indigo-600 pt-2 border-t border-gray-50"
            >
              <Languages className="h-5 w-5" />
              Switch to {language === 'en' ? 'Tiếng Việt' : 'English'}
            </button>
          </div>
          <hr />
        </div>
      )}
    </nav>
  );
};