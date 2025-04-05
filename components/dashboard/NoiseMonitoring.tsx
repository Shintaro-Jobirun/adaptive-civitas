// components/dashboard/NoiseMonitoring.tsx
"use client"

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 騒音レベルのモックデータ
const noiseData = [
  { time: '00:00', decibel: 42, lowFreq: 35, midFreq: 40, highFreq: 32, vibration: 0.2 },
  { time: '01:00', decibel: 38, lowFreq: 33, midFreq: 36, highFreq: 28, vibration: 0.1 },
  { time: '02:00', decibel: 35, lowFreq: 31, midFreq: 33, highFreq: 25, vibration: 0.1 },
  { time: '03:00', decibel: 32, lowFreq: 29, midFreq: 30, highFreq: 22, vibration: 0.1 },
  { time: '04:00', decibel: 34, lowFreq: 30, midFreq: 32, highFreq: 24, vibration: 0.1 },
  { time: '05:00', decibel: 38, lowFreq: 34, midFreq: 36, highFreq: 28, vibration: 0.2 },
  { time: '06:00', decibel: 45, lowFreq: 40, midFreq: 43, highFreq: 35, vibration: 0.3 },
  { time: '07:00', decibel: 58, lowFreq: 50, midFreq: 55, highFreq: 48, vibration: 0.5 },
  { time: '08:00', decibel: 65, lowFreq: 55, midFreq: 63, highFreq: 58, vibration: 0.6 },
  { time: '09:00', decibel: 63, lowFreq: 54, midFreq: 61, highFreq: 55, vibration: 0.5 },
  { time: '10:00', decibel: 62, lowFreq: 52, midFreq: 60, highFreq: 54, vibration: 0.4 },
  { time: '11:00', decibel: 64, lowFreq: 53, midFreq: 62, highFreq: 56, vibration: 0.5 },
  { time: '12:00', decibel: 66, lowFreq: 55, midFreq: 64, highFreq: 58, vibration: 0.6 },
  { time: '13:00', decibel: 65, lowFreq: 54, midFreq: 63, highFreq: 57, vibration: 0.5 },
  { time: '14:00', decibel: 64, lowFreq: 53, midFreq: 62, highFreq: 56, vibration: 0.5 },
  { time: '15:00', decibel: 66, lowFreq: 55, midFreq: 64, highFreq: 58, vibration: 0.6 },
  { time: '16:00', decibel: 68, lowFreq: 57, midFreq: 66, highFreq: 60, vibration: 0.7 },
  { time: '17:00', decibel: 72, lowFreq: 62, midFreq: 70, highFreq: 66, vibration: 0.8 },
  { time: '18:00', decibel: 70, lowFreq: 61, midFreq: 68, highFreq: 64, vibration: 0.7 },
  { time: '19:00', decibel: 68, lowFreq: 58, midFreq: 66, highFreq: 62, vibration: 0.6 },
  { time: '20:00', decibel: 64, lowFreq: 55, midFreq: 62, highFreq: 58, vibration: 0.5 },
  { time: '21:00', decibel: 60, lowFreq: 52, midFreq: 58, highFreq: 54, vibration: 0.4 },
  { time: '22:00', decibel: 54, lowFreq: 48, midFreq: 52, highFreq: 46, vibration: 0.3 },
  { time: '23:00', decibel: 48, lowFreq: 42, midFreq: 46, highFreq: 38, vibration: 0.2 },
];

// 週間騒音レベル推移データ
const weeklyNoiseData = [
  { day: '月', avgDecibel: 58, maxDecibel: 72, minDecibel: 32 },
  { day: '火', avgDecibel: 56, maxDecibel: 70, minDecibel: 34 },
  { day: '水', avgDecibel: 59, maxDecibel: 74, minDecibel: 33 },
  { day: '木', avgDecibel: 57, maxDecibel: 71, minDecibel: 32 },
  { day: '金', avgDecibel: 64, maxDecibel: 78, minDecibel: 35 },
  { day: '土', avgDecibel: 68, maxDecibel: 82, minDecibel: 38 },
  { day: '日', avgDecibel: 60, maxDecibel: 75, minDecibel: 36 },
];

// 地区別騒音レベルデータ
const districtNoiseData = [
  { district: '中央区', decibel: 65, vibration: 0.6, lowFreq: 55, trend: '安定' },
  { district: '北区', decibel: 58, vibration: 0.4, lowFreq: 48, trend: '減少' },
  { district: '南区', decibel: 62, vibration: 0.5, lowFreq: 52, trend: '上昇' },
  { district: '東区', decibel: 63, vibration: 0.5, lowFreq: 53, trend: '安定' },
  { district: '西区', decibel: 59, vibration: 0.4, lowFreq: 49, trend: '安定' },
  { district: '工業区', decibel: 72, vibration: 0.9, lowFreq: 65, trend: '上昇' },
  { district: '住宅区', decibel: 52, vibration: 0.3, lowFreq: 45, trend: '減少' },
];

// 騒音発生源割合
const noiseSourceData = [
  { name: '交通', value: 45 },
  { name: '工事', value: 25 },
  { name: '商業活動', value: 15 },
  { name: '人々の活動', value: 10 },
  { name: '工場', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// センサーステータスデータ
const sensorStatusData = [
  { id: 1, location: '中央駅前', status: 'active', decibel: 65, vibration: 0.6, lastUpdate: '2分前', battery: 85 },
  { id: 2, location: '市役所隣', status: 'active', decibel: 58, vibration: 0.4, lastUpdate: '5分前', battery: 72 },
  { id: 3, location: '大通り交差点', status: 'active', decibel: 70, vibration: 0.7, lastUpdate: '3分前', battery: 90 },
  { id: 4, location: '公園北側', status: 'active', decibel: 52, vibration: 0.3, lastUpdate: '4分前', battery: 68 },
  { id: 5, location: '工事現場A', status: 'warning', decibel: 78, vibration: 1.2, lastUpdate: '12分前', battery: 45 },
  { id: 6, location: '住宅地区B', status: 'active', decibel: 48, vibration: 0.2, lastUpdate: '6分前', battery: 75 },
  { id: 7, location: '工場地区', status: 'error', decibel: null, vibration: null, lastUpdate: '2時間前', battery: 10 },
  { id: 8, location: '高速道路沿い', status: 'active', decibel: 72, vibration: 0.8, lastUpdate: '7分前', battery: 65 },
];

// 規制基準超過イベント
const regulationEvents = [
  { id: 1, time: '08:30', location: '工事現場A', type: '騒音レベル超過', status: 'active', detail: '15分間継続して75dBを超過。規制値: 70dB' },
  { id: 2, time: '12:15', location: '大通り交差点', type: '低周波振動', status: 'resolved', detail: '10:00-12:00の間、低周波振動が基準値を超過。原因: 大型車両の通行増加' },
  { id: 3, time: '14:45', location: '工場地区', type: '夜間騒音', status: 'active', detail: '22時以降の騒音レベルが規制値を10dB超過' },
  { id: 4, time: '17:20', location: '市役所隣の建設現場', type: '作業時間超過', status: 'active', detail: '作業許可時間（17:00まで）を超えて騒音を伴う作業を継続' },
];

// 騒音レベルの説明
const noiseLevelInfo = [
  { level: '静穏', range: '0-40dB', color: 'bg-green-100 text-green-800', description: '図書館内の静けさに相当。日常生活への影響はほとんどありません。', examples: '葉のそよぎ、遠くの囁き声' },
  { level: '静か', range: '41-50dB', color: 'bg-green-100 text-green-800', description: '静かな住宅地や事務所内のレベル。睡眠への影響は少ないです。', examples: '静かな事務所、住宅街の昼間' },
  { level: '中程度', range: '51-60dB', color: 'bg-yellow-100 text-yellow-800', description: '通常の会話レベル。長時間の暴露でストレスを感じることがあります。', examples: '普通の会話、エアコンの音' },
  { level: 'やや大きい', range: '61-70dB', color: 'bg-yellow-100 text-yellow-800', description: 'うるさいと感じるレベル。集中力低下や会話妨害が起こります。', examples: '交通量の多い道路、テレビの音' },
  { level: '大きい', range: '71-80dB', color: 'bg-orange-100 text-orange-800', description: '電話での会話が困難なレベル。長時間の暴露で聴力低下のリスク。', examples: '電車内、騒がしいレストラン' },
  { level: '非常に大きい', range: '81-90dB', color: 'bg-red-100 text-red-800', description: '大声で話さないと会話できないレベル。聴力障害のリスクあり。', examples: '重機の音、大きな工場内' },
  { level: '危険', range: '91dB以上', color: 'bg-gray-900 text-white', description: '聴覚障害のリスクが高く、身体的ストレスを引き起こします。', examples: 'コンサート、飛行機のエンジン' },
];

// 振動レベルの説明
const vibrationLevelInfo = [
  { level: '感知限界以下', range: '0-0.2mm/s', color: 'bg-green-100 text-green-800', description: '人間が感じることができない微小な振動レベル。', impact: '影響なし' },
  { level: 'わずかに感知可能', range: '0.2-0.5mm/s', color: 'bg-green-100 text-green-800', description: '非常に敏感な人だけが感じる程度。', impact: '一般的な生活への影響はほとんどない' },
  { level: '感知可能', range: '0.5-1.0mm/s', color: 'bg-yellow-100 text-yellow-800', description: '多くの人が感じることができるレベル。', impact: '精密機器や長期的な構造物への軽微な影響の可能性' },
  { level: '明確に感知可能', range: '1.0-2.0mm/s', color: 'bg-orange-100 text-orange-800', description: 'ほぼすべての人が感じるレベル。', impact: '長期的な暴露で建物に微細なダメージを与える可能性' },
  { level: '強い振動', range: '2.0mm/s以上', color: 'bg-red-100 text-red-800', description: '不快感を伴う強い振動。', impact: '構造物への損傷リスクあり、住民の生活の質に影響' },
];

const NoiseMonitoringDashboard = () => {
  const [selectedView, setSelectedView] = useState('realtime');
  const [selectedMetric, setSelectedMetric] = useState('decibel');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">表示項目:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="decibel">騒音レベル (dB)</option>
              <option value="lowFreq">低周波音 (dB)</option>
              <option value="vibration">振動 (mm/s)</option>
              <option value="midFreq">中周波音 (dB)</option>
              <option value="highFreq">高周波音 (dB)</option>
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
              onClick={() => setSelectedView('impact')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'impact'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              影響評価
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の騒音レベル
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        64 dB
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">やや大きい</span>
                        <span className="ml-1 text-gray-500">(会話に支障)</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      振動レベル
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        0.5 mm/s
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">感知可能</span>
                        <span className="ml-1 text-gray-500">(基準値内)</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      日内最高騒音
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        78 dB
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-orange-600 font-semibold">17:10</span>
                        <span className="ml-1 text-gray-500">(工事現場A)</span>
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
                      基準超過アラート
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        3件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">対応必要</span>
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
          {/* リアルタイム騒音グラフ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の騒音レベル推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={noiseData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    name={selectedMetric === 'decibel' ? '騒音レベル (dB)' : 
                           selectedMetric === 'lowFreq' ? '低周波音 (dB)' : 
                           selectedMetric === 'vibration' ? '振動 (mm/s)' : 
                           selectedMetric === 'midFreq' ? '中周波音 (dB)' : '高周波音 (dB)'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 地区別騒音レベルと発生源 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 地区別騒音レベル */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">地区別騒音レベル</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={districtNoiseData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="district" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="decibel" fill="#10B981" name="騒音レベル (dB)" />
                    <Bar dataKey="vibration" fill="#60A5FA" name="振動 (mm/s)" />
                    <Bar dataKey="lowFreq" fill="#F59E0B" name="低周波音 (dB)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 騒音発生源内訳 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">騒音発生源割合</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={noiseSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {noiseSourceData.map((entry, index) => (
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
          
          {/* 規制基準超過アラート */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">規制基準超過アラート</h3>
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
                  {regulationEvents.map((event) => (
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
          {/* 騒音トレンド分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">週間騒音レベル推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyNoiseData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgDecibel" stroke="#10B981" strokeWidth={2} name="平均騒音レベル (dB)" />
                  <Line type="monotone" dataKey="maxDecibel" stroke="#F59E0B" strokeWidth={2} name="最大騒音レベル (dB)" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="minDecibel" stroke="#60A5FA" strokeWidth={2} name="最小騒音レベル (dB)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">週間平均騒音</h4>
                <p className="text-2xl font-bold text-green-900">60.3 dB</p>
                <p className="text-xs text-green-700 mt-1">前週比: +2.1 dB</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">最も騒音が大きい日</h4>
                <p className="text-2xl font-bold text-yellow-900">土曜日</p>
                <p className="text-xs text-yellow-700 mt-1">平均: 68 dB</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">最も静かな日</h4>
                <p className="text-2xl font-bold text-blue-900">火曜日</p>
                <p className="text-xs text-blue-700 mt-1">平均: 56 dB</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-purple-800 mb-1">日間変動幅</h4>
                <p className="text-2xl font-bold text-purple-900">36.4 dB</p>
                <p className="text-xs text-purple-700 mt-1">前週比: -1.2 dB</p>
              </div>
            </div>
          </div>
          
          {/* 時間帯別・曜日別分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 時間帯別傾向 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯別騒音傾向</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <h4 className="font-medium text-green-800">深夜・早朝（23:00-6:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">最も静かな時間帯で、平均35-45dB程度です。低周波音も少なく、振動はほとんど検出されません。規制基準値も最も厳しい時間帯です。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">静穏</span>
                    <span className="ml-2 text-xs text-gray-500">良好な睡眠環境</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <h4 className="font-medium text-yellow-800">朝のピーク（7:00-9:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">通勤・通学時間帯で交通騒音が増加し、平均60-65dB程度まで上昇します。低周波振動も0.5mm/s程度まで上昇します。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">やや騒がしい</span>
                    <span className="ml-2 text-xs text-gray-500">交通騒音が主要因</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <h4 className="font-medium text-blue-800">日中（10:00-16:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">安定した騒音レベルで平均62-66dB程度。商業活動や工事による一時的な騒音ピークが見られます。特に工事現場周辺では規制値超過の可能性があります。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">やや騒がしい</span>
                    <span className="ml-2 text-xs text-gray-500">日常活動レベル</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-3 py-2">
                  <h4 className="font-medium text-orange-800">夕方ラッシュ（17:00-19:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">一日で最も騒音レベルが高くなる時間帯で、平均70-72dB程度まで上昇。交通量の増加と工事作業の継続が主な要因です。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">騒がしい</span>
                    <span className="ml-2 text-xs text-gray-500">会話が困難になるレベル</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-3 py-2">
                  <h4 className="font-medium text-indigo-800">夜間（20:00-22:00）</h4>
                  <p className="text-sm text-gray-600 mt-1">徐々に騒音レベルが低下し、平均55-60dB程度に落ち着きます。飲食店や娯楽施設周辺では引き続き高めの騒音レベルが観測されます。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">中程度</span>
                    <span className="ml-2 text-xs text-gray-500">徐々に静かになる</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 影響要因分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">騒音影響要因分析</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">時間帯別の主要音源</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full mt-0.5"></div>
                      <div className="ml-2 flex-1">
                        <h5 className="text-sm font-medium text-gray-900">朝方 (7:00-9:00)</h5>
                        <p className="text-xs text-gray-600">交通関連: 75%, 建設作業: 15%, その他: 10%</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full mt-0.5"></div>
                      <div className="ml-2 flex-1">
                        <h5 className="text-sm font-medium text-gray-900">日中 (10:00-16:00)</h5>
                        <p className="text-xs text-gray-600">建設作業: 45%, 交通関連: 30%, 商業活動: 20%, その他: 5%</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-yellow-500 rounded-full mt-0.5"></div>
                      <div className="ml-2 flex-1">
                        <h5 className="text-sm font-medium text-gray-900">夕方 (17:00-19:00)</h5>
                        <p className="text-xs text-gray-600">交通関連: 65%, 建設作業: 20%, 商業活動: 10%, その他: 5%</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-purple-500 rounded-full mt-0.5"></div>
                      <div className="ml-2 flex-1">
                        <h5 className="text-sm font-medium text-gray-900">夜間 (20:00-22:00)</h5>
                        <p className="text-xs text-gray-600">商業・娯楽: 50%, 交通関連: 40%, その他: 10%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">曜日別の特徴</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">平日 (月-金)</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">60dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">土曜日</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">68dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">日曜日</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">60dB</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">土曜日は買い物客と休日の建設作業により騒音レベルが上昇します。</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">エリア別の特徴</h4>
                  <p className="text-sm text-gray-600 mt-1">主要騒音源:</p>
                  <ul className="mt-1 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li><span className="font-medium">商業地区</span>: 店舗からの音楽、人々の会話、空調設備の稼働音</li>
                    <li><span className="font-medium">工業地区</span>: 工場の機械音、トラック輸送、警告音</li>
                    <li><span className="font-medium">住宅地区</span>: 生活騒音、家庭用機器、ペットの鳴き声</li>
                    <li><span className="font-medium">交通拠点</span>: 自動車、電車、バスなどの交通騒音</li>
                    <li><span className="font-medium">建設現場</span>: 重機の稼働音、トラック輸送、作業員の声</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'impact' && (
        <>
          {/* 騒音レベルと影響 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">騒音レベルと健康・生活への影響</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">レベル区分</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">騒音レベル(dB)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">身近な例</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">健康・生活への影響</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {noiseLevelInfo.map((level, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${level.color}`}>
                          {level.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {level.range}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {level.examples}
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
          
          {/* 振動レベルと影響 */}
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">振動レベルの評価</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">レベル区分</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">振動レベル</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">影響</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vibrationLevelInfo.map((level, index) => (
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
                        {level.description} <span className="text-xs text-gray-400">({level.impact})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 地域別の影響評価とコンプライアンス */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">地域別の規制と現状</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 border-b pb-2">住宅地区</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">昼間規制値 (8:00-19:00)</span>
                      <span className="text-sm font-medium text-gray-900">55 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-green-600">52 dB （基準内）</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">夜間規制値 (19:00-8:00)</span>
                      <span className="text-sm font-medium text-gray-900">45 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-red-600">48 dB （基準超過）</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 border-b pb-2">商業地区</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">昼間規制値 (8:00-19:00)</span>
                      <span className="text-sm font-medium text-gray-900">65 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-yellow-600">64 dB （基準内/近接）</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">夜間規制値 (19:00-8:00)</span>
                      <span className="text-sm font-medium text-gray-900">55 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-green-600">52 dB （基準内）</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 border-b pb-2">工業地区</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">昼間規制値 (8:00-19:00)</span>
                      <span className="text-sm font-medium text-gray-900">75 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-green-600">72 dB （基準内）</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">夜間規制値 (19:00-8:00)</span>
                      <span className="text-sm font-medium text-gray-900">65 dB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">現在の平均騒音</span>
                      <span className="text-sm font-medium text-red-600">68 dB （基準超過）</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">影響評価と対策提案</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-800">現状の課題</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>住宅地区の夜間騒音が規制値を3dB超過</li>
                    <li>工業地区の夜間操業による規制値超過</li>
                    <li>建設現場からの一時的な騒音ピーク</li>
                    <li>低周波音による周辺住民への影響</li>
                    <li>交差点付近の振動レベル上昇</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-green-800">対策提案</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li><span className="font-medium">交通騒音対策</span>: 低騒音舗装の導入、交通量の分散化</li>
                    <li><span className="font-medium">建設騒音対策</span>: 防音パネルの設置、作業時間の制限</li>
                    <li><span className="font-medium">工場騒音対策</span>: 夜間操業の制限、防音設備の強化</li>
                    <li><span className="font-medium">住宅地保護</span>: 緩衝緑地の整備、防音壁の設置</li>
                    <li><span className="font-medium">振動対策</span>: 道路路盤の改良、振動吸収材の使用</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800">期待される効果</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">住宅地夜間騒音</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 line-through mr-2">48 dB</span>
                        <span className="text-sm font-medium text-green-600">43 dB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">工業地区夜間騒音</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 line-through mr-2">68 dB</span>
                        <span className="text-sm font-medium text-green-600">63 dB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">交差点振動レベル</span>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-600 line-through mr-2">0.7 mm/s</span>
                        <span className="text-sm font-medium text-green-600">0.4 mm/s</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">建設騒音ピーク</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 line-through mr-2">85 dB</span>
                        <span className="text-sm font-medium text-yellow-600">75 dB</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-purple-800">コスト・効果分析</h4>
                  <p className="text-sm text-gray-600 mt-1">最も費用対効果の高い対策:</p>
                  <ol className="mt-1 text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>建設現場の防音パネル設置（投資回収期間: 6ヶ月）</li>
                    <li>交通量分散のための信号最適化（投資回収期間: 1年）</li>
                    <li>住宅地周辺の防音壁設置（投資回収期間: 2年）</li>
                    <li>低騒音舗装の段階的導入（投資回収期間: 3年）</li>
                  </ol>
                </div>
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
              <h3 className="text-lg font-medium text-gray-900">騒音・振動センサーステータス</h3>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">騒音レベル</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">振動レベル</th>
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
                        {sensor.decibel !== null ? `${sensor.decibel} dB` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sensor.vibration !== null ? `${sensor.vibration} mm/s` : '-'}
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
                  <option>中央駅前</option>
                  <option>市役所隣</option>
                  <option>大通り交差点</option>
                  <option>公園北側</option>
                  <option>工事現場A</option>
                  <option>住宅地区B</option>
                  <option>工場地区</option>
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
                    defaultValue="中央駅前"
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
                      <input id="measure-noise" name="measure-noise" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-noise" className="ml-2 text-sm text-gray-700">騒音レベル</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-vibration" name="measure-vibration" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-vibration" className="ml-2 text-sm text-gray-700">振動レベル</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-lowfreq" name="measure-lowfreq" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-lowfreq" className="ml-2 text-sm text-gray-700">低周波音</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-midfreq" name="measure-midfreq" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-midfreq" className="ml-2 text-sm text-gray-700">中周波音</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-highfreq" name="measure-highfreq" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="measure-highfreq" className="ml-2 text-sm text-gray-700">高周波音</label>
                    </div>
                    <div className="flex items-center">
                      <input id="measure-audio" name="measure-audio" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                      <label htmlFor="measure-audio" className="ml-2 text-sm text-gray-700">音源記録</label>
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
                      <label htmlFor="alert-noise" className="block text-xs text-gray-500 mb-1">騒音レベル閾値 (dB)</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-noise" 
                          min="40" 
                          max="100" 
                          step="1" 
                          defaultValue="70" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">70</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="alert-vibration" className="block text-xs text-gray-500 mb-1">振動レベル閾値 (mm/s)</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="alert-vibration" 
                          min="0" 
                          max="2" 
                          step="0.1" 
                          defaultValue="0.8" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">0.8</span>
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

export default NoiseMonitoringDashboard;