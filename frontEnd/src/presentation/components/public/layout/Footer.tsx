'use client';

import {
  ArrowRight,
  BookOpen,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  Twitter
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <BookOpen className="text-blue-500" size={28} />
              <span className="text-2xl font-bold tracking-tight">BookHaven</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Curating stories that inspire, educate, and transport you. From timeless classics to modern masterpieces, find your next adventure here.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Twitter size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Shop Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/categories/fiction" className="hover:text-white transition-colors">Fiction & Literature</Link></li>
              <li><Link href="/categories/non-fiction" className="hover:text-white transition-colors">Non-Fiction</Link></li>
              <li><Link href="/categories/science" className="hover:text-white transition-colors">Science & Technology</Link></li>
              <li><Link href="/categories/kids" className="hover:text-white transition-colors">Children&apos;s Books</Link></li>
              <li><Link href="/sale" className="text-orange-400 hover:text-orange-300 font-medium">Bestsellers & Deals</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Customer Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0" size={18} />
                <span>123 Literary Ave, Suite 456<br />Booktown, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={18} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <span>support@bookhaven.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Join Our Reader List</h4>
            <p className="text-xs text-slate-500 mb-4 uppercase font-bold tracking-widest">Get 10% off your first order</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors">
                <ArrowRight size={18} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-slate-800 mb-8">
          <div className="flex items-center gap-4">
            <Truck className="text-blue-500" size={32} />
            <div>
              <p className="text-white font-semibold text-sm">Free Shipping</p>
              <p className="text-xs text-slate-500">On all orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-slate-800 md:border-x px-0 md:px-8">
            <ShieldCheck className="text-blue-500" size={32} />
            <div>
              <p className="text-white font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-slate-500">100% protected transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Package className="text-blue-500" size={32} />
            <div>
              <p className="text-white font-semibold text-sm">Easy Returns</p>
              <p className="text-xs text-slate-500">30-day money-back guarantee</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} BookHaven. All rights reserved. Built for bibliophiles.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;