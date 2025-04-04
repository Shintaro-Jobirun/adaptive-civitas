// app/(marketing)/contact/page.tsx
'use client';

import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* ヘッダー */}
      <div className="bg-[#0056b3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              お問い合わせ
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
              スマートシティソリューションについてのご質問や導入のご相談など、
            </p>
            <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* コンタクト情報 */}
              <div className="relative overflow-hidden py-10 px-6 bg-[#0056b3] sm:px-10 lg:col-span-1">
                <div className="absolute inset-0 pointer-events-none">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width="404"
                    height="404"
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          className="text-blue-500"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="404"
                      height="404"
                      fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white">お問い合わせ先</h3>
                  <p className="mt-6 text-base text-blue-50 max-w-3xl">
                    サービスの導入やカスタマイズについてのご相談、価格のお見積り、デモのご依頼など、お気軽にお問い合わせください。
                  </p>
                  <dl className="mt-8 space-y-6">
                    <dt>
                      <span className="sr-only">会社名</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="ml-3">合同会社JOBIRUN</span>
                    </dd>
                    <dt>
                      <span className="sr-only">住所</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="ml-3">
                        〒010-0923
                        <br />
                        秋田県秋田市保戸野金砂町４ー３１
                      </span>
                    </dd>
                    <dt>
                      <span className="sr-only">ウェブサイト</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="ml-3">
                        <a href="https://jobirun.com" className="text-blue-100 hover:text-white">
                          https://jobirun.com
                        </a>
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              {/* Google Form の埋め込み */}
              <div className="py-10 px-6 sm:px-10 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h3>
                
                <div className="w-full">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLScdW6g5EdL4tn25yYbCt-I7dCaKjD4rxskbGKhBh-ZSX3C0Jw/viewform?embedded=true" 
                    width="100%" 
                    height="1000" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="border-0 shadow-sm rounded-lg"
                  >
                    読み込んでいます…
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* フッター */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 会社情報 */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">
                <a href="/" className="hover:text-blue-300 transition-colors">
                合同会社JOBIRUN
                </a>
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                〒010-0923<br />
                秋田県秋田市保戸野金砂町４ー３１
              </p>
              <p className="text-gray-300 text-sm">
                <a href="https://jobirun.com" className="hover:text-blue-300 transition-colors">
                  https://jobirun.com
                </a>
              </p>
            </div>
            
            {/* 会社情報 */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">会社情報</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
                    トップページ
                  </a>
                </li>
                <li>
                  <a href="https://jobirun.com" className="text-gray-300 hover:text-white text-sm transition-colors">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            
            {/* 地域活性化 */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-blue-300">地域活性化</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/services/traffic" className="text-gray-300 hover:text-white text-sm transition-colors">
                    交通ソリューション
                  </a>
                </li>
                <li>
                  <a href="/services/economic" className="text-gray-300 hover:text-white text-sm transition-colors">
                    地域経済活性化
                  </a>
                </li>
              </ul>
            </div>

            {/* 地域資源管理 */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-green-300">地域資源管理</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/services/environment" className="text-gray-300 hover:text-white text-sm transition-colors">
                    環境モニタリング
                  </a>
                </li>
                <li>
                  <a href="/services/energy" className="text-gray-300 hover:text-white text-sm transition-colors">
                    エネルギー最適化
                  </a>
                </li>
                <li>
                  <a href="/services/infrastructure" className="text-gray-300 hover:text-white text-sm transition-colors">
                    スマートインフラ管理
                  </a>
                </li>
                <li>
                  <a href="/services/security" className="text-gray-300 hover:text-white text-sm transition-colors">
                    防災・セキュリティ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} JOBIRUN LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}