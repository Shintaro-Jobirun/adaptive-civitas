// components/services/ImprovedServiceCards.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  ServiceCardsProps,
  ServiceContentProps,
  BenefitsSectionProps,
  ImplementationProcessProps 
} from '@/types/servicesTypes';

// サービス内容セクションのコンポーネント
const ServiceContent: React.FC<ServiceContentProps> = ({ service, textAccentColor }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
        <span className="relative">
          サービス内容
          <span className={`absolute bottom-0 left-0 w-full h-1 ${textAccentColor.replace('text-', 'bg-')} rounded-full`}></span>
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {service.services.map((serviceItem, index) => (
          <div 
            key={index} 
            className="relative bg-white rounded-2xl transition-all duration-300 hover:shadow-xl group overflow-hidden"
            style={{
              borderRadius: '20px',
              boxShadow: '0 10px 40px -10px rgba(0, 86, 179, 0.15)',
            }}
          >
            {/* サービスカードの装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 -mb-16 -ml-16 rounded-full bg-green-50 group-hover:bg-green-100 transition-all duration-500"></div>
            
            <div className="p-8 relative z-10">
              {/* サービス名 - より目立つデザイン */}
              <h4 className={`text-2xl font-bold mb-4 ${textAccentColor} flex items-center`}>
                <span className="mr-3 bg-white p-2 rounded-full shadow-md inline-flex items-center justify-center">
                  {index === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </span>
                {serviceItem.name}
              </h4>
              
              {/* サービス説明 */}
              <p className="text-gray-600 mb-6">{serviceItem.description}</p>
              
              {/* 主な機能 - より構造化されたリスト */}
              <h5 className="font-medium text-gray-800 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                主な機能
              </h5>
              
              <ul className="space-y-3">
                {serviceItem.features.map((feature, idx) => (
                  <li key={idx} className="pl-8 pr-2 py-2 rounded-lg bg-gray-50 relative group-hover:bg-white transition-all duration-300">
                    <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full ${textAccentColor.replace('text-', 'bg-')} opacity-60`}></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 導入メリットコンポーネント
const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits, accentColor, textAccentColor }) => {
  return (
    <div className="mb-16 p-8 rounded-2xl relative overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        boxShadow: '0 10px 40px -10px rgba(0, 86, 179, 0.1)',
      }}
    >
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-blue-500" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="8" className="text-blue-500" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" rx="10" stroke="currentColor" strokeWidth="8" className="text-green-500" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 inline-block relative">
          <span className="relative">
            導入メリット
            <span className={`absolute bottom-0 left-0 w-full h-1 ${textAccentColor.replace('text-', 'bg-')} rounded-full`}></span>
          </span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center mr-4 ${accentColor} transition-transform transform hover:scale-110 duration-300`}>
                <span className="text-white text-lg font-bold">{index + 1}</span>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 導入プロセスコンポーネント
const ImplementationProcess: React.FC<ImplementationProcessProps> = ({ steps, accentColor, textAccentColor }) => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stepNumber = entry.target.getAttribute('data-step');
            if (stepNumber) {
              setVisibleSteps(prev => [...prev, Number(stepNumber)]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    
    document.querySelectorAll('.step-item').forEach(step => {
      observer.observe(step);
    });
    
    return () => {
      document.querySelectorAll('.step-item').forEach(step => {
        observer.unobserve(step);
      });
    };
  }, []);

  return (
    <div className="my-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 inline-block relative">
        <span className="relative">
          導入までの流れ
          <span className={`absolute bottom-0 left-0 w-full h-1 ${textAccentColor.replace('text-', 'bg-')} rounded-full`}></span>
        </span>
      </h3>
      
      <div className="relative">
        {/* 接続線 */}
        <div className="absolute top-12 left-8 w-1 h-[calc(100%-120px)] bg-gray-200 rounded-full"></div>
        
        {/* ステップ */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              data-step={index}
              className={`relative flex items-start step-item transition-all duration-500 transform ${
                visibleSteps.includes(index) ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* アイコンサークル */}
              <div className={`flex-shrink-0 h-16 w-16 rounded-full ${accentColor} flex items-center justify-center z-10 shadow-lg transition-transform hover:scale-110 duration-300`}>
                <span 
                  className="text-white text-xl"
                  dangerouslySetInnerHTML={{ __html: step.icon }}
                ></span>
              </div>
              
              {/* ステップ内容 */}
              <div className="ml-8 pt-2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full">
                <h4 className={`text-lg font-bold mb-2 flex items-center`} style={{ color: accentColor.replace('bg-', 'text-').replace('text-white', '') }}>
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 mr-3">
                    <span className={`text-sm ${textAccentColor}`}>{index + 1}</span>
                  </div>
                  {step.title}
                </h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// メインのサービスカードコンポーネント
const ImprovedServiceCards: React.FC<ServiceCardsProps> = ({ activeService, activeCategory, textAccentColor }) => {
  if (!activeService) return null;

  return (
    <div className="mt-8">
      {/* サービス概要 */}
      <div className="mb-16 relative">
        <div className="absolute top-0 right-0 w-72 h-72 -mr-16 -mt-16 opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={textAccentColor}>
            <circle cx="50" cy="50" r="45" fill="currentColor" />
            <path d="M20,50 L80,50 M50,20 L50,80" stroke="white" strokeWidth="8" />
          </svg>
        </div>
        
        <h2 className={`text-3xl font-bold mb-6 ${textAccentColor} inline-block relative`}>
          <span className="relative">
            {activeService.name}
            <span className={`absolute bottom-0 left-0 w-full h-1 ${textAccentColor.replace('text-', 'bg-')} rounded-full`}></span>
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {activeService.overview}
        </p>
      </div>
      
      {/* 課題セクション */}
      <div className="mb-16 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        
        {/* 装飾的な背景要素 */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-500" style={{ width: '100%', height: '100%' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="relative p-8 z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 inline-block relative">
            <span className="relative">
              対応する課題
              <span className="absolute bottom-0 left-0 w-full h-1 bg-red-400 rounded-full"></span>
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeService.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mr-4">
                  <span className="text-red-500 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{challenge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* サービス内容 */}
      <ServiceContent service={activeService} textAccentColor={textAccentColor} />
      
      {/* 導入メリット */}
      <BenefitsSection 
        benefits={activeService.benefits} 
        accentColor={activeCategory === 'revitalization' ? 'bg-[#0056b3] text-white' : 'bg-[#00a86b] text-white'}
        textAccentColor={textAccentColor}
      />
      
      {/* 導入までの流れ */}
      <ImplementationProcess 
        steps={activeService.implementationProcess} 
        accentColor={activeCategory === 'revitalization' ? 'bg-[#0056b3] text-white' : 'bg-[#00a86b] text-white'}
        textAccentColor={textAccentColor}
      />
    </div>
  );
};

export default ImprovedServiceCards;