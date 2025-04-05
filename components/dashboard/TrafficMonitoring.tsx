// components/dashboard/TrafficMonitoring.tsx
import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 交通量のモックデータ（時間別）
const hourlyTrafficData = [
  { time: '00:00', total: 120, car: 90, truck: 20, bus: 5, motorcycle: 5 },
  { time: '01:00', total: 80, car: 65, truck: 10, bus: 2, motorcycle: 3 },
  { time: '02:00', total: 60, car: 50, truck: 5, bus: 1, motorcycle: 4 },
  { time: '03:00', total: 40, car: 35, truck: 3, bus: 0, motorcycle: 2 },
  { time: '04:00', total: 70, car: 55, truck: 10, bus: 1, motorcycle: 4 },
  { time: '05:00', total: 180, car: 150, truck: 20, bus: 5, motorcycle: 5 },
  { time: '06:00', total: 450, car: 380, truck: 40, bus: 15, motorcycle: 15 },
  { time: '07:00', total: 820, car: 680, truck: 75, bus: 25, motorcycle: 40 },
  { time: '08:00', total: 1100, car: 920, truck: 90, bus: 30, motorcycle: 60 },
  { time: '09:00', total: 950, car: 800, truck: 80, bus: 25, motorcycle: 45 },
  { time: '10:00', total: 850, car: 720, truck: 70, bus: 20, motorcycle: 40 },
  { time: '11:00', total: 920, car: 780, truck: 75, bus: 25, motorcycle: 40 },
  { time: '12:00', total: 980, car: 830, truck: 80, bus: 30, motorcycle: 40 },
  { time: '13:00', total: 920, car: 780, truck: 75, bus: 25, motorcycle: 40 },
  { time: '14:00', total: 880, car: 740, truck: 70, bus: 30, motorcycle: 40 },
  { time: '15:00', total: 1050, car: 880, truck: 90, bus: 35, motorcycle: 45 },
  { time: '16:00', total: 1250, car: 1050, truck: 100, bus: 40, motorcycle: 60 },
  { time: '17:00', total: 1350, car: 1150, truck: 100, bus: 40, motorcycle: 60 },
  { time: '18:00', total: 1200, car: 1020, truck: 90, bus: 35, motorcycle: 55 },
  { time: '19:00', total: 980, car: 840, truck: 70, bus: 25, motorcycle: 45 },
  { time: '20:00', total: 750, car: 640, truck: 60, bus: 20, motorcycle: 30 },
  { time: '21:00', total: 580, car: 500, truck: 40, bus: 15, motorcycle: 25 },
  { time: '22:00', total: 380, car: 320, truck: 30, bus: 10, motorcycle: 20 },
  { time: '23:00', total: 220, car: 180, truck: 25, bus: 5, motorcycle: 10 },
];

// 交通量のモックデータ（曜日別）
const dailyTrafficData = [
  { day: '月曜日', total: 15200, car: 12800, truck: 1250, bus: 350, motorcycle: 800 },
  { day: '火曜日', total: 14800, car: 12500, truck: 1200, bus: 350, motorcycle: 750 },
  { day: '水曜日', total: 15000, car: 12700, truck: 1220, bus: 330, motorcycle: 750 },
  { day: '木曜日', total: 15100, car: 12750, truck: 1250, bus: 350, motorcycle: 750 },
  { day: '金曜日', total: 16800, car: 14200, truck: 1350, bus: 370, motorcycle: 880 },
  { day: '土曜日', total: 17500, car: 15200, truck: 1050, bus: 320, motorcycle: 930 },
  { day: '日曜日', total: 14200, car: 12500, truck: 750, bus: 250, motorcycle: 700 },
];

// 方向別交通量のモックデータ
const directionalTrafficData = [
  { direction: '北行き', value: 28 },
  { direction: '東行き', value: 22 },
  { direction: '南行き', value: 30 },
  { direction: '西行き', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// 交通量計測地点データ
const monitoringPoints = [
  { id: 1, name: '駅前交差点', status: 'active', lastUpdate: '2分前', hourlyAvg: 950, dailyTotal: 15800 },
  { id: 2, name: '市役所前', status: 'active', lastUpdate: '5分前', hourlyAvg: 720, dailyTotal: 12100 },
  { id: 3, name: '大通り1丁目', status: 'active', lastUpdate: '3分前', hourlyAvg: 880, dailyTotal: 14700 },
  { id: 4, name: '南公園入口', status: 'warning', lastUpdate: '15分前', hourlyAvg: 350, dailyTotal: 6200 },
  { id: 5, name: '工業団地入口', status: 'active', lastUpdate: '1分前', hourlyAvg: 650, dailyTotal: 9800 },
  { id: 6, name: '高速道路IC付近', status: 'active', lastUpdate: '4分前', hourlyAvg: 1250, dailyTotal: 20400 },
  { id: 7, name: 'ショッピングモール前', status: 'error', lastUpdate: '2時間前', hourlyAvg: 0, dailyTotal: 5600 },
];

// 異常検知イベント
const anomalyEvents = [
  { id: 1, time: '08:32', location: '駅前交差点', type: '急激な交通量増加', status: 'resolved', detail: '通勤ラッシュピーク時の予想を25%上回る増加を検知' },
  { id: 2, time: '12:15', location: '市役所前', type: 'カメラ精度低下', status: 'active', detail: '霧による視認性低下。精度が85%まで低下' },
  { id: 3, time: '15:45', location: '大通り1丁目', type: '交通パターン変化', status: 'active', detail: '通常比で右折車両が60%増加' },
  { id: 4, time: '17:20', location: '高速道路IC付近', type: '渋滞検知', status: 'active', detail: '通常速度の40%まで低下。南方向に渋滞延伸中' },
];

const TrafficMonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedView, setSelectedView] = useState('overview');
  
  return (
    <div className="space-y-6">
      {/* 表示切り替えとフィルター */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">表示期間:</span>
            <select 
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">直近24時間</option>
              <option value="week">直近1週間</option>
              <option value="month">直近1ヶ月</option>
              <option value="custom">カスタム期間</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              概要
            </button>
            <button
              onClick={() => setSelectedView('analysis')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'analysis'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              詳細分析
            </button>
            <button
              onClick={() => setSelectedView('cameras')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedView === 'cameras'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              計測地点
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      本日の総交通量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        15,872台
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+8.3%</span>
                        <span className="ml-1 text-gray-500">前日比</span>
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
                      ラッシュ時間帯の交通量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        1,350台/時
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">+12.2%</span>
                        <span className="ml-1 text-gray-500">平均比</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      大型車両比率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        8.5%
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-gray-600 font-semibold">-0.3%</span>
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
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      アクティブ異常検知
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        3件
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">+1件</span>
                        <span className="ml-1 text-gray-500">前日比</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedView === 'overview' && (
        <>
          {/* 時間帯別交通量グラフ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">時間帯別交通量</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyTrafficData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="car" stackId="1" stroke="#8884d8" fill="#8884d8" name="乗用車" />
                  <Area type="monotone" dataKey="truck" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="トラック" />
                  <Area type="monotone" dataKey="bus" stackId="1" stroke="#ffc658" fill="#ffc658" name="バス" />
                  <Area type="monotone" dataKey="motorcycle" stackId="1" stroke="#ff8042" fill="#ff8042" name="二輪車" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* 曜日別と方向別のグラフ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 曜日別交通量 */}
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">曜日別交通量</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyTrafficData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="car" stackId="a" fill="#8884d8" name="乗用車" />
                    <Bar dataKey="truck" stackId="a" fill="#82ca9d" name="トラック" />
                    <Bar dataKey="bus" stackId="a" fill="#ffc658" name="バス" />
                    <Bar dataKey="motorcycle" stackId="a" fill="#ff8042" name="二輪車" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 方向別交通量 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">方向別交通量</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={directionalTrafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {directionalTrafficData.map((entry, index) => (
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
          
          {/* 異常検知リスト */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">異常検知アラート</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                詳細レポート
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
      
      {selectedView === 'analysis' && (
        <>
          {/* 詳細分析ビュー */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 交通量トレンド */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">交通量トレンド分析</h3>
              <div className="mb-4">
                <label htmlFor="trend-type" className="block text-sm font-medium text-gray-700 mb-1">分析タイプ</label>
                <select 
                  id="trend-type" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>日次トレンド</option>
                  <option>週次トレンド</option>
                  <option>月次トレンド</option>
                  <option>時間帯比較</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500 text-sm">グラフが表示されます</p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <ul className="list-disc pl-5 space-y-1">
                  <li>先週比: <span className="font-medium text-green-600">+5.2%</span></li>
                  <li>先月比: <span className="font-medium text-green-600">+8.7%</span></li>
                  <li>昨年同月比: <span className="font-medium text-green-600">+12.3%</span></li>
                  <li>ピーク時間帯: <span className="font-medium">17:00-18:00</span></li>
                </ul>
              </div>
            </div>
            
            {/* 車種別構成比の経時変化 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">車種別構成比の経時変化</h3>
              <div className="mb-4">
                <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-700 mb-1">車種</label>
                <select 
                  id="vehicle-type" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>全車種</option>
                  <option>乗用車</option>
                  <option>トラック</option>
                  <option>バス</option>
                  <option>二輪車</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500 text-sm">グラフが表示されます</p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <ul className="list-disc pl-5 space-y-1">
                  <li>乗用車比率: <span className="font-medium">83.7%</span></li>
                  <li>トラック比率: <span className="font-medium">8.5%</span></li>
                  <li>バス比率: <span className="font-medium">2.8%</span></li>
                  <li>二輪車比率: <span className="font-medium">5.0%</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* 交差点別詳細分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">交差点別詳細分析</h3>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="intersection" className="block text-sm font-medium text-gray-700 mb-1">交差点</label>
                <select 
                  id="intersection" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>駅前交差点</option>
                  <option>市役所前</option>
                  <option>大通り1丁目</option>
                  <option>南公園入口</option>
                  <option>工業団地入口</option>
                  <option>高速道路IC付近</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="analysis-date" className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                <input 
                  type="date" 
                  id="analysis-date" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="2025-04-05"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="analysis-type" className="block text-sm font-medium text-gray-700 mb-1">分析タイプ</label>
                <select 
                  id="analysis-type" 
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>方向別分析</option>
                  <option>時間帯分析</option>
                  <option>車種別分析</option>
                  <option>トレンド分析</option>
                </select>
              </div>
              <div className="flex-0 self-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  分析実行
                </button>
              </div>
            </div>
            
            <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">分析結果がここに表示されます</p>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">ピーク時交通量</h4>
                <p className="text-2xl font-bold text-blue-900">1,248台/時</p>
                <p className="text-xs text-blue-700 mt-1">午前8:00-9:00</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-800 mb-1">主要交通方向</h4>
                <p className="text-2xl font-bold text-green-900">東→西 42%</p>
                <p className="text-xs text-green-700 mt-1">北→南 28%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-purple-800 mb-1">信号待ち平均時間</h4>
                <p className="text-2xl font-bold text-purple-900">87秒</p>
                <p className="text-xs text-purple-700 mt-1">最大待ち時間: 180秒</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {selectedView === 'cameras' && (
        <>
          {/* 計測地点一覧 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">交通量計測地点</h3>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                計測地点を追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">計測地点名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間あたり平均</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">本日の合計</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monitoringPoints.map((point) => (
                    <tr key={point.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {point.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          point.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : point.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {point.status === 'active' 
                            ? '正常' 
                            : point.status === 'warning' 
                              ? '警告' 
                              : 'エラー'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {point.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {point.hourlyAvg}台/時
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {point.dailyTotal}台
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">詳細</button>
                        <button className="text-blue-600 hover:text-blue-900 mr-2">設定</button>
                        <button className="text-blue-600 hover:text-blue-900">カメラ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 地図表示モックアップ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">計測地点マップ</h3>
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm font-medium text-gray-900">地図上に計測地点を表示します</p>
                <p className="mt-1 text-sm text-gray-500">実際の地図データはデモの表示範囲に含まれていません</p>
              </div>
            </div>
          </div>
          
          {/* 計測精度分析 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">計測精度分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">カメラ精度評価</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">93%</span>
                </div>
                <p className="mt-2 text-xs text-gray-600">一般車両の精度: 98%</p>
                <p className="text-xs text-gray-600">車種分類の精度: 87%</p>
                <p className="text-xs text-gray-600">悪天候時の精度: 82%</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">精度影響要因</h4>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    悪天候（雨・霧・雪）: 精度-15%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    夜間の低照度: 精度-10%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    高速移動車両: 精度-5%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    カメラ角度の問題: 精度-8%
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">最近の精度改善</h4>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI検出アルゴリズム更新: +3.5%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    夜間撮影用高感度カメラ導入: +5.2%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    防水カメラハウジング導入: +2.1%
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ローカルエッジAI処理導入: +4.8%
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrafficMonitoringDashboard;