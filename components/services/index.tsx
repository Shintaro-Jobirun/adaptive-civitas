// components/services/index.tsx
'use client';

import React, { useState } from 'react';
import { 
  Tab, 
  CategoryTabsProps, 
  TabsProps,
  FAQProps,
  Faq
} from '@/types/servicesTypes';

// カテゴリータブコンポーネント
export const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
    activeCategory,
    onCategoryChange
  }) => {
    return (
      <div className="flex border rounded-xl mb-8 overflow-hidden shadow-md">
        <button
          className={`py-4 px-8 font-medium text-base flex-1 transition-all duration-300 ${
            activeCategory === 'revitalization' 
              ? 'bg-white text-[#0056b3] border-b-4 border-[#0056b3]' 
              : 'bg-white text-gray-600 hover:bg-blue-50 border-b-4 border-transparent'
          }`}
          onClick={() => onCategoryChange('revitalization')}
        >
          <div className="flex items-center justify-center">
            <svg className={`w-5 h-5 mr-2 ${activeCategory === 'revitalization' ? 'text-[#0056b3]' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            地域活力創造
          </div>
        </button>
        <button
          className={`py-4 px-8 font-medium text-base flex-1 transition-all duration-300 ${
            activeCategory === 'resource-management' 
              ? 'bg-white text-[#00a86b] border-b-4 border-[#00a86b]' 
              : 'bg-white text-gray-600 hover:bg-green-50 border-b-4 border-transparent'
          }`}
          onClick={() => onCategoryChange('resource-management')}
        >
          <div className="flex items-center justify-center">
            <svg className={`w-5 h-5 mr-2 ${activeCategory === 'resource-management' ? 'text-[#00a86b]' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            地域資源管理
          </div>
        </button>
      </div>
    );
  };

// 共通のタブコンポーネント（視認性改善版）
export const Tabs: React.FC<TabsProps> = ({ 
    tabs, 
    activeTab, 
    onTabChange,
    accentColor
  }) => {
    // アクセントカラーからテキストカラーを抽出
    const accentTextColor = accentColor.replace('bg-', 'text-').replace('text-white', '');
    
    return (
      <div className="border-b border-gray-200 mb-10">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? `border-${accentTextColor.replace('text-', '')} bg-white text-${accentTextColor.replace('text-', '')} shadow-sm`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 bg-transparent'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <div className="flex items-center">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                  activeTab === tab.id 
                    ? `${accentColor}` 
                    : 'bg-gray-100'
                }`}>
                  <span className={`text-xs ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-gray-500'
                  }`}>{index + 1}</span>
                </div>
                {tab.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

// Q&Aコンポーネント
export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number): void => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 inline-block relative">
        <span className="relative">
          よくある質問
          <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-400 rounded-full"></span>
        </span>
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">Q</span>
                </div>
                <span>{faq.question}</span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openFaq === index ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {openFaq === index && (
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex">
                  <div className="bg-green-100 text-green-600 h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                    <span className="text-sm">A</span>
                  </div>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};