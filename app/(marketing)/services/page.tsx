"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ImprovedServiceCards from '@/components/services/ImprovedServiceCards';
import { CategoryTabs, Tabs, FAQ } from '@/components/services/';
import { servicesData } from './data';
import { Service, Tab } from '@/types/servicesTypes';

// メインサービスページコンポーネント
const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('revitalization');
  const [activeTab, setActiveTab] = useState<string>(servicesData[0].id);
  
  // カテゴリー変更時に、そのカテゴリーの最初のサービスをアクティブにする
  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    const firstServiceInCategory = servicesData.find(service => service.category === category);
    if (firstServiceInCategory) {
      setActiveTab(firstServiceInCategory.id);
    }
  };
  
  // 現在のカテゴリーに属するサービス
  const servicesInCategory = servicesData.filter(service => service.category === activeCategory);
  
  // タブ定義
  const tabs: Tab[] = servicesInCategory.map(service => ({
    id: service.id,
    name: service.name
  }));
  
  // 現在アクティブなサービス
  const activeService = servicesData.find(service => service.id === activeTab);
  
  // アクセントカラー
  const accentColor: string = activeCategory === 'revitalization' ? 'bg-[#0056b3] text-white' : 'bg-[#00a86b] text-white';
  const textAccentColor: string = activeCategory === 'revitalization' ? 'text-[#0056b3]' : 'text-[#00a86b]';
  
  return (
    <div className="bg-white">
      {/* ヘッダーセクション */}
      <div className={`py-20 relative overflow-hidden transition-all duration-500 ${activeCategory === 'revitalization' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-green-600 to-green-700'}`}>
        {/* 装飾的な背景要素 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" opacity="0.05" d="M41.2,-70.6C55.9,-64.7,72,-56.9,80.2,-43.7C88.5,-30.5,88.9,-12,85.9,5.2C82.9,22.3,76.6,38.2,66.1,51C55.6,63.8,40.8,73.5,25,78.3C9.2,83,-7.7,82.8,-23.9,78.3C-40.1,73.8,-55.6,65,-69.3,52C-83,39,-94.9,21.8,-96.7,3.4C-98.5,-15,-90.3,-34.1,-78.1,-49.4C-66,-64.6,-50,-75.9,-34.2,-81.3C-18.4,-86.7,-2.8,-86.3,11.7,-83.2C26.2,-80.1,52.5,-74.2,41.2,-70.6Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" opacity="0.05" d="M47.7,-79.1C62.9,-71.9,76.8,-60.5,83.8,-45.6C90.7,-30.7,90.6,-12.4,87.4,4.7C84.2,21.8,77.8,37.7,67.4,50.8C57,63.9,42.5,74.1,26.7,79.5C10.9,84.9,-6.2,85.3,-22.7,81.3C-39.2,77.3,-55.1,68.8,-68.3,55.9C-81.5,43,-92,25.6,-93.1,7.4C-94.2,-10.7,-85.9,-29.6,-74.1,-43.9C-62.2,-58.3,-46.7,-68.2,-31.6,-75.3C-16.5,-82.5,-1.9,-87.1,12.3,-87.6C26.4,-88.1,52.9,-84.4,47.7,-79.1Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              サービスラインナップ
            </h1>
            <p className="mt-6 text-xl text-white opacity-90 max-w-3xl mx-auto">
              最先端AI技術を活用した、中小企業や地方自治体向けの
              <br className="hidden md:block" />
              カスタマイズ可能なスマートシティソリューション
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* カテゴリータブ */}
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        
        {/* サービスタブ */}
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          accentColor={accentColor}
        />
        
        {/* アクティブタブのコンテンツ */}
        {activeService && (
          <ImprovedServiceCards 
            activeService={activeService} 
            activeCategory={activeCategory} 
            textAccentColor={textAccentColor}
          />
        )}
        
        {/* よくある質問 */}
        {activeService && (
          <div className="mt-8 mb-16">
            <FAQ faqs={activeService.faqs} />
          </div>
        )}
        
        {/* CTAセクション */}
        <div className="mt-16 text-center p-10 rounded-2xl relative overflow-hidden transition-all duration-500" 
          style={{
            background: activeCategory === 'revitalization' 
              ? 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)' 
              : 'linear-gradient(135deg, #f0fff7 0%, #e0ffef 100%)',
            boxShadow: '0 10px 40px -10px rgba(0, 86, 179, 0.1)',
          }}
        >
          {/* 装飾的な背景要素 */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute bottom-0 left-0 h-80 w-80 opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill={activeCategory === 'revitalization' ? '#0056b3' : '#00a86b'} d="M41.3,-69.8C53.4,-63.5,63.2,-52.3,70.9,-39.2C78.6,-26.2,84.3,-11.3,83.2,2.9C82.1,17.1,74.3,30.6,65.5,42.9C56.7,55.2,46.9,66.3,34.4,72.5C21.9,78.7,6.6,79.9,-8.6,78.8C-23.7,77.7,-38.8,74.2,-51.1,66.1C-63.4,58,-73,45.2,-78.2,30.6C-83.4,16,-84.3,-0.4,-79.3,-14.2C-74.3,-28.1,-63.5,-39.5,-51.1,-46.4C-38.6,-53.4,-24.6,-56,-11.1,-60.7C2.3,-65.3,16.2,-72,29.2,-75.1C42.3,-78.3,54.4,-77.8,41.3,-69.8Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute top-0 right-0 h-64 w-64 opacity-5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill={activeCategory === 'revitalization' ? '#0056b3' : '#00a86b'} d="M45.3,-75.3C58.9,-67.3,70.2,-55.4,77.7,-41.3C85.2,-27.1,88.8,-10.7,87.2,5.3C85.7,21.2,78.9,36.7,68.9,49.8C58.8,62.8,45.5,73.5,30.5,78.5C15.5,83.6,-1.3,83.1,-17,78.9C-32.8,74.7,-47.5,67,-59.3,55.5C-71.2,44,-80.2,28.8,-83.1,12.4C-86,-4,-82.9,-21.5,-75.2,-36.1C-67.6,-50.7,-55.4,-62.3,-41.7,-70C-28,-77.6,-12.7,-81.3,1.5,-83.9C15.8,-86.4,31.6,-87.8,45.3,-75.3Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">カスタマイズ可能なソリューション</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              地域や企業の特性に合わせて最適なソリューションをカスタマイズします。
              <br />
              専門家チームがニーズをヒアリングし、最適な提案を行います。
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className={`transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeCategory === 'revitalization' 
                    ? 'bg-[#0056b3] hover:bg-[#004494]' 
                    : 'bg-[#00a86b] hover:bg-[#008f5b]'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  無料相談・お問い合わせ
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* スタイル追加 */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;