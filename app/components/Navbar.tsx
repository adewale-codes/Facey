'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

interface NavLink {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
}

const primaryLinks: NavLink[] = [
  { name: 'CLINIC', href: '/clinic' },
  {
    name: 'TREATMENT',
    children: [
      { name: 'Wellness', href: '/wellness' },
      { name: 'Face', href: '/face' },
      { name: 'Hair', href: '/hair' },
      { name: 'Body', href: '/body' },
      { name: 'Hand', href: '/hand' },
      { name: 'Intimate Female Wellness', href: '/intimate' },
    ],
  },
  {
    name: 'ABOUT',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Room Rentals', href: '/rentals' },
      { name: 'Malala Fund Charity', href: '/charity' },
    ],
  },
];

const secondaryLinks: NavLink[] = [
  { name: 'SHOP', href: '/shop' },
  { name: 'BOOK NOW', href: '/book' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { cart } = useCart();

  // calculate total items in cart
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white border-opacity-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Left Nav */}
          <div className="hidden md:flex">
            {primaryLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href || '#'}
                  className={`px-6 py-4 text-sm font-medium uppercase text-white hover:bg-white hover:bg-opacity-20 transition border-r border-white border-opacity-40 ${
                    link.name === 'ABOUT' ? 'border-r border-white border-opacity-40' : ''
                  }`}
                >
                  {link.name}
                  {link.children && <FiChevronDown className="inline-block ml-1 text-white" />}
                </Link>
                {link.children && (
                  <div className="absolute left-0 mt-1 w-48 bg-white text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {child.name.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Logo Center */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-semibold uppercase text-white tracking-widest"
            >
              <Image
                src="/logos/logo.png"
                alt="Facey Clinic Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {secondaryLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href!}
                className={`px-6 py-4 text-sm font-medium uppercase text-white hover:bg-white hover:bg-opacity-20 transition ${
                  idx < secondaryLinks.length - 1 ? 'border-r border-white border-opacity-40 border-l' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="px-6 py-4 text-sm font-medium uppercase text-white border-l border-white border-opacity-40"
            >
              CART{totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/cart"
              className="px-3 py-2 bg-green-700 text-white text-sm font-medium rounded"
            >
              CART{totalItems > 0 && `(${totalItems})`}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 focus:outline-none"
            >
              {mobileOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-2 space-y-1">
            {primaryLinks.map((link) => {
              const hasChildren = !!link.children;
              const isOpen = openDropdown === link.name;
              return (
                <div key={link.name}>
                  <div className="flex justify-between items-center border-b border-gray-200">
                    <Link
                      href={link.href || '#'}
                      className="py-3 text-gray-800 font-medium uppercase"
                    >
                      {link.name}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className="py-3 text-gray-800 uppercase text-sm"
                      >
                        {isOpen ? 'SEE LESS' : 'SEE MORE'}
                      </button>
                    )}
                  </div>
                  {hasChildren && isOpen && (
                    <div className="pl-4">
                      {link.children!.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-gray-600 uppercase"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href!}
                className="block border-b border-gray-200 py-3 uppercase text-gray-800 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Section */}
          <div className="px-4 py-4 border-t border-gray-200 text-gray-800">
            <h2 className="uppercase text-lg font-serif mb-2">Contact</h2>
            <p className="text-sm">TEL: 0203 337 4410</p>
            <p className="text-sm">WHATSAPP: 07511 107 511</p>
            <p className="text-sm">EMAIL: info@drrashaclinic.com</p>
            <button className="mt-4 w-full py-3 bg-green-700 text-white uppercase font-medium">
              BOOK YOUR APPOINTMENT NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
