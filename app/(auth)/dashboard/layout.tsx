// app/(auth)/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavItem[] = [
  { name: 'ダッシュボード', href: '/dashboard', icon: HomeIcon },
  { name: 'サービス', href: '/services', icon: ChartBarIcon },
  { name: '設定', href: '/account', icon: CogIcon },
  { name: 'サポート', href: '/support', icon: QuestionMarkCircleIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userProfile } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* モバイルサイドバー */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link href="/dashboard" className="text-xl font-bold text-[#0056b3] flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0056b3] rounded-md flex items-center justify-center text-white">
                  SC
                </div>
                スマートシティAI
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-[#f0f7ff] text-[#0056b3]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-4 h-6 w-6 ${
                        isActive ? 'text-[#0056b3]' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex-shrink-0 group block w-full text-left"
            >
              <div className="flex items-center">
                <div>
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                    {userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    {userProfile?.displayName || user?.email}
                  </p>
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    <ArrowRightOnRectangleIcon className="mr-1 h-4 w-4" />
                    ログアウト
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 w-14"></div>
      </div>

      {/* デスクトップサイドバー */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link href="/dashboard" className="text-xl font-bold text-[#0056b3] flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0056b3] rounded-md flex items-center justify-center text-white">
                    SC
                  </div>
                  スマートシティAI
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-[#f0f7ff] text-[#0056b3]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-6 w-6 ${
                          isActive ? 'text-[#0056b3]' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      {userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {userProfile?.displayName || user?.email}
                    </p>
                    <div className="flex items-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      <ArrowRightOnRectangleIcon className="mr-1 h-4 w-4" />
                      ログアウト
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* モバイルヘッダー */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-1.5">
            <div>
              <Link href="/dashboard" className="text-lg font-bold text-[#0056b3] flex items-center gap-2">
                <div className="w-7 h-7 bg-[#0056b3] rounded-md flex items-center justify-center text-white">
                  SC
                </div>
                スマートシティAI
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0056b3]"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* ページヘッダー */}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}