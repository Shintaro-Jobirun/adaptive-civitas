// components/dashboard/DisasterPrediction.tsx
"use client"

import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Type Definitions ---
type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';
type SensorStatusType = 'normal' | 'warning' | 'critical' | 'error';
type RouteStatus = 'open' | 'restricted' | 'closed';
type TrafficLevel = 'light' | 'medium' | 'heavy' | 'none';
type AlertStatusType = 'active' | 'inactive';
type ShelterStatusType = 'open' | 'closed';
type SuppliesStatus = 'sufficient' | 'limited' | 'unknown';

interface HourlyData {
  time: string;
  rainfall: number;
  waterLevel: number;
  risk: RiskLevel;
}

interface RiskAreaData {
  area: string;
  floodRisk: number;
  landslideRisk: number;
  evacuationRate: number;
  population: number;
}

interface ShelterStatus {
  id: number;
  name: string;
  capacity: number;
  current: number;
  status: ShelterStatusType;
  supplies: SuppliesStatus;
  accessRisk: RiskLevel;
}

interface VulnerablePersonData {
  category: string;
  count: number;
  evacuated: number;
  inProgress: number;
  notYet: number;
}

interface EvacuationRouteStatus {
  id: number;
  route: string;
  status: RouteStatus;
  trafficLevel: TrafficLevel;
  riskLevel: RiskLevel;
  notes: string;
}

interface AlertStatus {
  type: string;
  status: AlertStatusType;
  issuedAt: string;
  areas: string;
  details: string;
}

interface SensorData {
  id: number;
  location: string;
  type: string;
  value: string;
  status: SensorStatusType;
  battery: number;
  lastUpdate: string;
}

interface EvacuationProgress {
  category: string;
  value: number;
}

interface HistoricalDisaster {
  year: string;
  floodArea: number;
  damageLevel: number;
  rainfall: number;
}

type HourlyChartKey = 'rainfall' | 'waterLevel';

// --- Data Definitions ---

// Hourly rainfall data (時間別降水量データ)
const hourlyRainfallData: HourlyData[] = [
  { time: '00:00', rainfall: 0.5, waterLevel: 1.2, risk: 'low' },
  { time: '01:00', rainfall: 0.8, waterLevel: 1.3, risk: 'low' },
  { time: '02:00', rainfall: 1.2, waterLevel: 1.4, risk: 'low' },
  { time: '03:00', rainfall: 2.5, waterLevel: 1.5, risk: 'low' },
  { time: '04:00', rainfall: 4.8, waterLevel: 1.7, risk: 'low' },
  { time: '05:00', rainfall: 8.2, waterLevel: 1.9, risk: 'medium' },
  { time: '06:00', rainfall: 12.5, waterLevel: 2.2, risk: 'medium' },
  { time: '07:00', rainfall: 18.7, waterLevel: 2.6, risk: 'medium' },
  { time: '08:00', rainfall: 25.3, waterLevel: 3.1, risk: 'high' },
  { time: '09:00', rainfall: 32.8, waterLevel: 3.7, risk: 'high' },
  { time: '10:00', rainfall: 38.2, waterLevel: 4.2, risk: 'high' },
  { time: '11:00', rainfall: 42.5, waterLevel: 4.8, risk: 'very-high' },
  { time: '12:00', rainfall: 45.1, waterLevel: 5.3, risk: 'very-high' },
  { time: '13:00', rainfall: 42.8, waterLevel: 5.6, risk: 'very-high' },
  { time: '14:00', rainfall: 38.5, waterLevel: 5.8, risk: 'very-high' },
  { time: '15:00', rainfall: 32.1, waterLevel: 5.9, risk: 'very-high' },
  { time: '16:00', rainfall: 25.6, waterLevel: 5.8, risk: 'very-high' },
  { time: '17:00', rainfall: 18.9, waterLevel: 5.7, risk: 'very-high' },
  { time: '18:00', rainfall: 14.2, waterLevel: 5.5, risk: 'high' },
  { time: '19:00', rainfall: 10.5, waterLevel: 5.2, risk: 'high' },
  { time: '20:00', rainfall: 7.8, waterLevel: 4.9, risk: 'high' },
  { time: '21:00', rainfall: 5.2, waterLevel: 4.6, risk: 'medium' },
  { time: '22:00', rainfall: 3.1, waterLevel: 4.3, risk: 'medium' },
  { time: '23:00', rainfall: 1.8, waterLevel: 4.0, risk: 'medium' },
];

// Disaster risk area data (災害リスク区域)
const disasterRiskAreaData: RiskAreaData[] = [
  { area: '河川沿い住宅地区', floodRisk: 85, landslideRisk: 35, evacuationRate: 68, population: 2850 },
  { area: '丘陵地住宅地区', floodRisk: 25, landslideRisk: 75, evacuationRate: 42, population: 1850 },
  { area: '中心市街地', floodRisk: 65, landslideRisk: 15, evacuationRate: 58, population: 5200 },
  { area: '工業団地', floodRisk: 70, landslideRisk: 20, evacuationRate: 90, population: 850 },
  { area: '低地住宅地区', floodRisk: 80, landslideRisk: 10, evacuationRate: 75, population: 3400 },
];

// Shelter status data (避難所状況)
const shelterStatusData: ShelterStatus[] = [
  { id: 1, name: '市民体育館', capacity: 500, current: 320, status: 'open', supplies: 'sufficient', accessRisk: 'low' },
  { id: 2, name: '第一小学校', capacity: 300, current: 280, status: 'open', supplies: 'limited', accessRisk: 'medium' },
  { id: 3, name: '市民会館', capacity: 450, current: 390, status: 'open', supplies: 'sufficient', accessRisk: 'low' },
  { id: 4, name: '第二中学校', capacity: 350, current: 150, status: 'open', supplies: 'sufficient', accessRisk: 'high' },
  { id: 5, name: 'コミュニティセンター', capacity: 200, current: 185, status: 'open', supplies: 'limited', accessRisk: 'medium' },
  { id: 6, name: '文化会館', capacity: 400, current: 0, status: 'closed', supplies: 'unknown', accessRisk: 'very-high' },
  { id: 7, name: '総合福祉センター', capacity: 250, current: 220, status: 'open', supplies: 'limited', accessRisk: 'low' },
];

// Vulnerable persons data (要支援者データ)
const vulnerablePersonsData: VulnerablePersonData[] = [
  { category: '高齢者（75歳以上）', count: 850, evacuated: 580, inProgress: 120, notYet: 150 },
  { category: '障がい者', count: 420, evacuated: 320, inProgress: 60, notYet: 40 },
  { category: '乳幼児がいる世帯', count: 380, evacuated: 290, inProgress: 50, notYet: 40 },
  { category: '妊婦', count: 65, evacuated: 55, inProgress: 7, notYet: 3 },
  { category: '在宅医療患者', count: 125, evacuated: 105, inProgress: 15, notYet: 5 },
  { category: '外国人居住者', count: 210, evacuated: 110, inProgress: 45, notYet: 55 },
];

// Evacuation route status data (避難経路ステータス)
const evacuationRouteStatusData: EvacuationRouteStatus[] = [
  { id: 1, route: '国道354号線', status: 'open', trafficLevel: 'heavy', riskLevel: 'low', notes: '渋滞あり。迂回路推奨。' },
  { id: 2, route: '県道12号線', status: 'restricted', trafficLevel: 'medium', riskLevel: 'medium', notes: '一部冠水。大型車両通行止め。' },
  { id: 3, route: '市道中央線', status: 'closed', trafficLevel: 'none', riskLevel: 'high', notes: '冠水のため通行止め。' },
  { id: 4, route: '東西連絡道路', status: 'open', trafficLevel: 'light', riskLevel: 'low', notes: '通行可能。' },
  { id: 5, route: '河川沿い道路', status: 'closed', trafficLevel: 'none', riskLevel: 'very-high', notes: '氾濫危険のため通行止め。' },
];

// Alert status data (警報・注意報発令状況)
const alertStatusData: AlertStatus[] = [
  { type: '大雨特別警報', status: 'active', issuedAt: '08:30', areas: '市全域', details: '記録的な大雨。土砂災害、浸水害に厳重警戒。' },
  { type: '洪水警報', status: 'active', issuedAt: '07:15', areas: '市全域', details: '河川の増水や氾濫に警戒。' },
  { type: '土砂災害警戒情報', status: 'active', issuedAt: '07:45', areas: '北部・東部', details: '土砂災害危険度が高まっています。' },
  { type: '避難指示', status: 'active', issuedAt: '08:00', areas: '河川沿い、低地地区', details: '直ちに避難所等へ避難してください。' },
  { type: '暴風警報', status: 'inactive', issuedAt: '06:30', areas: '市全域', details: '発達した低気圧による暴風。' },
];

// Sensor status data (センサーステータス)
const sensorStatusData: SensorData[] = [
  { id: 1, location: '中央河川橋付近', type: '水位計', value: '5.8m', status: 'critical', battery: 85, lastUpdate: '5分前' },
  { id: 2, location: '北部雨量観測所', type: '雨量計', value: '32.1mm/h', status: 'warning', battery: 92, lastUpdate: '3分前' },
  { id: 3, location: '東部丘陵地帯', type: '土砂災害センサー', value: '警戒レベル', status: 'warning', battery: 78, lastUpdate: '7分前' },
  { id: 4, location: '西部河川堤防', type: '水位計', value: '4.2m', status: 'warning', battery: 90, lastUpdate: '2分前' },
  { id: 5, location: '南部低地', type: '水位計・雨量計', value: '浸水30cm', status: 'critical', battery: 65, lastUpdate: '8分前' },
  { id: 6, location: '中央公園', type: '気象観測装置', value: '正常', status: 'normal', battery: 88, lastUpdate: '4分前' },
  { id: 7, location: '工業団地', type: '複合センサー', value: '注意レベル', status: 'warning', battery: 72, lastUpdate: '6分前' },
  { id: 8, location: '東部山間部', type: '土砂災害センサー', value: 'データなし', status: 'error', battery: 0, lastUpdate: '3時間前' },
];

// Evacuation progress data (避難進捗データ)
const evacuationProgressData: EvacuationProgress[] = [
  { category: '避難完了', value: 9850 },
  { category: '避難中', value: 2300 },
  { category: '未避難（把握済）', value: 3400 },
  { category: '未確認', value: 1850 },
];

// Colors for evacuation progress pie chart
const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#F44336']; // Green, Blue, Yellow, Red

// Historical disaster data (過去の災害データ)
const historicalDisasterData: HistoricalDisaster[] = [
  { year: '2018', floodArea: 35, damageLevel: 45, rainfall: 32 },
  { year: '2019', floodArea: 28, damageLevel: 32, rainfall: 28 },
  { year: '2020', floodArea: 42, damageLevel: 48, rainfall: 38 },
  { year: '2021', floodArea: 38, damageLevel: 40, rainfall: 35 },
  { year: '2022', floodArea: 52, damageLevel: 60, rainfall: 42 },
  { year: '2023', floodArea: 45, damageLevel: 55, rainfall: 40 },
  { year: '2024', floodArea: 38, damageLevel: 42, rainfall: 35 },
];

// Main dashboard component
const DisasterPredictionDashboard: React.FC = () => {
  // State for selected view (realtime, evacuation, prediction, sensors)
  const [selectedView, setSelectedView] = useState('realtime');
  // State for selected data type in hourly chart
  const [selectedDataType, setSelectedDataType] = useState<HourlyChartKey>('rainfall');

  // Function to get the display name for the selected data type
  const getSelectedDataTypeName = (key: HourlyChartKey): string => {
    switch (key) {
      case 'rainfall': return '降水量(mm/h)';
      case 'waterLevel': return '水位(m)';
      default: return '';
    }
  };

  // Helper function to get color based on risk level
  const getRiskColor = (level: RiskLevel | SensorStatusType | RouteStatus | TrafficLevel | AlertStatusType | ShelterStatusType | SuppliesStatus): string => {
    switch (level) {
      // Risk Levels
      case 'very-high': return 'bg-purple-100 text-purple-800';
      case 'high':
      case 'critical':
      case 'closed':
      case 'heavy':
      case 'active': // For alerts
      case 'error': // For sensors
        return 'bg-red-100 text-red-800';
      case 'medium':
      case 'warning':
      case 'restricted':
      case 'limited': // For supplies
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'normal':
      case 'open': // For routes & shelters
      case 'light':
      case 'sufficient': // For supplies
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'unknown': // For supplies
      case 'none': // For traffic
        return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get text based on status/level
  const getStatusText = (level: RiskLevel | SensorStatusType | RouteStatus | TrafficLevel | AlertStatusType | ShelterStatusType | SuppliesStatus): string => {
     switch (level) {
      // Risk Levels
      case 'very-high': return '非常に危険';
      case 'high': return '危険';
      case 'medium': return '注意';
      case 'low': return '低リスク';
      // Sensor Status
      case 'critical': return '危機的';
      case 'warning': return '警告';
      case 'normal': return '正常';
      case 'error': return 'エラー';
      // Route Status
      case 'open': return '通行可';
      case 'restricted': return '一部制限';
      case 'closed': return '通行止';
      // Traffic Level
      case 'heavy': return '混雑';
      case 'light': return '空き';
      case 'none': return '通行なし';
      // Alert Status
      case 'active': return '発令中';
      case 'inactive': return '解除';
       // Shelter Status
      case 'sufficient': return '十分';
      case 'limited': return '制限あり';
      case 'unknown': return '不明';
      default: return String(level); // Fallback
    }
  };


  return (
    <div className="space-y-6 font-sans"> {/* Added default font */}
      {/* Filters and View Selection Header */}
      <div className="bg-white p-4 rounded-lg shadow-md"> {/* Added shadow */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Data Type Selector for Hourly Chart */}
          <div className="flex items-center space-x-2">
            <label htmlFor="dataTypeSelectDisaster" className="text-sm font-medium text-gray-700">表示項目:</label>
            <select
              id="dataTypeSelectDisaster"
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5" // Adjusted padding
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value as HourlyChartKey)} // Cast value to type
            >
              <option value="rainfall">降水量(mm/h)</option>
              <option value="waterLevel">水位(m)</option>
            </select>
          </div>

          {/* View Selection Buttons */}
          <div className="flex space-x-2 flex-wrap gap-y-2"> {/* Added flex-wrap and gap */}
            {(['realtime', 'evacuation', 'prediction', 'sensors'] as const).map((view) => (
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
                 view === 'evacuation' ? '避難状況' :
                 view === 'prediction' ? '予測分析' : 'センサー'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card 1: Alert Level */}
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
                      現在の警報レベル
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        レベル5（緊急） {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">大雨特別警報発令中</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 2: Cumulative Rainfall */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の累積降水量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        284mm {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                         <span className="text-red-600 font-semibold">危険水準超過</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 3: Evacuation Rate */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      避難率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        56.8% {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">対象者12,150人中</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 4: Open Shelters */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      避難所開設数
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {shelterStatusData.filter(s => s.status === 'open').length} / {shelterStatusData.length} {/* Dynamic */}
                      </div>
                       <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">収容率: 78.3%</span> {/* Example */}
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
          {/* Hourly Rainfall/Water Level Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の降水量・水位推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyRainfallData}
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
                    stroke="#2563EB" // Blue color
                    strokeWidth={2}
                    name={getSelectedDataTypeName(selectedDataType)} // Dynamic name
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alert Status Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">警報・注意報発令状況</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発表時刻</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対象地域</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alertStatusData.map((alert, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(alert.status)}`}>
                          {getStatusText(alert.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.issuedAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.areas}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{alert.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Areas and Evacuation Routes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disaster Risk Area Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">災害リスク区域</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地区</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">洪水リスク</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">土砂災害リスク</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">避難率</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {disasterRiskAreaData.map((area, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{area.area}</td>
                        {/* Flood Risk */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                              <div className={`h-2.5 rounded-full ${
                                area.floodRisk >= 80 ? 'bg-red-600' :
                                area.floodRisk >= 60 ? 'bg-orange-500' :
                                area.floodRisk >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} style={{ width: `${area.floodRisk}%` }}></div>
                            </div>
                            <span className="font-medium">{area.floodRisk}%</span>
                          </div>
                        </td>
                        {/* Landslide Risk */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                              <div className={`h-2.5 rounded-full ${
                                area.landslideRisk >= 80 ? 'bg-red-600' :
                                area.landslideRisk >= 60 ? 'bg-orange-500' :
                                area.landslideRisk >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} style={{ width: `${area.landslideRisk}%` }}></div>
                            </div>
                            <span className="font-medium">{area.landslideRisk}%</span>
                          </div>
                        </td>
                        {/* Evacuation Rate */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                             <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                               <div className={`h-2.5 rounded-full ${
                                area.evacuationRate >= 80 ? 'bg-green-500' :
                                area.evacuationRate >= 60 ? 'bg-blue-500' :
                                area.evacuationRate >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} style={{ width: `${area.evacuationRate}%` }}></div>
                            </div>
                            <span className="font-medium">{area.evacuationRate}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Evacuation Route Status Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">避難経路ステータス</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">経路</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交通量</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">リスク</th>
                      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">備考</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {evacuationRouteStatusData.map((route) => (
                      <tr key={route.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.route}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(route.status)}`}>
                            {getStatusText(route.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(route.trafficLevel)}`}>
                            {getStatusText(route.trafficLevel)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(route.riskLevel)}`}>
                            {getStatusText(route.riskLevel)}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 text-sm text-gray-500">{route.notes}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Disaster Map Placeholder */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">リアルタイム災害マップ</h3>
              <div className="flex space-x-2">
                <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5">
                  <option>洪水リスク</option>
                  <option>土砂災害リスク</option>
                  <option>避難経路</option>
                  <option>避難所</option>
                </select>
              </div>
            </div>
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm font-medium">リアルタイム災害マップを表示します</p>
                <p className="mt-1 text-xs">（実際の地図データはデモでは表示されません）</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Evacuation View */}
      {selectedView === 'evacuation' && (
        <>
          {/* Shelter Status Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">避難所状況</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">避難所名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">収容状況</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物資</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクセスリスク</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shelterStatusData.map((shelter) => (
                    <tr key={shelter.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shelter.name}</td>
                      {/* Capacity */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              (shelter.current / shelter.capacity) > 0.9 ? 'bg-red-600' :
                              (shelter.current / shelter.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} style={{ width: `${Math.min((shelter.current / shelter.capacity) * 100, 100)}%` }}></div>
                          </div>
                          <span className="font-medium">{shelter.current} / {shelter.capacity}</span>
                        </div>
                      </td>
                      {/* Supplies */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(shelter.supplies)}`}>
                           {getStatusText(shelter.supplies)}
                        </span>
                      </td>
                      {/* Access Risk */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(shelter.accessRisk)}`}>
                          {getStatusText(shelter.accessRisk)}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(shelter.status)}`}>
                          {shelter.status === 'open' ? '開設中' : '閉鎖'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-blue-600 hover:text-blue-900">詳細</button>
                        <button type="button" className="text-blue-600 hover:text-blue-900">更新</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evacuation Progress and Vulnerable Persons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evacuation Progress Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">避難進捗状況</h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={evacuationProgressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {evacuationProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()}人`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 text-center">
                  対象地域の総人口: {evacuationProgressData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}人
                </p>
              </div>
            </div>

            {/* Vulnerable Persons Evacuation Status Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">要支援者避難状況</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対象</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">避難済</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">避難中</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">未避難</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vulnerablePersonsData.map((group, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{group.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{group.count}</td>
                        {/* Evacuated */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-1 overflow-hidden">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(group.evacuated / group.count) * 100}%` }}></div>
                            </div>
                            <span>{group.evacuated}</span>
                          </div>
                        </td>
                         {/* In Progress */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-1 overflow-hidden">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(group.inProgress / group.count) * 100}%` }}></div>
                            </div>
                            <span>{group.inProgress}</span>
                          </div>
                        </td>
                         {/* Not Yet */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-12 bg-gray-200 rounded-full h-2 mr-1 overflow-hidden">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(group.notYet / group.count) * 100}%` }}></div>
                            </div>
                            <span className="text-red-600 font-medium">{group.notYet}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Evacuation Priority Areas */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">避難誘導優先エリア</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                現在のリスク評価と避難状況に基づいた、避難誘導・支援の優先順位を示しています。災害対応チームは以下のエリアを優先して対応してください。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Priority 1 */}
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 className="text-sm font-medium text-red-800 flex items-center">
                  <svg className="h-5 w-5 mr-1.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  最優先: 河川沿い住宅地区
                </h4>
                <div className="mt-2 text-xs text-red-700 space-y-1">
                  <p>・水位上昇による氾濫リスクが極めて高い</p>
                  <p>・要支援者150名がまだ避難していない</p>
                  <p>・避難経路「河川沿い道路」が通行止め</p>
                  <p><span className="font-medium">対応:</span> 消防・警察によるドア to ドア避難支援</p>
                </div>
              </div>
              {/* Priority 2 */}
              <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                <h4 className="text-sm font-medium text-orange-800 flex items-center">
                  <svg className="h-5 w-5 mr-1.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  第二優先: 丘陵地住宅地区
                </h4>
                <div className="mt-2 text-xs text-orange-700 space-y-1">
                  <p>・土砂災害警戒情報が発表中</p>
                  <p>・避難率が42%と低調</p>
                  <p>・道路状況は現在安定しているが悪化の懸念</p>
                  <p><span className="font-medium">対応:</span> 追加の避難広報と誘導員の配置</p>
                </div>
              </div>
              {/* Priority 3 */}
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 flex items-center">
                   <svg className="h-5 w-5 mr-1.5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  第三優先: 低地住宅地区
                </h4>
                 <div className="mt-2 text-xs text-yellow-700 space-y-1">
                  <p>・浸水リスクは高いが避難率は比較的良好（75%）</p>
                  <p>・残りの要支援者は25名</p>
                  <p>・避難経路は複数確保できている</p>
                  <p><span className="font-medium">対応:</span> 地域防災リーダーと連携した広報活動</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Prediction View */}
      {selectedView === 'prediction' && (
        <>
          {/* Rainfall and Water Level Prediction Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">降水予測と水位予測</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                今後12時間の降水量と河川水位の予測を表示しています。AIモデルにより、過去のデータパターン、現在の気象状況、上流の降水量などを考慮した予測です。
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  // Using last 12 hours of current data as placeholder for prediction
                  data={hourlyRainfallData.slice(-12).map((d, i) => ({...d, time: `${i+1}時間後`}))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWaterLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12}/>
                  <YAxis fontSize={12}/>
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="rainfall" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRainfall)" name="予測降水量(mm/h)" />
                  <Area type="monotone" dataKey="waterLevel" stroke="#10B981" fillOpacity={1} fill="url(#colorWaterLevel)" name="予測水位(m)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Prediction Summary Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">ピーク降水量</h4>
                <p className="text-2xl font-bold text-blue-900">45.1mm/h</p>
                <p className="text-xs text-blue-700 mt-1">予測時刻: 12:00</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">累積降水量</h4>
                <p className="text-2xl font-bold text-blue-900">452mm</p>
                <p className="text-xs text-blue-700 mt-1">24時間予測合計</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">最高水位</h4>
                <p className="text-2xl font-bold text-green-900">5.9m</p>
                <p className="text-xs text-green-700 mt-1">警戒水位: 4.5m</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-1">氾濫確率</h4>
                <p className="text-2xl font-bold text-red-900">72%</p>
                <p className="text-xs text-red-700 mt-1">危険水準（60%超過）</p>
              </div>
            </div>
          </div>

          {/* Historical Comparison and Landslide Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Historical Disaster Comparison Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">過去災害との比較</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={historicalDisasterData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" fontSize={12}/>
                    <YAxis fontSize={12}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="floodArea" fill="#3B82F6" name="浸水面積(km²)" />
                    <Bar dataKey="damageLevel" fill="#EF4444" name="被害規模(指数)" />
                    <Bar dataKey="rainfall" fill="#10B981" name="総降水量(×10mm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">分析: </span>
                  現在の予測降水量(452mm)は過去7年で最大の2022年(420mm)を上回っており、2022年と同等以上の被害が想定されます。浸水面積は約50km²、被害規模は60（指数）に達する可能性があります。
                </p>
              </div>
            </div>

            {/* Landslide Risk Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">土砂災害リスク分析</h3>
              <div className="space-y-4">
                {/* Area 1 */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">東部丘陵地帯</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">土壌水分量</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-red-600 h-2.5 rounded-full" style={{ width: '92%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">累積雨量影響</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-red-600 h-2.5 rounded-full" style={{ width: '88%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">88%</span>
                    </div>
                     <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">傾斜危険度</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">85%</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2 mt-2 border-gray-200">
                      <span className="text-sm font-medium text-gray-600 w-20">総合リスク</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-red-600 h-2.5 rounded-full" style={{ width: '89%' }}></div></div>
                      <span className="text-sm font-bold text-red-700 w-8 text-right">89%</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-red-700">土砂災害の危険性が非常に高い状態です。速やかな避難が必要です。</p>
                </div>
                {/* Area 2 */}
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">北部山麓地帯</h4>
                   <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">土壌水分量</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '78%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">累積雨量影響</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">75%</span>
                    </div>
                     <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-20">傾斜危険度</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">65%</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2 mt-2 border-gray-200">
                      <span className="text-sm font-medium text-gray-600 w-20">総合リスク</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '72%' }}></div></div>
                      <span className="text-sm font-bold text-yellow-700 w-8 text-right">72%</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-yellow-700">注意レベルにあります。状況は継続的に監視が必要です。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Results */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">浸水シミュレーション結果</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                現在の降水予測に基づく浸水範囲のシミュレーション結果です。地形データと河川モデルを組み合わせた水理解析により、以下のエリアで浸水が予測されています。
              </p>
            </div>
            {/* Map Placeholder */}
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="mt-2 text-sm font-medium">浸水シミュレーションマップ</p>
                <p className="mt-1 text-xs">（実際のシミュレーション結果はデモでは表示されません）</p>
              </div>
            </div>
            {/* Simulation Summary Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-1">予測浸水面積</h4>
                <p className="text-2xl font-bold text-red-900">48.5 km²</p>
                <p className="text-xs text-red-700 mt-1">市域の約24%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                <h4 className="text-sm font-medium text-orange-800 mb-1">最大浸水深</h4>
                <p className="text-2xl font-bold text-orange-900">3.2 m</p>
                <p className="text-xs text-orange-700 mt-1">低地住宅地区で予測</p>
              </div>
              {/* Completed Card 3 */}
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">影響人口</h4>
                <p className="text-2xl font-bold text-blue-900">約8,500人</p>
                <p className="text-xs text-blue-700 mt-1">避難対象人口の70%</p>
              </div>
              {/* Added Card 4 */}
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">経済的被害予測</h4>
                <p className="text-2xl font-bold text-yellow-900">約12億円</p>
                <p className="text-xs text-yellow-700 mt-1">住宅・インフラ・事業損失含む</p>
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
              <h3 className="text-lg font-medium text-gray-900">災害関連センサーステータス</h3>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在の値</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">バッテリー</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sensorStatusData.map((sensor) => (
                    <tr key={sensor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sensor.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(sensor.status)}`}>
                          {getStatusText(sensor.status)}
                        </span>
                      </td>
                      {/* Battery */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              sensor.battery > 70 ? 'bg-green-500' :
                              sensor.battery > 30 ? 'bg-yellow-400' : 'bg-red-500'
                            }`} style={{ width: `${sensor.battery}%` }}></div>
                          </div>
                          <span className="font-medium">{sensor.battery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.lastUpdate}</td>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">センサー配置マップ</h3>
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
                 <div>
                  <label htmlFor="sensor-select-disaster" className="block text-sm font-medium text-gray-700 mb-1">センサー選択</label>
                  <select
                    id="sensor-select-disaster"
                    name="sensor-select-disaster"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
                  >
                    {sensorStatusData.map(s => <option key={s.id} value={s.id}>{s.location} ({s.type})</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="sensor-threshold" className="block text-sm font-medium text-gray-700 mb-1">アラート閾値</label>
                  <input
                    type="text"
                    id="sensor-threshold"
                    name="sensor-threshold"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5 px-2"
                    placeholder="例: 水位 5.0m, 雨量 30mm/h"
                  />
                </div>
                 <div>
                  <label htmlFor="sensor-interval" className="block text-sm font-medium text-gray-700 mb-1">データ送信間隔</label>
                  <select
                    id="sensor-interval"
                    name="sensor-interval"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5"
                  >
                    <option>1分</option>
                    <option>5分</option>
                    <option>10分</option>
                    <option>30分</option>
                    <option>1時間</option>
                  </select>
                </div>
                 <div className="flex items-center">
                   <input id="sensor-active" name="sensor-active" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                   <label htmlFor="sensor-active" className="ml-2 block text-sm text-gray-700">センサーを有効にする</label>
                 </div>
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
        </>
      )}
    </div>
  );
};

export default DisasterPredictionDashboard;
