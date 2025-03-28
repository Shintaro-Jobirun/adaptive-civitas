// components/traffic/TrafficDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import TrafficMap from './TrafficMap';
import TrafficChart from './TrafficChart';
import TrafficPredictionPanel from './TrafficPredictionPanel';
import { generateMockTrafficData } from '@/lib/utils/mockDataGenerator';

// 交通データの型定義
export interface TrafficData {
  timestamp: Date;
  location: {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
  trafficVolume: number;
  congestionLevel: 0 | 1 | 2 | 3; // 0: 空いている, 1: やや混雑, 2: 混雑, 3: 非常に混雑
  averageSpeed: number;
  vehicleTypes: {
    car: number;
    bus: number;
    truck: number;
    motorcycle: number;
    bicycle: number;
    pedestrian: number;
  };
}

export default function TrafficDashboard() {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'realtime' | '24h' | '7days' | '30days'>('realtime');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // モックデータを生成（実際はAPIから取得）
    const fetchTrafficData = async () => {
      setIsLoading(true);
      try {
        // 実際のアプリでは、ここでAPIからデータを取得
        // const response = await fetch('/api/traffic-data');
        // const data = await response.json();
        
        // 今回はモックデータを生成
        const mockData = generateMockTrafficData(20, selectedTimeFrame);
        setTrafficData(mockData);
        
        // 最初はすべての場所を選択
        if (selectedLocations.length === 0) {
          const locations = Array.from(new Set(mockData.map(item => item.location.id)));
          setSelectedLocations(locations);
        }
      } catch (error) {
        console.error('Error fetching traffic data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrafficData();
    
    // リアルタイムデータの場合は定期的に更新
    let intervalId: NodeJS.Timeout | null = null;
    if (selectedTimeFrame === 'realtime') {
      intervalId = setInterval(() => {
        fetchTrafficData();
      }, 30000); // 30秒ごとに更新
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedTimeFrame]);

  const handleTimeFrameChange = (timeFrame: 'realtime' | '24h' | '7days' | '30days') => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleLocationToggle = (locationId: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(locationId)) {
        return prev.filter(id => id !== locationId);
      } else {
        return [...prev, locationId];
      }
    });
  };

  const filteredData = trafficData.filter(item => 
    selectedLocations.includes(item.location.id)
  );

  return (
    <div className="space-y-6">
      {/* 時間範囲の選択 */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">データ表示期間</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleTimeFrameChange('realtime')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeFrame === 'realtime' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            リアルタイム
          </button>
          <button
            onClick={() => handleTimeFrameChange('24h')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeFrame === '24h' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            24時間
          </button>
          <button
            onClick={() => handleTimeFrameChange('7days')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeFrame === '7days' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            7日間
          </button>
          <button
            onClick={() => handleTimeFrameChange('30days')}
            className={`px-4 py-2 rounded-md ${
              selectedTimeFrame === '30days' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            30日間
          </button>
        </div>
      </div>
      
      {/* メインコンテンツ - タブ切り替え */}
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-blue-50 p-1 rounded-t-lg">
          <Tab className={({ selected }) => 
            `py-2 px-4 text-sm font-medium rounded-t-lg flex-1 text-center
             ${selected 
               ? 'bg-white text-blue-700 shadow-sm'
               : 'text-blue-500 hover:bg-white/[0.5] hover:text-blue-700'
             }`
          }>
            マップ表示
          </Tab>
          <Tab className={({ selected }) => 
            `py-2 px-4 text-sm font-medium rounded-t-lg flex-1 text-center
             ${selected 
               ? 'bg-white text-blue-700 shadow-sm'
               : 'text-blue-500 hover:bg-white/[0.5] hover:text-blue-700'
             }`
          }>
            グラフ表示
          </Tab>
          <Tab className={({ selected }) => 
            `py-2 px-4 text-sm font-medium rounded-t-lg flex-1 text-center
             ${selected 
               ? 'bg-white text-blue-700 shadow-sm'
               : 'text-blue-500 hover:bg-white/[0.5] hover:text-blue-700'
             }`
          }>
            予測分析
          </Tab>
        </Tab.List>
        <Tab.Panels className="bg-white rounded-b-lg shadow-md">
          <Tab.Panel className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <TrafficMap data={filteredData} onLocationToggle={handleLocationToggle} selectedLocations={selectedLocations} />
            )}
          </Tab.Panel>
          <Tab.Panel className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <TrafficChart data={filteredData} timeFrame={selectedTimeFrame} />
            )}
          </Tab.Panel>
          <Tab.Panel className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <TrafficPredictionPanel data={filteredData} timeFrame={selectedTimeFrame} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}