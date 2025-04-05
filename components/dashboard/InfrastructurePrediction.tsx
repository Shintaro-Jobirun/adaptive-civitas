// components/dashboard/InfrastructurePrediction.tsx
"use client"

import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

// --- Type Definitions ---
type HealthLevel = 'good' | 'fair' | 'poor' | 'critical';
type RiskLevel = 'very-high' | 'high' | 'medium' | 'low' | 'very-low' ; // Added 'very-high' and '最低' based on data
type InfraTypeKey = 'overall' | 'bridge' | 'road' | 'tunnel' | 'wall' | 'other';
type AnomalyStatus = 'high' | 'medium' | 'low'; // Based on data
type SensorStatus = 'active' | 'warning' | 'error';

interface HealthIndex {
  year: string;
  bridge: number;
  road: number;
  tunnel: number;
  overall: number;
  forecast?: boolean;
}

interface DeteriorationFactor {
  name: string;
  value: number;
}

interface InfraHealth {
  name: string;
  good: number;
  fair: number;
  poor: number;
  critical: number;
}

interface RepairPriority {
  id: number;
  location: string;
  type: string;
  healthIndex: number;
  riskLevel: RiskLevel;
  estimatedCost: string;
  recommendedDate: string;
}

interface AnomalyAlert {
  id: number;
  date: string;
  location: string;
  type: string;
  status: AnomalyStatus;
  detail: string;
}

interface InspectionHistoryEntry {
  id: number;
  date: string;
  location: string;
  type: string;
  findings: string;
  assessedBy: string;
}

interface BridgeDetail {
  year: string;
  structuralIntegrity: number;
  corrosion: number;
  deckCondition: number;
  bearingCondition: number;
  forecast?: boolean;
}

interface OptimizationScenario {
  id: number;
  name: string;
  shortTermCost: string;
  longTermCost: string;
  lifespan: string;
  serviceDisruption: string;
  riskLevel: RiskLevel;
}

interface BudgetAllocation {
  category: string;
  current: number;
  optimal: number;
}

interface SensorInfo {
  id: number;
  location: string;
  type: string;
  status: SensorStatus;
  batteryLevel: number;
  lastUpdate: string;
}

// --- Data Definitions ---

// Health index data (健全度評価データ)
const healthIndexData: HealthIndex[] = [
  { year: '2018', bridge: 85, road: 82, tunnel: 88, overall: 84 },
  { year: '2019', bridge: 83, road: 80, tunnel: 87, overall: 82 },
  { year: '2020', bridge: 81, road: 78, tunnel: 85, overall: 80 },
  { year: '2021', bridge: 79, road: 75, tunnel: 84, overall: 78 },
  { year: '2022', bridge: 77, road: 73, tunnel: 82, overall: 76 },
  { year: '2023', bridge: 75, road: 70, tunnel: 81, overall: 74 },
  { year: '2024', bridge: 73, road: 68, tunnel: 79, overall: 72 },
  { year: '2025', bridge: 71, road: 66, tunnel: 78, overall: 70, forecast: true },
  { year: '2026', bridge: 69, road: 64, tunnel: 76, overall: 68, forecast: true },
  { year: '2027', bridge: 67, road: 61, tunnel: 75, overall: 66, forecast: true },
  { year: '2028', bridge: 65, road: 58, tunnel: 73, overall: 64, forecast: true },
  { year: '2029', bridge: 63, road: 55, tunnel: 72, overall: 62, forecast: true },
];

// Deterioration factors data (劣化要因データ)
const deteriorationFactors: DeteriorationFactor[] = [
  { name: '経年劣化', value: 35 },
  { name: '過積載', value: 25 },
  { name: '気象条件', value: 15 },
  { name: '材料品質', value: 10 },
  { name: '維持管理不足', value: 15 },
];

// Infrastructure health by type data (インフラ種類別健全度データ)
const infraHealthByType: InfraHealth[] = [
  { name: '橋梁', good: 40, fair: 35, poor: 20, critical: 5 },
  { name: '道路舗装', good: 30, fair: 40, poor: 25, critical: 5 },
  { name: 'トンネル', good: 50, fair: 30, poor: 15, critical: 5 },
  { name: '擁壁', good: 45, fair: 30, poor: 20, critical: 5 },
  { name: '標識・照明', good: 35, fair: 40, poor: 20, critical: 5 },
];

// Repair priority data (優先補修箇所データ)
const repairPriorityData: RepairPriority[] = [
  { id: 1, location: '中央大橋', type: '橋梁', healthIndex: 45, riskLevel: 'high', estimatedCost: '7,500万円', recommendedDate: '3ヶ月以内' },
  { id: 2, location: '国道21号（25-26km区間）', type: '道路舗装', healthIndex: 52, riskLevel: 'high', estimatedCost: '3,200万円', recommendedDate: '6ヶ月以内' },
  { id: 3, location: '第二トンネル', type: 'トンネル', healthIndex: 58, riskLevel: 'medium', estimatedCost: '5,100万円', recommendedDate: '1年以内' },
  { id: 4, location: '河川側擁壁（A区画）', type: '擁壁', healthIndex: 60, riskLevel: 'medium', estimatedCost: '2,800万円', recommendedDate: '1年以内' },
  { id: 5, location: '山手大橋', type: '橋梁', healthIndex: 63, riskLevel: 'medium', estimatedCost: '6,200万円', recommendedDate: '2年以内' },
  { id: 6, location: '東部高架橋', type: '橋梁', healthIndex: 65, riskLevel: 'medium', estimatedCost: '5,800万円', recommendedDate: '2年以内' },
];

// Anomaly alerts data (異常検知データ)
const anomalyAlerts: AnomalyAlert[] = [
  { id: 1, date: '2024-03-15', location: '中央大橋', type: '過大なたわみ', status: 'high', detail: '南側支承部に通常値の2.5倍のたわみを検出。緊急点検を推奨。'},
  { id: 2, date: '2024-04-01', location: '第二トンネル', type: '漏水増加', status: 'medium', detail: 'トンネル天井部からの漏水量が1週間で30%増加。継続監視中。'},
  { id: 3, date: '2024-04-02', location: '河川側擁壁（A区画）', type: '傾斜角変化', status: 'high', detail: '豪雨後に傾斜角が0.8度増加。基礎部の洗掘の可能性あり。'},
  { id: 4, date: '2024-03-28', location: '国道21号（25-26km区間）', type: 'ひび割れ拡大', status: 'medium', detail: '横断ひび割れの幅が3mmから5mmに拡大。'}
];

// Inspection history data (点検履歴データ)
const inspectionHistory: InspectionHistoryEntry[] = [
  { id: 1, date: '2024-02-10', location: '中央大橋', type: '定期点検', findings: '支承部の腐食、床版の軽微なひび割れ', assessedBy: '山田工業' },
  { id: 2, date: '2024-01-15', location: '国道21号', type: '路面性状調査', findings: '轍掘れ、横断ひび割れの進行', assessedBy: '道路技研' },
  { id: 3, date: '2023-12-05', location: '第二トンネル', type: '詳細点検', findings: '覆工コンクリートの中性化進行、漏水箇所の増加', assessedBy: '建設コンサル' },
  { id: 4, date: '2023-11-20', location: '東部高架橋', type: '定期点検', findings: '特筆すべき新規損傷なし', assessedBy: '山田工業' },
  { id: 5, date: '2023-10-08', location: '山手大橋', type: '詳細点検', findings: '塗装劣化、軽微な腐食', assessedBy: '橋梁技研' },
];

// Detailed bridge deterioration data (橋梁劣化予測の詳細データ)
const bridgeDetailedData: BridgeDetail[] = [
  { year: '2018', structuralIntegrity: 88, corrosion: 85, deckCondition: 80, bearingCondition: 90 },
  { year: '2019', structuralIntegrity: 87, corrosion: 82, deckCondition: 78, bearingCondition: 88 },
  { year: '2020', structuralIntegrity: 86, corrosion: 80, deckCondition: 76, bearingCondition: 85 },
  { year: '2021', structuralIntegrity: 84, corrosion: 78, deckCondition: 73, bearingCondition: 84 },
  { year: '2022', structuralIntegrity: 82, corrosion: 75, deckCondition: 71, bearingCondition: 82 },
  { year: '2023', structuralIntegrity: 80, corrosion: 73, deckCondition: 69, bearingCondition: 80 },
  { year: '2024', structuralIntegrity: 79, corrosion: 70, deckCondition: 67, bearingCondition: 78 },
  { year: '2025', structuralIntegrity: 77, corrosion: 68, deckCondition: 65, bearingCondition: 76, forecast: true },
  { year: '2026', structuralIntegrity: 76, corrosion: 65, deckCondition: 62, bearingCondition: 74, forecast: true },
  { year: '2027', structuralIntegrity: 74, corrosion: 63, deckCondition: 60, bearingCondition: 72, forecast: true },
  { year: '2028', structuralIntegrity: 73, corrosion: 60, deckCondition: 58, bearingCondition: 70, forecast: true },
  { year: '2029', structuralIntegrity: 71, corrosion: 58, deckCondition: 55, bearingCondition: 68, forecast: true },
];

// Investment optimization scenarios data (投資最適化データ)
const optimizationScenarios: OptimizationScenario[] = [
  { id: 1, name: '事後保全シナリオ', shortTermCost: '低', longTermCost: '高', lifespan: '標準の70%', serviceDisruption: '大', riskLevel: 'high' },
  { id: 2, name: '時間計画保全シナリオ', shortTermCost: '中', longTermCost: '中', lifespan: '標準の90%', serviceDisruption: '中', riskLevel: 'medium' },
  { id: 3, name: '状態監視保全シナリオ', shortTermCost: '高', longTermCost: '低', lifespan: '標準の110%', serviceDisruption: '小', riskLevel: 'low' },
  { id: 4, name: '予測保全シナリオ', shortTermCost: '高', longTermCost: '最低', lifespan: '標準の120%', serviceDisruption: '最小', riskLevel: 'very-low' },
];

// Budget allocation optimization data (予算配分最適化データ)
const budgetAllocationData: BudgetAllocation[] = [
  { category: '予防保全', current: 30, optimal: 45 },
  { category: '事後保全', current: 50, optimal: 35 },
  { category: '更新・改良', current: 15, optimal: 15 },
  { category: '調査・点検', current: 5, optimal: 5 },
];

// Sensor data (センサーデータ)
const sensorData: SensorInfo[] = [
  { id: 1, location: '中央大橋', type: '加速度・傾斜', status: 'active', batteryLevel: 85, lastUpdate: '15分前' },
  { id: 2, location: '中央大橋', type: '変位・ひずみ', status: 'active', batteryLevel: 90, lastUpdate: '10分前' },
  { id: 3, location: '第二トンネル', type: '漏水・湿度', status: 'warning', batteryLevel: 35, lastUpdate: '2時間前' },
  { id: 4, location: '東部高架橋', type: '加速度・傾斜', status: 'active', batteryLevel: 75, lastUpdate: '30分前' },
  { id: 5, location: '国道21号(25km)', type: '路面性状', status: 'error', batteryLevel: 0, lastUpdate: '3日前' },
  { id: 6, location: '河川側擁壁', type: '傾斜・変位', status: 'active', batteryLevel: 65, lastUpdate: '45分前' },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main dashboard component
const InfrastructurePredictionDashboard: React.FC = () => {
  // State for selected view
  const [selectedView, setSelectedView] = useState('overview');
  // State for selected infrastructure type
  const [selectedInfraType, setSelectedInfraType] = useState<InfraTypeKey>('overall');

  // Function to get the display name for the selected infra type
  const getSelectedInfraTypeName = (key: InfraTypeKey): string => {
    switch (key) {
      case 'overall': return '全体健全度';
      case 'bridge': return '橋梁健全度';
      case 'road': return '道路舗装健全度';
      case 'tunnel': return 'トンネル健全度';
      case 'wall': return '擁壁健全度';
      case 'other': return 'その他施設健全度';
      default: return '健全度';
    }
  };

  // Helper function to get color based on status/level
  const getStatusColor = (status: RiskLevel | AnomalyStatus | SensorStatus): string => {
     switch (status) {
      case 'very-high': return 'bg-purple-100 text-purple-800';
      case 'high':
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'medium':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'active': // For sensors
        return 'bg-green-100 text-green-800';
      case 'very-low': // Special case from optimizationScenarios
        return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

   // Helper function to get text based on status/level
   const getStatusText = (status: RiskLevel | AnomalyStatus | SensorStatus): string => {
     switch (status) {
      case 'very-high': return '非常に危険';
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      case 'error': return 'エラー';
      case 'warning': return '警告';
      case 'active': return '正常';
      case 'very-low': return '最低';
      default: return String(status);
    }
  };


  return (
    <div className="space-y-6 font-sans"> {/* Added default font */}
      {/* Filters and View Selection Header */}
      <div className="bg-white p-4 rounded-lg shadow-md"> {/* Added shadow */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Infrastructure Type Selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="infraTypeSelect" className="text-sm font-medium text-gray-700">インフラ種別:</label>
            <select
              id="infraTypeSelect"
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-1.5" // Adjusted padding
              value={selectedInfraType}
              onChange={(e) => setSelectedInfraType(e.target.value as InfraTypeKey)} // Cast value to type
            >
              <option value="overall">全体</option>
              <option value="bridge">橋梁</option>
              <option value="road">道路舗装</option>
              <option value="tunnel">トンネル</option>
              <option value="wall">擁壁</option>
              <option value="other">その他施設</option>
            </select>
          </div>

          {/* View Selection Buttons */}
          <div className="flex space-x-2 flex-wrap gap-y-2"> {/* Added flex-wrap and gap */}
            {(['overview', 'prediction', 'optimization', 'inspection'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${ // Added font-medium and transition
                  selectedView === view
                    ? 'bg-green-600 text-white shadow-sm' // Active state
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state
                }`}
              >
                {view === 'overview' ? '概要' :
                 view === 'prediction' ? '劣化予測' :
                 view === 'optimization' ? '保全最適化' : '点検管理'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card 1: Overall Health */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      全体健全度
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {healthIndexData.find(d => d.year === '2024')?.overall ?? 'N/A'}/100
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">要注意</span>
                        <span className="ml-1 text-gray-500">(-2.7%/年)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 2: Facilities Needing Attention */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      注意必要施設
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {repairPriorityData.length}件 {/* Dynamic count */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">緊急対応</span>
                        <span className="ml-1 text-gray-500">{repairPriorityData.filter(r => r.riskLevel === 'high').length}件</span> {/* Dynamic count */}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 3: Repair Budget */}
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
                      今年度修繕予算
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        2.8億円 {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">予算執行率</span>
                        <span className="ml-1 text-gray-500">75%</span> {/* Example */}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 4: Alerts */}
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
                      アラート状況
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {anomalyAlerts.length}件 {/* Dynamic */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">高優先度</span>
                        <span className="ml-1 text-gray-500">{anomalyAlerts.filter(a => a.status === 'high').length}件</span> {/* Dynamic */}
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

      {/* Overview View */}
      {selectedView === 'overview' && (
        <>
          {/* Health Index Trend Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">インフラ健全度の推移と予測</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthIndexData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12}/>
                  <YAxis domain={[40, 100]} fontSize={12}/>
                  <Tooltip />
                  <Legend />
                  {/* Main line for selected type */}
                  <Line
                    type="monotone"
                    dataKey={selectedInfraType === 'wall' ? 'tunnel' : selectedInfraType === 'other' ? 'road' : selectedInfraType} // Map wall/other to existing keys for demo
                    stroke="#10B981"
                    strokeWidth={2}
                    name={getSelectedInfraTypeName(selectedInfraType)}
                    connectNulls // Connect points even if some data is missing
                    dot={false}
                  />
                  {/* Dashed line for forecast */}
                  <Line
                    type="monotone"
                    dataKey={selectedInfraType === 'wall' ? 'tunnel' : selectedInfraType === 'other' ? 'road' : selectedInfraType} // Map wall/other to existing keys for demo
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="予測値"
                    connectNulls
                    dot={false}
                    data={healthIndexData.filter(item => item.forecast)} // Only plot forecast data
                  />
                  {/* Lines for other types when 'overall' is selected */}
                  {selectedInfraType === 'overall' && (
                    <>
                      <Line type="monotone" dataKey="bridge" stroke="#3B82F6" name="橋梁" dot={false}/>
                      <Line type="monotone" dataKey="road" stroke="#F59E0B" name="道路舗装" dot={false}/>
                      <Line type="monotone" dataKey="tunnel" stroke="#8B5CF6" name="トンネル" dot={false}/>
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Distribution and Deterioration Factors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health Distribution Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">インフラ種別ごとの健全度分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={infraHealthByType}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} unit="%" fontSize={12}/>
                    <YAxis dataKey="name" type="category" width={80} fontSize={12}/>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="good" stackId="a" fill="#10B981" name="良好" />
                    <Bar dataKey="fair" stackId="a" fill="#F59E0B" name="やや劣化" />
                    <Bar dataKey="poor" stackId="a" fill="#EF4444" name="劣化進行" />
                    <Bar dataKey="critical" stackId="a" fill="#7F1D1D" name="危険状態" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Deterioration Factors Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">劣化要因分析</h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deteriorationFactors}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {deteriorationFactors.map((entry, index) => (
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

          {/* Repair Priority Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">優先補修箇所</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                詳細レポート
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">健全度</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">リスクレベル</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">推定費用</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">推奨時期</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {repairPriorityData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                      {/* Health Index */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              item.healthIndex > 70 ? 'bg-green-500' :
                              item.healthIndex > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${item.healthIndex}%` }}></div>
                          </div>
                          <span className="font-medium">{item.healthIndex}/100</span>
                        </div>
                      </td>
                      {/* Risk Level */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.riskLevel)}`}>
                          {getStatusText(item.riskLevel)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.estimatedCost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.recommendedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anomaly Alerts Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">異常検知アラート</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                アラート設定
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">異常タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">重要度</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {getStatusText(alert.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{alert.detail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-green-600 hover:text-green-900">対応</button>
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Prediction View */}
      {selectedView === 'prediction' && (
        <>
          {/* Detailed Deterioration Prediction Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">詳細劣化予測分析（橋梁）</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bridgeDetailedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12}/>
                  <YAxis domain={[40, 100]} fontSize={12}/>
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: "12px"}}/>
                  {/* Lines for actual data */}
                  <Line type="monotone" dataKey="structuralIntegrity" stroke="#10B981" name="構造健全性" dot={false}/>
                  <Line type="monotone" dataKey="corrosion" stroke="#3B82F6" name="防食性能" dot={false}/>
                  <Line type="monotone" dataKey="deckCondition" stroke="#F59E0B" name="床版状態" dot={false}/>
                  <Line type="monotone" dataKey="bearingCondition" stroke="#8B5CF6" name="支承部状態" dot={false}/>
                  {/* Dashed lines for forecast data */}
                  <Line type="monotone" dataKey="structuralIntegrity" stroke="#10B981" strokeDasharray="5 5" name="構造健全性(予測)" data={bridgeDetailedData.filter(d => d.forecast)} connectNulls dot={false}/>
                  <Line type="monotone" dataKey="corrosion" stroke="#3B82F6" strokeDasharray="5 5" name="防食性能(予測)" data={bridgeDetailedData.filter(d => d.forecast)} connectNulls dot={false}/>
                  <Line type="monotone" dataKey="deckCondition" stroke="#F59E0B" strokeDasharray="5 5" name="床版状態(予測)" data={bridgeDetailedData.filter(d => d.forecast)} connectNulls dot={false}/>
                  <Line type="monotone" dataKey="bearingCondition" stroke="#8B5CF6" strokeDasharray="5 5" name="支承部状態(予測)" data={bridgeDetailedData.filter(d => d.forecast)} connectNulls dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
             {/* Summary Cards for Bridge Prediction */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">構造健全性</h4>
                <p className="text-2xl font-bold text-green-900">79/100</p>
                <p className="text-xs text-green-700 mt-1">年間劣化率: -1.8%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">防食性能</h4>
                <p className="text-2xl font-bold text-blue-900">70/100</p>
                <p className="text-xs text-blue-700 mt-1">年間劣化率: -3.2%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">床版状態</h4>
                <p className="text-2xl font-bold text-yellow-900">67/100</p>
                <p className="text-xs text-yellow-700 mt-1">年間劣化率: -2.9%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 mb-1">支承部状態</h4>
                <p className="text-2xl font-bold text-purple-900">78/100</p>
                <p className="text-xs text-purple-700 mt-1">年間劣化率: -2.1%</p>
              </div>
            </div>
          </div>

          {/* Remaining Lifespan and Influencing Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Remaining Lifespan Prediction */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">残存寿命予測</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">健全性限界到達予測</h4>
                <div className="flex items-center justify-end space-x-2 mb-2">
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">現在の対策</span>
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">推奨対策</span>
                </div>
                <div className="space-y-4">
                  {/* Example: Central Bridge */}
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">中央大橋</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-800 mr-2">8年</span>
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        <span className="text-sm font-medium text-green-800 ml-2">15年</span>
                      </div>
                    </div>
                    <div className="mt-2 relative pt-1">
                      <div className="flex mb-1 items-center justify-between text-xs"><span className="font-semibold text-blue-600">現在寿命: 42年/50年</span></div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200"><div style={{ width: "84%" }} className="bg-blue-500"></div></div>
                    </div>
                  </div>
                  {/* Example: Road Pavement */}
                   <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">国道21号舗装</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-800 mr-2">3年</span>
                         <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        <span className="text-sm font-medium text-green-800 ml-2">7年</span>
                      </div>
                    </div>
                     <div className="mt-2 relative pt-1">
                      <div className="flex mb-1 items-center justify-between text-xs"><span className="font-semibold text-yellow-600">現在寿命: 9年/12年</span></div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200"><div style={{ width: "75%" }} className="bg-yellow-500"></div></div>
                    </div>
                  </div>
                   {/* Example: Tunnel */}
                   <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">第二トンネル</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-blue-800 mr-2">12年</span>
                         <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        <span className="text-sm font-medium text-green-800 ml-2">20年</span>
                      </div>
                    </div>
                     <div className="mt-2 relative pt-1">
                      <div className="flex mb-1 items-center justify-between text-xs"><span className="font-semibold text-green-600">現在寿命: 38年/50年</span></div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200"><div style={{ width: "76%" }} className="bg-green-500"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Influencing Factors Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">劣化への影響要因分析</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">中央大橋の劣化要因重要度</h4>
                <div className="space-y-3">
                  {/* Factor 1 */}
                  <div>
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-600">交通量（過積載）</span><span className="font-medium text-gray-900">35%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div></div>
                  </div>
                  {/* Factor 2 */}
                  <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">塩害（凍結防止剤）</span><span className="font-medium text-gray-900">25%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                  </div>
                  {/* Factor 3 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">経年変化</span><span className="font-medium text-gray-900">20%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div></div>
                  </div>
                   {/* Factor 4 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">気象条件（凍結融解）</span><span className="font-medium text-gray-900">15%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '15%' }}></div></div>
                  </div>
                   {/* Factor 5 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">施工品質</span><span className="font-medium text-gray-900">5%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '5%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">推奨対策</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><div><span className="font-medium">交通管理強化:</span><p className="text-xs"> 重量制限の厳格化と過積載車両の取締り強化。</p></div></li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><div><span className="font-medium">塗装更新・防水対策:</span><p className="text-xs"> 耐塩害性高性能塗装の適用と支承部の防水対策。</p></div></li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><div><span className="font-medium">床版補強工事:</span><p className="text-xs"> 炭素繊維シートによる床版補強と防水層の更新。</p></div></li>
                </ul>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">シミュレーション結果</h4>
                <p className="text-sm text-blue-700">推奨対策パッケージ実施による効果:</p>
                <ul className="mt-1 text-sm text-blue-600 space-y-1 list-disc list-inside">
                  <li>残存寿命: 8年→15年（+87.5%）</li>
                  <li>ライフサイクルコスト: 25%削減</li>
                  <li>健全度回復: 73→82（+9ポイント）</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Optimization View */}
      {selectedView === 'optimization' && (
        <>
          {/* Maintenance Scenario Comparison */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">メンテナンスシナリオ比較</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">シナリオ</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">短期コスト</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">長期コスト</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">寿命</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">サービス中断</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">リスク</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {optimizationScenarios.map((scenario) => (
                    <tr key={scenario.id} className={scenario.id === 3 ? 'bg-green-50' : ''}> {/* Highlight recommended */}
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scenario.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{scenario.shortTermCost}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{scenario.longTermCost}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{scenario.lifespan}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{scenario.serviceDisruption}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(scenario.riskLevel)}`}>
                          {getStatusText(scenario.riskLevel)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             <p className="mt-2 text-sm text-green-600 italic">※「状態監視保全シナリオ」が推奨されるシナリオです</p>
          </div>

          {/* Budget Allocation Optimization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">予算配分最適化</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetAllocationData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit="%" domain={[0, 100]} fontSize={12}/>
                    <YAxis dataKey="category" type="category" width={80} fontSize={12}/>
                    <Tooltip formatter={(value: number) => `${value}%`}/>
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="current" fill="#A855F7" name="現在配分(%)" />
                    <Bar dataKey="optimal" fill="#10B981" name="最適配分(%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
               <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">分析: </span>
                  現在、事後保全への予算配分が50%と高い状況です。予測保全・予防保全への予算配分を増やす（最適配分: 予防45%, 事後35%）ことで、長期的なトータルコストを削減し、インフラの寿命を延ばすことが可能です。
                </p>
              </div>
            </div>

             {/* Cost Comparison for Central Bridge */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">中央大橋のコスト比較（LCC）</h3>
              <div className="space-y-4">
                {/* Scenario 1 */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm"><span className="text-gray-600">事後保全</span><span className="font-medium text-gray-900">1.5億円</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>初期コスト: 0円</span><span>大規模修繕: 1.5億円</span></div>
                </div>
                {/* Scenario 2 */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm"><span className="text-gray-600">時間計画保全</span><span className="font-medium text-gray-900">1.2億円</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '80%' }}></div></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>初期コスト: 0.3億円</span><span>定期修繕: 0.9億円</span></div>
                </div>
                 {/* Scenario 3 */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm"><span className="text-gray-600">状態監視保全</span><span className="font-medium text-gray-900">0.9億円</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>初期コスト: 0.5億円</span><span>予防的修繕: 0.4億円</span></div>
                </div>
                 {/* Scenario 4 */}
                 <div>
                  <div className="flex items-center justify-between mb-1 text-sm"><span className="text-gray-600">予測保全</span><span className="font-medium text-gray-900">0.75億円</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '50%' }}></div></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>初期コスト: 0.6億円</span><span>最適化修繕: 0.15億円</span></div>
                </div>
              </div>
               <p className="mt-4 text-sm text-gray-600">
                 状態監視保全や予測保全を採用することで、ライフサイクルコスト（LCC）を大幅に削減できる可能性があります。
               </p>
            </div>
          </div>
        </>
      )}

      {/* Inspection View */}
      {selectedView === 'inspection' && (
        <>
          {/* Inspection History Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">点検履歴</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新規点検記録
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">場所</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">点検種類</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主な所見</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">実施者</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inspectionHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.findings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.assessedBy}</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sensor Status Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">モニタリングセンサー状況</h3>
               <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設置場所</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">センサー種別</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">バッテリー</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終更新</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sensorData.map((sensor) => (
                    <tr key={sensor.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sensor.location}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                          {getStatusText(sensor.status)}
                        </span>
                      </td>
                      {/* Battery Level */}
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              sensor.batteryLevel > 70 ? 'bg-green-500' :
                              sensor.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${sensor.batteryLevel}%` }}></div>
                          </div>
                          <span className="font-medium">{sensor.batteryLevel}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.lastUpdate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                        <button type="button" className="text-green-600 hover:text-green-900">設定</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfrastructurePredictionDashboard;
