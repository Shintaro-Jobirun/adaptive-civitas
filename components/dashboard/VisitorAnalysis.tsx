// components/dashboard/VisitorAnalysis.tsx
"use client"

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 時間帯別来街者数のモックデータ
const hourlyVisitorData = [
  { time: '00:00', visitors: 120, female: 48, male: 72, new: 25, returning: 95 },
  { time: '01:00', visitors: 85, female: 35, male: 50, new: 15, returning: 70 },
  { time: '02:00', visitors: 45, female: 18, male: 27, new: 8, returning: 37 },
  { time: '03:00', visitors: 20, female: 7, male: 13, new: 3, returning: 17 },
  { time: '04:00', visitors: 15, female: 5, male: 10, new: 2, returning: 13 },
  { time: '05:00', visitors: 35, female: 12, male: 23, new: 7, returning: 28 },
  { time: '06:00', visitors: 120, female: 45, male: 75, new: 30, returning: 90 },
  { time: '07:00', visitors: 320, female: 140, male: 180, new: 85, returning: 235 },
  { time: '08:00', visitors: 650, female: 305, male: 345, new: 180, returning: 470 },
  { time: '09:00', visitors: 950, female: 460, male: 490, new: 320, returning: 630 },
  { time: '10:00', visitors: 1150, female: 580, male: 570, new: 420, returning: 730 },
  { time: '11:00', visitors: 1350, female: 690, male: 660, new: 480, returning: 870 },
  { time: '12:00', visitors: 1550, female: 810, male: 740, new: 520, returning: 1030 },
  { time: '13:00', visitors: 1450, female: 760, male: 690, new: 480, returning: 970 },
  { time: '14:00', visitors: 1380, female: 720, male: 660, new: 450, returning: 930 },
  { time: '15:00', visitors: 1460, female: 750, male: 710, new: 470, returning: 990 },
  { time: '16:00', visitors: 1650, female: 840, male: 810, new: 530, returning: 1120 },
  { time: '17:00', visitors: 1850, female: 920, male: 930, new: 580, returning: 1270 },
  { time: '18:00', visitors: 2050, female: 1020, male: 1030, new: 620, returning: 1430 },
  { time: '19:00', visitors: 1950, female: 980, male: 970, new: 590, returning: 1360 },
  { time: '20:00', visitors: 1750, female: 880, male: 870, new: 510, returning: 1240 },
  { time: '21:00', visitors: 1450, female: 720, male: 730, new: 410, returning: 1040 },
  { time: '22:00', visitors: 950, female: 460, male: 490, new: 220, returning: 730 },
  { time: '23:00', visitors: 520, female: 250, male: 270, new: 110, returning: 410 },
];

// 曜日別来街者数のモックデータ
const dailyVisitorData = [
  { day: '月', visitors: 8500, growth: -5.2, shoppers: 3800, diners: 3200, others: 1500 },
  { day: '火', visitors: 7900, growth: -2.1, shoppers: 3500, diners: 3000, others: 1400 },
  { day: '水', visitors: 8200, growth: 3.8, shoppers: 3700, diners: 3100, others: 1400 },
  { day: '木', visitors: 8600, growth: 4.9, shoppers: 3900, diners: 3300, others: 1400 },
  { day: '金', visitors: 10500, growth: 22.1, shoppers: 4800, diners: 4200, others: 1500 },
  { day: '土', visitors: 14200, growth: 35.2, shoppers: 7100, diners: 5600, others: 1500 },
  { day: '日', visitors: 13800, growth: -2.8, shoppers: 6900, diners: 5400, others: 1500 },
];

// エリア別来街者数
const areaVisitorData = [
  { area: '駅前エリア', visitors: 5800, percentage: 38, trend: 'up' },
  { area: '商店街', visitors: 4200, percentage: 27, trend: 'stable' },
  { area: 'モール周辺', visitors: 3500, percentage: 23, trend: 'up' },
  { area: 'オフィス街', visitors: 1800, percentage: 12, trend: 'down' },
];

// 滞在時間分布
const stayDurationData = [
  { name: '30分未満', value: 35 },
  { name: '30分-1時間', value: 25 },
  { name: '1-2時間', value: 20 },
  { name: '2-3時間', value: 12 },
  { name: '3時間以上', value: 8 },
];

// 来訪頻度分布
const visitFrequencyData = [
  { name: '初回', value: 28 },
  { name: '週1回以上', value: 32 },
  { name: '月2-3回', value: 22 },
  { name: '月1回', value: 12 },
  { name: '年数回', value: 6 },
];

// 年齢層分布
const ageDistributionData = [
  { name: '10代以下', value: 8 },
  { name: '20代', value: 24 },
  { name: '30代', value: 22 },
  { name: '40代', value: 18 },
  { name: '50代', value: 15 },
  { name: '60代以上', value: 13 },
];

// センサーステータスデータ
const sensorStatusData = [
  { id: 1, location: '駅前広場', status: 'active', visitors: 258, detectionRate: 98, lastUpdate: '3分前', battery: 82 },
  { id: 2, location: '商店街入口', status: 'active', visitors: 184, detectionRate: 96, lastUpdate: '2分前', battery: 75 },
  { id: 3, location: 'ショッピングモール', status: 'active', visitors: 352, detectionRate: 99, lastUpdate: '1分前', battery: 90 },
  { id: 4, location: 'オフィス街', status: 'active', visitors: 125, detectionRate: 97, lastUpdate: '4分前', battery: 65 },
  { id: 5, location: '公園', status: 'warning', visitors: 68, detectionRate: 85, lastUpdate: '15分前', battery: 45 },
  { id: 6, location: 'バスターミナル', status: 'active', visitors: 146, detectionRate: 97, lastUpdate: '3分前', battery: 70 },
  { id: 7, location: 'レストランエリア', status: 'error', visitors: null, detectionRate: null, lastUpdate: '3時間前', battery: 10 },
  { id: 8, location: '観光案内所前', status: 'active', visitors: 92, detectionRate: 98, lastUpdate: '5分前', battery: 68 },
];

// ヒートマップデータ（時間帯×曜日別の来街者数）
const heatmapData = [
  { day: '月', '9-11': 850, '11-13': 1200, '13-15': 980, '15-17': 1050, '17-19': 1850, '19-21': 1650 },
  { day: '火', '9-11': 820, '11-13': 1150, '13-15': 950, '15-17': 1000, '17-19': 1800, '19-21': 1600 },
  { day: '水', '9-11': 840, '11-13': 1180, '13-15': 970, '15-17': 1020, '17-19': 1820, '19-21': 1620 },
  { day: '木', '9-11': 860, '11-13': 1220, '13-15': 990, '15-17': 1080, '17-19': 1880, '19-21': 1680 },
  { day: '金', '9-11': 920, '11-13': 1350, '13-15': 1120, '15-17': 1250, '17-19': 2150, '19-21': 1950 },
  { day: '土', '9-11': 1250, '11-13': 1850, '13-15': 1650, '15-17': 1750, '17-19': 2450, '19-21': 2350 },
  { day: '日', '9-11': 1180, '11-13': 1820, '13-15': 1580, '15-17': 1680, '17-19': 2350, '19-21': 2250 },
];

// 店舗カテゴリー別売上影響
const categorySalesData = [
  { category: '飲食店', visitorCorrelation: 0.92, salesIncrease: 28, peakHours: '12:00-14:00, 18:00-21:00' },
  { category: 'アパレル', visitorCorrelation: 0.85, salesIncrease: 24, peakHours: '11:00-14:00, 16:00-19:00' },
  { category: 'スーパーマーケット', visitorCorrelation: 0.78, salesIncrease: 18, peakHours: '17:00-20:00' },
  { category: 'エンターテイメント', visitorCorrelation: 0.88, salesIncrease: 32, peakHours: '18:00-22:00' },
  { category: '美容・健康', visitorCorrelation: 0.72, salesIncrease: 15, peakHours: '10:00-15:00, 17:00-19:00' },
  { category: '家電・デジタル', visitorCorrelation: 0.76, salesIncrease: 20, peakHours: '14:00-19:00' },
];

// 異常検知イベント
const anomalyEvents = [
  { id: 1, time: '08:45', location: '駅前広場', type: '急激な来街者増加', status: 'active', detail: '20分で通常の2倍の来街者を検出。通勤ラッシュ時間外の異常な増加' },
  { id: 2, time: '12:20', location: 'ショッピングモール', type: '滞在時間パターン変化', status: 'active', detail: '平均滞在時間が通常の1.5倍に増加。特定イベントの影響の可能性' },
  { id: 3, time: '15:30', location: '商店街', type: '特定店舗への集中', status: 'active', detail: '新規オープン店舗へ来街者が集中。周辺店舗への回遊が減少' },
  { id: 4, time: '10:10', location: 'レストランエリア', type: 'センサー通信エラー', status: 'active', detail: 'センサーからのデータ受信が途絶。バッテリー残量低下の可能性' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const VisitorAnalysisDashboard = () => {
  const [selectedView, setSelectedView] = useState('realtime');
  const [selectedDataType, setSelectedDataType] = useState('visitors');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">表示項目:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
            >
              <option value="visitors">来街者総数</option>
              <option value="female">女性</option>
              <option value="male">男性</option>
              <option value="new">新規来街者</option>
              <option value="returning">リピーター</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('realtime')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'realtime'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              リアルタイム
            </button>
            <button
              onClick={() => setSelectedView('trends')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'trends'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              トレンド分析
            </button>
            <button
              onClick={() => setSelectedView('demographics')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'demographics'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              顧客属性
            </button>
            <button
              onClick={() => setSelectedView('sensors')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'sensors'
                  ? 'bg-blue-600 text-white'
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
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の来街者数
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        1,856人
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+12.3%</span>
                        <span className="ml-1 text-gray-500">(先週比)</span>
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
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      平均滞在時間
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        68分
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+5.2%</span>
                        <span className="ml-1 text-gray-500">(先月比)</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      リピーター率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        64.8%
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+2.5%</span>
                        <span className="ml-1 text-gray-500">(先週比)</span>
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
                        <span className="text-red-600 font-semibold">異常パターン検出</span>
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
          {/* リアルタイム来街者グラフ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の来街者推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyVisitorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedDataType} 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    name={selectedDataType === 'visitors' ? '来街者数' : 
                          selectedDataType === 'female' ? '女性' : 
                          selectedDataType === 'male' ? '男性' : 
                          selectedDataType === 'new' ? '新規' : 'リピーター'} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* エリア別来街者数と滞在時間分布 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* エリア別来街者数 */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">エリア別来街者数</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={areaVisitorData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="area" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#3B82F6" name="来街者数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 滞在時間分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">滞在時間分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stayDurationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stayDurationData.map((entry, index) => (
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
              <h3 className="text-lg font-medium text-gray-900">異常パターン検知</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
          {/* 来街者トレンド分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">曜日別来街者傾向</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyVisitorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shoppers" stackId="a" fill="#3B82F6" name="買い物客" />
                  <Bar dataKey="diners" stackId="a" fill="#10B981" name="飲食客" />
                  <Bar dataKey="others" stackId="a" fill="#F59E0B" name="その他" />
                  <Line type="monotone" dataKey="growth" stroke="#EC4899" name="先週比成長率(%)" yAxisId={1} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">週間総来街者数</h4>
                <p className="text-2xl font-bold text-blue-900">71,700人</p>
                <p className="text-xs text-blue-700 mt-1">前週比: +8.2%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">最も混雑する曜日</h4>
                <p className="text-2xl font-bold text-yellow-900">土曜日</p>
                <p className="text-xs text-yellow-700 mt-1">平均: 14,200人/日</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">最も静かな曜日</h4>
                <p className="text-2xl font-bold text-green-900">火曜日</p>
                <p className="text-xs text-green-700 mt-1">平均: 7,900人/日</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-purple-800 mb-1">週末/平日比率</h4>
                <p className="text-2xl font-bold text-purple-900">1.64倍</p>
                <p className="text-xs text-purple-700 mt-1">前月比: +0.12</p>
              </div>
            </div>
          </div>
          
          {/* ヒートマップと店舗カテゴリー分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 時間帯×曜日別ヒートマップ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯×曜日別来街者ヒートマップ</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">曜日/時間帯</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">9-11時</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">11-13時</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">13-15時</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">15-17時</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">17-19時</th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">19-21時</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{row.day}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['9-11']/2500})` }}>
                          {row['9-11']}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['11-13']/2500})` }}>
                          {row['11-13']}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['13-15']/2500})` }}>
                          {row['13-15']}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['15-17']/2500})` }}>
                          {row['15-17']}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['17-19']/2500})` }}>
                          {row['17-19']}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-center" style={{ backgroundColor: `rgba(59, 130, 246, ${row['19-21']/2500})` }}>
                          {row['19-21']}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex justify-center items-center">
                <div className="w-64 h-4 bg-gradient-to-r from-white to-blue-600 rounded"></div>
                <div className="ml-2 flex justify-between w-64 text-xs text-gray-500">
                  <span>少</span>
                  <span>来街者数</span>
                  <span>多</span>
                </div>
              </div>
            </div>
            
            {/* 店舗カテゴリー別影響分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">店舗カテゴリー別売上影響</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリー</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">来街者相関</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">売上増加率</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ピーク時間</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categorySalesData.map((category, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${category.visitorCorrelation * 100}%` }}></div>
                            </div>
                            <span>{category.visitorCorrelation}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-green-600 font-medium">+{category.salesIncrease}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.peakHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">分析メモ: </span>
                  来街者数と売上の相関係数が高いカテゴリーほど、来街者施策の効果が高くなります。エンターテイメントと飲食店は特に来街者数の影響を強く受けており、これらを中心としたイベント開催が地域全体の活性化に効果的です。
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'demographics' && (
        <>
          {/* 顧客属性分析 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 年齢層分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">年齢層分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ageDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  20代と30代で全体の46%を占めており、主要なターゲット層となっています。
                </p>
              </div>
            </div>
            
            {/* 来訪頻度分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">来訪頻度分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitFrequencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {visitFrequencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  週1回以上の高頻度来訪者が32%と最も多く、リピーター比率が高い傾向にあります。
                </p>
              </div>
            </div>
            
            {/* 滞在時間分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">滞在時間分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stayDurationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stayDurationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  30分未満の短時間滞在が35%と最も多く、通過型の利用が主流です。滞在時間延長施策が課題です。
                </p>
              </div>
            </div>
          </div>
          
          {/* 顧客行動パターン分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">顧客行動パターン分析</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <h4 className="font-medium text-blue-800">平日朝型パターン（7:00-10:00）</h4>
                <p className="text-sm text-gray-600 mt-1">通勤・通学途中のユーザーが中心。滞在時間は短く（平均15分）、購買単価も低め。カフェやコンビニでの利用が多い。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">主要属性: 会社員・学生</span>
                  <span className="ml-2 text-xs text-gray-500">全体の18%</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <h4 className="font-medium text-green-800">主婦層パターン（10:00-14:00）</h4>
                <p className="text-sm text-gray-600 mt-1">平日日中の主要来街者。滞在時間が長く（平均85分）、複数店舗を回遊する傾向がある。スーパーを起点に多様な店舗を利用。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">主要属性: 30-50代女性</span>
                  <span className="ml-2 text-xs text-gray-500">全体の22%</span>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3 py-2">
                <h4 className="font-medium text-yellow-800">オフィスワーカーパターン（12:00-13:00, 17:00-19:00）</h4>
                <p className="text-sm text-gray-600 mt-1">ランチタイムと退社後の利用がピーク。飲食店の利用が主で、帰宅前の買い物も多い。特に平日の売上に貢献。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">主要属性: 20-40代会社員</span>
                  <span className="ml-2 text-xs text-gray-500">全体の26%</span>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-3 py-2">
                <h4 className="font-medium text-purple-800">夕方学生パターン（15:00-18:00）</h4>
                <p className="text-sm text-gray-600 mt-1">下校時間後の学生グループが中心。飲食店やエンターテイメント施設での利用が多い。一人当たりの消費額は少ないが滞在時間が長い。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">主要属性: 10-20代学生</span>
                  <span className="ml-2 text-xs text-gray-500">全体の15%</span>
                </div>
              </div>
              
              <div className="border-l-4 border-red-500 pl-3 py-2">
                <h4 className="font-medium text-red-800">週末家族パターン（土日10:00-17:00）</h4>
                <p className="text-sm text-gray-600 mt-1">家族連れでの来街が多く、滞在時間も長い（平均120分）。多様な施設を利用し、消費単価も高い。特に土曜日午後がピーク。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">主要属性: 30-40代家族</span>
                  <span className="ml-2 text-xs text-gray-500">全体の19%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 回遊パターン分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">回遊パターン分析</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                来街者の施設間移動を分析し、主要な回遊ルートと滞留スポットを特定します。この情報は店舗配置の最適化やイベント計画に活用できます。
              </p>
            </div>
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">回遊パターンマップ</p>
                <p className="mt-1 text-sm text-gray-500">実際のマップデータはデモの表示範囲に含まれていません</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-900">主要回遊パターン #1</h4>
                <p className="text-sm text-gray-600 mt-1">駅前 → 商店街 → モール → 飲食店街</p>
                <p className="text-xs text-gray-500 mt-2">全来街者の38%が通るルートで、最も一般的な回遊パターン。特に休日の家族連れに多く見られます。</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-900">主要回遊パターン #2</h4>
                <p className="text-sm text-gray-600 mt-1">駅前 → オフィス街 → 飲食店街</p>
                <p className="text-xs text-gray-500 mt-2">平日のオフィスワーカーに多いパターン。特にランチタイムと夕方に集中します。</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-900">主要回遊パターン #3</h4>
                <p className="text-sm text-gray-600 mt-1">モール → 公園 → 商店街</p>
                <p className="text-xs text-gray-500 mt-2">休日の来街者によく見られ、長時間滞在を特徴とします。家族連れが多く、消費単価も高い傾向。</p>
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
              <h3 className="text-lg font-medium text-gray-900">センサーステータス</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在の来街者数</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">検知率</th>
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
                        {sensor.visitors !== null ? `${sensor.visitors}人` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.detectionRate !== null ? `${sensor.detectionRate}%` : '-'}
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
                        <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                        <button className="text-blue-600 hover:text-blue-900">設定</button>
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>駅前広場</option>
                  <option>商店街入口</option>
                  <option>ショッピングモール</option>
                  <option>オフィス街</option>
                  <option>公園</option>
                  <option>バスターミナル</option>
                  <option>レストランエリア</option>
                  <option>観光案内所前</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="sensor-name" className="block text-sm font-medium text-gray-700 mb-1">センサー名</label>
                  <input 
                    type="text" 
                    id="sensor-name" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue="駅前広場"
                  />
                </div>
                
                <div>
                  <label htmlFor="sampling-rate" className="block text-sm font-medium text-gray-700 mb-1">サンプリングレート</label>
                  <select 
                    id="sampling-rate" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      <input id="measure-count" name="measure-count" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-count" className="ml-2 text-sm text-gray-700">来街者数</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-gender" name="measure-gender" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-gender" className="ml-2 text-sm text-gray-700">性別推定</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-age" name="measure-age" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-age" className="ml-2 text-sm text-gray-700">年齢層推定</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-stay" name="measure-stay" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-stay" className="ml-2 text-sm text-gray-700">滞在時間</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-route" name="measure-route" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-route" className="ml-2 text-sm text-gray-700">移動経路</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-revisit" name="measure-revisit" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-revisit" className="ml-2 text-sm text-gray-700">再来訪検知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-group" name="measure-group" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-group" className="ml-2 text-sm text-gray-700">グループ検知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-traffic" name="measure-traffic" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-traffic" className="ml-2 text-sm text-gray-700">通行量</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">アラート設定</label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <label htmlFor="alert-threshold" className="block text-xs text-gray-500 mb-1">混雑閾値（人/分）</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-threshold" 
                          min="0" 
                          max="500" 
                          step="10" 
                          defaultValue="300" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">300</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="alert-decrease" className="block text-xs text-gray-500 mb-1">急激な減少アラート（%）</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-decrease" 
                          min="0" 
                          max="100" 
                          step="5" 
                          defaultValue="50" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">50%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通知設定</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="notify-app" name="notify-app" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-app" className="ml-2 text-sm text-gray-700">アプリ内通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-email" name="notify-email" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-email" className="ml-2 text-sm text-gray-700">メール通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-sms" name="notify-sms" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="notify-sms" className="ml-2 text-sm text-gray-700">SMS通知</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  キャンセル
                </button>
                <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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

export default VisitorAnalysisDashboard;