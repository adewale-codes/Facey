"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import MegaMenuTreatment from "./MegaMenuTreatment";

interface NavLink {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
}

const primaryLinks: NavLink[] = [
  { name: "HOME", href: "/" },
  {
    name: "TREATMENT",
    children: [
      { name: "Face", href: "/face" },
      { name: "Hair", href: "/hair" },
      { name: "Body", href: "/body" },
      { name: "Hands", href: "/hand" },
      { name: "Wellness", href: "/wellness" },
      { name: "Concerns", href: "/concern" },
    ],
  },
  {
    name: "ABOUT",
    children: [
      { name: "About Us", href: "/about" },
      { name: "Room Rentals", href: "/rentals" },
      { name: "Malala Fund Charity", href: "/charity" },
    ],
  },
];

const secondaryLinks = [
  { name: "SHOP", href: "/shop" },
  { name: "BOOK NOW", href: "/rentals" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { cart } = useCart();
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/40">
      <div className="max-w-6xl mx-auto px-4">
        {/* ===== MOBILE HEADER: logo left, actions right ===== */}
        <div className="flex h-16 items-center justify-between md:hidden">
          {/* Logo (left) */}
          <Link href="/" className="shrink-0" aria-label="Home">
            <Image
              src="/logos/logo.png"
              alt="Facey Clinic Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Actions (right) */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="px-3 py-2 bg-green-700 text-white text-xs font-medium rounded"
            >
              CART{totalItems > 0 && `(${totalItems})`}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FiX size={24} className="text-white" />
              ) : (
                <FiMenu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ===== DESKTOP HEADER: 3-col grid with centered logo ===== */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center h-16">
          {/* Left nav */}
          <div className="hidden md:flex justify-start">
            {primaryLinks.map((link) => {
              if (link.name === "TREATMENT")
                return <MegaMenuTreatment key="TREATMENT" />;
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href || "#"}
                    className={`px-6 py-4 text-sm font-medium uppercase text-white hover:bg-white/20 transition border-r border-white/40 ${
                      link.name === "ABOUT"
                        ? "border-r border-l border-white/40"
                        : ""
                    }`}
                  >
                    {link.name}
                    {link.children && (
                      <FiChevronDown className="inline-block ml-1 text-white" />
                    )}
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
              );
            })}
          </div>

          {/* Center logo */}
          <div className="hidden md:block justify-self-center">
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
                priority
              />
            </Link>
          </div>

          {/* Right nav */}
          <div className="hidden md:flex items-center justify-end space-x-2">
            {secondaryLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-4 text-sm font-medium uppercase text-white hover:bg-white/20 transition ${
                  idx < secondaryLinks.length - 1
                    ? "border-r border-white/40 border-l"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="px-6 py-4 text-sm font-medium uppercase text-white border-l border-white/40"
            >
              CART{totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu Drawer ===== */}
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
                      href={link.href || "#"}
                      className="py-3 text-gray-800 font-medium uppercase"
                    >
                      {link.name}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() =>
                          setOpenDropdown(isOpen ? null : link.name)
                        }
                        className="py-3 text-gray-800 uppercase text-sm"
                      >
                        {isOpen ? "SEE LESS" : "SEE MORE"}
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
