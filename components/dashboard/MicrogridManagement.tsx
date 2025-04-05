// components/dashboard/MicrogridManagement.tsx
"use client"

import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// エネルギー生産・消費データ
const energyData = [
  { time: '00:00', solar: 0, wind: 5, battery: -40, grid: 10, consumption: 45 },
  { time: '01:00', solar: 0, wind: 4, battery: -35, grid: 8, consumption: 39 },
  { time: '02:00', solar: 0, wind: 6, battery: -30, grid: 5, consumption: 31 },
  { time: '03:00', solar: 0, wind: 4, battery: -25, grid: 5, consumption: 26 },
  { time: '04:00', solar: 0, wind: 3, battery: -20, grid: 5, consumption: 22 },
  { time: '05:00', solar: 0, wind: 4, battery: -15, grid: 3, consumption: 14 },
  { time: '06:00', solar: 5, wind: 6, battery: -5, grid: 2, consumption: 18 },
  { time: '07:00', solar: 20, wind: 8, battery: 0, grid: 0, consumption: 28 },
  { time: '08:00', solar: 40, wind: 7, battery: 10, grid: 0, consumption: 37 },
  { time: '09:00', solar: 60, wind: 6, battery: 15, grid: 0, consumption: 51 },
  { time: '10:00', solar: 75, wind: 5, battery: 20, grid: 0, consumption: 60 },
  { time: '11:00', solar: 85, wind: 7, battery: 25, grid: 0, consumption: 67 },
  { time: '12:00', solar: 90, wind: 8, battery: 30, grid: 0, consumption: 68 },
  { time: '13:00', solar: 85, wind: 9, battery: 20, grid: 0, consumption: 74 },
  { time: '14:00', solar: 75, wind: 8, battery: 10, grid: 0, consumption: 73 },
  { time: '15:00', solar: 60, wind: 7, battery: 0, grid: 10, consumption: 77 },
  { time: '16:00', solar: 45, wind: 8, battery: -10, grid: 15, consumption: 68 },
  { time: '17:00', solar: 25, wind: 9, battery: -20, grid: 30, consumption: 84 },
  { time: '18:00', solar: 10, wind: 7, battery: -25, grid: 40, consumption: 82 },
  { time: '19:00', solar: 0, wind: 8, battery: -20, grid: 35, consumption: 67 },
  { time: '20:00', solar: 0, wind: 7, battery: -15, grid: 40, consumption: 62 },
  { time: '21:00', solar: 0, wind: 6, battery: -20, grid: 35, consumption: 59 },
  { time: '22:00', solar: 0, wind: 7, battery: -30, grid: 25, consumption: 52 },
  { time: '23:00', solar: 0, wind: 5, battery: -35, grid: 20, consumption: 50 },
];

// バッテリー残量推移
const batteryLevelData = [
  { time: '00:00', level: 75 },
  { time: '01:00', level: 70 },
  { time: '02:00', level: 65 },
  { time: '03:00', level: 60 },
  { time: '04:00', level: 55 },
  { time: '05:00', level: 50 },
  { time: '06:00', level: 45 },
  { time: '07:00', level: 45 },
  { time: '08:00', level: 50 },
  { time: '09:00', level: 55 },
  { time: '10:00', level: 60 },
  { time: '11:00', level: 65 },
  { time: '12:00', level: 75 },
  { time: '13:00', level: 85 },
  { time: '14:00', level: 90 },
  { time: '15:00', level: 90 },
  { time: '16:00', level: 85 },
  { time: '17:00', level: 75 },
  { time: '18:00', level: 65 },
  { time: '19:00', level: 60 },
  { time: '20:00', level: 55 },
  { time: '21:00', level: 50 },
  { time: '22:00', level: 45 },
  { time: '23:00', level: 40 },
];

// 週間エネルギー生産データ
const weeklyEnergyData = [
  { day: '月', solar: 380, wind: 120, grid: 150, consumption: 650 },
  { day: '火', solar: 420, wind: 100, grid: 130, consumption: 650 },
  { day: '水', solar: 350, wind: 150, grid: 180, consumption: 680 },
  { day: '木', solar: 410, wind: 130, grid: 140, consumption: 680 },
  { day: '金', solar: 390, wind: 110, grid: 160, consumption: 660 },
  { day: '土', solar: 320, wind: 140, grid: 240, consumption: 700 },
  { day: '日', solar: 300, wind: 130, grid: 270, consumption: 700 },
];

// エネルギーミックス
const energyMixData = [
  { name: '太陽光', value: 45 },
  { name: '風力', value: 10 },
  { name: 'バッテリー', value: 20 },
  { name: '系統電力', value: 25 },
];

// 主要消費先
const consumptionSourceData = [
  { name: '照明', value: 25 },
  { name: 'HVAC', value: 35 },
  { name: 'オフィス機器', value: 15 },
  { name: '電気自動車', value: 5 },
  { name: 'その他', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// マイクログリッドコンポーネントステータス
const gridComponentsData = [
  { id: 1, name: '太陽光パネルA', type: 'solar', status: 'active', output: '45kW', efficiency: '92%', lastMaintenance: '2024-03-15' },
  { id: 2, name: '太陽光パネルB', type: 'solar', status: 'active', output: '40kW', efficiency: '89%', lastMaintenance: '2024-03-15' },
  { id: 3, name: '風力タービン1', type: 'wind', status: 'warning', output: '8kW', efficiency: '78%', lastMaintenance: '2024-02-10' },
  { id: 4, name: 'バッテリーバンクA', type: 'battery', status: 'active', output: '20kW', efficiency: '95%', lastMaintenance: '2024-01-20' },
  { id: 5, name: 'バッテリーバンクB', type: 'battery', status: 'active', output: '15kW', efficiency: '94%', lastMaintenance: '2024-01-20' },
  { id: 6, name: '制御システム', type: 'control', status: 'active', output: 'N/A', efficiency: '99%', lastMaintenance: '2024-02-28' },
  { id: 7, name: '系統連系インバータ', type: 'inverter', status: 'active', output: '75kW', efficiency: '96%', lastMaintenance: '2023-12-05' },
  { id: 8, name: '蓄電池充放電装置', type: 'charger', status: 'active', output: '35kW', efficiency: '93%', lastMaintenance: '2024-01-20' },
];

// 最適化シナリオ
const optimizationScenarios = [
  { id: 1, name: '電力コスト最小化', primaryGoal: 'コスト削減', estimatedSavings: '15%', co2Reduction: '5%', resilience: '標準' },
  { id: 2, name: 'CO2排出量最小化', primaryGoal: '環境負荷低減', estimatedSavings: '8%', co2Reduction: '25%', resilience: '標準' },
  { id: 3, name: 'レジリエンス最大化', primaryGoal: '災害対応力強化', estimatedSavings: '5%', co2Reduction: '10%', resilience: '高' },
  { id: 4, name: 'ピークシフト最適化', primaryGoal: 'ピーク需要削減', estimatedSavings: '12%', co2Reduction: '8%', resilience: '中' },
];

// 異常検知イベント
const anomalyEvents = [
  { id: 1, time: '08:25', component: '風力タービン1', type: '効率低下', status: 'warning', detail: '風速に対する出力が期待値を15%下回っています。メンテナンス推奨。' },
  { id: 2, time: '13:42', component: '太陽光パネルB', type: '一時的出力低下', status: 'resolved', detail: '一時的な雲の影による出力低下。自動的に回復しました。' },
  { id: 3, time: '17:10', component: 'バッテリーバンクA', type: '温度上昇', status: 'warning', detail: '通常値より5℃高い温度を検出。冷却システムを確認してください。' },
];

// 災害時シミュレーション
const disasterScenarios = [
  { id: 1, type: '地震（震度6弱）', gridStatus: '72時間断絶', solarStatus: '80%稼働', windStatus: '50%稼働', batteryStatus: '100%稼働', autonomyHours: 48, criticalLoad: '65%維持可能' },
  { id: 2, type: '台風（最大風速30m/s）', gridStatus: '24時間断絶', solarStatus: '20%稼働', windStatus: '0%稼働（安全停止）', batteryStatus: '100%稼働', autonomyHours: 36, criticalLoad: '75%維持可能' },
  { id: 3, type: '豪雨・洪水', gridStatus: '48時間断絶', solarStatus: '40%稼働', windStatus: '70%稼働', batteryStatus: '100%稼働', autonomyHours: 42, criticalLoad: '70%維持可能' },
];

const MicrogridManagementDashboard = () => {
  const [selectedView, setSelectedView] = useState('realtime');
  const [activeScenario, setActiveScenario] = useState('normal');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">運用モード:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={activeScenario}
              onChange={(e) => setActiveScenario(e.target.value)}
            >
              <option value="normal">通常運用</option>
              <option value="cost">コスト優先</option>
              <option value="eco">環境優先</option>
              <option value="resilience">レジリエンス優先</option>
              <option value="disaster">災害時運用</option>
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
              onClick={() => setSelectedView('analysis')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'analysis'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              エネルギー分析
            </button>
            <button
              onClick={() => setSelectedView('components')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'components'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              構成機器
            </button>
            <button
              onClick={() => setSelectedView('resilience')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'resilience'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              レジリエンス
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の発電量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        85 kW
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">再生可能エネルギー</span>
                        <span className="ml-1 text-gray-500">75%</span>
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
                      バッテリー残量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        78%
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-blue-600 font-semibold">充電中</span>
                        <span className="ml-1 text-gray-500">(+10kW)</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      本日の電力コスト削減
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ¥12,450
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">系統電力使用率</span>
                        <span className="ml-1 text-gray-500">18%</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      CO2排出削減量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        185 kg
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">前日比</span>
                        <span className="ml-1 text-gray-500">+12%</span>
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
          {/* リアルタイムエネルギーフロー */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">リアルタイムエネルギーフロー</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={energyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} kW`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#FFBB28" fill="#FFBB28" name="太陽光" />
                  <Area type="monotone" dataKey="wind" stackId="1" stroke="#00C49F" fill="#00C49F" name="風力" />
                  <Area type="monotone" dataKey="battery" stackId="2" stroke="#0088FE" fill="#0088FE" name="バッテリー" />
                  <Area type="monotone" dataKey="grid" stackId="2" stroke="#FF8042" fill="#FF8042" name="系統電力" />
                  <Line type="monotone" dataKey="consumption" stroke="#FF0000" name="消費電力" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* バッテリー残量とエネルギーミックス */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* バッテリー残量 */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">バッテリー残量推移</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={batteryLevelData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '残量']} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="level" 
                      stroke="#0088FE" 
                      fill="#0088FE" 
                      name="バッテリー残量"
                    />
                    <Line
                      type="monotone"
                      dataKey="level"
                      stroke="#0088FE"
                      dot={false}
                      activeDot={{ r: 8 }}
                      name="バッテリー残量"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* エネルギーミックス */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">エネルギーミックス</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energyMixData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {energyMixData.map((entry, index) => (
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
          
          {/* 需要予測と電力単価変動 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 需要予測 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">24時間需要予測</h3>
              <div className="flex items-center justify-end mb-2">
                <span className="text-xs text-gray-500 mr-2">更新: 15分前</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={energyData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} kW`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#8884d8" 
                      name="実測値"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5" 
                      name="予測値"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-purple-50 rounded-md p-2">
                  <div className="font-medium text-purple-800">ピーク時間</div>
                  <div className="font-bold text-purple-900">17:00-19:00</div>
                </div>
                <div className="bg-blue-50 rounded-md p-2">
                  <div className="font-medium text-blue-800">ピーク需要</div>
                  <div className="font-bold text-blue-900">84 kW</div>
                </div>
                <div className="bg-green-50 rounded-md p-2">
                  <div className="font-medium text-green-800">自給率</div>
                  <div className="font-bold text-green-900">75%</div>
                </div>
              </div>
            </div>
            
            {/* 電力単価変動 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">電力単価（系統電力）</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">本日の平均単価: ¥28.5/kWh</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">前日比 -8%</span>
              </div>
              <div className="h-64 bg-gray-50 p-4 rounded-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">深夜時間帯 (23:00-7:00)</span>
                    <span className="text-sm font-bold text-blue-800">¥18.2/kWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium">日中時間帯 (7:00-17:00)</span>
                    <span className="text-sm font-bold text-green-800">¥26.8/kWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium">ピーク時間帯 (17:00-23:00)</span>
                    <span className="text-sm font-bold text-red-800">¥38.5/kWh</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">最適化推奨</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ピーク時間帯（17:00-23:00）はバッテリー放電を最大化
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      日中（11:00-15:00）の太陽光発電ピーク時にバッテリー充電を優先
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      深夜の低単価時間帯でのバッテリー充電も検討（太陽光発電量不足時）
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* 異常検知アラート */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">システムアラート</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                アラート設定
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時刻</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コンポーネント</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.component}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : event.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {event.status === 'warning' ? '警告' : 
                           event.status === 'resolved' ? '解決済み' : '緊急'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{event.detail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-green-600 hover:text-green-900">対応</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'analysis' && (
        <>
          {/* 週間エネルギー推移 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">週間エネルギー推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyEnergyData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} kWh`} />
                  <Legend />
                  <Bar dataKey="solar" stackId="a" fill="#FFBB28" name="太陽光" />
                  <Bar dataKey="wind" stackId="a" fill="#00C49F" name="風力" />
                  <Bar dataKey="grid" stackId="a" fill="#FF8042" name="系統電力" />
                  <Line type="monotone" dataKey="consumption" stroke="#FF0000" name="消費電力" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">太陽光発電量</h4>
                <p className="text-2xl font-bold text-yellow-900">2,570 kWh</p>
                <p className="text-xs text-yellow-700 mt-1">前週比: +5.2%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">風力発電量</h4>
                <p className="text-2xl font-bold text-green-900">880 kWh</p>
                <p className="text-xs text-green-700 mt-1">前週比: -3.5%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-orange-800 mb-1">系統電力使用量</h4>
                <p className="text-2xl font-bold text-orange-900">1,270 kWh</p>
                <p className="text-xs text-orange-700 mt-1">前週比: -8.2%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">バッテリー使用量</h4>
                <p className="text-2xl font-bold text-blue-900">840 kWh</p>
                <p className="text-xs text-blue-700 mt-1">放電: 420kWh / 充電: 420kWh</p>
              </div>
            </div>
          </div>
          
          {/* 消費先分析とエネルギー効率 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 消費先分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">エネルギー消費先分析</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">週間総消費量: 4,720 kWh</span>
                <span className="text-sm text-green-600">前週比: -2.5%</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consumptionSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {consumptionSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">節電ポテンシャル</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">HVAC (空調)</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-red-600">高い</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">照明</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-yellow-600">中程度</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">オフィス機器</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-yellow-600">中程度</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">電気自動車</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-green-600">低い</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* エネルギー効率分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">エネルギー効率・コスト分析</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">エネルギー自給率</h4>
                    <span className="text-sm font-bold text-green-600">73.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-600 h-4 rounded-full" style={{ width: '73.1%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>目標: 80%</span>
                    <span>前年同期: 65.4%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">CO2排出削減率</h4>
                    <span className="text-sm font-bold text-green-600">68.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-600 h-4 rounded-full" style={{ width: '68.5%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>目標: 70%</span>
                    <span>前年同期: 58.2%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">発電コスト平均</h4>
                    <span className="text-sm font-bold text-green-600">¥18.2/kWh</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>太陽光</span>
                      <span>¥8.5/kWh</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>風力</span>
                      <span>¥12.8/kWh</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>バッテリー (償却込)</span>
                      <span>¥22.5/kWh</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>系統電力 (平均)</span>
                      <span>¥28.5/kWh</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">推奨アクション</h4>
                  <ul className="text-xs text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">空調スケジュール最適化</span>
                        <p>予測される在室状況に合わせた空調運転により、最大15%の省エネが可能</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">EVの充電タイミング変更</span>
                        <p>深夜もしくは太陽光発電ピーク時に充電することで、コストを25%削減可能</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">太陽光パネルA点検</span>
                        <p>6ヶ月間で効率が3%低下。清掃により回復見込み</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'components' && (
        <>
          {/* システム構成一覧 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">マイクログリッドコンポーネント</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                コンポーネント追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出力</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">効率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終メンテナンス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gridComponentsData.map((component) => (
                    <tr key={component.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{component.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          component.type === 'solar' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : component.type === 'wind'
                              ? 'bg-green-100 text-green-800'
                              : component.type === 'battery'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {component.type === 'solar' 
                            ? '太陽光' 
                            : component.type === 'wind'
                              ? '風力'
                              : component.type === 'battery'
                                ? 'バッテリー'
                                : component.type === 'control'
                                  ? '制御システム'
                                  : component.type === 'inverter'
                                    ? 'インバータ'
                                    : '充放電装置'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          component.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : component.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {component.status === 'active' 
                            ? '正常' 
                            : component.status === 'warning' 
                              ? '警告' 
                              : 'エラー'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.output}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.efficiency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.lastMaintenance}</td>
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
          
          {/* システム構成図と運用モード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* システム構成図 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">システム構成図</h3>
              <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">システム構成図はここに表示されます</p>
                  <p className="mt-1 text-sm text-gray-500">実際の図表はデモの表示範囲に含まれていません</p>
                </div>
              </div>
            </div>
            
            {/* 運用モード設定 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">運用モード設定</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="operation-mode" className="block text-sm font-medium text-gray-700 mb-1">運用モード選択</label>
                  <select 
                    id="operation-mode" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  >
                    <option>通常モード（バランス型）</option>
                    <option>コスト最小化</option>
                    <option>CO2排出最小化</option>
                    <option>レジリエンス重視</option>
                    <option>オフグリッド</option>
                    <option>メンテナンスモード</option>
                  </select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">最適化シナリオ</h4>
                  <div className="overflow-hidden bg-white rounded-md border border-gray-200">
                    <ul className="divide-y divide-gray-200">
                      {optimizationScenarios.map((scenario) => (
                        <li key={scenario.id} className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">{scenario.name}</h5>
                              <p className="text-xs text-gray-500">主目標: {scenario.primaryGoal}</p>
                            </div>
                            <button 
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              適用
                            </button>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-green-50 p-1 rounded text-center">
                              <span className="block text-green-800">コスト削減</span>
                              <span className="font-medium">{scenario.estimatedSavings}</span>
                            </div>
                            <div className="bg-blue-50 p-1 rounded text-center">
                              <span className="block text-blue-800">CO2削減</span>
                              <span className="font-medium">{scenario.co2Reduction}</span>
                            </div>
                            <div className="bg-orange-50 p-1 rounded text-center">
                              <span className="block text-orange-800">レジリエンス</span>
                              <span className="font-medium">{scenario.resilience}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">バッテリー利用設定</h4>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="battery-min" className="block text-xs text-gray-500 mb-1">最小残量閾値</label>
                      <div className="flex items-center">
                        <input 
                          type="range" 
                          id="battery-min" 
                          min="10" 
                          max="50" 
                          step="5" 
                          defaultValue="30" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">30%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">非常時対応のための最小残量を設定します</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="priority-charging" className="text-sm text-gray-700">優先充電時間帯</label>
                      <div className="flex items-center">
                        <input id="priority-charging" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-500">10:00-15:00 (太陽光ピーク時)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="priority-discharge" className="text-sm text-gray-700">優先放電時間帯</label>
                      <div className="flex items-center">
                        <input id="priority-discharge" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-500">17:00-22:00 (ピーク電力時間帯)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'resilience' && (
        <>
          {/* レジリエンスステータス */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">レジリエンス状態</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-green-800">現在のバックアップ電力</h4>
                    <p className="text-2xl font-bold text-green-900">75 kWh</p>
                    <p className="text-xs text-green-700">バッテリー残量: 78%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-blue-800">推定バックアップ時間</h4>
                    <p className="text-2xl font-bold text-blue-900">36時間</p>
                    <p className="text-xs text-blue-700">平均負荷(25kW) 想定</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-yellow-800">重要設備維持能力</h4>
                    <p className="text-2xl font-bold text-yellow-900">72時間</p>
                    <p className="text-xs text-yellow-700">重要負荷のみ (12kW) 運転</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-purple-800">オフグリッド可能率</h4>
                    <p className="text-2xl font-bold text-purple-900">82%</p>
                    <p className="text-xs text-purple-700">年間稼働日数の推定値</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">システムステータス</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h5 className="text-sm font-medium text-gray-900">系統連系状態</h5>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">正常に接続 (双方向)</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h5 className="text-sm font-medium text-gray-900">自動切替装置</h5>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">正常（最終テスト: 14日前）</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h5 className="text-sm font-medium text-gray-900">負荷分散システム</h5>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">正常（優先順位設定済み）</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 災害シミュレーション */}
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">災害時シミュレーション</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                シミュレーション実行
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">災害タイプ</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">系統状態</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発電設備状態</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">蓄電池状態</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">自立可能時間</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">重要負荷維持</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disasterScenarios.map((scenario) => (
                    <tr key={scenario.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scenario.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500">{scenario.gridStatus}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>太陽光: {scenario.solarStatus}</div>
                        <div>風力: {scenario.windStatus}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-500">{scenario.batteryStatus}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{scenario.autonomyHours}時間</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{scenario.criticalLoad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 重要負荷設定と運用計画 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* 重要負荷設定 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">重要負荷設定</h3>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <h5 className="text-sm font-medium text-gray-900">最優先負荷</h5>
                    </div>
                    <span className="text-sm text-gray-500">合計: 8.2 kW</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-5">
                    <li>非常用照明系統 (1.5 kW)</li>
                    <li>通信・セキュリティシステム (2.0 kW)</li>
                    <li>医療関連機器 (2.7 kW)</li>
                    <li>サーバー室冷却 (2.0 kW)</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2">稼働可能時間: 推定96時間以上</p>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <h5 className="text-sm font-medium text-gray-900">重要負荷</h5>
                    </div>
                    <span className="text-sm text-gray-500">合計: 12.5 kW</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-5">
                    <li>給水システム (3.0 kW)</li>
                    <li>基本的な空調設備 (4.5 kW)</li>
                    <li>冷蔵・冷凍設備 (3.0 kW)</li>
                    <li>一部事務機器 (2.0 kW)</li>
                  </ul>
                  <p className="text-xs text-yellow-600 mt-2">稼働可能時間: 推定48時間</p>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <h5 className="text-sm font-medium text-gray-900">標準負荷</h5>
                    </div>
                    <span className="text-sm text-gray-500">合計: 35.3 kW</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-5">
                    <li>一般照明 (8.0 kW)</li>
                    <li>完全空調 (12.0 kW)</li>
                    <li>全オフィス機器 (7.5 kW)</li>
                    <li>その他設備 (7.8 kW)</li>
                  </ul>
                  <p className="text-xs text-red-600 mt-2">稼働可能時間: 推定12時間</p>
                </div>
              </div>
            </div>
            
            {/* 耐障害運用計画 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">耐障害運用計画</h3>
              
              <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800">最新の障害対応訓練</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  <span className="font-medium">実施日:</span> 2024年2月15日
                </p>
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">結果:</span> 合格（切替時間: 3.2秒）
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">停電発生時自動対応</h4>
                  <ol className="mt-2 text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>系統電力喪失の検出 (目標: &lt;0.1秒)</li>
                    <li>自動切替システム作動 (目標: &lt;3秒)</li>
                    <li>優先順位に基づく負荷制御</li>
                    <li>バッテリー放電開始</li>
                    <li>発電機起動（設定されている場合）</li>
                  </ol>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">長期停電対応戦略</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>バッテリー残量20%未満で最優先負荷のみの維持に切替</li>
                    <li>天候に応じた太陽光発電量予測と消費計画の調整</li>
                    <li>バッテリー充電は太陽光発電ピーク時に優先実施</li>
                    <li>負荷のローテーション運用（冷凍設備などの間欠運転）</li>
                  </ul>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">復旧プロセス</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>系統電力復旧の検出と確認（30秒間の安定確認）</li>
                    <li>系統と内部電源の同期</li>
                    <li>系統への再接続</li>
                    <li>段階的な負荷の復旧（負荷急増を防止）</li>
                    <li>バッテリー充電の開始（最適化アルゴリズムに基づく）</li>
                  </ul>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">推奨改善策</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">バッテリー容量の拡張</span>
                        <p className="text-xs">バッテリー容量を現在の95kWhから150kWhへの拡張を推奨（投資回収期間: 4.5年）</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">負荷制御の自動化拡張</span>
                        <p className="text-xs">個別機器レベルでのIoT制御導入による、より細かな負荷管理の実現</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium">隣接施設とのマイクログリッド連携</span>
                        <p className="text-xs">周辺施設との相互バックアップ体制構築によるレジリエンス強化</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MicrogridManagementDashboard;