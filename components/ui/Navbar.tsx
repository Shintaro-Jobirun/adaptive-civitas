// components/ui/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import Image from 'next/image';

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: 'サービス', href: '/services' },
  { name: '導入事例', href: '/case-studies' },
  { name: '料金プラン', href: '/pricing' },
  { name: '会社概要', href: '/about' },
  { name: 'お問い合わせ', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-[#0056b3] flex items-center gap-2">
                {/* プレースホルダーとしてのロゴ - 実際のロゴに置き換える */}
                <div className="w-8 h-8 bg-[#0056b3] rounded-md flex items-center justify-center text-white">
                  SC
                </div>
                スマートシティAI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-[#0056b3] text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <Link href="/dashboard">
                <Button variant="secondary">ダッシュボード</Button>
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link href="/auth/login">
                  <Button variant="outline">ログイン</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary">無料登録</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0056b3]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">メニューを開く</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-[#f0f7ff] border-[#0056b3] text-[#0056b3]'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            {user ? (
              <Link href="/dashboard" className="w-full">
                <Button variant="secondary" fullWidth>
                  ダッシュボード
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col w-full space-y-2">
                <Link href="/auth/login" className="w-full">
                  <Button variant="outline" fullWidth>
                    ログイン
                  </Button>
                </Link>
                <Link href="/auth/signup" className="w-full">
                  <Button variant="primary" fullWidth>
                    無料登録
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;