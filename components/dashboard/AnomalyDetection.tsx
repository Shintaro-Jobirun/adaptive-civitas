// components/dashboard/AnomalyDetection.tsx
"use client"

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 検知アラート履歴データ（時間別）
const hourlyAlertData = [
  { time: '00:00', total: 2, threats: 0, behavior: 1, intrusion: 0, object: 1, fire: 0 },
  { time: '01:00', total: 1, threats: 0, behavior: 0, intrusion: 0, object: 1, fire: 0 },
  { time: '02:00', total: 0, threats: 0, behavior: 0, intrusion: 0, object: 0, fire: 0 },
  { time: '03:00', total: 1, threats: 0, behavior: 0, intrusion: 1, object: 0, fire: 0 },
  { time: '04:00', total: 0, threats: 0, behavior: 0, intrusion: 0, object: 0, fire: 0 },
  { time: '05:00', total: 2, threats: 0, behavior: 0, intrusion: 2, object: 0, fire: 0 },
  { time: '06:00', total: 3, threats: 0, behavior: 1, intrusion: 0, object: 2, fire: 0 },
  { time: '07:00', total: 5, threats: 0, behavior: 3, intrusion: 0, object: 2, fire: 0 },
  { time: '08:00', total: 8, threats: 1, behavior: 4, intrusion: 0, object: 3, fire: 0 },
  { time: '09:00', total: 12, threats: 2, behavior: 5, intrusion: 1, object: 4, fire: 0 },
  { time: '10:00', total: 14, threats: 2, behavior: 6, intrusion: 1, object: 5, fire: 0 },
  { time: '11:00', total: 17, threats: 3, behavior: 7, intrusion: 1, object: 6, fire: 0 },
  { time: '12:00', total: 21, threats: 4, behavior: 9, intrusion: 2, object: 6, fire: 0 },
  { time: '13:00', total: 19, threats: 3, behavior: 8, intrusion: 2, object: 6, fire: 0 },
  { time: '14:00', total: 18, threats: 3, behavior: 8, intrusion: 1, object: 6, fire: 0 },
  { time: '15:00', total: 22, threats: 4, behavior: 10, intrusion: 2, object: 6, fire: 0 },
  { time: '16:00', total: 25, threats: 5, behavior: 11, intrusion: 2, object: 7, fire: 0 },
  { time: '17:00', total: 28, threats: 6, behavior: 12, intrusion: 3, object: 7, fire: 0 },
  { time: '18:00', total: 24, threats: 5, behavior: 10, intrusion: 3, object: 6, fire: 0 },
  { time: '19:00', total: 20, threats: 4, behavior: 9, intrusion: 2, object: 5, fire: 0 },
  { time: '20:00', total: 15, threats: 3, behavior: 7, intrusion: 1, object: 4, fire: 0 },
  { time: '21:00', total: 10, threats: 2, behavior: 5, intrusion: 0, object: 3, fire: 0 },
  { time: '22:00', total: 6, threats: 1, behavior: 3, intrusion: 0, object: 2, fire: 0 },
  { time: '23:00', total: 4, threats: 0, behavior: 2, intrusion: 0, object: 2, fire: 0 },
];

// 日別アラート総数（週間）
const dailyAlertData = [
  { day: '月', alerts: 175, falsePositive: 26, resolved: 162 },
  { day: '火', alerts: 154, falsePositive: 22, resolved: 145 },
  { day: '水', alerts: 168, falsePositive: 28, resolved: 152 },
  { day: '木', alerts: 182, falsePositive: 31, resolved: 164 },
  { day: '金', alerts: 256, falsePositive: 38, resolved: 225 },
  { day: '土', alerts: 340, falsePositive: 48, resolved: 302 },
  { day: '日', alerts: 320, falsePositive: 45, resolved: 280 },
];

// 検知タイプ別割合
const detectionTypeData = [
  { name: '行動異常', value: 42 },
  { name: '不審者・トラブル', value: 18 },
  { name: '立入禁止区域侵入', value: 15 },
  { name: '物品放置・盗難', value: 14 },
  { name: '火災・煙検知', value: 3 },
  { name: '群衆異常', value: 8 },
];

// カメラ・センサーステータス
const cameraStatusData = [
  { id: 1, location: '中央駅北口', status: 'active', detections: 28, uptime: 99.8, lastMaintenance: '2023/12/15' },
  { id: 2, location: '市役所前広場', status: 'active', detections: 18, uptime: 99.5, lastMaintenance: '2023/12/20' },
  { id: 3, location: '商店街A', status: 'active', detections: 42, uptime: 99.9, lastMaintenance: '2024/01/05' },
  { id: 4, location: '公園入口', status: 'active', detections: 35, uptime: 98.7, lastMaintenance: '2023/11/28' },
  { id: 5, location: '高校前交差点', status: 'warning', detections: 26, uptime: 96.2, lastMaintenance: '2023/09/10' },
  { id: 6, location: '図書館', status: 'active', detections: 12, uptime: 99.4, lastMaintenance: '2023/12/05' },
  { id: 7, location: '駐車場', status: 'error', detections: null, uptime: 0, lastMaintenance: '2023/10/18' },
  { id: 8, location: 'ショッピングモール', status: 'active', detections: 56, uptime: 99.1, lastMaintenance: '2024/01/10' },
];

// 現在のアクティブアラート
const activeAlertData = [
  { id: 1, time: '08:45', location: '商店街A', type: '不審者検知', priority: 'high', detail: '黒い服装の男性が複数店舗の前で不審な行動。15分以上滞留中。', camera: 'CAM-023' },
  { id: 2, time: '12:20', location: '中央駅北口', type: '物品放置', priority: 'medium', detail: '改札前に黒いバッグが10分以上放置されています。', camera: 'CAM-002' },
  { id: 3, time: '15:30', location: '公園入口', type: '行動異常', priority: 'high', detail: '複数人による暴力的な行為を検知。至急確認が必要です。', camera: 'CAM-045' },
  { id: 4, time: '10:10', location: '駐車場', type: 'カメラエラー', priority: 'low', detail: 'カメラからの信号が途絶えています。メンテナンスが必要です。', camera: 'CAM-078' },
  { id: 5, time: '17:42', location: '市役所前広場', type: '立入禁止区域侵入', priority: 'medium', detail: '工事エリアに複数の市民が侵入。安全上の懸念があります。', camera: 'CAM-015' },
];

// エリア別検知数
const areaDetectionData = [
  { area: '駅周辺', detections: 425, percentage: 28, trend: 'up' },
  { area: '商店街', detections: 382, percentage: 25, trend: 'stable' },
  { area: '公園・広場', detections: 265, percentage: 18, trend: 'down' },
  { area: '学校周辺', detections: 184, percentage: 12, trend: 'up' },
  { area: '住宅地', detections: 142, percentage: 9, trend: 'down' },
  { area: 'オフィス街', detections: 120, percentage: 8, trend: 'stable' },
];

// 時間帯別検知傾向
const timePatternData = [
  { time: '早朝 (4-7時)', detections: 52, falseAlarm: 12, success: 76 },
  { time: '午前 (8-11時)', detections: 215, falseAlarm: 35, success: 82 },
  { time: '昼 (12-15時)', detections: 342, falseAlarm: 48, success: 85 },
  { time: '午後 (16-19時)', detections: 458, falseAlarm: 62, success: 84 },
  { time: '夕方 (20-23時)', detections: 284, falseAlarm: 45, success: 80 },
  { time: '深夜 (0-3時)', detections: 38, falseAlarm: 10, success: 72 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnomalyDetectionDashboard = () => {
  const [selectedView, setSelectedView] = useState('realtime');
  const [selectedAlertType, setSelectedAlertType] = useState('total');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">アラートタイプ:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={selectedAlertType}
              onChange={(e) => setSelectedAlertType(e.target.value)}
            >
              <option value="total">すべて</option>
              <option value="threats">不審者・トラブル</option>
              <option value="behavior">行動異常</option>
              <option value="intrusion">侵入検知</option>
              <option value="object">物品放置・盗難</option>
              <option value="fire">火災・煙検知</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('realtime')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'realtime'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              リアルタイム
            </button>
            <button
              onClick={() => setSelectedView('analytics')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'analytics'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              統計分析
            </button>
            <button
              onClick={() => setSelectedView('cameras')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'cameras'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              カメラ管理
            </button>
            <button
              onClick={() => setSelectedView('settings')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'settings'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              設定
            </button>
          </div>
        </div>
        
        {/* 主要指標 */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                      現在のアラート数
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        5件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">優先度高: 2件</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      本日の検知数
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        256件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">解決済: 225件</span>
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
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      検知成功率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        84.6%
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
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      平均対応時間
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        8分35秒
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">-1:05</span>
                        <span className="ml-1 text-gray-500">(先月比)</span>
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
          {/* アクティブアラート一覧 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">アクティブアラート</h3>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  更新
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  全て確認済みにする
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時刻</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">優先度</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カメラID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeAlertData.map((alert) => (
                    <tr key={alert.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          alert.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : alert.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {alert.priority === 'high' ? '高' : alert.priority === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{alert.detail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.camera}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">詳細</button>
                        <button className="text-indigo-600 hover:text-indigo-900">対応済</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 時間帯別アラート発生数 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯別アラート検知数</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyAlertData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedAlertType} 
                    stroke="#4F46E5"
                    strokeWidth={2} 
                    name={selectedAlertType === 'total' ? '総アラート数' : 
                          selectedAlertType === 'threats' ? '不審者・トラブル' : 
                          selectedAlertType === 'behavior' ? '行動異常' : 
                          selectedAlertType === 'intrusion' ? '侵入検知' : 
                          selectedAlertType === 'object' ? '物品放置・盗難' : '火災・煙検知'} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* エリア別検知数と検知タイプ別割合 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* エリア別検知数 */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">エリア別検知数（本日）</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={areaDetectionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="area" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="detections" fill="#4F46E5" name="検知数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 検知タイプ別割合 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">検知タイプ別割合</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={detectionTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {detectionTypeData.map((entry, index) => (
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
          
          {/* カメラリアルタイム映像（ダミー） */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">リアルタイムカメラ映像</h3>
              <div className="flex space-x-2">
                <select className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>商店街A (CAM-023)</option>
                  <option>中央駅北口 (CAM-002)</option>
                  <option>公園入口 (CAM-045)</option>
                  <option>市役所前広場 (CAM-015)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">カメラ映像: 商店街A (CAM-023)</p>
                  <p className="mt-1 text-sm text-gray-500">実際のカメラ映像はデモの表示範囲に含まれていません</p>
                </div>
              </div>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">検知データ分析</p>
                  <p className="mt-1 text-sm text-gray-500">リアルタイム分析結果を表示します</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'analytics' && (
        <>
          {/* 週間アラート統計 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">日別アラート分析（過去7日間）</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyAlertData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alerts" fill="#4F46E5" name="アラート総数" />
                  <Bar dataKey="falsePositive" fill="#EF4444" name="誤検知" />
                  <Bar dataKey="resolved" fill="#10B981" name="解決済み" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-indigo-800 mb-1">週間アラート総数</h4>
                <p className="text-2xl font-bold text-indigo-900">1,695件</p>
                <p className="text-xs text-indigo-700 mt-1">前週比: +5.2%</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-red-800 mb-1">誤検知率</h4>
                <p className="text-2xl font-bold text-red-900">14.8%</p>
                <p className="text-xs text-red-700 mt-1">前週比: -2.3%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">解決率</h4>
                <p className="text-2xl font-bold text-green-900">89.2%</p>
                <p className="text-xs text-green-700 mt-1">前週比: +1.5%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">平均対応時間</h4>
                <p className="text-2xl font-bold text-yellow-900">8:35</p>
                <p className="text-xs text-yellow-700 mt-1">前週比: -0:42</p>
              </div>
            </div>
          </div>
          
          {/* 時間帯別検知傾向と上位検知カメラ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 時間帯別検知傾向 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯別検知傾向</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間帯</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">検知数</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">誤検知率</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">検知精度</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timePatternData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.detections}件</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.falseAlarm / item.detections * 100).toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${item.success}%` }}></div>
                            </div>
                            <span>{item.success}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* 上位検知カメラ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">上位検知カメラ</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">#1 ショッピングモール (CAM-078)</h4>
                      <p className="text-xs text-gray-500 mt-1">主な検知: 行動異常、物品放置</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">56件</p>
                      <p className="text-xs text-gray-500 mt-1">誤検知: 9件</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(56/60)*100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">#2 商店街A (CAM-023)</h4>
                      <p className="text-xs text-gray-500 mt-1">主な検知: 不審者、行動異常</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">42件</p>
                      <p className="text-xs text-gray-500 mt-1">誤検知: 6件</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(42/60)*100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">#3 公園入口 (CAM-045)</h4>
                      <p className="text-xs text-gray-500 mt-1">主な検知: 行動異常、立入禁止区域侵入</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">35件</p>
                      <p className="text-xs text-gray-500 mt-1">誤検知: 4件</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(35/60)*100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">#4 高校前交差点 (CAM-037)</h4>
                      <p className="text-xs text-gray-500 mt-1">主な検知: 行動異常、物品放置</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">26件</p>
                      <p className="text-xs text-gray-500 mt-1">誤検知: 5件</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(26/60)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 検知タイプ別詳細統計 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">検知タイプ別詳細分析</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">検知タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">週間件数</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">前週比</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平均対応時間</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">解決率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">誤検知率</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">行動異常</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">712件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-600">+4.8%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8:12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">91.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">16.3%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">不審者・トラブル</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">305件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-600">+7.2%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6:48</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">94.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12.8%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">立入禁止区域侵入</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">254件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-red-600">-2.1%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7:35</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88.6%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9.5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">物品放置・盗難</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">237件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-600">+1.8%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:42</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">82.7%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.1%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">群衆異常</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">136件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-green-600">+15.2%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10:18</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85.3%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22.8%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">火災・煙検知</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">51件</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-red-600">-5.5%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4:28</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'cameras' && (
        <>
          {/* カメラステータス一覧 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">カメラステータス</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                カメラ追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設置場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">本日の検知数</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">稼働率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終メンテナンス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cameraStatusData.map((camera) => (
                    <tr key={camera.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {camera.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          camera.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : camera.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {camera.status === 'active' 
                            ? '正常' 
                            : camera.status === 'warning' 
                              ? '警告' 
                              : 'エラー'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {camera.detections !== null ? `${camera.detections}件` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className={`h-2.5 rounded-full ${
                              camera.uptime > 99 ? 'bg-green-600' : 
                              camera.uptime > 95 ? 'bg-yellow-600' : 'bg-red-600'
                            }`} style={{ width: `${camera.uptime}%` }}></div>
                          </div>
                          <span>{camera.uptime}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {camera.lastMaintenance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">詳細</button>
                        <button className="text-indigo-600 hover:text-indigo-900">設定</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* カメラマップとカメラ設定 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* カメラマップ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">カメラ設置マップ</h3>
              <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">地図上にカメラ位置を表示します</p>
                  <p className="mt-1 text-sm text-gray-500">実際の地図データはデモの表示範囲に含まれていません</p>
                </div>
              </div>
            </div>
            
            {/* カメラ設定 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">カメラ設定</h3>
              <div className="mb-4">
                <label htmlFor="camera-select" className="block text-sm font-medium text-gray-700 mb-1">カメラ選択</label>
                <select 
                  id="camera-select" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>中央駅北口 (CAM-002)</option>
                  <option>市役所前広場 (CAM-015)</option>
                  <option>商店街A (CAM-023)</option>
                  <option>公園入口 (CAM-045)</option>
                  <option>高校前交差点 (CAM-037)</option>
                  <option>図書館 (CAM-052)</option>
                  <option>駐車場 (CAM-078)</option>
                  <option>ショッピングモール (CAM-082)</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="camera-name" className="block text-sm font-medium text-gray-700 mb-1">カメラ名</label>
                  <input 
                    type="text" 
                    id="camera-name" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="中央駅北口"
                  />
                </div>
                
                <div>
                  <label htmlFor="camera-id" className="block text-sm font-medium text-gray-700 mb-1">カメラID</label>
                  <input 
                    type="text" 
                    id="camera-id" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="CAM-002"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">検知設定</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="detect-behavior" name="detect-behavior" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-behavior" className="ml-2 text-sm text-gray-700">行動異常</label>
                    </div>
                    <div className="flex items-center">
                      <input id="detect-threats" name="detect-threats" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-threats" className="ml-2 text-sm text-gray-700">不審者・トラブル</label>
                    </div>
                    <div className="flex items-center">
                      <input id="detect-intrusion" name="detect-intrusion" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-intrusion" className="ml-2 text-sm text-gray-700">立入禁止区域侵入</label>
                    </div>
                    <div className="flex items-center">
                      <input id="detect-object" name="detect-object" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-object" className="ml-2 text-sm text-gray-700">物品放置・盗難</label>
                    </div>
                    <div className="flex items-center">
                      <input id="detect-fire" name="detect-fire" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-fire" className="ml-2 text-sm text-gray-700">火災・煙検知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="detect-crowd" name="detect-crowd" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="detect-crowd" className="ml-2 text-sm text-gray-700">群衆異常</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">感度設定</label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <label htmlFor="sensitivity-behavior" className="block text-xs text-gray-500 mb-1">行動異常検知感度</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="sensitivity-behavior" 
                          min="1" 
                          max="10" 
                          step="1" 
                          defaultValue="7" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">7</span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sensitivity-threats" className="block text-xs text-gray-500 mb-1">不審者検知感度</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="sensitivity-threats" 
                          min="1" 
                          max="10" 
                          step="1" 
                          defaultValue="6" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">6</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">通知設定</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="notify-app" name="notify-app" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-app" className="ml-2 text-sm text-gray-700">アプリ内通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-email" name="notify-email" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="notify-email" className="ml-2 text-sm text-gray-700">メール通知</label>
                    </div>
                    <div className="flex items-center">
                      <input id="notify-sms" name="notify-sms" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                      <label htmlFor="notify-sms" className="ml-2 text-sm text-gray-700">SMS通知</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  キャンセル
                </button>
                <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  保存
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'settings' && (
        <>
          {/* 設定画面 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-6">システム設定</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">検知設定</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="global-sensitivity" className="block text-sm font-medium text-gray-700 mb-1">グローバル検知感度</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        id="global-sensitivity" 
                        min="1" 
                        max="10" 
                        step="1" 
                        defaultValue="7" 
                        className="w-full"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900">7</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">すべての検知タイプに適用される基本感度です</p>
                  </div>
                  
                  <div>
                    <label htmlFor="false-positive-threshold" className="block text-sm font-medium text-gray-700 mb-1">誤検知許容閾値</label>
                    <div className="flex items-center">
                      <input 
                        type="range" 
                        id="false-positive-threshold" 
                        min="5" 
                        max="30" 
                        step="1" 
                        defaultValue="15" 
                        className="w-full"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900">15%</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">システムが許容する誤検知率です</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">通知設定</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">デフォルト通知方法</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center">
                        <input id="notify-method-app" name="notify-method" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="notify-method-app" className="ml-2 text-sm text-gray-700">アプリ内通知</label>
                      </div>
                      <div className="flex items-center">
                        <input id="notify-method-email" name="notify-method" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="notify-method-email" className="ml-2 text-sm text-gray-700">メール通知</label>
                      </div>
                      <div className="flex items-center">
                        <input id="notify-method-sms" name="notify-method" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="notify-method-sms" className="ml-2 text-sm text-gray-700">SMS通知</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">通知レベル</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="notify-level-high" name="notify-level-high" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="notify-level-high" className="ml-2 text-sm text-gray-700">高優先度アラート</label>
                      </div>
                      <div className="flex items-center">
                        <input id="notify-level-medium" name="notify-level-medium" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="notify-level-medium" className="ml-2 text-sm text-gray-700">中優先度アラート</label>
                      </div>
                      <div className="flex items-center">
                        <input id="notify-level-low" name="notify-level-low" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        <label htmlFor="notify-level-low" className="ml-2 text-sm text-gray-700">低優先度アラート</label>
                      </div>
                      <div className="flex items-center">
                        <input id="notify-level-system" name="notify-level-system" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="notify-level-system" className="ml-2 text-sm text-gray-700">システム通知（エラーなど）</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">システム連携</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">警察システム連携</h5>
                      <p className="text-xs text-gray-500">高優先度アラートを自動的に警察システムに連携します</p>
                    </div>
                    <div>
                      <label htmlFor="toggle-police" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" id="toggle-police" className="sr-only" defaultChecked />
                          <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                          <div className="dot absolute w-6 h-6 bg-indigo-600 rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">消防システム連携</h5>
                      <p className="text-xs text-gray-500">火災検知アラートを自動的に消防システムに連携します</p>
                    </div>
                    <div>
                      <label htmlFor="toggle-fire" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" id="toggle-fire" className="sr-only" defaultChecked />
                          <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                          <div className="dot absolute w-6 h-6 bg-indigo-600 rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">防災システム連携</h5>
                      <p className="text-xs text-gray-500">群衆異常検知を防災システムと連携します</p>
                    </div>
                    <div>
                      <label htmlFor="toggle-disaster" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" id="toggle-disaster" className="sr-only" />
                          <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                          <div className="dot absolute w-6 h-6 bg-gray-400 rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">データ管理</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="data-retention" className="block text-sm font-medium text-gray-700 mb-1">データ保持期間</label>
                    <select 
                      id="data-retention" 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>30日間</option>
                      <option>60日間</option>
                      <option selected>90日間</option>
                      <option>180日間</option>
                      <option>365日間</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">アラートログと分析データの保持期間を設定します</p>
                  </div>
                  
                  <div>
                    <label htmlFor="video-retention" className="block text-sm font-medium text-gray-700 mb-1">映像保持期間</label>
                    <select 
                      id="video-retention" 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>7日間</option>
                      <option selected>14日間</option>
                      <option>30日間</option>
                      <option>60日間</option>
                      <option>90日間</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">カメラ映像の保持期間を設定します</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">プライバシーマスキング</h5>
                      <p className="text-xs text-gray-500">保存映像から顔や個人識別情報を自動的にマスキングします</p>
                    </div>
                    <div>
                      <label htmlFor="toggle-privacy" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" id="toggle-privacy" className="sr-only" defaultChecked />
                          <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                          <div className="dot absolute w-6 h-6 bg-indigo-600 rounded-full shadow -left-1 -top-1 transition"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                キャンセル
              </button>
              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                設定を保存
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnomalyDetectionDashboard;