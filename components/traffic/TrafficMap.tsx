// components/traffic/TrafficMap.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrafficData } from './TrafficDashboard';

interface TrafficMapProps {
  data: TrafficData[];
  onLocationToggle: (locationId: string) => void;
  selectedLocations: string[];
}

// 仮のマップコンポーネント（実際には leaflet などを使用）
export default function TrafficMap({ data, onLocationToggle, selectedLocations }: TrafficMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<Map<string, { name: string; lat: number; lng: number; }>>(new Map());
  
  // データから一意なロケーション情報を抽出
  useEffect(() => {
    const locationMap = new Map();
    data.forEach(item => {
      if (!locationMap.has(item.location.id)) {
        locationMap.set(item.location.id, {
          name: item.location.name,
          lat: item.location.lat,
          lng: item.location.lng,
        });
      }
    });
    setLocations(locationMap);
  }, [data]);

  // マップの描画（実際には Leaflet や Google Maps などを使用）
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // 実際のプロジェクトでは、ここで Leaflet や Google Maps などのマップライブラリを使用
    // 今回はモックの地図を描画
    const canvas = document.createElement('canvas');
    canvas.width = mapContainerRef.current.clientWidth;
    canvas.height = mapContainerRef.current.clientHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // 簡易的な地図の背景
      ctx.fillStyle = '#e9f5f8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 道路を描画
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 3;
      
      // 横方向の道路
      for (let y = 50; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // 縦方向の道路
      for (let x = 50; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // 現在の最新データから交通量を取得してマーカーを表示
      const latestDataByLocation = new Map<string, TrafficData>();
      
      // 各ロケーションごとに最新のデータを取得
      data.forEach(item => {
        const existing = latestDataByLocation.get(item.location.id);
        if (!existing || existing.timestamp < item.timestamp) {
          latestDataByLocation.set(item.location.id, item);
        }
      });
      
      // マップの範囲（実際にはデータの座標に基づいて計算）
      const mapBounds = {
        minLat: 35.65, maxLat: 35.75,
        minLng: 139.7, maxLng: 139.8
      };
      
      // マーカーを描画
      latestDataByLocation.forEach((item) => {
        // 地理座標をキャンバス座標に変換（簡易的な実装）
        const x = ((item.location.lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * canvas.width;
        const y = ((mapBounds.maxLat - item.location.lat) / (mapBounds.maxLat - mapBounds.minLat)) * canvas.height;
        
        // 選択状態に応じて枠の色を変更
        ctx.strokeStyle = selectedLocations.includes(item.location.id) ? '#2563eb' : '#94a3b8';
        ctx.lineWidth = 2;
        
        // 渋滞レベルに応じた色
        const colors = ['#22c55e', '#eab308', '#f97316', '#ef4444'];
        ctx.fillStyle = colors[item.congestionLevel];
        
        // 円を描画
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // 交通量を表示
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.trafficVolume.toString(), x, y);
      });
      
      // キャンバスをDOMに追加
      mapContainerRef.current.innerHTML = '';
      mapContainerRef.current.appendChild(canvas);
    }
  }, [data, selectedLocations]);

  return (
    <div className="space-y-4">
      <div className="h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden" ref={mapContainerRef}>
        {/* マップが表示される */}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">観測地点</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from(locations.entries()).map(([id, location]) => (
            <button
              key={id}
              onClick={() => onLocationToggle(id)}
              className={`px-3 py-2 text-sm rounded-md text-left ${
                selectedLocations.includes(id)
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">凡例</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">空いている</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">やや混雑</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm">混雑</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">非常に混雑</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>※ 実際のサービスでは、OpenStreetMapまたはGoogle Mapsを利用した詳細な地図を表示します。</p>
        <p>※ マーカーの数値は交通量（車両数/時間）を表しています。</p>
      </div>
    </div>
  );
}