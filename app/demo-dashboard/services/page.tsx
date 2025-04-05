// app/demo-dashboard/services/page.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { servicesData } from '@/app/(marketing)/services/data';
import { Service } from '@/types/servicesTypes';
import { 
  TruckIcon, 
  GlobeAsiaAustraliaIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  UsersIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

// Static URL mappings for each service
const serviceUrlMap: Record<string, string> = {
  'traffic': '/demo-dashboard/services/traffic-monitoring',
  'economic': '/demo-dashboard/services/visitor-analysis',
  'environment': '/demo-dashboard/services/air-quality',
  'energy': '/demo-dashboard/services/energy-optimization',
  'security': '/demo-dashboard/services/anomaly-detection',
  'infrastructure': '/demo-dashboard/services/infrastructure-prediction',
};

// サービスをカテゴリーでグループ化する
const groupedServices = {
  revitalization: servicesData.filter(service => service.category === 'revitalization'),
  resource_management: servicesData.filter(service => service.category === 'resource-management')
};

interface ServiceCardProps {
  service: Service;
  dashboardUrl: string;
}

const ServicesSelectionPage = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-8 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">スマートシティAIダッシュボード</h1>
          </div>
          <div className="flex items-center">
            <div>
              {/* Back to Services Link */}
              <Link href="/" className="flex items-center text-sm p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                トップ画面に戻る　　
              </Link>
            </div>
            <div className="mr-4">
              <span className="text-sm text-gray-500">ようこそ、</span>
              <span className="text-sm font-medium text-gray-900">デモユーザー様</span>
            </div>
            <Link href="/demo-dashboard/login" className="text-sm text-blue-600 hover:text-blue-500">
              ログアウト
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">ご利用中のサービス</h2>
          <p className="mt-2 text-sm text-gray-600">
            ダッシュボードを表示するサービスを選択してください。
          </p>
        </div>
        
        {/* 地域活力創造 */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
            <span className="inline-block bg-blue-600 w-3 h-3 rounded-full mr-2"></span>
            地域活力創造
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedServices.revitalization.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                dashboardUrl={serviceUrlMap[service.id] || '#'}
              />
            ))}
          </div>
        </div>
        
        {/* 地域資源管理 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
            <span className="inline-block bg-green-600 w-3 h-3 rounded-full mr-2"></span>
            地域資源管理
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedServices.resource_management.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                dashboardUrl={serviceUrlMap[service.id] || '#'}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// サービスカードコンポーネント
const ServiceCard: React.FC<ServiceCardProps> = ({ service, dashboardUrl }) => {
  const router = useRouter();
  
  // カテゴリに基づいた背景色と境界線の色を設定
  const bgColor = service.category === 'revitalization' 
    ? 'bg-blue-50 hover:bg-blue-100 border-blue-200' 
    : 'bg-green-50 hover:bg-green-100 border-green-200';
  
  // カテゴリに基づいたアイコンの背景色を設定
  const iconBgColor = service.category === 'revitalization' 
    ? 'bg-gradient-to-br from-[#0056b3] to-[#0078c7]' 
    : 'bg-gradient-to-br from-[#00a86b] to-[#00c47d]';
  
  // サービスIDに基づいて適切なアイコンを選択
  const getServiceIcon = () => {
    switch(service.id) {
      case 'traffic':
        return <TruckIcon className="h-6 w-6 text-white" />;
      case 'economic':
        return <UsersIcon className="h-6 w-6 text-white" />;
      case 'environment':
        return <GlobeAsiaAustraliaIcon className="h-6 w-6 text-white" />;
      case 'energy':
        return <BoltIcon className="h-6 w-6 text-white" />;
      case 'infrastructure':
        return <WrenchScrewdriverIcon className="h-6 w-6 text-white" />;
      case 'security':
        return <ShieldCheckIcon className="h-6 w-6 text-white" />;
      default:
        // デフォルトアイコン
        return service.category === 'revitalization' ? (
          <UsersIcon className="h-6 w-6 text-white" />
        ) : (
          <GlobeAsiaAustraliaIcon className="h-6 w-6 text-white" />
        );
    }
  };
  
  return (
    <Link href={dashboardUrl}>
      <div 
        className={`border rounded-lg ${bgColor} p-6 cursor-pointer transition duration-200 ease-in-out hover:shadow-md`}
      >
        <div className="flex items-start">
          <div className={`p-3 rounded-lg flex items-center justify-center ${iconBgColor} shadow-sm`}>
            {getServiceIcon()}
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900">{service.name}</h4>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{service.description || service.overview}</p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                利用中
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServicesSelectionPage;