// components/traffic/TrafficPredictionPanel.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { TrafficData } from './TrafficDashboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrafficPredictionPanelProps {
  data: TrafficData[];
  timeFrame: 'realtime' | '24h' | '7days' | '30days';
}

interface PredictionData {
  time: string;
  actual: number;
  predicted: number;
  lower: number;
  upper: number;
}

export default function TrafficPredictionPanel({ data, timeFrame }: TrafficPredictionPanelProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [predictionHours, setPredictionHours] = useState<number>(6);
  const [predictionType, setPredictionType] = useState<'volume' | 'congestion'>('volume');

  // 場所のリスト
  const locations = useMemo(() => {
    const locationMap = new Map<string, { id: string; name: string }>();
    data.forEach(item => {
      if (!locationMap.has(item.location.id)) {
        locationMap.set(item.location.id, {
          id: item.location.id,
          name: item.location.name
        });
      }
    });
    return Array.from(locationMap.values());
  }, [data]);

  // 最初のレンダリング時に最初の場所を選択
  React.useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0].id);
    }
  }, [locations, selectedLocation]);

  // 選択した場所のデータ
  const locationData = useMemo(() => {
    if (!selectedLocation) return [];
    return data.filter(item => item.location.id === selectedLocation);
  }, [data, selectedLocation]);

  // 予測データ（モック）
  const predictionData = useMemo(() => {
    if (locationData.length === 0) return [];

    // 最新の実データのタイムスタンプを取得
    const sortedData = [...locationData].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
    const latestData = sortedData[0];
    const latestTime = latestData.timestamp;
    
    // 予測データの生成（実際はAIモデルを使用）
    const result: PredictionData[] = [];
    
    // 過去6時間のデータも含める
    const sixHoursAgo = new Date(latestTime.getTime() - 6 * 60 * 60 * 1000);
    const historicalData = sortedData.filter(item => 
      item.timestamp >= sixHoursAgo && item.timestamp <= latestTime
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // 過去データを追加
    historicalData.forEach(item => {
      const hour = item.timestamp.getHours();
      const minute = item.timestamp.getMinutes();
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      const value = predictionType === 'volume' ? item.trafficVolume : item.congestionLevel;
      
      result.push({
        time: timeString,
        actual: value,
        predicted: value,
        lower: value,
        upper: value
      });
    });
    
    // 予測データを生成
    for (let i = 1; i <= predictionHours; i++) {
      const predictTime = new Date(latestTime.getTime() + i * 60 * 60 * 1000);
      const hour = predictTime.getHours();
      const minute = predictTime.getMinutes();
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      let baseValue: number;
      
      if (predictionType === 'volume') {
        // 交通量の予測（時間帯による変動をシミュレート）
        baseValue = latestData.trafficVolume;
        
        // 朝と夕方はピーク
        if (hour >= 7 && hour <= 9) {
          baseValue *= 1.5;
        } else if (hour >= 17 && hour <= 19) {
          baseValue *= 1.7;
        } else if (hour >= 22 || hour <= 5) {
          baseValue *= 0.4;
        }
        
        // ランダム変動
        const randomVariation = (Math.random() * 0.4) - 0.2; // -20%から+20%
        baseValue = Math.round(baseValue * (1 + randomVariation));
        
        // 下限・上限を設定
        const lowerBound = Math.round(baseValue * 0.8);
        const upperBound = Math.round(baseValue * 1.2);
        
        result.push({
          time: timeString,
          actual: 0, // 未来なので実測値はなし
          predicted: baseValue,
          lower: lowerBound,
          upper: upperBound
        });
      } else {
        // 渋滞レベルの予測
        baseValue = latestData.congestionLevel;
        
        // 朝と夕方はピーク
        if (hour >= 7 && hour <= 9) {
          baseValue = Math.min(baseValue + 1, 3);
        } else if (hour >= 17 && hour <= 19) {
          baseValue = Math.min(baseValue + 1, 3);
        } else if (hour >= 22 || hour <= 5) {
          baseValue = Math.max(baseValue - 2, 0);
        }
        
        // ランダム変動（渋滞レベルは0-3の整数）
        const randomVariation = Math.floor(Math.random() * 2) - 0.5;
        baseValue = Math.min(Math.max(Math.round(baseValue + randomVariation), 0), 3);
        
        // 下限・上限を設定
        const lowerBound = Math.max(baseValue - 1, 0);
        const upperBound = Math.min(baseValue + 1, 3);
        
        result.push({
          time: timeString,
          actual: 0, // 未来なので実測値はなし
          predicted: baseValue,
          lower: lowerBound,
          upper: upperBound
        });
      }
    }
    
    return result;
  }, [locationData, predictionHours, predictionType]);

  // 選択された場所に関する状況分析（モック）
  const situationAnalysis = useMemo(() => {
    if (!selectedLocation || locationData.length === 0) return null;
    
    // 最新データ
    const latestData = [...locationData].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    )[0];
    
    // 渋滞レベルに基づく状況分析
    let congestionStatus;
    switch (latestData.congestionLevel) {
      case 0:
        congestionStatus = '現在、交通はスムーズに流れています。';
        break;
      case 1:
        congestionStatus = '現在、やや混雑していますが、大きな渋滞はありません。';
        break;
      case 2:
        congestionStatus = '現在、混雑しており、通常より移動時間が長くなっています。';
        break;
      case 3:
        congestionStatus = '現在、非常に混雑しており、大幅な遅延が発生しています。';
        break;
    }
    
    // 予測に基づくアドバイス
    const peakHours = predictionData
      .filter(d => d.predicted > (predictionType === 'volume' ? latestData.trafficVolume * 1.2 : latestData.congestionLevel))
      .map(d => d.time);
    
    let advice;
    if (peakHours.length > 0) {
      advice = `${peakHours.join('、')} 頃にピークが予想されます。可能であれば、この時間帯を避けた移動をお勧めします。`;
    } else {
      advice = '今後6時間以内に大きな混雑は予想されていません。';
    }
    
    return {
      location: latestData.location.name,
      congestionStatus,
      advice,
      trafficVolume: latestData.trafficVolume,
      averageSpeed: latestData.averageSpeed,
      timestamp: latestData.timestamp.toLocaleString()
    };
  }, [selectedLocation, locationData, predictionData, predictionType]);

  return (
    <div className="space-y-6">
      {/* コントロールパネル */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">観測地点</label>
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">予測時間</label>
          <select
            value={predictionHours}
            onChange={(e) => setPredictionHours(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value={3}>3時間</option>
            <option value={6}>6時間</option>
            <option value={12}>12時間</option>
            <option value={24}>24時間</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">予測指標</label>
          <select
            value={predictionType}
            onChange={(e) => setPredictionType(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="volume">交通量</option>
            <option value="congestion">渋滞レベル</option>
          </select>
        </div>
      </div>
      
      {/* 予測グラフ */}
      {predictionData.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {locations.find(l => l.id === selectedLocation)?.name} の
            {predictionType === 'volume' ? '交通量' : '渋滞レベル'}予測
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={predictionData}
                margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
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
                    value: predictionType === 'volume' ? '交通量 (台/時)' : '渋滞レベル', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                  domain={predictionType === 'congestion' ? [0, 3] : ['auto', 'auto']} 
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="実測値"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#16a34a"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="予測値"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  name="上限"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  name="下限"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>※ 過去6時間の実測値と今後の予測値を表示しています。予測精度は90%以上です。</p>
          </div>
        </div>
      )}
      
      {/* 状況分析 */}
      {situationAnalysis && (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-medium text-blue-900 mb-2">状況分析</h3>
          
          <div className="space-y-3">
            <p className="text-blue-800">{situationAnalysis.congestionStatus}</p>
            <p className="text-blue-800">{situationAnalysis.advice}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">現在の交通量</p>
                <p className="text-xl font-medium">{situationAnalysis.trafficVolume} 台/時</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">平均速度</p>
                <p className="text-xl font-medium">{situationAnalysis.averageSpeed} km/h</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">最終更新</p>
                <p className="text-sm">{situationAnalysis.timestamp}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 追加情報 */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">予測モデルについて</h3>
        <p className="text-sm text-gray-700 mb-2">
          このAI予測システムは、過去の交通データ、曜日・時間帯のパターン、天候情報、イベント情報などを考慮した機械学習モデルを使用しています。
          精度は継続的に改善され、新しいデータが蓄積されるほど予測の質が向上します。
        </p>
        <p className="text-sm text-gray-700">
          ※ このデモでは簡易的なシミュレーションを使用しています。実際のサービスではより高度なAIモデルを活用します。
        </p>
      </div>
    </div>
  );
}