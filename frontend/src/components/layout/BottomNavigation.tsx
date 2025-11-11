'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AddButton } from './AddButton';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    route: '/',
  },
  {
    id: 'modules',
    label: 'Modules',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    route: '/modules',
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    route: '/insights',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    route: '/profile',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const isActive = (route: string) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around h-16 px-2 relative">
          {/* Left side nav items */}
          <div className="flex items-center justify-around flex-1">
            {navItems.slice(0, 2).map((item) => {
              const active = isActive(item.route);
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`
                    flex flex-col items-center justify-center flex-1 h-full transition-colors
                    ${active ? 'text-blue-600' : 'text-gray-500'}
                    hover:text-blue-600
                  `}
                >
                  <div className={active ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Center Add Button */}
          <div className="relative z-10">
            <AddButton isOpen={isAddMenuOpen} onToggle={setIsAddMenuOpen} />
          </div>

          {/* Right side nav items */}
          <div className="flex items-center justify-around flex-1">
            {navItems.slice(2).map((item) => {
              const active = isActive(item.route);
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`
                    flex flex-col items-center justify-center flex-1 h-full transition-colors
                    ${active ? 'text-blue-600' : 'text-gray-500'}
                    hover:text-blue-600
                  `}
                >
                  <div className={active ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

