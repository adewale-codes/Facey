"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => (
  <footer className="bg-white text-gray-800">
    <div className="flex justify-center items-center text-center pt-8 border-t border-gray-200">
      <div className="text-bold text-2xl">
        <Link href="/" className="text-green-700 hover:text-green-800">
          <Image
            src="/logos/logo.png"
            alt="Facey Clinic Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Top block */}
      <div className="border-t border-gray-200 pt-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Mailing List */}
          <div>
            <h3 className="text-xl text-green-800 mb-2">
              Join our mailing list
            </h3>
            <hr className="border-gray-200 mb-4" />
            <p className="text-sm text-gray-600">
              Be part of the Face Weybridge community &mdash; sign up to our
              mailing list for the latest updates, expert advice, and exclusive
              member-only offers..
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-4">
              <label htmlFor="footer-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your@emailaddress.com"
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-green-700 text-white uppercase font-medium px-6 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg text-green-800 mb-2">Navigation</h4>
            <hr className="border-gray-200 mb-4" />
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/clinic" className="hover:text-green-700">
                  Clinic
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-700">
                  About
                </Link>
              </li>
              {/* add more as needed */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg text-green-800 mb-2">Contact</h4>
            <hr className="border-gray-200 mb-4" />
            <ul className="space-y-2 text-sm">
              <li>TEL: 01932 943044</li>
              <li>WHATSAPP: 07368309335</li>
              <li>EMAIL: info@faceweybridge.co.uk</li>
            </ul>
            {/* <img
              src="/logos/10.png"
              alt="Care Quality Commission"
              className="mt-4 h-10 w-auto"
            /> */}
          </div>

          {/* Location */}
          <div>
            <h4 className="text-lg text-green-800 mb-2">Location</h4>
            <hr className="border-gray-200 mb-4" />
            <address className="not-italic text-sm space-y-1">
              71 QUEENS ROAD
              <br />
              WEYBRIDGE
              <br />
              LONDON
              <br />
              KT13 9UQ
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <ul className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <li>
            <Link href="/terms" className="hover:text-green-700">
              Terms &amp; Conditions
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-green-700">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/complaints" className="hover:text-green-700">
              Complaints Policy
            </Link>
          </li>
          {/* <li>
            <Link href="/safety" className="hover:text-green-700">
              Safety &amp; Quality
            </Link>
          </li>
          <li>
            <Link href="/shipping" className="hover:text-green-700">
              Shipping &amp; Returns
            </Link>
          </li> */}
        </ul>
        <p className="text-gray-600">
          Copyright 2024 Facey Clinic. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
