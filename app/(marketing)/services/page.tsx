// app/(marketing)/services/page.tsx
"use client"

import React, { Suspense } from 'react';
import ServiceContent from '@/components/services/ServiceContent';

// ページコンポーネント - メインの構造のみを提供
const ServicesPage: React.FC = () => {
  return (
    <Suspense fallback={<ServiceLoading />}>
      <ServiceContent />
    </Suspense>
  );
};

// ローディング状態表示用のコンポーネント
const ServiceLoading = () => (
  <div className="bg-white min-h-screen">
    <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            サービスラインナップ
          </h1>
          <p className="mt-6 text-xl text-white opacity-90 max-w-3xl mx-auto">
            読み込み中...
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ServicesPage;