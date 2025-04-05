// components/dashboard/DashboardLayout.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
// Import useRouter and usePathname if they are needed, otherwise remove them.
// import { useRouter, usePathname } from 'next/navigation';

// Define the structure for a single service page entry
interface ServicePage {
  name: string;
  category: 'revitalization' | 'resource-management';
  parentService: string; // This will be used as a key later
  path: string;
}

// Define the structure for the complete service pages object
type ServicePages = {
  [key: string]: ServicePage; // Allows indexing with any string key
};

// Define the structure for a service object after adding the ID
interface Service extends ServicePage {
  id: string;
}

// Define the type for the keys used in parentServiceNames
type ParentServiceKey = 'traffic' | 'economic' | 'security' | 'environment' | 'energy' | 'infrastructure';

// Service page mappings with explicit type
const servicePages: ServicePages = {
  // 地域活性化（revitalization）
  // 交通最適化
  'traffic-monitoring': { name: 'AI交通量計測', category: 'revitalization', parentService: 'traffic', path: '/demo-dashboard/services/traffic-monitoring' },
  'traffic-prediction': { name: '交通予測分析', category: 'revitalization', parentService: 'traffic', path: '/demo-dashboard/services/traffic-prediction' },

  // 地域経済活性化
  'visitor-analysis': { name: '来街者分析・商圏分析', category: 'revitalization', parentService: 'economic', path: '/demo-dashboard/services/visitor-analysis' },
  'tourist-analysis': { name: '観光客行動分析', category: 'revitalization', parentService: 'economic', path: '/demo-dashboard/services/tourist-analysis' },

  // 防災・セキュリティ
  'anomaly-detection': { name: 'AI異常検知', category: 'revitalization', parentService: 'security', path: '/demo-dashboard/services/anomaly-detection' },
  'disaster-prediction': { name: '災害予測・避難支援', category: 'revitalization', parentService: 'security', path: '/demo-dashboard/services/disaster-prediction' },

  // 地域資源管理（resource-management）
  // 環境モニタリング
  'air-quality': { name: '大気質モニタリング', category: 'resource-management', parentService: 'environment', path: '/demo-dashboard/services/air-quality' },
  'noise-monitoring': { name: '騒音・振動モニタリング', category: 'resource-management', parentService: 'environment', path: '/demo-dashboard/services/noise-monitoring' },

  // エネルギー最適化
  'energy-optimization': { name: 'エネルギー消費最適化', category: 'resource-management', parentService: 'energy', path: '/demo-dashboard/services/energy-optimization' },
  'microgrid': { name: '地域マイクログリッド管理', category: 'resource-management', parentService: 'energy', path: '/demo-dashboard/services/microgrid' },

  // スマートインフラ管理
  'infrastructure-prediction': { name: 'インフラ劣化予測', category: 'resource-management', parentService: 'infrastructure', path: '/demo-dashboard/services/infrastructure-prediction' },
  'water-optimization': { name: '上下水道最適化', category: 'resource-management', parentService: 'infrastructure', path: '/demo-dashboard/services/water-optimization' },
};

// サービスをカテゴリごとにグループ化 (Explicitly type the map result as Service)
const revitalizationServices: Service[] = Object.entries(servicePages)
  .filter(([_, service]) => service.category === 'revitalization')
  .map(([id, service]): Service => ({ id, ...service })); // Ensure the mapped object matches the Service interface

const resourceManagementServices: Service[] = Object.entries(servicePages)
  .filter(([_, service]) => service.category === 'resource-management')
  .map(([id, service]): Service => ({ id, ...service })); // Ensure the mapped object matches the Service interface

// Define the structure for grouped services
type GroupedServices = {
  [key: string]: Service[]; // Parent service key maps to an array of Service objects
};

// 親サービスごとのグループ分け (Add types for parameter and return value)
const groupServicesByParent = (services: Service[]): GroupedServices => {
  const grouped: GroupedServices = {}; // Use the defined type
  services.forEach((service: Service) => { // Explicitly type the service parameter
    // Ensure parentService exists before using it as a key
    if (!grouped[service.parentService]) {
      grouped[service.parentService] = [];
    }
    grouped[service.parentService].push(service);
  });
  return grouped;
};

const revitalizationGrouped: GroupedServices = groupServicesByParent(revitalizationServices);
const resourceManagementGrouped: GroupedServices = groupServicesByParent(resourceManagementServices);

// 親サービス名のマッピング (Explicitly type the object keys and values)
const parentServiceNames: { [key in ParentServiceKey]: string } = {
  'traffic': '交通最適化',
  'economic': '地域経済活性化',
  'security': '防災・セキュリティ',
  'environment': '環境モニタリング',
  'energy': 'エネルギー最適化',
  'infrastructure': 'スマートインフラ管理'
};

// Define props for the DashboardLayout component
interface DashboardLayoutProps {
  serviceName: string;
  serviceCategory: 'revitalization' | 'resource-management'; // Use specific categories
  parentService?: string; // Optional parent service key
  currentPage: string; // ID of the current service page
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  serviceName,
  serviceCategory,
  parentService,
  currentPage,
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard'); // Default section

  // カテゴリーに基づいたカラーを設定
  const accentColor = serviceCategory === 'revitalization' ? 'bg-[#0056b3]' : 'bg-[#00a86b]';
  // const accentHoverColor = serviceCategory === 'revitalization' ? 'hover:bg-[#004494]' : 'hover:bg-[#008f5b]'; // Not used, commented out
  const accentLightColor = serviceCategory === 'revitalization' ? 'bg-blue-50' : 'bg-green-50';
  const textAccentColor = serviceCategory === 'revitalization' ? 'text-[#0056b3]' : 'text-[#00a86b]';

  // Helper function to check if a string is a valid ParentServiceKey
  const isParentServiceKey = (key: string): key is ParentServiceKey => {
    return key in parentServiceNames;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans"> {/* Added default font */}
      {/* ヘッダー */}
      <header className={`${accentColor} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 p-1 rounded md:hidden text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Logo/Brand */}
            <Link href="/demo-dashboard/services" className="flex items-center group">
              <svg className="h-8 w-8 mr-2 text-white group-hover:text-gray-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-xl font-bold group-hover:text-gray-200 transition-colors">スマートシティAI</span>
            </Link>
          </div>

          {/* Header Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-1 rounded-full text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-label="Notifications">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 absolute top-0 right-0 ring-2 ring-white"></span>
            </div>

            {/* Back to Services Link */}
            <Link href="/demo-dashboard/services" className="flex items-center text-sm p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              サービス一覧に戻る
            </Link>

            {/* User Profile */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white text-gray-700 flex items-center justify-center overflow-hidden"> {/* Added overflow-hidden */}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:block">デモユーザー</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar (Mobile) */}
        <div
          className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ease-linear ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          role="dialog" // Added role
          aria-modal="true" // Added aria-modal
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>

          {/* Sidebar Panel */}
          <div className={`relative flex-1 flex flex-col max-w-xs w-full ${accentLightColor} transform transition ease-in-out duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Close Button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button" // Added type
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar" // Added aria-label
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="px-4 text-center mb-4">
                <h2 className={`text-lg font-bold ${textAccentColor}`}>{serviceName}</h2>
              </div>

              {/* Other Services Dropdown (Mobile) */}
              <div className="mt-2 px-4">
                <button // Changed div to button for accessibility
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  aria-expanded={servicesDropdownOpen} // Added aria-expanded
                >
                  <span>他のサービスを表示</span>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true" // Added aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {servicesDropdownOpen && (
                  <div className="mt-2 space-y-1 pl-3">
                    {/* Revitalization Services */}
                    <div className="py-2">
                      <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">地域活性化</h4>
                      {Object.entries(revitalizationGrouped).map(([parentId, services]) => (
                        <div key={parentId} className="mt-2">
                           {/* Check if parentId is a valid key before accessing */}
                          {isParentServiceKey(parentId) && (
                             <h5 className="text-xs font-medium text-gray-600 pl-3 mb-1">{parentServiceNames[parentId]}</h5>
                          )}
                          <div className="mt-1 space-y-1">
                            {services.map((service: Service) => ( // Use Service type
                              <Link
                                key={service.id}
                                href={service.path}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                  service.id === currentPage ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <span className="truncate">{service.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* --- Separator --- */}
                    <div className="border-t border-gray-300 my-3 mx-3"></div>

                    {/* Resource Management Services */}
                    <div className="py-2">
                      <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">地域資源管理</h4>
                      {Object.entries(resourceManagementGrouped).map(([parentId, services]) => (
                        <div key={parentId} className="mt-2">
                           {/* Check if parentId is a valid key before accessing */}
                           {isParentServiceKey(parentId) && (
                              <h5 className="text-xs font-medium text-gray-600 pl-3 mb-1">{parentServiceNames[parentId]}</h5>
                           )}
                          <div className="mt-1 space-y-1">
                            {services.map((service: Service) => ( // Use Service type
                              <Link
                                key={service.id}
                                href={service.path}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                  service.id === currentPage ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <span className="truncate">{service.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Navigation (Mobile) */}
              <nav className="mt-5 px-2 space-y-1" aria-label="Sidebar Navigation">
                <SidebarNavigation
                  serviceCategory={serviceCategory}
                  onItemClick={() => setSidebarOpen(false)}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </nav>
            </div>
          </div>
          {/* Add fixed width for the sidebar panel itself */}
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>


        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className={`flex flex-col h-0 flex-1 ${accentLightColor} border-r border-gray-200`}>
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="px-4 text-center mb-4">
                  <h2 className={`text-lg font-bold ${textAccentColor}`}>{serviceName}</h2>
                </div>

                {/* Other Services Dropdown (Desktop) */}
                <div className="mt-2 px-4">
                  <button // Changed div to button for accessibility
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    aria-expanded={servicesDropdownOpen} // Added aria-expanded
                  >
                    <span>他のサービスを表示</span>
                    <svg
                      className={`h-5 w-5 transform transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true" // Added aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {servicesDropdownOpen && (
                    <div className="mt-2 space-y-1 pl-3">
                      {/* Revitalization Services */}
                      <div className="py-2">
                        <h4 className="px-3 text-xm font-semibold text-gray-500 uppercase tracking-wider">地域活性化</h4>
                        {Object.entries(revitalizationGrouped).map(([parentId, services]) => (
                          <div key={parentId} className="mt-2">
                            {/* Check if parentId is a valid key before accessing */}
                            {isParentServiceKey(parentId) && (
                              <h5 className="text-xs font-medium text-gray-600 pl-3 mb-1">・{parentServiceNames[parentId]}</h5>
                            )}
                            <div className="mt-1 space-y-1">
                              {services.map((service: Service) => ( // Use Service type
                                <Link
                                  key={service.id}
                                  href={service.path}
                                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                    service.id === currentPage ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                  }`}
                                >
                                  <span className="truncate">{service.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* --- Separator --- */}
                      <div className="border-t border-gray-300 my-3 mx-3"></div>

                      {/* Resource Management Services */}
                      <div className="py-2">
                        <h4 className="px-3 text-xm font-semibold text-gray-500 uppercase tracking-wider">地域資源管理</h4>
                        {Object.entries(resourceManagementGrouped).map(([parentId, services]) => (
                          <div key={parentId} className="mt-2">
                            {/* Check if parentId is a valid key before accessing */}
                            {isParentServiceKey(parentId) && (
                               <h5 className="text-xs font-medium text-gray-600 pl-3 mb-1">・{parentServiceNames[parentId]}</h5>
                            )}
                            <div className="mt-1 space-y-1">
                              {services.map((service: Service) => ( // Use Service type
                                <Link
                                  key={service.id}
                                  href={service.path}
                                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                    service.id === currentPage ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                  }`}
                                >
                                  <span className="truncate">{service.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Navigation (Desktop) */}
                <nav className="mt-5 flex-1 px-2 space-y-1" aria-label="Sidebar Navigation">
                  <SidebarNavigation
                    serviceCategory={serviceCategory}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="pb-5 border-b border-gray-200 mb-6">
                <h1 className="text-2xl font-semibold text-gray-900"> {/* Changed font-bold to font-semibold */}
                  {serviceName} - {activeSection === 'dashboard' ? 'ダッシュボード' :
                    activeSection === 'data-analysis' ? 'データ分析' :
                    activeSection === 'reports' ? 'レポート' :
                    activeSection === 'settings' ? '設定' :
                    activeSection === 'alerts' ? 'アラート' : ''}
                </h1>
                <p className="mt-1 text-sm text-gray-500"> {/* Adjusted margin */}
                  これはデモ用の{activeSection === 'dashboard' ? 'ダッシュボード' :
                    activeSection === 'data-analysis' ? 'データ分析画面' :
                    activeSection === 'reports' ? 'レポート画面' :
                    activeSection === 'settings' ? '設定画面' :
                    activeSection === 'alerts' ? 'アラート画面' : ''}です。実際のデータは含まれていません。
                </p>
                {/* Display Parent Service Name if available and valid */}
                {parentService && isParentServiceKey(parentService) && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"> {/* Adjusted styling */}
                    {parentServiceNames[parentService]}
                  </div>
                )}
              </div>

              {/* Content Area based on activeSection */}
              {activeSection === 'dashboard' && children}
              {activeSection === 'data-analysis' && <DataAnalysisContent serviceCategory={serviceCategory} serviceName={serviceName} />}
              {activeSection === 'reports' && <ReportsContent serviceCategory={serviceCategory} serviceName={serviceName} />}
              {activeSection === 'settings' && <SettingsContent serviceCategory={serviceCategory} serviceName={serviceName} />}
              {activeSection === 'alerts' && <AlertsContent serviceCategory={serviceCategory} serviceName={serviceName} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar Navigation Component ---
interface SidebarNavigationProps {
  serviceCategory: 'revitalization' | 'resource-management';
  onItemClick?: () => void; // Optional click handler
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  serviceCategory,
  onItemClick,
  activeSection,
  setActiveSection
}) => {
  // Determine colors based on category
  const activeBgColor = serviceCategory === 'revitalization' ? 'bg-[#0056b3]' : 'bg-[#00a86b]';
  const hoverTextColor = serviceCategory === 'revitalization' ? 'hover:text-[#0056b3]' : 'hover:text-[#00a86b]';
  const activeTextColor = 'text-white';
  const inactiveTextColor = 'text-gray-600';
  const hoverBgColor = 'hover:bg-gray-200'; // Consistent hover background

  // Navigation items configuration
  const navigationItems = [
    { id: 'dashboard', name: 'ダッシュボード', icon: HomeIcon },
    { id: 'data-analysis', name: 'データ分析', icon: ChartIcon },
    { id: 'reports', name: 'レポート', icon: DocumentIcon },
    { id: 'settings', name: '設定', icon: SettingsIcon },
    { id: 'alerts', name: 'アラート', icon: BellIcon },
  ];

  return (
    <>
      {navigationItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          // Use button for better accessibility if it acts like one
          <button
            key={item.id} // Use unique id for key
            onClick={() => {
              setActiveSection(item.id);
              if (onItemClick) onItemClick(); // Call optional handler
            }}
            className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-md cursor-pointer transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${ // Added focus styles
              isActive
                ? `${activeBgColor} ${activeTextColor}` // Active state styles
                : `${inactiveTextColor} ${hoverTextColor} ${hoverBgColor}` // Inactive state styles
            }`}
            aria-current={isActive ? 'page' : undefined} // Indicate current page for screen readers
          >
            <item.icon
              className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150 ease-in-out ${
                isActive ? activeTextColor : 'text-gray-400 group-hover:text-gray-500' // Icon color changes
              }`}
              aria-hidden="true" // Hide decorative icon from screen readers
            />
            {item.name}
          </button>
        );
      })}
    </>
  );
};


// --- Placeholder Content Components ---
// Define common props for content components
interface ContentComponentProps {
    serviceCategory: 'revitalization' | 'resource-management';
    serviceName: string;
}

// データ分析コンテンツ (Added React.FC type)
const DataAnalysisContent: React.FC<ContentComponentProps> = ({ serviceCategory, serviceName }) => {
  const buttonColor = serviceCategory === 'revitalization' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
  const radioColor = serviceCategory === 'revitalization' ? 'text-blue-600 focus:ring-blue-500' : 'text-green-600 focus:ring-green-500';
  const checkboxColor = serviceCategory === 'revitalization' ? 'text-blue-600 focus:ring-blue-500' : 'text-green-600 focus:ring-green-500';

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md"> {/* Added shadow-md */}
        <h3 className="text-lg font-medium text-gray-900 mb-4">データ分析ツール ({serviceName})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Source Selection */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">データソース選択</h4>
            <fieldset className="space-y-3"> {/* Use fieldset for radio group */}
              <legend className="sr-only">データソース</legend>
              <div className="flex items-center">
                <input id="data-source-1" name="data-source" type="radio" className={`h-4 w-4 border-gray-300 ${radioColor}`} defaultChecked />
                <label htmlFor="data-source-1" className="ml-3 block text-sm font-medium text-gray-700">リアルタイムデータ</label>
              </div>
              <div className="flex items-center">
                <input id="data-source-2" name="data-source" type="radio" className={`h-4 w-4 border-gray-300 ${radioColor}`} />
                <label htmlFor="data-source-2" className="ml-3 block text-sm font-medium text-gray-700">履歴データ</label>
              </div>
              <div className="flex items-center">
                <input id="data-source-3" name="data-source" type="radio" className={`h-4 w-4 border-gray-300 ${radioColor}`} />
                <label htmlFor="data-source-3" className="ml-3 block text-sm font-medium text-gray-700">外部データ連携</label>
              </div>
            </fieldset>

            <div className="mt-4">
              <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-1">期間選択</label>
              <select id="time-range" name="time-range" className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-1 sm:text-sm rounded-md ${serviceCategory === 'revitalization' ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-green-500 focus:border-green-500'}`}>
                <option>過去24時間</option>
                <option>過去7日間</option>
                <option>過去30日間</option>
                <option>過去90日間</option>
                <option>カスタム期間...</option>
              </select>
            </div>
          </div>

          {/* Analysis Method Selection */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">分析手法</h4>
            <fieldset className="space-y-3"> {/* Use fieldset for checkbox group */}
               <legend className="sr-only">分析手法</legend>
              <div className="flex items-center">
                <input id="analysis-1" name="analysis-type" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor}`} defaultChecked />
                <label htmlFor="analysis-1" className="ml-3 block text-sm font-medium text-gray-700">傾向分析</label>
              </div>
              <div className="flex items-center">
                <input id="analysis-2" name="analysis-type" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor}`} />
                <label htmlFor="analysis-2" className="ml-3 block text-sm font-medium text-gray-700">異常検知</label>
              </div>
              <div className="flex items-center">
                <input id="analysis-3" name="analysis-type" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor}`} />
                <label htmlFor="analysis-3" className="ml-3 block text-sm font-medium text-gray-700">予測モデル</label>
              </div>
              <div className="flex items-center">
                <input id="analysis-4" name="analysis-type" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor}`} />
                <label htmlFor="analysis-4" className="ml-3 block text-sm font-medium text-gray-700">相関分析</label>
              </div>
            </fieldset>

            <button type="button" className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}>
              分析を実行
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Preview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">分析結果プレビュー</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">分析データがありません</h3>
          <p className="mt-1 text-sm text-gray-500">分析を実行すると、ここに結果が表示されます。</p>
        </div>
      </div>
    </div>
  );
};

// レポートコンテンツ (Added React.FC type)
const ReportsContent: React.FC<ContentComponentProps> = ({ serviceCategory, serviceName }) => {
  const buttonColor = serviceCategory === 'revitalization' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
  const linkColor = serviceCategory === 'revitalization' ? 'text-blue-600 hover:text-blue-900' : 'text-green-600 hover:text-green-900';
  const linkRedColor = 'text-red-600 hover:text-red-900'; // Consistent red for delete

  return (
    <div className="space-y-6">
      {/* Report Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="sm:flex sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">レポート管理 ({serviceName})</h3>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}> {/* Adjusted icon size and stroke */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /> {/* Corrected path for plus icon */}
              </svg>
              新規レポート作成
            </button>
          </div>
        </div>

        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg"> {/* Added container styling */}
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">レポート名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">月次サマリー</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">定期レポート</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/01</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    完了
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>表示</button>
                  <button className={`${linkColor}`}>ダウンロード</button>
                </td>
              </tr>
              {/* Example Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">四半期分析</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">カスタムレポート</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/03/15</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    完了
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>表示</button>
                  <button className={`${linkColor}`}>ダウンロード</button>
                </td>
              </tr>
              {/* Example Row 3 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">異常検知分析</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">特別レポート</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/03</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    処理中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className="text-gray-400 cursor-not-allowed" disabled>表示</button>
                  <button className="text-gray-400 cursor-not-allowed" disabled>ダウンロード</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">レポートスケジュール</h3>
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg"> {/* Added container styling */}
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">レポート名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">頻度</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">次回実行</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">配信先</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example Schedule Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">週次サマリー</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">毎週月曜日</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/08</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>編集</button>
                  <button className={`${linkRedColor}`}>削除</button>
                </td>
              </tr>
              {/* Example Schedule Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">月次詳細</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">毎月1日</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/05/01</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">manager@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>編集</button>
                  <button className={`${linkRedColor}`}>削除</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// 設定コンテンツ (Added React.FC type)
const SettingsContent: React.FC<ContentComponentProps> = ({ serviceCategory, serviceName }) => {
  const buttonColor = serviceCategory === 'revitalization' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
  const focusRingColor = serviceCategory === 'revitalization' ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-green-500 focus:border-green-500';
  const checkboxColor = serviceCategory === 'revitalization' ? 'text-blue-600' : 'text-green-600';

  return (
    <div className="space-y-6">
      <form> {/* Wrap in form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-6">サービス設定 ({serviceName})</h3>

          <div className="space-y-8 divide-y divide-gray-200"> {/* Added structure */}
            {/* Basic Settings Section */}
            <div className="pt-8">
              <div>
                <h4 className="text-base font-semibold leading-6 text-gray-900">基本設定</h4>
                <p className="mt-1 text-sm text-gray-500">ダッシュボードの表示やデータ更新に関する設定</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="dashboard-refresh" className="block text-sm font-medium text-gray-700">
                    データ更新間隔
                  </label>
                  <select id="dashboard-refresh" name="dashboard-refresh" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${focusRingColor} sm:text-sm`}>
                    <option>リアルタイム</option>
                    <option>1分毎</option>
                    <option>5分毎</option>
                    <option>15分毎</option>
                    <option>30分毎</option>
                    <option>1時間毎</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="chart-style" className="block text-sm font-medium text-gray-700">
                    グラフ表示スタイル
                  </label>
                  <select id="chart-style" name="chart-style" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${focusRingColor} sm:text-sm`}>
                    <option>ライト</option>
                    <option>ダーク</option>
                    <option>カラフル</option>
                    <option>モノクローム</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings Section */}
            <div className="pt-8">
              <div>
                <h4 className="text-base font-semibold leading-6 text-gray-900">通知設定</h4>
                <p className="mt-1 text-sm text-gray-500">アラートやレポートに関する通知の受け取り方法</p>
              </div>
              <div className="mt-6">
                <fieldset className="space-y-5">
                  <legend className="sr-only">通知方法</legend>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center"> {/* Adjusted vertical alignment */}
                      <input id="notify-email" name="notify-email" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor} ${focusRingColor}`} defaultChecked />
                    </div>
                    <div className="ml-3 text-sm leading-6"> {/* Adjusted line height */}
                      <label htmlFor="notify-email" className="font-medium text-gray-900">メール通知</label>
                      <p className="text-gray-500">重要なイベントやレポートのメール通知を受け取る</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input id="notify-app" name="notify-app" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor} ${focusRingColor}`} defaultChecked />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="notify-app" className="font-medium text-gray-900">アプリ内通知</label>
                      <p className="text-gray-500">アプリ内でのアラートと通知を表示</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input id="notify-sms" name="notify-sms" type="checkbox" className={`h-4 w-4 rounded border-gray-300 ${checkboxColor} ${focusRingColor}`} />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="notify-sms" className="font-medium text-gray-900">SMS通知</label>
                      <p className="text-gray-500">緊急アラートのSMS通知を受け取る (別途設定が必要な場合があります)</p>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            {/* API Access Settings Section */}
            <div className="pt-8">
               <div>
                 <h4 className="text-base font-semibold leading-6 text-gray-900">APIアクセス設定</h4>
                 <p className="mt-1 text-sm text-gray-500">外部システムとの連携に必要なAPIキーを管理します</p>
               </div>
               <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                     <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">APIキー</label>
                     <div className="mt-1 flex rounded-md shadow-sm">
                       <div className="relative flex flex-grow items-stretch focus-within:z-10">
                         <input
                           type="password" // Use password type to obscure
                           name="api-key"
                           id="api-key"
                           className={`block w-full rounded-none rounded-l-md border-gray-300 bg-gray-100 text-gray-500 ${focusRingColor} sm:text-sm`}
                           placeholder="APIキーが表示されます"
                           readOnly // Keep readOnly
                           value="********************" // Use asterisks
                         />
                       </div>
                       <button
                         type="button"
                         className={`relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRingColor}`}
                       >
                         <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                         </svg>
                         <span>コピー</span>
                       </button>
                     </div>
                     <div className="mt-3 text-right">
                        <button
                          type="button"
                          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                          新規生成
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-5 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button" // Or "reset" if applicable
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit" // Use submit for form
                className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${buttonColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              >
                設定を保存
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


// アラートコンテンツ (Added React.FC type)
const AlertsContent: React.FC<ContentComponentProps> = ({ serviceCategory, serviceName }) => {
  const buttonColor = serviceCategory === 'revitalization' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
  const activeTabColor = serviceCategory === 'revitalization' ? 'border-blue-500 text-blue-600' : 'border-green-500 text-green-600';
  const inactiveTabColor = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  const linkColor = serviceCategory === 'revitalization' ? 'text-blue-600 hover:text-blue-900' : 'text-green-600 hover:text-green-900';
  const linkGreenColor = 'text-green-600 hover:text-green-900'; // Consistent green for resolve
  const toggleCheckedBg = serviceCategory === 'revitalization' ? 'bg-blue-600' : 'bg-green-600';
  const focusRingColor = serviceCategory === 'revitalization' ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-green-500 focus:border-green-500';

  // Basic toggle switch CSS (can be moved to a global CSS file)
  const toggleStyle = `
    .toggle-bg:after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      background: white;
      width: 1rem; /* h-4 */
      height: 1rem; /* w-4 */
      border-radius: 9999px; /* rounded-full */
      transition: transform 0.2s ease-in-out;
    }
    input:checked + .toggle-bg:after {
      transform: translateX(100%);
      border-color: white;
    }
    input:checked + .toggle-bg {
      border-color: ${toggleCheckedBg}; /* Use dynamic color */
      background-color: ${toggleCheckedBg}; /* Use dynamic color */
    }
  `;

  return (
    <div className="space-y-6">
       <style>{toggleStyle}</style> {/* Inject toggle CSS */}
       {/* Alert Management Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="sm:flex sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">アラート管理 ({serviceName})</h3>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              新規アラートルール作成
            </button>
          </div>
        </div>

        {/* Alert Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Example: Active Tab */}
            <button className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTabColor}`}>
              アクティブ <span className="bg-red-100 text-red-600 ml-2 py-0.5 px-2 rounded-full text-xs font-medium">2</span>
            </button>
            {/* Example: Inactive Tab */}
            <button className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${inactiveTabColor}`}>
              解決済み
            </button>
             <button className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${inactiveTabColor}`}>
              全て
            </button>
          </nav>
        </div>

        {/* Alert Table */}
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アラート名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">トリガー条件</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終発生</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">通知先</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example Alert Row 1 (Active) */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    アラート中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">センサー接続エラー</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10分以上接続なし</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/05 10:23</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">メール, アプリ内</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>詳細</button>
                  <button className={`${linkGreenColor}`}>解決済みにする</button>
                </td>
              </tr>
              {/* Example Alert Row 2 (Warning) */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    警告
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">データ量閾値超過</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">予測値から20%以上乖離</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/04 15:47</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">アプリ内</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>詳細</button>
                  <button className={`${linkGreenColor}`}>解決済みにする</button>
                </td>
              </tr>
              {/* Example Alert Row 3 (Resolved - Assuming this would be under the Resolved tab) */}
              {/*
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    解決済み
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">バッテリー残量低下</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">バッテリー残量15%以下</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025/04/03 08:12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">メール, アプリ内, SMS</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button className={`${linkColor}`}>詳細</button>
                  <button className="text-gray-400 cursor-not-allowed" disabled>解決済み</button>
                </td>
              </tr>
              */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">アラート設定</h3>
        <form className="space-y-6"> {/* Wrap settings in a form */}
          {/* Auto Resolve Setting */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="auto-resolve" className="font-medium text-gray-900 cursor-pointer flex-grow mr-4">アラート自動解決</label>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="auto-resolve" id="auto-resolve" className="sr-only" />
                <label htmlFor="auto-resolve" className="toggle-bg block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">一定時間 (例: 24時間) 経過したアラートを自動的に解決済みとしてマークします。</p>
          </div>

          {/* Notification Batching Setting */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="notification-batch" className="font-medium text-gray-900 cursor-pointer flex-grow mr-4">通知統合</label>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="notification-batch" id="notification-batch" className="sr-only" defaultChecked />
                <label htmlFor="notification-batch" className="toggle-bg block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">短時間に発生した同一種類のアラート通知を統合し、通知の頻度を抑えます。</p>
          </div>

          {/* Quiet Hours Setting */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
               <label htmlFor="quiet-hours" className="font-medium text-gray-900 cursor-pointer flex-grow mr-4">静寂時間帯</label>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="quiet-hours" id="quiet-hours" className="sr-only" />
                <label htmlFor="quiet-hours" className="toggle-bg block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">指定した時間帯は緊急度の低いアラート通知を行いません。</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quiet-from" className="block text-xs font-medium text-gray-500">開始時間</label>
                <input type="time" id="quiet-from" name="quiet-from" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${focusRingColor} sm:text-sm`} defaultValue="22:00" />
              </div>
              <div>
                <label htmlFor="quiet-to" className="block text-xs font-medium text-gray-500">終了時間</label>
                <input type="time" id="quiet-to" name="quiet-to" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${focusRingColor} sm:text-sm`} defaultValue="08:00" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              設定を保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Icon Components (Keep as simple functions) ---
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.004.827c-.29.24-.438.613-.431.992a6.759 6.759 0 010 1.655c.007.378.141.75.431.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.29-.24.438-.613.43-.992a6.932 6.932 0 010-1.655c-.007-.378-.14-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}


export default DashboardLayout;
