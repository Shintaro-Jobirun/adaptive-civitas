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
                        〒000-0000
                        <br />
                        ○○県○○市○○町0-0
                      </span>
                    </dd>
                    <dt>
                      <span className="sr-only">電話番号</span>
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="ml-3">TEL: 00-0000-0000</span>
                    </dd>
                    <dt>
                      <span className="sr-only">メールアドレス</span>
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="ml-3">Email: info@example.com</span>
                    </dd>
                  </dl>
                </div>
              </div>

              {/* Google Form の埋め込み */}
              <div className="py-10 px-6 sm:px-10 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h3>
                
                <div className="w-full">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1Qk7MOkGCiPKIw4ZjLZpXmVWh9pgu1g4ztlswNFa5d8k/viewform?embedded=true" 
                    width="100%" 
                    height="800" 
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
    </div>
  );
}