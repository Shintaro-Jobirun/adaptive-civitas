// components/dashboard/AirQuality.tsx
"use client"

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 大気質指数（AQI）のモックデータ
const aqiData = [
  { time: '00:00', aqi: 48, pm25: 10, pm10: 28, no2: 32, o3: 45, co: 0.9, so2: 7 },
  { time: '01:00', aqi: 45, pm25: 9, pm10: 25, no2: 28, o3: 43, co: 0.8, so2: 6 },
  { time: '02:00', aqi: 42, pm25: 8, pm10: 22, no2: 25, o3: 41, co: 0.7, so2: 5 },
  { time: '03:00', aqi: 40, pm25: 8, pm10: 20, no2: 24, o3: 40, co: 0.6, so2: 5 },
  { time: '04:00', aqi: 38, pm25: 7, pm10: 19, no2: 22, o3: 38, co: 0.6, so2: 4 },
  { time: '05:00', aqi: 45, pm25: 9, pm10: 24, no2: 30, o3: 35, co: 0.7, so2: 5 },
  { time: '06:00', aqi: 55, pm25: 12, pm10: 32, no2: 40, o3: 32, co: 0.9, so2: 7 },
  { time: '07:00', aqi: 68, pm25: 15, pm10: 40, no2: 50, o3: 30, co: 1.1, so2: 10 },
  { time: '08:00', aqi: 80, pm25: 18, pm10: 47, no2: 55, o3: 35, co: 1.3, so2: 12 },
  { time: '09:00', aqi: 75, pm25: 17, pm10: 45, no2: 48, o3: 42, co: 1.2, so2: 11 },
  { time: '10:00', aqi: 70, pm25: 16, pm10: 42, no2: 45, o3: 48, co: 1.1, so2: 10 },
  { time: '11:00', aqi: 72, pm25: 16, pm10: 43, no2: 46, o3: 52, co: 1.0, so2: 9 },
  { time: '12:00', aqi: 75, pm25: 17, pm10: 44, no2: 48, o3: 58, co: 1.0, so2: 8 },
  { time: '13:00', aqi: 78, pm25: 18, pm10: 46, no2: 50, o3: 62, co: 1.0, so2: 8 },
  { time: '14:00', aqi: 82, pm25: 19, pm10: 48, no2: 52, o3: 65, co: 1.1, so2: 9 },
  { time: '15:00', aqi: 85, pm25: 20, pm10: 50, no2: 54, o3: 68, co: 1.1, so2: 10 },
  { time: '16:00', aqi: 88, pm25: 21, pm10: 52, no2: 56, o3: 65, co: 1.2, so2: 10 },
  { time: '17:00', aqi: 92, pm25: 22, pm10: 55, no2: 60, o3: 60, co: 1.3, so2: 11 },
  { time: '18:00', aqi: 85, pm25: 20, pm10: 52, no2: 58, o3: 55, co: 1.2, so2: 10 },
  { time: '19:00', aqi: 75, pm25: 17, pm10: 46, no2: 52, o3: 50, co: 1.1, so2: 9 },
  { time: '20:00', aqi: 68, pm25: 15, pm10: 42, no2: 45, o3: 48, co: 1.0, so2: 8 },
  { time: '21:00', aqi: 62, pm25: 14, pm10: 38, no2: 42, o3: 45, co: 0.9, so2: 7 },
  { time: '22:00', aqi: 58, pm25: 13, pm10: 35, no2: 38, o3: 42, co: 0.8, so2: 6 },
  { time: '23:00', aqi: 52, pm25: 11, pm10: 30, no2: 35, o3: 48, co: 0.8, so2: 6 },
];

// 週間AQI推移データ
const weeklyAqiData = [
  { day: '月', avgAqi: 62, maxAqi: 88, minAqi: 38 },
  { day: '火', avgAqi: 58, maxAqi: 85, minAqi: 40 },
  { day: '水', avgAqi: 65, maxAqi: 92, minAqi: 42 },
  { day: '木', avgAqi: 72, maxAqi: 98, minAqi: 45 },
  { day: '金', avgAqi: 80, maxAqi: 105, minAqi: 48 },
  { day: '土', avgAqi: 68, maxAqi: 95, minAqi: 45 },
  { day: '日', avgAqi: 55, maxAqi: 82, minAqi: 38 },
];

// 地区別AQIデータ
const districtAqiData = [
  { district: '中央区', aqi: 78, pm25: 18, pm10: 46, trend: 'up' },
  { district: '北区', aqi: 65, pm25: 14, pm10: 38, trend: 'stable' },
  { district: '南区', aqi: 72, pm25: 16, pm10: 42, trend: 'down' },
  { district: '東区', aqi: 82, pm25: 19, pm10: 48, trend: 'up' },
  { district: '西区', aqi: 58, pm25: 12, pm10: 35, trend: 'down' },
  { district: '臨海区', aqi: 88, pm25: 21, pm10: 52, trend: 'up' },
  { district: '郊外区', aqi: 52, pm25: 11, pm10: 30, trend: 'stable' },
];

// 大気汚染物質割合
const pollutantShareData = [
  { name: 'PM2.5', value: 32 },
  { name: 'PM10', value: 18 },
  { name: 'NO2', value: 22 },
  { name: 'O3', value: 15 },
  { name: 'CO', value: 8 },
  { name: 'SO2', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// センサーステータスデータ
const sensorStatusData = [
  { id: 1, location: '中央公園', status: 'active', aqi: 75, pm25: 17, lastUpdate: '3分前', battery: 82 },
  { id: 2, location: '市役所前', status: 'active', aqi: 68, pm25: 15, lastUpdate: '5分前', battery: 75 },
  { id: 3, location: '駅前広場', status: 'active', aqi: 85, pm25: 20, lastUpdate: '2分前', battery: 90 },
  { id: 4, location: '学校区域', status: 'active', aqi: 62, pm25: 14, lastUpdate: '4分前', battery: 65 },
  { id: 5, location: '工業団地', status: 'warning', aqi: 92, pm25: 22, lastUpdate: '15分前', battery: 45 },
  { id: 6, location: '住宅街A', status: 'active', aqi: 58, pm25: 12, lastUpdate: '6分前', battery: 70 },
  { id: 7, location: '住宅街B', status: 'error', aqi: null, pm25: null, lastUpdate: '3時間前', battery: 10 },
  { id: 8, location: '高速道路沿い', status: 'active', aqi: 88, pm25: 21, lastUpdate: '7分前', battery: 68 },
];

// 健康リスク評価データ
const healthRiskData = [
  { group: '一般人口', riskLevel: 'low', recommendation: '通常の屋外活動が可能です。', color: 'green' },
  { group: '敏感グループ', riskLevel: 'moderate', recommendation: '長時間の激しい運動は控えましょう。', color: 'yellow' },
  { group: '高齢者', riskLevel: 'moderate', recommendation: '長時間の屋外活動を控えましょう。', color: 'yellow' },
  { group: '子ども', riskLevel: 'moderate', recommendation: '激しい運動を控え、息苦しさがあれば屋内に移動しましょう。', color: 'yellow' },
  { group: '心臓疾患患者', riskLevel: 'high', recommendation: '屋外活動は短時間に留め、症状があれば屋内に移動しましょう。', color: 'orange' },
  { group: '呼吸器疾患患者', riskLevel: 'high', recommendation: '屋外活動を制限し、症状の悪化に注意してください。', color: 'orange' },
];

// 異常検知イベント
const anomalyEvents = [
  { id: 1, time: '08:45', location: '工業団地', type: 'PM2.5レベル急上昇', status: 'active', detail: '20分で PM2.5が10μg/m³から22μg/m³に上昇' },
  { id: 2, time: '12:20', location: '中央公園', type: 'オゾン濃度上昇', status: 'active', detail: '12時から13時にかけてオゾン濃度が45ppbから62ppbに上昇' },
  { id: 3, time: '15:30', location: '駅前広場', type: 'NO2濃度上昇', status: 'active', detail: '交通量増加に伴いNO2濃度が急上昇。50ppbから56ppbに上昇' },
  { id: 4, time: '10:10', location: '住宅街B', type: 'センサー通信エラー', status: 'active', detail: 'センサーからのデータ受信が途絶。バッテリー残量低下の可能性' },
];

// AQIレベルの説明
const aqiLevelInfo = [
  { level: 'Good', range: '0-50', color: 'bg-green-100 text-green-800', description: '大気質は良好で、健康リスクはほとんどありません。' },
  { level: 'Moderate', range: '51-100', color: 'bg-yellow-100 text-yellow-800', description: '敏感な人は症状が出ることがあります。一般の人は問題ありません。' },
  { level: 'Unhealthy for Sensitive Groups', range: '101-150', color: 'bg-orange-100 text-orange-800', description: '敏感なグループは健康への影響を受けるでしょう。一般の人への影響は少ないです。' },
  { level: 'Unhealthy', range: '151-200', color: 'bg-red-100 text-red-800', description: '健康警告：誰もが健康への影響を受ける可能性があります。' },
  { level: 'Very Unhealthy', range: '201-300', color: 'bg-purple-100 text-purple-800', description: '健康アラート：全員が深刻な健康影響を受ける可能性があります。' },
  { level: 'Hazardous', range: '301+', color: 'bg-gray-900 text-white', description: '緊急事態：深刻な健康への影響があり、全員が影響を受けます。' },
];

const AirQualityDashboard = () => {
  const [selectedView, setSelectedView] = useState('realtime');
  const [selectedPollutant, setSelectedPollutant] = useState('aqi');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">表示項目:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedPollutant}
              onChange={(e) => setSelectedPollutant(e.target.value)}
            >
              <option value="aqi">AQI (総合指数)</option>
              <option value="pm25">PM2.5</option>
              <option value="pm10">PM10</option>
              <option value="no2">NO2</option>
              <option value="o3">O3 (オゾン)</option>
              <option value="co">CO</option>
              <option value="so2">SO2</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('realtime')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'realtime'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              リアルタイム
            </button>
            <button
              onClick={() => setSelectedView('trends')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'trends'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              推移分析
            </button>
            <button
              onClick={() => setSelectedView('health')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'health'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              健康影響
            </button>
            <button
              onClick={() => setSelectedView('sensors')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'sensors'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              センサー
            </button>
          </div>
        </div>
        
        {/* 主要指標 */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在のAQI
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        78
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">普通</span>
                        <span className="ml-1 text-gray-500">(Moderate)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      PM2.5 (μg/m³)
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        18
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">良好</span>
                        <span className="ml-1 text-gray-500">(WHO基準以下)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      日内最高AQI
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        92
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-orange-600 font-semibold">17:00</span>
                        <span className="ml-1 text-gray-500">(工業団地)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      アクティブアラート
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        4件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">注意が必要</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedView === 'realtime' && (
        <>
          {/* リアルタイム大気質グラフ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の大気質推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={aqiData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedPollutant} 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    name={selectedPollutant.toUpperCase()} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 地区別AQIと汚染物質内訳 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 地区別AQI */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">地区別大気質</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={districtAqiData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="district" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="aqi" fill="#10B981" name="AQI" />
                    <Bar dataKey="pm25" fill="#60A5FA" name="PM2.5" />
                    <Bar dataKey="pm10" fill="#F59E0B" name="PM10" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 汚染物質内訳 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">汚染物質割合</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pollutantShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pollutantShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* 異常検知アラート */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">異常検知アラート</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                アラート設定
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時刻</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'active'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {event.status === 'active' ? '対応中' : '解決済み'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{event.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'trends' && (
        <>
          {/* 大気質トレンド分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">週間大気質推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyAqiData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgAqi" stroke="#10B981" strokeWidth={2} name="平均 AQI" />
                  <Line type="monotone" dataKey="maxAqi" stroke="#F59E0B" strokeWidth={2} name="最大 AQI" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="minAqi" stroke="#60A5FA" strokeWidth={2} name="最小 AQI" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">週間平均AQI</h4>
                <p className="text-2xl font-bold text-green-900">65.7</p>
                <p className="text-xs text-green-700 mt-1">前週比: -3.2</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">最高AQI記録日</h4>
                <p className="text-2xl font-bold text-yellow-900">金曜日</p>
                <p className="text-xs text-yellow-700 mt-1">AQI: 105</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">最も空気が綺麗な日</h4>
                <p className="text-2xl font-bold text-blue-900">日曜日</p>
                <p className="text-xs text-blue-700 mt-1">AQI: 55</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-purple-800 mb-1">日変動幅</h4>
                <p className="text-2xl font-bold text-purple-900">42.6</p>
                <p className="text-xs text-purple-700 mt-1">前週比: +3.8</p>
              </div>
            </div>
          </div>
          
          {/* 時間帯別・季節別分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 時間帯別傾向 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯別AQI傾向</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <h4 className="font-medium text-green-800">早朝（4:00-7:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">AQIは比較的低く（平均45）、PM2.5やNO2の濃度も低い傾向にあります。湿度の影響による微粒子の沈着が見られます。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">良好</span>
                    <span className="ml-2 text-xs text-gray-500">屋外活動に最適</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <h4 className="font-medium text-yellow-800">通勤時間帯（7:00-9:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">交通量の増加によりNO2濃度とPM2.5が上昇し、AQIが70-80に上昇します。特に主要道路沿いでの上昇が顕著です。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">普通</span>
                    <span className="ml-2 text-xs text-gray-500">敏感な人は注意</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <h4 className="font-medium text-blue-800">日中（10:00-15:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">太陽光によるオゾン生成が進行し、特に晴天の日はオゾン濃度が上昇します。AQIは70-85の間で変動します。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">普通</span>
                    <span className="ml-2 text-xs text-gray-500">長時間の屋外運動に注意</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-3 py-2">
                  <h4 className="font-medium text-orange-800">夕方ラッシュ（16:00-19:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">一日で最も大気質が悪化する時間帯で、AQIは85-95に上昇。交通量の増加と大気の安定によりPM2.5とNO2が蓄積します。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">注意</span>
                    <span className="ml-2 text-xs text-gray-500">敏感な人は屋外活動を制限</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-3 py-2">
                  <h4 className="font-medium text-indigo-800">夜間（20:00-23:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">交通量の減少に伴い徐々にAQIが低下し、60-70程度に落ち着きます。気温低下による逆転層が形成される夜は注意が必要です。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">普通</span>
                    <span className="ml-2 text-xs text-gray-500">徐々に改善</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 影響要因分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">大気質影響要因分析</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">気象条件の影響</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">風速</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">降水</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">気温</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">大気圧</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">60%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">風速の増加は大気汚染物質の拡散を促進し、AQIが15-25%改善します。</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">人間活動の影響</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">交通量</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">90%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">工業活動</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">80%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">建設作業</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">70%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">暖房使用</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">65%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">高速道路周辺では交通量増加時にNO2濃度が最大60%上昇することがあります。</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">季節要因</h4>
                  <p className="text-sm text-gray-600 mt-1">現在の季節: <span className="font-medium text-gray-900">春</span></p>
                  <p className="text-sm text-gray-600 mt-1">特徴的な傾向:</p>
                  <ul className="mt-1 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>黄砂の飛来によるPM10濃度の一時的上昇</li>
                    <li>花粉の影響で敏感な人の症状が悪化する可能性</li>
                    <li>春の雨による大気浄化効果が高まる時期</li>
                    <li>日中の紫外線量増加によるオゾン生成の活性化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'health' && (
        <>
          {/* 健康影響評価 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AQIレベルと健康影響</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AQIレベル</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">範囲</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">健康への影響</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {aqiLevelInfo.map((level, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${level.color}`}>
                          {level.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {level.range}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {level.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 人口グループ別健康リスク */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">人口グループ別健康リスク（現在のAQI: 78）</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">人口グループ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">リスクレベル</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">推奨事項</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {healthRiskData.map((group, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {group.group}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                          group.color === 'green' 
                            ? 'bg-green-100 text-green-800' 
                            : group.color === 'yellow'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {group.riskLevel === 'low' 
                            ? '低' 
                            : group.riskLevel === 'moderate'
                              ? '中'
                              : '高'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {group.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 健康保護アドバイス */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">予防策</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  大気質が悪い時間帯は窓を閉め、外気の侵入を最小限に抑えましょう。
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  外出時はマスクの着用を検討しましょう。特にN95やKN95などの微粒子フィルター付きマスクが効果的です。
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  屋内では空気清浄機の使用が効果的です。特にHEPAフィルター付きの製品を推奨します。
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  自動車の換気モードを内気循環に設定し、車内への汚染物質侵入を防ぎましょう。
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">症状と対策</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="font-medium text-gray-700">大気汚染関連の一般的な症状:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>目の刺激や充血</li>
                  <li>咳や喉の痛み</li>
                  <li>息切れや胸の圧迫感</li>
                  <li>頭痛やめまい</li>
                  <li>疲労感の増加</li>
                </ul>
                <p className="font-medium text-gray-700 mt-2">症状が現れた場合の対策:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>すぐに屋内の清浄な環境に移動する</li>
                  <li>十分な水分を摂取する</li>
                  <li>目の刺激には洗眼または人工涙液を使用</li>
                  <li>症状が重い場合や持続する場合は医師に相談</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">最適な屋外活動時間</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">早朝 (4:00-7:00)</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-md text-xs font-medium">最適</span>
                </div>
                <p>大気質が一日で最も良い時間帯です。ジョギングや散歩に最適です。</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">午前 (9:00-11:00)</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">普通</span>
                </div>
                <p>交通量増加による汚染がありますが、短時間の屋外活動には問題ありません。</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">午後 (14:00-16:00)</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">普通</span>
                </div>
                <p>オゾン濃度が上昇する可能性があるため、激しい運動は避けましょう。</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">夕方 (17:00-19:00)</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">避ける</span>
                </div>
                <p>交通量とAQIが最も高くなる時間帯です。屋外活動は控えましょう。</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">夜間 (20:00-22:00)</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium">普通</span>
                </div>
                <p>交通量減少に伴い大気質は改善しますが、局所的な汚染に注意しましょう。</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'sensors' && (
        <>
          {/* センサーステータス一覧 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">大気質センサーステータス</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                センサー追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設置場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在のAQI</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM2.5</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">バッテリー</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sensorStatusData.map((sensor) => (
                    <tr key={sensor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sensor.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sensor.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : sensor.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {sensor.status === 'active' 
                            ? '正常' 
                            : sensor.status === 'warning' 
                              ? '警告' 
                              : 'エラー'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.aqi !== null ? sensor.aqi : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.pm25 !== null ? `${sensor.pm25} μg/m³` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className={`h-2.5 rounded-full ${
                              sensor.battery > 70 ? 'bg-green-600' : 
                              sensor.battery > 30 ? 'bg-yellow-600' : 'bg-red-600'
                            }`} style={{ width: `${sensor.battery}%` }}></div>
                          </div>
                          <span>{sensor.battery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-green-600 hover:text-green-900 mr-2">詳細</button>
                        <button className="text-green-600 hover:text-green-900">設定</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* センサーマップとセンサー設定 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* センサーマップ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">センサー設置マップ</h3>
              <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">地図上にセンサー位置を表示します</p>
                  <p className="mt-1 text-sm text-gray-500">実際の地図データはデモの表示範囲に含まれていません</p>
                </div>
              </div>
            </div>
            
            {/* センサー設定 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">センサー設定</h3>
              <div className="mb-4">
                <label htmlFor="sensor-select" className="block text-sm font-medium text-gray-700 mb-1">センサー選択</label>
                <select 
                  id="sensor-select" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option>中央公園</option>
                  <option>市役所前</option>
                  <option>駅前広場</option>
                  <option>学校区域</option>
                  <option>工業団地</option>
                  <option>住宅街A</option>
                  <option>住宅街B</option>
                  <option>高速道路沿い</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="sensor-name" className="block text-sm font-medium text-gray-700 mb-1">センサー名</label>
                  <input 
                    type="text" 
                    id="sensor-name" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    defaultValue="中央公園"
                  />
                </div>
                
                <div>
                  <label htmlFor="sampling-rate" className="block text-sm font-medium text-gray-700 mb-1">サンプリングレート</label>
                  <select 
                    id="sampling-rate" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  >
                    <option>1分毎</option>
                    <option>5分毎</option>
                    <option>10分毎</option>
                    <option>15分毎</option>
                    <option>30分毎</option>
                    <option>1時間毎</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">計測項目</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="measure-pm25" name="measure-pm25" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-pm25" className="ml-2 text-sm text-gray-700">PM2.5</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-pm10" name="measure-pm10" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-pm10" className="ml-2 text-sm text-gray-700">PM10</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-no2" name="measure-no2" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-no2" className="ml-2 text-sm text-gray-700">NO2</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-o3" name="measure-o3" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-o3" className="ml-2 text-sm text-gray-700">O3</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-co" name="measure-co" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-co" className="ml-2 text-sm text-gray-700">CO</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-so2" name="measure-so2" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-so2" className="ml-2 text-sm text-gray-700">SO2</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-temp" name="measure-temp" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-temp" className="ml-2 text-sm text-gray-700">温度</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-humidity" name="measure-humidity" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-humidity" className="ml-2 text-sm text-gray-700">湿度</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">アラート設定</label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <label htmlFor="alert-aqi" className="block text-xs text-gray-500 mb-1">AQI閾値</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-aqi" 
                          min="0" 
                          max="300" 
                          step="5" 
                          defaultValue="100" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">100</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="alert-pm25" className="block text-xs text-gray-500 mb-1">PM2.5閾値 (μg/m³)</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-pm25" 
                          min="0" 
                          max="100" 
                          step="1" 
                          defaultValue="25" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">25</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通知設定</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="notify-app" name="notify-app" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-app" className="ml-2 text-sm text-gray-700">アプリ内通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-email" name="notify-email" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-email" className="ml-2 text-sm text-gray-700">メール通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-sms" name="notify-sms" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                      <label htmlFor="notify-sms" className="ml-2 text-sm text-gray-700">SMS通知</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  キャンセル
                </button>
                <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  保存
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AirQualityDashboard;
