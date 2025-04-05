// components/dashboard/TrafficPrediction.tsx
import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 実際の交通量と予測値のモックデータ
const trafficPredictionData = [
  { time: '00:00', actual: 120, predicted: 130, min: 110, max: 145 },
  { time: '01:00', actual: 80, predicted: 85, min: 70, max: 100 },
  { time: '02:00', actual: 60, predicted: 65, min: 55, max: 80 },
  { time: '03:00', actual: 40, predicted: 45, min: 35, max: 60 },
  { time: '04:00', actual: 70, predicted: 65, min: 55, max: 80 },
  { time: '05:00', actual: 180, predicted: 170, min: 150, max: 190 },
  { time: '06:00', actual: 450, predicted: 430, min: 400, max: 460 },
  { time: '07:00', actual: 820, predicted: 780, min: 730, max: 830 },
  { time: '08:00', actual: 1100, predicted: 1050, min: 980, max: 1120 },
  { time: '09:00', actual: 950, predicted: 980, min: 920, max: 1040 },
  { time: '10:00', actual: 850, predicted: 870, min: 820, max: 920 },
  { time: '11:00', actual: 920, predicted: 900, min: 850, max: 950 },
  { time: '12:00', actual: 980, predicted: 950, min: 900, max: 1000 },
  { time: '13:00', actual: 920, predicted: 930, min: 880, max: 980 },
  { time: '14:00', actual: 880, predicted: 900, min: 850, max: 950 },
  { time: '15:00', actual: 1050, predicted: 1000, min: 950, max: 1050 },
  { time: '16:00', actual: 1250, predicted: 1200, min: 1150, max: 1250 },
  { time: '17:00', actual: 1350, predicted: 1300, min: 1250, max: 1350 },
  { time: '18:00', actual: 1200, predicted: 1250, min: 1200, max: 1300 },
  { time: '19:00', actual: 980, predicted: 1000, min: 950, max: 1050 },
  { time: '20:00', actual: 750, predicted: 770, min: 720, max: 820 },
  { time: '21:00', actual: 580, predicted: 600, min: 550, max: 650 },
  { time: '22:00', actual: 380, predicted: 400, min: 350, max: 450 },
  { time: '23:00', actual: 220, predicted: 230, min: 200, max: 260 },
];

// 将来予測データ (今後24時間)
const futurePredictionData = [
  { time: '00:00', predicted: 125, min: 105, max: 140 },
  { time: '01:00', predicted: 85, min: 70, max: 100 },
  { time: '02:00', predicted: 62, min: 50, max: 75 },
  { time: '03:00', predicted: 42, min: 30, max: 55 },
  { time: '04:00', predicted: 68, min: 50, max: 85 },
  { time: '05:00', predicted: 175, min: 145, max: 205 },
  { time: '06:00', predicted: 445, min: 395, max: 495 },
  { time: '07:00', predicted: 810, min: 740, max: 880 },
  { time: '08:00', predicted: 1080, min: 1000, max: 1160 },
  { time: '09:00', predicted: 965, min: 895, max: 1035 },
  { time: '10:00', predicted: 860, min: 800, max: 920 },
  { time: '11:00', predicted: 910, min: 850, max: 970 },
  { time: '12:00', predicted: 970, min: 910, max: 1030 },
  { time: '13:00', predicted: 925, min: 865, max: 985 },
  { time: '14:00', predicted: 890, min: 830, max: 950 },
  { time: '15:00', predicted: 1030, min: 970, max: 1090 },
  { time: '16:00', predicted: 1230, min: 1160, max: 1300 },
  { time: '17:00', predicted: 1320, min: 1250, max: 1390 },
  { time: '18:00', predicted: 1230, min: 1160, max: 1300 },
  { time: '19:00', predicted: 990, min: 930, max: 1050 },
  { time: '20:00', predicted: 760, min: 700, max: 820 },
  { time: '21:00', predicted: 590, min: 530, max: 650 },
  { time: '22:00', predicted: 390, min: 340, max: 440 },
  { time: '23:00', predicted: 225, min: 185, max: 265 },
];

// 予測精度のモックデータ
const predictionAccuracyData = [
  { date: '4/1', mape: 4.2, rmse: 42 },
  { date: '4/2', mape: 3.8, rmse: 38 },
  { date: '4/3', mape: 5.1, rmse: 51 },
  { date: '4/4', mape: 4.5, rmse: 45 },
  { date: '4/5', mape: 3.7, rmse: 37 },
  { date: '4/6', mape: 3.2, rmse: 32 },
  { date: '4/7', mape: 3.9, rmse: 39 },
  { date: '4/8', mape: 4.8, rmse: 48 },
  { date: '4/9', mape: 4.3, rmse: 43 },
  { date: '4/10', mape: 3.5, rmse: 35 },
  { date: '4/11', mape: 3.1, rmse: 31 },
  { date: '4/12', mape: 3.4, rmse: 34 },
  { date: '4/13', mape: 3.6, rmse: 36 },
  { date: '4/14', mape: 3.9, rmse: 39 },
];

// 予測影響要因の重要度
const featureImportanceData = [
  { name: '時間帯', value: 28 },
  { name: '曜日', value: 22 },
  { name: '天候', value: 18 },
  { name: 'イベント', value: 12 },
  { name: '休日/平日', value: 10 },
  { name: '季節', value: 5 },
  { name: 'その他', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7300'];

// イベント影響のモックデータ
const eventImpactData = [
  { id: 1, name: '市民祭り', start: '2025/04/10 10:00', end: '2025/04/10 18:00', location: '中央公園', expectedIncrease: '35%', status: 'upcoming' },
  { id: 2, name: '大規模コンサート', start: '2025/04/15 18:00', end: '2025/04/15 22:00', location: '市民ホール', expectedIncrease: '28%', status: 'upcoming' },
  { id: 3, name: '道路工事', start: '2025/04/02 09:00', end: '2025/04/07 17:00', location: '大通り1丁目', expectedDecrease: '15%', status: 'active' },
  { id: 4, name: '春のマラソン大会', start: '2025/04/03 07:00', end: '2025/04/03 12:00', location: '市内全域', expectedIncrease: '22%', status: 'completed' },
];

// シナリオのモックデータ
const scenarioData = [
  { id: 1, name: '標準シナリオ', description: '現在の状況に基づく予測' },
  { id: 2, name: '悪天候シナリオ', description: '雨天による交通状況の変化を考慮' },
  { id: 3, name: 'イベント発生シナリオ', description: '市民祭りによる交通量増加を考慮' },
  { id: 4, name: '道路工事シナリオ', description: '大通りの車線規制による影響を考慮' },
];

const TrafficPredictionDashboard = () => {
  const [selectedView, setSelectedView] = useState('prediction');
  const [selectedScenario, setSelectedScenario] = useState('1');
  const [predictionHorizon, setPredictionHorizon] = useState('24h');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">予測範囲:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={predictionHorizon}
              onChange={(e) => setPredictionHorizon(e.target.value)}
            >
              <option value="24h">24時間</option>
              <option value="48h">48時間</option>
              <option value="7d">7日間</option>
              <option value="30d">30日間</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('prediction')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'prediction'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              交通予測
            </button>
            <button
              onClick={() => setSelectedView('accuracy')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'accuracy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              予測精度
            </button>
            <button
              onClick={() => setSelectedView('scenarios')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'scenarios'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              シナリオ分析
            </button>
            <button
              onClick={() => setSelectedView('events')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'events'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              イベント影響
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      本日予測ピーク時交通量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        1,320台/時
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">17:00-18:00</span>
                        <span className="ml-1 text-gray-500">時間帯</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      予測精度（MAPE）
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        3.8%
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">-0.4%</span>
                        <span className="ml-1 text-gray-500">先週比</span>
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
                      渋滞発生確率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        35%
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">+15%</span>
                        <span className="ml-1 text-gray-500">通常時</span>
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
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      アクティブシナリオ
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        2件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-blue-600 font-semibold">標準・イベント</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedView === 'prediction' && (
        <>
          {/* 交通予測グラフ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">交通量予測 vs 実績</h3>
              <div className="flex space-x-2">
                <select 
                  className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                >
                  {scenarioData.map(scenario => (
                    <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                  ))}
                </select>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  更新
                </button>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trafficPredictionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" name="実績値" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="予測値" strokeWidth={2} />
                  <Line type="monotone" dataKey="min" stroke="#ffc658" name="最小予測" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="max" stroke="#ff8042" name="最大予測" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 将来予測と最適経路 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 将来予測グラフ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">将来予測 (今後24時間)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={futurePredictionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="予測値" strokeWidth={2} />
                    <Line type="monotone" dataKey="min" stroke="#ffc658" name="最小予測" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="max" stroke="#ff8042" name="最大予測" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900">予測ピーク時間帯</h4>
                  <p className="text-gray-700">17:00-18:00 (1,320台/時)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900">予測ボトム時間帯</h4>
                  <p className="text-gray-700">03:00-04:00 (42台/時)</p>
                </div>
              </div>
            </div>
            
            {/* 最適経路推奨 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">最適経路推奨</h3>
              <div className="mb-4">
                <label htmlFor="route-from" className="block text-sm font-medium text-gray-700 mb-1">出発地</label>
                <select 
                  id="route-from" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>駅前広場</option>
                  <option>市役所</option>
                  <option>中央公園</option>
                  <option>ショッピングモール</option>
                  <option>工業団地</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="route-to" className="block text-sm font-medium text-gray-700 mb-1">目的地</label>
                <select 
                  id="route-to" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>高速道路IC</option>
                  <option>市民ホール</option>
                  <option>総合病院</option>
                  <option>大学キャンパス</option>
                  <option>スポーツセンター</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="route-time" className="block text-sm font-medium text-gray-700 mb-1">出発時間</label>
                <div className="flex space-x-2">
                  <input 
                    type="date" 
                    id="route-date" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue="2025-04-05"
                  />
                  <input 
                    type="time" 
                    id="route-time" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue="17:30"
                  />
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                経路を検索
              </button>
              
              <div className="mt-4 border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">推奨経路</h4>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">最速経路</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">駅前広場 → 市民通り → 中央大通り → 高速道路IC</p>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>所要時間: 22分</span>
                  <span>距離: 5.8km</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="text-green-600 font-medium">渋滞予測: 低</span>
                  <span className="mx-2">|</span>
                  <span>通常より3分速い</span>
                </div>
              </div>
              
              <div className="mt-2 border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">代替経路</h4>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">低渋滞経路</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">駅前広場 → 北通り → 西環状線 → 高速道路IC</p>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>所要時間: 25分</span>
                  <span>距離: 7.2km</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span className="text-yellow-600 font-medium">渋滞予測: 最小</span>
                  <span className="mx-2">|</span>
                  <span>信号待ち少なめ</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 予測要因分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">予測要因分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <h4 className="text-sm font-medium text-gray-900 mb-3">影響要因の重要度</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={featureImportanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {featureImportanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-900 mb-3">主要予測要因の詳細分析</h4>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-3">
                    <h5 className="font-medium text-blue-800">時間帯の影響</h5>
                    <p className="text-sm text-gray-600 mt-1">交通量は時間帯によって大きく変動します。特に朝（7:00-9:00）と夕方（17:00-19:00）にピークが現れます。これは通勤・通学パターンと一致しています。</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-900">95%</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-3">
                    <h5 className="font-medium text-green-800">曜日の影響</h5>
                    <p className="text-sm text-gray-600 mt-1">平日と休日で交通パターンが大きく異なります。また、金曜日は他の平日より交通量が10-15%増加する傾向があります。</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-900">85%</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-3">
                    <h5 className="font-medium text-yellow-800">天候の影響</h5>
                    <p className="text-sm text-gray-600 mt-1">雨天時は通常より交通量が5-8%減少し、積雪時は最大20%減少します。一方、好天の休日は通常の休日より交通量が増加する傾向があります。</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-900">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'accuracy' && (
        <>
          {/* 予測精度分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">予測精度の推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictionAccuracyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="mape" stroke="#8884d8" name="MAPE (%)" />
                  <Line yAxisId="right" type="monotone" dataKey="rmse" stroke="#82ca9d" name="RMSE" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">現在の平均MAPE</h4>
                <p className="text-2xl font-bold text-blue-900">3.8%</p>
                <p className="text-xs text-blue-700 mt-1">前週比: -0.4%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">現在の平均RMSE</h4>
                <p className="text-2xl font-bold text-green-900">35台/時</p>
                <p className="text-xs text-green-700 mt-1">前週比: -3台/時</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-purple-800 mb-1">最高精度時間帯</h4>
                <p className="text-2xl font-bold text-purple-900">14:00-16:00</p>
                <p className="text-xs text-purple-700 mt-1">MAPE: 2.5%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">最低精度時間帯</h4>
                <p className="text-2xl font-bold text-yellow-900">05:00-07:00</p>
                <p className="text-xs text-yellow-700 mt-1">MAPE: 6.2%</p>
              </div>
            </div>
          </div>
          
          {/* 精度向上施策と原因分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 精度向上施策 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">精度向上施策</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <h4 className="font-medium text-green-800">モデル更新（完了）</h4>
                  <p className="text-sm text-gray-600 mt-1">時系列特性を強化したTransformerベースのモデルに更新しました。これにより平均MAPEが1.2%向上しました。</p>
                  <p className="text-xs text-gray-500 mt-1">2025/03/15実施</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <h4 className="font-medium text-yellow-800">天候データ連携強化（進行中）</h4>
                  <p className="text-sm text-gray-600 mt-1">より細かな気象予報データの取り込みと、過去の天候影響パターンの学習強化を行っています。</p>
                  <p className="text-xs text-gray-500 mt-1">完了予定: 2025/04/15</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <h4 className="font-medium text-blue-800">センサー追加設置（計画中）</h4>
                  <p className="text-sm text-gray-600 mt-1">市内主要5地点に追加の交通量センサーを設置し、データ収集地点を拡大します。これにより空間的精度の向上を図ります。</p>
                  <p className="text-xs text-gray-500 mt-1">開始予定: 2025/05/10</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3 py-2">
                  <h4 className="font-medium text-purple-800">SNSデータ活用（検討中）</h4>
                  <p className="text-sm text-gray-600 mt-1">地域のSNSデータを分析し、非定期的なイベントや事故情報をリアルタイムで検出・予測モデルに反映する仕組みを検討中です。</p>
                  <p className="text-xs text-gray-500 mt-1">検討段階</p>
                </div>
              </div>
            </div>
            
            {/* 精度低下原因分析 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">精度低下原因分析</h3>
              <div className="overflow-y-auto" style={{ maxHeight: '360px' }}>
                <div className="space-y-4">
                  <div className="border border-red-200 rounded-md p-3 bg-red-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-red-800">4/8の急激な精度低下</h4>
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">MAPE: 4.8%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">市内で開催された急遽決定したスポーツイベントにより、予測外の交通量増加が発生しました。</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="font-medium">対策:</span>
                      <span className="ml-1">イベント情報の早期取得プロセスを改善</span>
                    </div>
                  </div>
                  
                  <div className="border border-orange-200 rounded-md p-3 bg-orange-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-orange-800">早朝時間帯の精度低下</h4>
                      <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full">MAPE: 6.2%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">5:00-7:00の時間帯は、通勤開始時間のわずかな変動が大きな交通量変化につながり、予測が難しい状況です。</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="font-medium">対策:</span>
                      <span className="ml-1">早朝特化型のサブモデル開発を検討中</span>
                    </div>
                  </div>
                  
                  <div className="border border-yellow-200 rounded-md p-3 bg-yellow-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-yellow-800">雨天時の予測バイアス</h4>
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">MAPE: +1.5%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">雨の強度による交通量への影響度合いに一貫性がなく、予測が難しい状況です。特に短時間の強い雨に対する反応が不安定です。</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="font-medium">対策:</span>
                      <span className="ml-1">雨量データの精緻化と履歴パターン分析強化</span>
                    </div>
                  </div>
                  
                  <div className="border border-blue-200 rounded-md p-3 bg-blue-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-blue-800">工事による交通規制影響</h4>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">局所的影響</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">予告なしの緊急工事や、計画工事の延長などが予測精度に影響を与えています。</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="font-medium">対策:</span>
                      <span className="ml-1">市の工事管理システムとのリアルタイム連携を強化</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'scenarios' && (
        <>
          {/* シナリオ分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">シナリオ分析</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新規シナリオ作成
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">シナリオ名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">説明</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">影響度</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      標準シナリオ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      現在の状況に基づく予測
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        有効
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        基準
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">編集</button>
                      <button className="text-red-600 hover:text-red-900">無効化</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      悪天候シナリオ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      雨天による交通状況の変化を考慮
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        無効
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        -15%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">編集</button>
                      <button className="text-green-600 hover:text-green-900">有効化</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      イベント発生シナリオ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      市民祭りによる交通量増加を考慮
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        有効
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +30%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">編集</button>
                      <button className="text-red-600 hover:text-red-900">無効化</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      道路工事シナリオ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      大通りの車線規制による影響を考慮
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        無効
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        -10%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">編集</button>
                      <button className="text-green-600 hover:text-green-900">有効化</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* シナリオ比較と編集 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* シナリオ比較 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">シナリオ比較</h3>
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">比較シナリオ 1</label>
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option>標準シナリオ</option>
                      <option>悪天候シナリオ</option>
                      <option>イベント発生シナリオ</option>
                      <option>道路工事シナリオ</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">比較シナリオ 2</label>
                    <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option>イベント発生シナリオ</option>
                      <option>標準シナリオ</option>
                      <option>悪天候シナリオ</option>
                      <option>道路工事シナリオ</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">比較グラフが表示されます</p>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-blue-200 rounded-md p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">標準シナリオ</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>ピーク時交通量: 1,300台/時</li>
                    <li>1日総交通量: 15,200台</li>
                    <li>渋滞発生確率: 25%</li>
                    <li>ピーク時間帯: 17:00-18:00</li>
                  </ul>
                </div>
                
                <div className="border border-green-200 rounded-md p-3">
                  <h4 className="text-sm font-medium text-green-800 mb-2">イベント発生シナリオ</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>ピーク時交通量: 1,690台/時 (+30%)</li>
                    <li>1日総交通量: 19,760台 (+30%)</li>
                    <li>渋滞発生確率: 75% (+50%)</li>
                    <li>ピーク時間帯: 16:00-19:00 (延長)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* シナリオエディタ */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">シナリオエディタ</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="scenario-name" className="block text-sm font-medium text-gray-700 mb-1">シナリオ名</label>
                  <input 
                    type="text" 
                    id="scenario-name" 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue="イベント発生シナリオ"
                  />
                </div>
                
                <div>
                  <label htmlFor="scenario-desc" className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                  <textarea 
                    id="scenario-desc" 
                    rows={2} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue="市民祭りによる交通量増加を考慮"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">対象イベント</label>
                  <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option>市民祭り (2025/04/10)</option>
                    <option>大規模コンサート (2025/04/15)</option>
                    <option>春のマラソン大会 (2025/04/03)</option>
                    <option>新規イベントを追加...</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">影響エリア</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input id="area-1" name="area-1" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="area-1" className="ml-2 text-sm text-gray-700">中央エリア</label>
                    </div>
                    <div className="flex items-center">
                      <input id="area-2" name="area-2" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <label htmlFor="area-2" className="ml-2 text-sm text-gray-700">駅前エリア</label>
                    </div>
                    <div className="flex items-center">
                      <input id="area-3" name="area-3" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="area-3" className="ml-2 text-sm text-gray-700">北エリア</label>
                    </div>
                    <div className="flex items-center">
                      <input id="area-4" name="area-4" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="area-4" className="ml-2 text-sm text-gray-700">南エリア</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="traffic-increase" className="block text-sm font-medium text-gray-700 mb-1">交通量増加率</label>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      id="traffic-increase" 
                      min="0" 
                      max="100" 
                      step="5" 
                      defaultValue="30" 
                      className="w-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">30%</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="peak-hours" className="block text-sm font-medium text-gray-700 mb-1">ピーク時間帯</label>
                  <div className="flex space-x-2">
                    <input 
                      type="time" 
                      id="peak-hours-start" 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="16:00"
                    />
                    <span className="text-gray-500">〜</span>
                    <input 
                      type="time" 
                      id="peak-hours-end" 
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="19:00"
                    />
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
      
      {selectedView === 'events' && (
        <>
          {/* イベント影響分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">イベント・工事の交通影響</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                イベント登録
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">イベント名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期間</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">予測影響</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventImpactData.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.start} 〜 <br />{event.end}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.expectedIncrease ? (
                          <span className="inline-flex items-center text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            {event.expectedIncrease}
                          </span>
                        ) : event.expectedDecrease ? (
                          <span className="inline-flex items-center text-red-600">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            {event.expectedDecrease}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : event.status === 'upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status === 'active' 
                            ? '進行中' 
                            : event.status === 'upcoming' 
                              ? '予定' 
                              : '完了'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                        <button className="text-blue-600 hover:text-blue-900">編集</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* イベント詳細分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* イベント影響詳細 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">イベント影響詳細</h3>
              <div className="mb-4">
                <label htmlFor="event-select" className="block text-sm font-medium text-gray-700 mb-1">イベント選択</label>
                <select 
                  id="event-select" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>市民祭り (2025/04/10)</option>
                  <option>大規模コンサート (2025/04/15)</option>
                  <option>道路工事 (2025/04/02-07)</option>
                  <option>春のマラソン大会 (2025/04/03)</option>
                </select>
              </div>
              
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">影響グラフが表示されます</p>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">影響範囲</h4>
                  <p className="text-sm text-gray-600">中央公園を中心に、駅前エリアと中央エリア全域に影響。特に南北方向の交通流に大きな変化。</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-green-800 mb-1">時間帯別影響</h4>
                  <p className="text-sm text-gray-600">9:00-19:00で交通量増加。特に入場時間帯(9:00-11:00)と退場時間帯(17:00-19:00)に集中。</p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">迂回経路予測</h4>
                  <p className="text-sm text-gray-600">北環状線と東通りに通常の150%の交通量が発生する見込み。特に東通り/北大通り交差点に注意。</p>
                </div>
              </div>
            </div>
            
            {/* 交通対策提案 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">交通対策提案</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <h4 className="font-medium text-blue-800">信号制御パターン変更</h4>
                  <p className="text-sm text-gray-600 mt-1">中央公園周辺5交差点の信号サイクルを「イベント時パターン」に切り替え。南北方向の青信号時間を20%延長。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">優先度: 高</span>
                    <span className="ml-2 text-xs text-gray-500">効果: 交通流+15%</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <h4 className="font-medium text-green-800">臨時駐車場の設置</h4>
                  <p className="text-sm text-gray-600 mt-1">市民運動場を臨時駐車場として解放し、シャトルバスを運行。中央公園周辺への車両流入を抑制。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">優先度: 高</span>
                    <span className="ml-2 text-xs text-gray-500">効果: 周辺交通量-20%</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <h4 className="font-medium text-yellow-800">交通誘導員の配置</h4>
                  <p className="text-sm text-gray-600 mt-1">主要5交差点と駐車場入口に交通誘導員を配置し、円滑な交通流を促進。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">優先度: 中</span>
                    <span className="ml-2 text-xs text-gray-500">効果: 局所的改善</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3 py-2">
                  <h4 className="font-medium text-purple-800">事前情報発信</h4>
                  <p className="text-sm text-gray-600 mt-1">市公式サイト、SNS、地域メディアを通じた交通情報の事前告知と、推奨迂回路の案内。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">優先度: 中</span>
                    <span className="ml-2 text-xs text-gray-500">効果: 分散効果</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-red-500 pl-3 py-2">
                  <h4 className="font-medium text-red-800">公共交通機関の増便</h4>
                  <p className="text-sm text-gray-600 mt-1">イベント時間帯のバス・電車の増便と、臨時停留所の設置。</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">優先度: 低</span>
                    <span className="ml-2 text-xs text-gray-500">効果: 車両数削減</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrafficPredictionDashboard;