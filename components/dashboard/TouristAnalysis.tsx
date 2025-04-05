// components/dashboard/TouristAnalysis.tsx
"use client"

import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Data Definitions ---

// Hourly tourist data (時間帯別観光客データ)
const hourlyTouristData = [
  { time: '00:00', tourists: 85, domestic: 45, foreign: 40, leisure: 70, business: 15 },
  { time: '01:00', tourists: 65, domestic: 40, foreign: 25, leisure: 55, business: 10 },
  { time: '02:00', tourists: 35, domestic: 25, foreign: 10, leisure: 30, business: 5 },
  { time: '03:00', tourists: 20, domestic: 15, foreign: 5, leisure: 18, business: 2 },
  { time: '04:00', tourists: 15, domestic: 10, foreign: 5, leisure: 12, business: 3 },
  { time: '05:00', tourists: 25, domestic: 15, foreign: 10, leisure: 20, business: 5 },
  { time: '06:00', tourists: 75, domestic: 45, foreign: 30, leisure: 60, business: 15 },
  { time: '07:00', tourists: 150, domestic: 90, foreign: 60, leisure: 120, business: 30 },
  { time: '08:00', tourists: 280, domestic: 170, foreign: 110, leisure: 210, business: 70 },
  { time: '09:00', tourists: 450, domestic: 270, foreign: 180, leisure: 360, business: 90 },
  { time: '10:00', tourists: 650, domestic: 380, foreign: 270, leisure: 540, business: 110 },
  { time: '11:00', tourists: 820, domestic: 480, foreign: 340, leisure: 690, business: 130 },
  { time: '12:00', tourists: 920, domestic: 530, foreign: 390, leisure: 780, business: 140 },
  { time: '13:00', tourists: 850, domestic: 490, foreign: 360, leisure: 720, business: 130 },
  { time: '14:00', tourists: 780, domestic: 450, foreign: 330, leisure: 650, business: 130 },
  { time: '15:00', tourists: 820, domestic: 470, foreign: 350, leisure: 680, business: 140 },
  { time: '16:00', tourists: 920, domestic: 520, foreign: 400, leisure: 760, business: 160 },
  { time: '17:00', tourists: 850, domestic: 480, foreign: 370, leisure: 700, business: 150 },
  { time: '18:00', tourists: 920, domestic: 520, foreign: 400, leisure: 780, business: 140 },
  { time: '19:00', tourists: 980, domestic: 560, foreign: 420, leisure: 840, business: 140 },
  { time: '20:00', tourists: 850, domestic: 490, foreign: 360, leisure: 740, business: 110 },
  { time: '21:00', tourists: 650, domestic: 380, foreign: 270, leisure: 580, business: 70 },
  { time: '22:00', tourists: 380, domestic: 230, foreign: 150, leisure: 340, business: 40 },
  { time: '23:00', tourists: 180, domestic: 110, foreign: 70, leisure: 160, business: 20 },
];

// Monthly tourist data (月別観光客数データ)
const monthlyTouristData = [
  { month: '1月', tourists: 28500, domestic: 19800, foreign: 8700, growth: -5.2 },
  { month: '2月', tourists: 26800, domestic: 18200, foreign: 8600, growth: -6.0 },
  { month: '3月', tourists: 34500, domestic: 22800, foreign: 11700, growth: 28.7 },
  { month: '4月', tourists: 45800, domestic: 29500, foreign: 16300, growth: 32.8 },
  { month: '5月', tourists: 52600, domestic: 32600, foreign: 20000, growth: 14.8 },
  { month: '6月', tourists: 42500, domestic: 26800, foreign: 15700, growth: -19.2 },
  { month: '7月', tourists: 56800, domestic: 35200, foreign: 21600, growth: 33.6 },
  { month: '8月', tourists: 68500, domestic: 41800, foreign: 26700, growth: 20.6 },
  { month: '9月', tourists: 48200, domestic: 30500, foreign: 17700, growth: -29.6 },
  { month: '10月', tourists: 54800, domestic: 34200, foreign: 20600, growth: 13.7 },
  { month: '11月', tourists: 42500, domestic: 27800, foreign: 14700, growth: -22.4 },
  { month: '12月', tourists: 38600, domestic: 24500, foreign: 14100, growth: -9.2 },
];

// Spot visitor data (観光スポット別訪問者数)
const spotVisitorData = [
  { spot: '歴史博物館', visitors: 4600, percentage: 24, avgStay: 68, satisfaction: 4.2 },
  { spot: '市立公園', visitors: 5200, percentage: 27, avgStay: 52, satisfaction: 4.5 },
  { spot: '中央広場', visitors: 6800, percentage: 35, avgStay: 45, satisfaction: 4.3 },
  { spot: '伝統市場', visitors: 4900, percentage: 25, avgStay: 75, satisfaction: 4.6 },
  { spot: '古城跡', visitors: 3800, percentage: 20, avgStay: 62, satisfaction: 4.1 },
  { spot: '展望台', visitors: 4200, percentage: 22, avgStay: 38, satisfaction: 4.7 },
];

// Tourist origin data (観光客の出身地域)
const touristOriginData = [
  { name: '国内（首都圏）', value: 35 },
  { name: '国内（その他）', value: 25 },
  { name: '東アジア', value: 18 },
  { name: '欧米', value: 12 },
  { name: '東南アジア', value: 7 },
  { name: 'その他', value: 3 },
];

// Accommodation data (宿泊形態データ)
const accommodationData = [
  { name: 'ホテル', value: 42 },
  { name: '旅館・民宿', value: 18 },
  { name: '民泊', value: 15 },
  { name: 'ゲストハウス', value: 10 },
  { name: '日帰り', value: 15 },
];

// Travel purpose data (旅行目的データ)
const travelPurposeData = [
  { name: '観光・レジャー', value: 68 },
  { name: 'ビジネス', value: 15 },
  { name: '親族・友人訪問', value: 8 },
  { name: 'イベント参加', value: 5 },
  { name: 'その他', value: 4 },
];

// Tourist spending data (観光客消費分析)
const touristSpendingData = [
  { category: '宿泊費', domestic: 12500, foreign: 18500, percentage: 28 },
  { category: '飲食費', domestic: 9800, foreign: 12200, percentage: 20 },
  { category: '買い物', domestic: 8500, foreign: 15800, percentage: 22 },
  { category: '交通費', domestic: 4500, foreign: 6800, percentage: 10 },
  { category: 'エンターテイメント', domestic: 6200, foreign: 8500, percentage: 13 },
  { category: 'その他', domestic: 3500, foreign: 4200, percentage: 7 },
];

// Sensor status data (センサーステータスデータ)
const sensorStatusData = [
  { id: 1, location: '歴史博物館', status: 'active', visitors: 182, batteryLevel: 82, lastUpdate: '3分前' },
  { id: 2, location: '市立公園入口', status: 'active', visitors: 95, batteryLevel: 75, lastUpdate: '2分前' },
  { id: 3, location: '中央広場', status: 'active', visitors: 256, batteryLevel: 90, lastUpdate: '1分前' },
  { id: 4, location: '伝統市場', status: 'active', visitors: 178, batteryLevel: 65, lastUpdate: '4分前' },
  { id: 5, location: '古城跡', status: 'warning', visitors: 85, batteryLevel: 45, lastUpdate: '15分前' },
  { id: 6, location: '展望台', status: 'active', visitors: 76, batteryLevel: 70, lastUpdate: '3分前' },
  { id: 7, location: '観光案内所', status: 'error', visitors: null, batteryLevel: 10, lastUpdate: '3時間前' },
  { id: 8, location: 'バスターミナル', status: 'active', visitors: 118, batteryLevel: 68, lastUpdate: '5分前' },
];

// Satisfaction data (旅行満足度データ)
const satisfactionData = [
  { category: '全体満足度', score: 4.3, benchmark: 4.1, trend: '+0.2' },
  { category: '観光スポット', score: 4.4, benchmark: 4.2, trend: '+0.2' },
  { category: '交通の便', score: 3.8, benchmark: 3.7, trend: '+0.1' },
  { category: '飲食', score: 4.5, benchmark: 4.3, trend: '+0.2' },
  { category: '宿泊施設', score: 4.2, benchmark: 4.0, trend: '+0.2' },
  { category: '観光案内', score: 3.9, benchmark: 3.8, trend: '+0.1' },
  { category: 'おもてなし', score: 4.6, benchmark: 4.4, trend: '+0.2' },
  { category: 'コストパフォーマンス', score: 4.0, benchmark: 3.8, trend: '+0.2' },
];

// Anomaly events (異常検知イベント)
const anomalyEvents = [
  { id: 1, time: '09:45', location: '歴史博物館', type: '急激な来訪者増加', status: 'active', detail: '団体ツアー複数が同時に到着。通常の2.5倍の入場者数' },
  { id: 2, time: '12:20', location: '中央広場', type: '滞在時間パターン変化', status: 'active', detail: 'イベント開催に伴い平均滞在時間が68分から112分に増加' },
  { id: 3, time: '15:30', location: '伝統市場', type: '外国人観光客比率急増', status: 'active', detail: '外国人観光客比率が通常の35%から62%に急増' },
  { id: 4, time: '10:10', location: '観光案内所', type: 'センサー通信エラー', status: 'active', detail: 'センサーからのデータ受信が途絶。バッテリー残量低下の可能性' },
];

// Colors for charts (グラフ用の色)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Define the type for the data keys used in hourlyTouristData
type HourlyDataKey = 'tourists' | 'domestic' | 'foreign' | 'leisure' | 'business';

// Main dashboard component
const TouristAnalysisDashboard: React.FC = () => {
  // State for selected view (realtime, trends, profile, sensors)
  const [selectedView, setSelectedView] = useState('realtime');
  // State for selected data type in hourly chart
  const [selectedDataType, setSelectedDataType] = useState<HourlyDataKey>('tourists');

  // Function to get the display name for the selected data type
  const getSelectedDataTypeName = (key: HourlyDataKey): string => {
    switch (key) {
      case 'tourists': return '観光客総数';
      case 'domestic': return '国内客';
      case 'foreign': return '外国人';
      case 'leisure': return 'レジャー';
      case 'business': return 'ビジネス';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 font-sans"> {/* Added default font */}
      {/* Filters and View Selection Header */}
      <div className="bg-white p-4 rounded-lg shadow-md"> {/* Added shadow */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Data Type Selector for Hourly Chart */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dataTypeSelect" className="text-sm font-medium text-gray-700">表示項目:</label>
            <select
              id="dataTypeSelect"
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5" // Adjusted padding
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value as HourlyDataKey)} // Cast value to type
            >
              <option value="tourists">観光客総数</option>
              <option value="domestic">国内客</option>
              <option value="foreign">外国人</option>
              <option value="leisure">レジャー</option>
              <option value="business">ビジネス</option>
            </select>
          </div>

          {/* View Selection Buttons */}
          <div className="flex space-x-2 flex-wrap gap-y-2"> {/* Added flex-wrap and gap */}
            {(['realtime', 'trends', 'profile', 'sensors'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${ // Added font-medium and transition
                  selectedView === view
                    ? 'bg-blue-600 text-white shadow-sm' // Active state
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state
                }`}
              >
                {view === 'realtime' ? 'リアルタイム' :
                 view === 'trends' ? 'トレンド分析' :
                 view === 'profile' ? '観光客プロファイル' : 'センサー'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card 1: Current Tourists */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の観光客数
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        842人 {/* Example static value */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+15.3%</span>
                        <span className="ml-1 text-gray-500">(先週比)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 2: Foreign Tourist Ratio */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      外国人観光客比率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        42.8% {/* Example static value */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+3.5%</span>
                        <span className="ml-1 text-gray-500">(先月比)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 3: Spending per Tourist */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      一人当たり消費額
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        28,450円 {/* Example static value */}
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

          {/* Metric Card 4: Active Alerts */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                        {anomalyEvents.filter(e => e.status === 'active').length}件 {/* Dynamic count */}
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

      {/* --- Conditional Content Based on selectedView --- */}

      {/* Realtime View */}
      {selectedView === 'realtime' && (
        <>
          {/* Hourly Tourist Count Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の観光客数推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyTouristData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12}/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedDataType}
                    stroke="#3B82F6" // Blue color
                    strokeWidth={2}
                    name={getSelectedDataTypeName(selectedDataType)} // Dynamic name
                    dot={false} // Hide dots for cleaner look
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spot Visitors and Origin Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spot Visitor Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">観光スポット別訪問者数</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={spotVisitorData}
                    layout="vertical" // Horizontal bars
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" fontSize={12} />
                    <YAxis dataKey="spot" type="category" width={100} fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#3B82F6" name="訪問者数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tourist Origin Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">観光客出身地域</h3>
              <div className="h-80 flex items-center justify-center"> {/* Centered Pie */}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={touristOriginData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      // Custom label function for better readability
                      label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2} // Add padding between slices
                    >
                      {touristOriginData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Anomaly Detection Events Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">観光客パターン異常検知</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                            ? 'bg-red-100 text-red-800' // Active alert
                            : 'bg-green-100 text-green-800' // Resolved/Inactive
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

      {/* Trends View */}
      {selectedView === 'trends' && (
        <>
          {/* Monthly Tourist Trends Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">月別観光客数推移</h3>
            <div className="h-96"> {/* Increased height */}
              <ResponsiveContainer width="100%" height="100%">
                {/* Combined Bar and Line Chart */}
                <BarChart
                  data={monthlyTouristData}
                  margin={{ top: 5, right: 40, left: 20, bottom: 5 }} // Adjusted right margin for second YAxis
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12}/>
                  {/* Y-axis for Bar Chart (Tourist Count) */}
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" fontSize={12}/>
                  {/* Y-axis for Line Chart (Growth Rate) */}
                  <YAxis yAxisId="right" orientation="right" stroke="#EC4899" fontSize={12} unit="%"/>
                  <Tooltip />
                  <Legend />
                  {/* Bars for domestic and foreign tourists (stacked) */}
                  <Bar yAxisId="left" dataKey="domestic" stackId="a" fill="#3B82F6" name="国内客" />
                  <Bar yAxisId="left" dataKey="foreign" stackId="a" fill="#10B981" name="外国人" />
                  {/* Line for growth rate */}
                  <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#EC4899" name="前月比成長率(%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Cards for Trends */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">年間観光客数</h4>
                <p className="text-2xl font-bold text-blue-900">540,600人</p>
                <p className="text-xs text-blue-700 mt-1">前年比: +8.5%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">ピークシーズン</h4>
                <p className="text-2xl font-bold text-yellow-900">8月</p>
                <p className="text-xs text-yellow-700 mt-1">68,500人/月</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">外国人比率</h4>
                <p className="text-2xl font-bold text-green-900">38.2%</p>
                <p className="text-xs text-green-700 mt-1">前年比: +2.8%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 mb-1">観光収入</h4>
                <p className="text-2xl font-bold text-purple-900">15.4億円</p>
                <p className="text-xs text-purple-700 mt-1">前年比: +11.2%</p>
              </div>
            </div>
          </div>

          {/* Spot Satisfaction/Stay Time and Spending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spot Satisfaction and Average Stay Time Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">観光スポット別満足度・滞在時間</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">観光スポット</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">訪問率</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平均滞在時間</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">満足度</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {spotVisitorData.map((spot, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spot.spot}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spot.percentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spot.avgStay}分</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {/* Satisfaction Bar */}
                            <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(spot.satisfaction / 5) * 100}%` }}></div>
                            </div>
                            {/* Score Text */}
                            <span className="font-medium">{spot.satisfaction.toFixed(1)}/5.0</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tourist Spending Analysis Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">カテゴリー別消費額分析</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={touristSpendingData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit="円" fontSize={12}/>
                    <YAxis dataKey="category" type="category" width={100} fontSize={12}/>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()}円`} />
                    <Legend />
                    <Bar dataKey="domestic" fill="#3B82F6" name="国内客(円)" />
                    <Bar dataKey="foreign" fill="#10B981" name="外国人(円)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  外国人観光客は宿泊費と買い物で国内客より多く消費する傾向があります。特に買い物では約1.9倍の消費額となっています。
                </p>
              </div>
            </div>
          </div>

          {/* Travel Satisfaction Analysis Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">旅行満足度分析</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">評価項目</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">スコア</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ベンチマーク</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">トレンド</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">評価</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {satisfactionData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{item.score.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.benchmark.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* Trend Indicator */}
                        <span className={`font-medium ${parseFloat(item.trend) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {parseFloat(item.trend) >= 0 ? '▲' : '▼'} {item.trend}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* Evaluation Bar */}
                        <div className="w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full ${
                              item.score >= 4.5 ? 'bg-green-500' : // Excellent
                              item.score >= 4.0 ? 'bg-blue-500' :   // Good
                              item.score >= 3.5 ? 'bg-yellow-400' : // Average
                              'bg-red-500' // Poor
                            }`}
                            style={{ width: `${(item.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">分析メモ: </span>
                全体的に満足度は高く、特に「おもてなし」と「飲食」の評価が優れています。一方で「交通の便」と「観光案内」は改善の余地があります。これらの項目は多言語対応の強化や公共交通機関の利便性向上により改善できる可能性があります。
              </p>
            </div>
          </div>
        </>
      )}

      {/* Profile View */}
      {selectedView === 'profile' && (
        <>
          {/* Tourist Profile Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tourist Origin */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">観光客出身地域</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={touristOriginData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" labelLine={false} label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''} paddingAngle={2}>
                      {touristOriginData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  国内観光客が依然最大のシェア（60%）を占めていますが、東アジアからの観光客が増加傾向にあります。
                </p>
              </div>
            </div>

            {/* Accommodation Type */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">宿泊形態</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie data={accommodationData} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" dataKey="value" labelLine={false} label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''} paddingAngle={2}>
                      {accommodationData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  ホテルが最も人気の宿泊形態で、民泊の利用が前年比で5%増加しています。
                </p>
              </div>
            </div>

            {/* Travel Purpose */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">旅行目的</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={travelPurposeData} cx="50%" cy="50%" outerRadius={80} fill="#FFBB28" dataKey="value" labelLine={false} label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''} paddingAngle={2}>
                      {travelPurposeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  観光・レジャー目的が大多数を占め、ビジネス目的の訪問者は主に平日に集中しています。
                </p>
              </div>
            </div>
          </div>

          {/* Tourist Behavior Patterns */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">観光客行動パターン分析</h3>
            <div className="space-y-4">
              {/* Pattern 1 */}
              <div className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 rounded-r-md">
                <h4 className="font-medium text-blue-800">日帰り観光客パターン</h4>
                <p className="text-sm text-gray-600 mt-1">主に近隣地域からの観光客に多く見られるパターン。滞在時間は短く（平均4.2時間）、午前中に到着し夕方には帰路につくケースが多い。主要スポット1-2カ所を巡るのみ。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-medium">主要属性: 国内・日帰り</span>
                  <span className="ml-2 text-xs text-gray-500">全体の15%</span>
                </div>
              </div>
              {/* Pattern 2 */}
              <div className="border-l-4 border-green-500 pl-3 py-2 bg-green-50 rounded-r-md">
                <h4 className="font-medium text-green-800">国内宿泊観光客パターン</h4>
                <p className="text-sm text-gray-600 mt-1">1〜2泊の短期滞在が主流。複数の観光スポットを効率的に回り、地元グルメも楽しむ傾向がある。平均消費額は日帰り客の2.8倍。特に週末に集中。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-medium">主要属性: 国内・宿泊</span>
                  <span className="ml-2 text-xs text-gray-500">全体の45%</span>
                </div>
              </div>
              {/* Pattern 3 */}
              <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50 rounded-r-md">
                <h4 className="font-medium text-yellow-800">外国人個人旅行者パターン</h4>
                <p className="text-sm text-gray-600 mt-1">平均滞在日数は2.4日と長め。SNS映えする場所を重視し、文化体験や地元との交流に積極的。公共交通機関の利用が多く、滞在中の移動範囲が広い。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium">主要属性: 外国人・個人</span>
                  <span className="ml-2 text-xs text-gray-500">全体の22%</span>
                </div>
              </div>
              {/* Pattern 4 */}
              <div className="border-l-4 border-purple-500 pl-3 py-2 bg-purple-50 rounded-r-md">
                <h4 className="font-medium text-purple-800">外国人団体ツアーパターン</h4>
                <p className="text-sm text-gray-600 mt-1">定番観光スポットを効率よく巡るパターン。1カ所あたりの滞在時間は短いが、買い物には比較的長い時間を費やす。消費単価が高く、特に高級品・ブランド品の購入が目立つ。</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full font-medium">主要属性: 外国人・団体</span>
                  <span className="ml-2 text-xs text-gray-500">全体の18%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tourist Routes */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">人気観光ルート分析</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                観光客の移動パターンを分析し、主要な観光ルートとボトルネックを特定しています。この情報は交通・案内施設の最適化や観光動線の改善に活用できます。
              </p>
            </div>
            {/* Placeholder for Map */}
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm font-medium">観光ルートマップ</p>
                <p className="mt-1 text-xs">（実際のマップデータはデモでは表示されません）</p>
              </div>
            </div>
            {/* Route Examples */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">人気ルート #1</h4>
                <p className="text-sm text-gray-600 mt-1">駅 → 歴史博物館 → 中央広場 → 伝統市場</p>
                <p className="text-xs text-gray-500 mt-2">国内観光客に人気のルート。所要時間は平均5時間で、主に文化・歴史に興味のある層に選ばれています。</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">人気ルート #2</h4>
                <p className="text-sm text-gray-600 mt-1">駅 → 中央広場 → 展望台 → 市立公園</p>
                <p className="text-xs text-gray-500 mt-2">写真撮影スポットを重視する外国人観光客に人気。SNS投稿が多いルートです。</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">人気ルート #3</h4>
                <p className="text-sm text-gray-600 mt-1">バスターミナル → 古城跡 → 伝統市場 → 駅</p>
                <p className="text-xs text-gray-500 mt-2">団体ツアーで最も利用されるルート。大型バスの駐車場から効率的に主要スポットを巡れるように設計されています。</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sensors View */}
      {selectedView === 'sensors' && (
        <>
          {/* Sensor Status Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">観光客センサーステータス</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在の観光客数</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">バッテリー</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
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
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sensor.status === 'active' ? 'bg-green-100 text-green-800' :
                          sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sensor.status === 'active' ? '正常' :
                           sensor.status === 'warning' ? '警告' : 'エラー'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.visitors !== null ? `${sensor.visitors}人` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* Battery Level Indicator */}
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              sensor.batteryLevel > 70 ? 'bg-green-500' :
                              sensor.batteryLevel > 30 ? 'bg-yellow-400' : 'bg-red-500'
                            }`} style={{ width: `${sensor.batteryLevel}%` }}></div>
                          </div>
                          <span className="font-medium">{sensor.batteryLevel}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                        <button type="button" className="text-blue-600 hover:text-blue-900">設定</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sensor Map and Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sensor Map Placeholder */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">観光地センサー配置マップ</h3>
              <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-sm font-medium">地図上にセンサー位置を表示します</p>
                  <p className="mt-1 text-xs">（実際の地図データはデモでは表示されません）</p>
                </div>
              </div>
            </div>

            {/* Sensor Settings Form */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">センサー設定</h3>
              <form className="space-y-4">
                {/* Sensor Selection */}
                <div>
                  <label htmlFor="sensor-select" className="block text-sm font-medium text-gray-700 mb-1">センサー選択</label>
                  <select
                    id="sensor-select"
                    name="sensor-select"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
                  >
                    {sensorStatusData.map(s => <option key={s.id} value={s.id}>{s.location}</option>)}
                  </select>
                </div>

                {/* Sensor Name */}
                <div>
                  <label htmlFor="sensor-name" className="block text-sm font-medium text-gray-700 mb-1">センサー名</label>
                  <input
                    type="text"
                    id="sensor-name"
                    name="sensor-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5 px-2" // Added padding
                    defaultValue="歴史博物館" // Example default
                  />
                </div>

                {/* Sampling Rate */}
                <div>
                  <label htmlFor="sampling-rate" className="block text-sm font-medium text-gray-700 mb-1">サンプリングレート</label>
                  <select
                    id="sampling-rate"
                    name="sampling-rate"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
                  >
                    <option>1分毎</option>
                    <option>5分毎</option>
                    <option>10分毎</option>
                    <option>15分毎</option>
                    <option>30分毎</option>
                    <option>1時間毎</option>
                  </select>
                </div>

                {/* Measured Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">計測項目</label>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {(['count', 'duration', 'nationality', 'route', 'revisit', 'group', 'lang', 'crowd'] as const).map((item) => (
                       <div key={item} className="flex items-center">
                        <input id={`measure-${item}`} name={`measure-${item}`} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                        <label htmlFor={`measure-${item}`} className="ml-2 block text-sm text-gray-700">
                          {item === 'count' ? '観光客数' :
                           item === 'duration' ? '滞在時間' :
                           item === 'nationality' ? '国内/外国人判定' :
                           item === 'route' ? '移動経路' :
                           item === 'revisit' ? '再訪問検知' :
                           item === 'group' ? 'グループ検知' :
                           item === 'lang' ? '言語検知' : '混雑度'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">アラート設定</label>
                  <div className="mt-2 space-y-3 border p-3 rounded-md border-gray-200">
                    {/* Threshold Alert */}
                    <div>
                      <label htmlFor="alert-threshold" className="block text-xs text-gray-500 mb-1">混雑閾値（人/分）</label>
                      <div className="flex items-center">
                        <input type="range" id="alert-threshold" min="0" max="300" step="10" defaultValue="200" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                        <span className="ml-3 text-sm font-medium text-gray-900 w-8 text-right">200</span> {/* Example value */}
                      </div>
                    </div>
                    {/* Decrease Alert */}
                    <div>
                      <label htmlFor="alert-decrease" className="block text-xs text-gray-500 mb-1">急激な減少アラート（%）</label>
                       <div className="flex items-center">
                        <input type="range" id="alert-decrease" min="0" max="100" step="5" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                        <span className="ml-3 text-sm font-medium text-gray-900 w-8 text-right">50%</span> {/* Example value */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通知設定</label>
                  <div className="space-y-2 border p-3 rounded-md border-gray-200">
                    <div className="flex items-center">
                      <input id="notify-app" name="notify-app" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="notify-app" className="ml-2 block text-sm text-gray-700">アプリ内通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-email" name="notify-email" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                      <label htmlFor="notify-email" className="ml-2 block text-sm text-gray-700">メール通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-sms" name="notify-sms" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="notify-sms" className="ml-2 block text-sm text-gray-700">SMS通知</label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    キャンセル
                  </button>
                  <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Multilingual Support Information Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">多言語対応情報</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">言語</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">検知率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">前月比</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対応状況</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Completed Japanese Row */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">日本語</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-1.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">完全対応</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                    </td>
                  </tr>
                  {/* Other Language Rows */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">英語</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+0.8%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">完全対応</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">中国語</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12.8%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+2.3%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">完全対応</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">韓国語</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+0.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">部分対応</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-blue-600 hover:text-blue-900">対応強化</button>
                    </td>
                  </tr>
                   <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">タイ語</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.1%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+1.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">対応不足</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-blue-600 hover:text-blue-900">対応計画</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">その他</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+0.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">対応検討中</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                       <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TouristAnalysisDashboard;
