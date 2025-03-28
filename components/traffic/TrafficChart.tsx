// components/traffic/TrafficChart.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrafficData } from './TrafficDashboard';

interface TrafficChartProps {
  data: TrafficData[];
  timeFrame: 'realtime' | '24h' | '7days' | '30days';
}

interface ChartData {
  time: string;
  [key: string]: string | number;
}

export default function TrafficChart({ data, timeFrame }: TrafficChartProps) {
  const [chartType, setChartType] = useState<'volume' | 'speed' | 'congestion'>('volume');
  const [vehicleType, setVehicleType] = useState<'all' | 'car' | 'bus' | 'truck' | 'motorcycle' | 'bicycle' | 'pedestrian'>('all');

  const chartData = useMemo(() => {
    // データを時間順にソート
    const sortedData = [...data].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // 時間間隔の決定
    let timeFormat: Intl.DateTimeFormatOptions;
    let groupBy: (date: Date) => string;

    switch (timeFrame) {
      case 'realtime':
        timeFormat = { hour: '2-digit', minute: '2-digit' };
        groupBy = (date) => date.toLocaleTimeString('ja-JP', timeFormat);
        break;
      case '24h':
        timeFormat = { hour: '2-digit', minute: '2-digit' };
        groupBy = (date) => date.toLocaleTimeString('ja-JP', timeFormat);
        break;
      case '7days':
        timeFormat = { month: '2-digit', day: '2-digit', hour: '2-digit' };
        groupBy = (date) => date.toLocaleDateString('ja-JP', timeFormat);
        break;
      case '30days':
        timeFormat = { month: '2-digit', day: '2-digit' };
        groupBy = (date) => date.toLocaleDateString('ja-JP', timeFormat);
        break;
    }

    // 地点ごとのデータをグループ化
    const locationGroups = new Map<string, TrafficData[]>();
    
    sortedData.forEach(item => {
      if (!locationGroups.has(item.location.id)) {
        locationGroups.set(item.location.id, []);
      }
      locationGroups.get(item.location.id)?.push(item);
    });

    // 時間単位でデータを集約
    const timeGroups = new Map<string, Map<string, { 
      volume: number[],
      speed: number[],
      congestion: number[],
      vehicleCounts: { [key: string]: number[] }
    }>>();

    locationGroups.forEach((items, locationId) => {
      items.forEach(item => {
        const timeKey = groupBy(item.timestamp);
        
        if (!timeGroups.has(timeKey)) {
          timeGroups.set(timeKey, new Map());
        }
        
        const locationsAtTime = timeGroups.get(timeKey)!;
        
        if (!locationsAtTime.has(locationId)) {
          locationsAtTime.set(locationId, {
            volume: [],
            speed: [],
            congestion: [],
            vehicleCounts: {
              car: [],
              bus: [],
              truck: [],
              motorcycle: [],
              bicycle: [],
              pedestrian: []
            }
          });
        }
        
        const locationData = locationsAtTime.get(locationId)!;
        locationData.volume.push(item.trafficVolume);
        locationData.speed.push(item.averageSpeed);
        locationData.congestion.push(item.congestionLevel);
        
        Object.entries(item.vehicleTypes).forEach(([type, count]) => {
          locationData.vehicleCounts[type].push(count);
        });
      });
    });

    // チャート用のデータ形式に変換
    const formattedData: ChartData[] = [];
    
    timeGroups.forEach((locations, timeKey) => {
      const entry: ChartData = { time: timeKey };
      
      locations.forEach((data, locationId) => {
        const locationName = sortedData.find(item => item.location.id === locationId)?.location.name || locationId;
        
        // 選択された指標に基づいてデータを設定
        if (chartType === 'volume') {
          if (vehicleType === 'all') {
            entry[locationName] = Math.round(data.volume.reduce((sum, val) => sum + val, 0) / data.volume.length);
          } else {
            entry[locationName] = Math.round(data.vehicleCounts[vehicleType].reduce((sum, val) => sum + val, 0) / data.vehicleCounts[vehicleType].length);
          }
        } else if (chartType === 'speed') {
          entry[locationName] = Math.round((data.speed.reduce((sum, val) => sum + val, 0) / data.speed.length) * 10) / 10;
        } else if (chartType === 'congestion') {
          entry[locationName] = Math.round((data.congestion.reduce((sum, val) => sum + val, 0) / data.congestion.length) * 10) / 10;
        }
      });
      
      formattedData.push(entry);
    });
    
    // 時間順にソート
    return formattedData.sort((a, b) => {
      // 時間文字列を比較（単純な文字列比較だと不正確な場合があるので注意）
      return a.time.localeCompare(b.time);
    });
  }, [data, timeFrame, chartType, vehicleType]);

  // 表示する地点（凡例）を取得
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    data.forEach(item => {
      locationSet.add(item.location.name);
    });
    return Array.from(locationSet);
  }, [data]);

  // グラフの色
  const colors = [
    '#2563eb', '#ea580c', '#16a34a', '#9333ea', '#ca8a04', '#db2777', 
    '#0891b2', '#4f46e5', '#b91c1c', '#1e293b'
  ];

  // Y軸のラベル
  const getYAxisLabel = () => {
    switch (chartType) {
      case 'volume':
        return vehicleType === 'all' ? '交通量 (台/時)' : `${getVehicleTypeLabel(vehicleType)} (台/時)`;
      case 'speed':
        return '平均速度 (km/h)';
      case 'congestion':
        return '渋滞レベル';
    }
  };

  // 車両タイプのラベル
  const getVehicleTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      all: '全車両',
      car: '乗用車',
      bus: 'バス',
      truck: 'トラック',
      motorcycle: 'バイク',
      bicycle: '自転車',
      pedestrian: '歩行者'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      {/* チャートコントロール */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">指標</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="volume">交通量</option>
            <option value="speed">平均速度</option>
            <option value="congestion">渋滞レベル</option>
          </select>
        </div>
        
        {chartType === 'volume' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">車両タイプ</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">全車両</option>
              <option value="car">乗用車</option>
              <option value="bus">バス</option>
              <option value="truck">トラック</option>
              <option value="motorcycle">バイク</option>
              <option value="bicycle">自転車</option>
              <option value="pedestrian">歩行者</option>
            </select>
          </div>
        )}
      </div>
      
      {/* グラフ */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              label={{ 
                value: '時間', 
                position: 'insideBottomRight', 
                offset: -10 
              }} 
            />
            <YAxis 
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} 
            />
            <Tooltip />
            <Legend />
            {locations.map((location, index) => (
              <Line
                key={location}
                type="monotone"
                dataKey={location}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* 補足情報 */}
      {chartType === 'congestion' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">渋滞レベルの説明</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span>0: 空いている（通常速度の80%以上）</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span>1: やや混雑（通常速度の60-80%）</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              <span>2: 混雑（通常速度の40-60%）</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span>3: 非常に混雑（通常速度の40%未満）</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        <p>※ 実際のサービスでは、より詳細な分析や時間帯ごとの傾向なども表示します。</p>
        <p>※ 表示データはデモ用のモックデータです。</p>
      </div>
    </div>
  );
}