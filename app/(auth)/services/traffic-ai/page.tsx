// app/(auth)/services/traffic-ai/page.tsx
import React from 'react';
import { Metadata } from 'next';
import TrafficDashboard from '@/components/traffic/TrafficDashboard';

export const metadata: Metadata = {
  title: '交通AI予測システム | スマートシティAIソリューション',
  description: 'リアルタイム交通データの可視化と予測分析によって、渋滞予測と最適経路の提案を行います。',
};

export default function TrafficAIPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">交通AI予測システム</h1>
        <p className="text-gray-600">
          リアルタイム交通データの可視化と予測分析によって、渋滞予測と最適経路の提案を行います。
        </p>
      </div>
      
      <TrafficDashboard />
    </div>
  );
}