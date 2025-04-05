// components/dashboard/WaterOptimization.tsx
"use client"

import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart
} from 'recharts';

// --- Type Definitions ---
type LeakageSeverity = 'high' | 'medium' | 'low';
type LeakageStatus = 'active' | 'investigating' | 'scheduled' | 'resolved';
type EquipmentStatusType = 'active' | 'maintenance' | 'warning' | 'error'; // Added 'maintenance' based on data
type HourlyMetricKey = 'usage' | 'pressure' | 'quality' | 'leakage'; // Added 'leakage' based on select options

interface WaterUsage {
  time: string;
  usage: number; // m³/時
  pressure: number; // MPa
  quality: number; // % (index)
}

interface WeeklyWater {
  day: string;
  usage: number; // m³/日
  leakage: number; // m³/日
  rainfall: number; // mm
}

interface DistrictUsage {
  district: string;
  usage: number; // m³/日
  leakage: number; // m³/日
  efficiency: number; // %
}

interface WaterQuality {
  parameter: string;
  value: number;
  limit: number | string; // Can be number or range string
  unit: string;
}

interface LeakageAlert {
  id: number;
  district: string;
  location: string;
  severity: LeakageSeverity;
  estimatedLoss: string; // e.g., '15.2 m³/日'
  detectedAt: string;
  status: LeakageStatus;
}

interface DemandForecast {
  month: string;
  actual: number | null; // m³
  forecast: number | null; // m³
}

interface WaterSaving {
  initiative: string;
  savingsM3: number; // m³/年
  savingsPercent: number; // %
  costSaving: number; // 万円/年
}

interface EnergyUsage {
  facility: string;
  usage: number; // MWh/月
  unit: string;
  optimized: number; // MWh/月
}

interface PumpSchedule {
  time: string;
  load: number; // %
  current: number; // %
  optimized: number; // %
}

interface EquipmentStatus {
  id: number;
  name: string;
  type: string;
  status: EquipmentStatusType;
  efficiency: number;
  maintenanceDate: string;
  nextMaintenance: string;
}

interface SystemData {
  category: string;
  implemented: number; // %
  target: number; // %
}

// --- Data Definitions ---

// Water usage data (水使用量データ)
const waterUsageData: WaterUsage[] = [
  { time: '00:00', usage: 120, pressure: 0.42, quality: 98 },
  { time: '01:00', usage: 95, pressure: 0.44, quality: 98 },
  { time: '02:00', usage: 85, pressure: 0.45, quality: 99 },
  { time: '03:00', usage: 80, pressure: 0.45, quality: 99 },
  { time: '04:00', usage: 75, pressure: 0.46, quality: 99 },
  { time: '05:00', usage: 90, pressure: 0.45, quality: 99 },
  { time: '06:00', usage: 140, pressure: 0.42, quality: 98 },
  { time: '07:00', usage: 180, pressure: 0.39, quality: 97 },
  { time: '08:00', usage: 230, pressure: 0.36, quality: 96 },
  { time: '09:00', usage: 210, pressure: 0.37, quality: 96 },
  { time: '10:00', usage: 190, pressure: 0.38, quality: 97 },
  { time: '11:00', usage: 200, pressure: 0.38, quality: 97 },
  { time: '12:00', usage: 220, pressure: 0.36, quality: 96 },
  { time: '13:00', usage: 210, pressure: 0.37, quality: 96 },
  { time: '14:00', usage: 200, pressure: 0.38, quality: 97 },
  { time: '15:00', usage: 195, pressure: 0.38, quality: 97 },
  { time: '16:00', usage: 210, pressure: 0.37, quality: 96 },
  { time: '17:00', usage: 230, pressure: 0.36, quality: 96 },
  { time: '18:00', usage: 250, pressure: 0.35, quality: 95 },
  { time: '19:00', usage: 235, pressure: 0.36, quality: 96 },
  { time: '20:00', usage: 220, pressure: 0.36, quality: 96 },
  { time: '21:00', usage: 200, pressure: 0.38, quality: 97 },
  { time: '22:00', usage: 170, pressure: 0.40, quality: 97 },
  { time: '23:00', usage: 140, pressure: 0.42, quality: 98 },
];

// Weekly water data (週間水使用量データ)
const weeklyWaterData: WeeklyWater[] = [
  { day: '月', usage: 4250, leakage: 340, rainfall: 0 },
  { day: '火', usage: 4150, leakage: 332, rainfall: 5 },
  { day: '水', usage: 4300, leakage: 344, rainfall: 12 },
  { day: '木', usage: 4100, leakage: 328, rainfall: 25 },
  { day: '金', usage: 4280, leakage: 342, rainfall: 2 },
  { day: '土', usage: 4500, leakage: 360, rainfall: 0 },
  { day: '日', usage: 4350, leakage: 348, rainfall: 0 },
];

// District usage data (地区別使用量データ)
const districtUsageData: DistrictUsage[] = [
  { district: '中央区', usage: 1250, leakage: 75, efficiency: 94 },
  { district: '北区', usage: 980, leakage: 88, efficiency: 91 },
  { district: '南区', usage: 1100, leakage: 66, efficiency: 94 },
  { district: '東区', usage: 850, leakage: 59, efficiency: 93 },
  { district: '西区', usage: 920, leakage: 73, efficiency: 92 },
  { district: '郊外エリア', usage: 750, leakage: 68, efficiency: 91 },
];

// Water quality parameters data (水質パラメータデータ)
const waterQualityData: WaterQuality[] = [
  { parameter: '濁度', value: 0.2, limit: 2.0, unit: 'NTU' },
  { parameter: '残留塩素', value: 0.6, limit: 1.0, unit: 'mg/L' },
  { parameter: 'pH', value: 7.2, limit: '5.8-8.6', unit: '' },
  { parameter: '大腸菌', value: 0, limit: 0, unit: 'CFU/100ml' },
  { parameter: '有機物(TOC)', value: 0.8, limit: 3, unit: 'mg/L' },
  { parameter: '硬度', value: 80, limit: 300, unit: 'mg/L' },
];

// Leakage detection alerts (漏水検知アラート)
const leakageAlerts: LeakageAlert[] = [
  { id: 1, district: '北区', location: '北区4丁目配水管', severity: 'high', estimatedLoss: '15.2 m³/日', detectedAt: '2024-04-02 03:25', status: 'active' },
  { id: 2, district: '中央区', location: '中央区駅前通り', severity: 'medium', estimatedLoss: '8.5 m³/日', detectedAt: '2024-04-01 22:40', status: 'investigating' },
  { id: 3, district: '西区', location: '西部配水池流入管', severity: 'low', estimatedLoss: '4.3 m³/日', detectedAt: '2024-03-30 14:15', status: 'scheduled' },
  { id: 4, district: '南区', location: '南区公園通り', severity: 'medium', estimatedLoss: '7.8 m³/日', detectedAt: '2024-03-28 09:50', status: 'resolved' },
];

// Demand forecast data (需要予測データ)
const demandForecastData: DemandForecast[] = [
  { month: '1月', actual: 135000, forecast: null },
  { month: '2月', actual: 128000, forecast: null },
  { month: '3月', actual: 132000, forecast: null },
  { month: '4月', actual: 130000, forecast: 130000 },
  { month: '5月', actual: null, forecast: 138000 },
  { month: '6月', actual: null, forecast: 145000 },
  { month: '7月', actual: null, forecast: 158000 },
  { month: '8月', actual: null, forecast: 162000 },
  { month: '9月', actual: null, forecast: 150000 },
  { month: '10月', actual: null, forecast: 140000 },
  { month: '11月', actual: null, forecast: 135000 },
  { month: '12月', actual: null, forecast: 138000 },
];

// Water saving effectiveness data (節水効果データ)
const waterSavingData: WaterSaving[] = [
  { initiative: '漏水検知・修復プログラム', savingsM3: 45200, savingsPercent: 8.2, costSaving: 1808 },
  { initiative: '圧力最適化', savingsM3: 28500, savingsPercent: 5.2, costSaving: 1140 },
  { initiative: 'スマートメーター導入', savingsM3: 15800, savingsPercent: 2.9, costSaving: 632 },
  { initiative: '節水啓発キャンペーン', savingsM3: 12400, savingsPercent: 2.3, costSaving: 496 },
];

// Energy usage data (エネルギー使用量データ)
const energyUsageData: EnergyUsage[] = [
  { facility: '第一浄水場', usage: 1250, unit: 'MWh/月', optimized: 1050 },
  { facility: '第二浄水場', usage: 850, unit: 'MWh/月', optimized: 765 },
  { facility: '中央ポンプ場', usage: 620, unit: 'MWh/月', optimized: 530 },
  { facility: '北部ポンプ場', usage: 480, unit: 'MWh/月', optimized: 432 },
  { facility: '南部ポンプ場', usage: 520, unit: 'MWh/月', optimized: 455 },
  { facility: '下水処理場', usage: 1680, unit: 'MWh/月', optimized: 1428 },
];

// Pump operation schedule optimization data (ポンプ運転スケジュール最適化データ)
const pumpScheduleData: PumpSchedule[] = [
  { time: '00:00', load: 25, current: 65, optimized: 45 },
  { time: '01:00', load: 22, current: 60, optimized: 40 },
  { time: '02:00', load: 20, current: 60, optimized: 35 },
  { time: '03:00', load: 18, current: 60, optimized: 30 },
  { time: '04:00', load: 20, current: 60, optimized: 35 },
  { time: '05:00', load: 25, current: 65, optimized: 40 },
  { time: '06:00', load: 35, current: 70, optimized: 55 },
  { time: '07:00', load: 50, current: 80, optimized: 70 },
  { time: '08:00', load: 60, current: 85, optimized: 75 },
  { time: '09:00', load: 55, current: 85, optimized: 70 },
  { time: '10:00', load: 50, current: 80, optimized: 65 },
  { time: '11:00', load: 52, current: 80, optimized: 65 },
  { time: '12:00', load: 55, current: 85, optimized: 70 },
  { time: '13:00', load: 52, current: 85, optimized: 65 },
  { time: '14:00', load: 50, current: 80, optimized: 65 },
  { time: '15:00', load: 48, current: 80, optimized: 65 },
  { time: '16:00', load: 50, current: 80, optimized: 65 },
  { time: '17:00', load: 58, current: 85, optimized: 70 },
  { time: '18:00', load: 65, current: 90, optimized: 80 },
  { time: '19:00', load: 60, current: 85, optimized: 75 },
  { time: '20:00', load: 55, current: 85, optimized: 70 },
  { time: '21:00', load: 48, current: 80, optimized: 65 },
  { time: '22:00', load: 40, current: 75, optimized: 55 },
  { time: '23:00', load: 30, current: 70, optimized: 45 },
];

// Equipment status monitoring data (設備状態監視データ)
const equipmentStatusData: EquipmentStatus[] = [
  { id: 1, name: '第一浄水場 ポンプ1', type: 'ポンプ', status: 'active', efficiency: 92, maintenanceDate: '2023-12-15', nextMaintenance: '2024-06-15' },
  { id: 2, name: '第一浄水場 ポンプ2', type: 'ポンプ', status: 'active', efficiency: 88, maintenanceDate: '2024-01-10', nextMaintenance: '2024-07-10' },
  { id: 3, name: '第一浄水場 ポンプ3', type: 'ポンプ', status: 'maintenance', efficiency: 85, maintenanceDate: '2024-04-02', nextMaintenance: '2024-10-02' },
  { id: 4, name: '中央制御システム', type: '制御系', status: 'active', efficiency: 98, maintenanceDate: '2024-02-20', nextMaintenance: '2024-08-20' },
  { id: 5, name: '第二浄水場 フィルター', type: '処理装置', status: 'warning', efficiency: 82, maintenanceDate: '2023-11-05', nextMaintenance: '2024-05-05' },
  { id: 6, name: '配水池 水位計', type: 'センサー', status: 'active', efficiency: 95, maintenanceDate: '2024-03-12', nextMaintenance: '2024-09-12' },
];

// System management data (システム管理データ)
const systemData: SystemData[] = [
  { category: '自動制御', implemented: 85, target: 95 },
  { category: '遠隔監視', implemented: 92, target: 100 },
  { category: '漏水検知', implemented: 75, target: 90 },
  { category: '水質監視', implemented: 80, target: 95 },
  { category: 'エネルギー最適化', implemented: 65, target: 85 },
  { category: '予測分析', implemented: 70, target: 90 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main dashboard component
const WaterOptimizationDashboard: React.FC = () => {
  // State for selected view
  const [selectedView, setSelectedView] = useState('monitoring');
  // State for selected metric in hourly chart
  const [selectedMetric, setSelectedMetric] = useState<HourlyMetricKey>('usage');

  // Function to get the display name for the selected metric
  const getSelectedMetricName = (key: HourlyMetricKey): string => {
    switch (key) {
      case 'usage': return '使用量 (m³/時)';
      case 'pressure': return '水圧 (MPa)';
      case 'quality': return '水質指数 (%)';
      case 'leakage': return '漏水量 (m³/日)'; // Assuming leakage is daily for the select
      default: return '';
    }
  };

   // Helper function to get color based on status/level
   const getStatusColor = (status: LeakageSeverity | LeakageStatus | EquipmentStatusType ): string => {
     switch (status) {
      case 'high':
      case 'active': // For leakage alerts and equipment status
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'medium':
      case 'investigating':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'scheduled':
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

   // Helper function to get text based on status/level
   const getStatusText = (status: LeakageSeverity | LeakageStatus | EquipmentStatusType): string => {
     switch (status) {
      // Leakage Severity
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      // Leakage Status
      case 'active': return '対応待ち'; // Or '稼働中' for equipment
      case 'investigating': return '調査中';
      case 'scheduled': return '修理予定';
      case 'resolved': return '解決済み';
      // Equipment Status
      case 'maintenance': return 'メンテナンス中';
      case 'warning': return '要注意';
      case 'error': return '停止中';
      default: return String(status);
    }
  };


  return (
    <div className="space-y-6 font-sans"> {/* Added default font */}
      {/* Filters and View Selection Header */}
      <div className="bg-white p-4 rounded-lg shadow-md"> {/* Added shadow */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Metric Selector for Hourly Chart */}
          <div className="flex items-center space-x-2">
            <label htmlFor="metricSelectWater" className="text-sm font-medium text-gray-700">表示項目:</label>
            <select
              id="metricSelectWater"
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-1.5" // Adjusted padding
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as HourlyMetricKey)} // Cast value to type
            >
              <option value="usage">使用量</option>
              <option value="pressure">水圧</option>
              <option value="quality">水質</option>
              <option value="leakage">漏水</option>
            </select>
          </div>

          {/* View Selection Buttons */}
          <div className="flex space-x-2 flex-wrap gap-y-2"> {/* Added flex-wrap and gap */}
            {(['monitoring', 'leakage', 'forecast', 'optimization'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${ // Added font-medium and transition
                  selectedView === view
                    ? 'bg-green-600 text-white shadow-sm' // Active state
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state
                }`}
              >
                {view === 'monitoring' ? 'モニタリング' :
                 view === 'leakage' ? '漏水管理' :
                 view === 'forecast' ? '需要予測' : '運用最適化'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card 1: Current Usage */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の使用量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        210 m³/時 {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">前日比</span>
                        <span className="ml-1 text-gray-500">-2.8%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 2: System Efficiency */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      システム効率
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        92.5% {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">目標</span>
                        <span className="ml-1 text-gray-500">95%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 3: Leakage Rate */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      漏水量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        8.2% {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">前年比</span>
                        <span className="ml-1 text-gray-500">-1.5%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 4: Energy Cost */}
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
                      エネルギーコスト
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        35.8万円/日 {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">最適化で</span>
                        <span className="ml-1 text-gray-500">-15%</span>
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

      {/* Monitoring View */}
      {selectedView === 'monitoring' && (
        <>
          {/* Hourly Water Usage/Pressure/Quality Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の水使用量・水圧・水質推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={waterUsageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12}/>
                  {/* Left Y-axis for Usage */}
                  <YAxis yAxisId="left" orientation="left" stroke="#0088FE" fontSize={12} unit=" m³/時"/>
                  {/* Right Y-axis for Pressure and Quality */}
                  <YAxis yAxisId="right" orientation="right" stroke="#00C49F" fontSize={12} domain={[0, 1]} unit=" MPa"/>
                  <YAxis yAxisId="quality" orientation="right" stroke="#FFBB28" fontSize={12} domain={[90, 100]} unit="%" dx={40}/> {/* Offset for visibility */}

                  <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(name === '水圧 (MPa)' ? 2 : 0)}${name.includes('m³') ? ' m³/時' : name.includes('MPa') ? ' MPa' : '%'}`, name]}/>
                  <Legend />
                  {selectedMetric === 'usage' && (
                    <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#0088FE" name="使用量 (m³/時)" strokeWidth={2} dot={false}/>
                  )}
                  {selectedMetric === 'pressure' && (
                    <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#00C49F" name="水圧 (MPa)" strokeWidth={2} dot={false}/>
                  )}
                  {selectedMetric === 'quality' && (
                    <Line yAxisId="quality" type="monotone" dataKey="quality" stroke="#FFBB28" name="水質指数 (%)" strokeWidth={2} dot={false}/>
                  )}
                  {/* Always show other metrics with lower opacity if not selected? Optional */}
                   {selectedMetric !== 'usage' && (
                     <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#0088FE" strokeOpacity={0.3} name="使用量 (m³/時)" dot={false}/>
                  )}
                   {selectedMetric !== 'pressure' && (
                     <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#00C49F" strokeOpacity={0.3} name="水圧 (MPa)" dot={false}/>
                  )}
                   {selectedMetric !== 'quality' && (
                     <Line yAxisId="quality" type="monotone" dataKey="quality" stroke="#FFBB28" strokeOpacity={0.3} name="水質指数 (%)" dot={false}/>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* District Usage and Water Quality Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* District Usage Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">地区別水使用量・漏水率</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={districtUsageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" fontSize={12}/>
                    <YAxis dataKey="district" type="category" width={80} fontSize={12}/>
                    <Tooltip formatter={(value: number, name: string) => [`${value.toLocaleString()}${name.includes('効率') ? '%' : ' m³/日'}`, name]}/>
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="usage" fill="#0088FE" name="使用量 (m³/日)" />
                    <Bar dataKey="leakage" fill="#FF8042" name="漏水量 (m³/日)" />
                    {/* Efficiency could be a line or separate chart */}
                    {/* <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="効率 (%)" yAxisId="right"/> */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Water Quality Parameters */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">水質パラメータ</h3>
              <div className="space-y-3">
                {waterQualityData.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.parameter}</span>
                      <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-900 mr-1">{item.value}</span>
                        <span className="text-xs text-gray-500">{item.unit}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min((item.value / (typeof item.limit === 'number' ? item.limit : parseFloat(item.limit.split('-')[1]))) * 100, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>基準値: {item.limit}</span>
                      <span className="text-green-600 font-medium">適合</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Status Monitoring Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">設備状態監視</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                詳細レポート
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設備名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">効率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">前回メンテ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">次回メンテ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {equipmentStatusData.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                          {getStatusText(equipment.status)}
                        </span>
                      </td>
                      {/* Efficiency */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                            <div className={`h-2.5 rounded-full ${
                              equipment.efficiency > 90 ? 'bg-green-500' :
                              equipment.efficiency > 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${equipment.efficiency}%` }}></div>
                          </div>
                          <span className="font-medium">{equipment.efficiency}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.maintenanceDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.nextMaintenance}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
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

      {/* Leakage View */}
      {selectedView === 'leakage' && (
        <>
          {/* Weekly Usage and Leakage Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">週間水使用量と漏水量</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={weeklyWaterData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" fontSize={12}/>
                  {/* Left Y-axis for Usage/Leakage */}
                  <YAxis yAxisId="left" orientation="left" stroke="#0088FE" fontSize={12} unit=" m³"/>
                  {/* Right Y-axis for Rainfall */}
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} unit=" mm"/>
                  <Tooltip formatter={(value: number, name: string) => [`${value.toLocaleString()}${name.includes('mm') ? 'mm' : ' m³'}`, name]}/>
                  <Legend wrapperStyle={{fontSize: "12px"}}/>
                  <Bar yAxisId="left" dataKey="usage" fill="#0088FE" name="使用量 (m³/日)" />
                  <Bar yAxisId="left" dataKey="leakage" fill="#FF8042" name="漏水量 (m³/日)" />
                  <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#82ca9d" name="降水量 (mm)" strokeWidth={2} dot={{ r: 4 }}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Summary Cards for Leakage */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">週間総使用量</h4>
                <p className="text-2xl font-bold text-blue-900">29,930 m³</p>
                <p className="text-xs text-blue-700 mt-1">前週比: +2.1%</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-1">週間総漏水量</h4>
                <p className="text-2xl font-bold text-red-900">2,394 m³</p>
                <p className="text-xs text-red-700 mt-1">前週比: -3.5%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">漏水率</h4>
                <p className="text-2xl font-bold text-green-900">8.0%</p>
                <p className="text-xs text-green-700 mt-1">前週比: -0.5%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">節水量（漏水対策）</h4>
                <p className="text-2xl font-bold text-yellow-900">87 m³/日</p>
                <p className="text-xs text-yellow-700 mt-1">先月比: +12%</p>
              </div>
            </div>
          </div>

          {/* District Leakage Trend and Leakage Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* District Leakage Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">地区別漏水傾向</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={districtUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ district, leakage, percent }) => percent > 0.05 ? `${district}: ${leakage}m³ (${(percent * 100).toFixed(0)}%)` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="leakage" // Use leakage data
                      paddingAngle={2}
                    >
                      {districtUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} m³/日`} />
                     <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px"}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Summary cards for highest/lowest leakage */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-md border border-red-200">
                  <h4 className="text-sm font-medium text-red-800 mb-1">最多漏水地区</h4>
                  <p className="text-lg font-bold text-red-900">北区</p>
                  <div className="mt-1 flex items-center text-xs"><span className="font-medium">漏水率: 9.0%</span></div>
                </div>
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <h4 className="text-sm font-medium text-green-800 mb-1">最少漏水地区</h4>
                  <p className="text-lg font-bold text-green-900">南区</p>
                  <div className="mt-1 flex items-center text-xs"><span className="font-medium">漏水率: 6.0%</span></div>
                </div>
              </div>
            </div>

            {/* Leakage Detection Alerts List */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">漏水検知アラート</h3>
                <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  アラート設定
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2"> {/* Added scroll */}
                {leakageAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-md border ${
                      alert.status === 'active' ? 'bg-red-50 border-red-200' :
                      alert.status === 'investigating' ? 'bg-yellow-50 border-yellow-200' :
                      alert.status === 'scheduled' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'
                    }`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`text-sm font-medium ${
                        alert.status === 'active' ? 'text-red-800' :
                        alert.status === 'investigating' ? 'text-yellow-800' :
                        alert.status === 'scheduled' ? 'text-blue-800' : 'text-green-800'
                      }`}>
                        {alert.location} ({alert.district})
                      </h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(alert.severity)}`}>
                        重要度: {getStatusText(alert.severity)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div className="text-gray-600">推定漏水量: <span className="font-medium text-gray-800">{alert.estimatedLoss}</span></div>
                      <div className="text-gray-600">検出日時: <span className="font-medium text-gray-800">{alert.detectedAt}</span></div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                       <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
                         {getStatusText(alert.status)}
                       </span>
                      <div>
                        <button type="button" className="text-xs text-green-600 hover:text-green-900 mr-2">詳細</button>
                        {alert.status !== 'resolved' && (
                          <button type="button" className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                            対応
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Water Saving Initiatives Table */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">漏水対策の効果</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">対策</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">節水量</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">削減率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コスト削減</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {waterSavingData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.initiative}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.savingsM3.toLocaleString()} m³/年</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.savingsPercent}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.costSaving.toLocaleString()} 万円/年</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">漏水削減による総合効果</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-baseline"><span className="text-blue-700 mr-1">年間総節水量:</span><span className="font-medium text-blue-900">101,900 m³</span></div>
                    <div className="flex items-baseline"><span className="text-blue-700 mr-1">年間コスト削減:</span><span className="font-medium text-blue-900">4,076 万円</span></div>
                    <div className="flex items-baseline"><span className="text-blue-700 mr-1">CO₂排出削減量:</span><span className="font-medium text-blue-900">42.8 トン/年</span></div>
                </div>
            </div>
          </div>
        </>
      )}

      {/* Forecast View */}
      {selectedView === 'forecast' && (
        <>
          {/* Demand Forecast Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">水需要予測（年間）</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={demandForecastData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12}/>
                  <YAxis domain={[100000, 170000]} fontSize={10} unit=" m³" tickFormatter={(value) => (value / 1000).toLocaleString() + '千'}/>
                  <Tooltip formatter={(value: number | null) => value ? `${value.toLocaleString()} m³` : 'N/A'} />
                  <Legend wrapperStyle={{fontSize: "12px"}}/>
                  <Line type="monotone" dataKey="actual" stroke="#0088FE" strokeWidth={2} name="実績値" dot={{ r: 5 }} activeDot={{ r: 8 }} connectNulls/>
                  <Line type="monotone" dataKey="forecast" stroke="#FF8042" strokeWidth={2} strokeDasharray="5 5" name="予測値" connectNulls/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Forecast Summary Cards */}
             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">年間総需要予測</h4>
                <p className="text-2xl font-bold text-blue-900">1,586,000 m³</p>
                <p className="text-xs text-blue-700 mt-1">前年比: +2.8%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                <h4 className="text-sm font-medium text-orange-800 mb-1">ピーク需要</h4>
                <p className="text-2xl font-bold text-orange-900">162,000 m³</p>
                <p className="text-xs text-orange-700 mt-1">8月予測 (前年比: +3.2%)</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">年間取水量予測</h4>
                <p className="text-2xl font-bold text-green-900">1,726,000 m³</p>
                <p className="text-xs text-green-700 mt-1">漏水考慮 (前年比: +1.5%)</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 mb-1">予測精度</h4>
                <p className="text-2xl font-bold text-purple-900">95.8%</p>
                <p className="text-xs text-purple-700 mt-1">過去12ヶ月平均</p>
              </div>
            </div>
          </div>

          {/* Demand Factors and Seasonal Variation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demand Factors Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">需要予測要因分析</h3>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">予測モデルの主要因子（寄与度）</h4>
                <div className="space-y-3">
                  {/* Factor 1 */}
                  <div>
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-600">季節要因（気温・降水量）</span><span className="font-medium text-gray-900">35%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div></div>
                  </div>
                  {/* Factor 2 */}
                  <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">人口統計（居住者数・観光客）</span><span className="font-medium text-gray-900">25%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                  </div>
                  {/* Factor 3 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">イベント・休日要因</span><span className="font-medium text-gray-900">15%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div></div>
                  </div>
                   {/* Factor 4 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">産業活動レベル</span><span className="font-medium text-gray-900">15%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '15%' }}></div></div>
                  </div>
                   {/* Factor 5 */}
                   <div>
                     <div className="flex items-center justify-between text-sm"><span className="text-gray-600">過去の使用パターン</span><span className="font-medium text-gray-900">10%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '10%' }}></div></div>
                  </div>
                </div>
              </div>
               <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">予測リスク要因</h4>
                  <ul className="space-y-1 text-sm text-yellow-700 list-disc list-inside">
                    <li>記録的な猛暑の場合、需要が予測を5-8%上回る可能性</li>
                    <li>主要工場の生産拡大計画（確認中）</li>
                    <li>新規マンション開発の完成時期の前倒し</li>
                  </ul>
                </div>
            </div>

            {/* Seasonal Variation */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">季節・時間帯別水需要パターン</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">季節別の日平均水使用量</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[ { season: '春', usage: 4250 }, { season: '夏', usage: 5100 }, { season: '秋', usage: 4350 }, { season: '冬', usage: 4050 } ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="season" fontSize={12}/>
                      <YAxis domain={[3500, 5500]} fontSize={10} unit=" m³"/>
                      <Tooltip formatter={(value: number) => `${value.toLocaleString()} m³/日`} />
                      <Bar dataKey="usage" fill="#0088FE" name="使用量" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
               <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">用途別需要変動（夏期と冬期の比較）</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">用途</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">夏期</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">冬期</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">変動率</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr><td className="px-4 py-2">家庭用</td><td className="px-4 py-2">3,050</td><td className="px-4 py-2">2,430</td><td className="px-4 py-2">+25.5%</td></tr>
                      <tr><td className="px-4 py-2">商業用</td><td className="px-4 py-2">1,250</td><td className="px-4 py-2">1,050</td><td className="px-4 py-2">+19.0%</td></tr>
                      <tr><td className="px-4 py-2">工業用</td><td className="px-4 py-2">520</td><td className="px-4 py-2">480</td><td className="px-4 py-2">+8.3%</td></tr>
                      <tr><td className="px-4 py-2">公共用</td><td className="px-4 py-2">280</td><td className="px-4 py-2">90</td><td className="px-4 py-2">+211.1%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Optimization View */}
      {selectedView === 'optimization' && (
        <>
          {/* Pump Operation Optimization Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">ポンプ運転最適化</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={pumpScheduleData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12}/>
                  <YAxis domain={[0, 100]} unit="%" fontSize={12}/>
                  <Tooltip formatter={(value: number) => `${value}%`}/>
                  <Legend wrapperStyle={{fontSize: "12px"}}/>
                  <Area type="monotone" dataKey="load" fill="#FFBB28" stroke="#FFBB28" name="負荷率 (%)" fillOpacity={0.3}/>
                  <Line type="monotone" dataKey="current" stroke="#FF8042" strokeWidth={2} name="現在の運転率 (%)" dot={false}/>
                  <Line type="monotone" dataKey="optimized" stroke="#0088FE" strokeWidth={2} name="最適化後の運転率 (%)" dot={false}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Optimization Summary Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">エネルギー削減効果</h4>
                <p className="text-2xl font-bold text-blue-900">15.3%</p>
                <p className="text-xs text-blue-700 mt-1">年間約1,850万円の削減</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-1">ピーク時削減</h4>
                <p className="text-2xl font-bold text-red-900">18.5%</p>
                <p className="text-xs text-red-700 mt-1">電力デマンド削減効果</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">CO₂削減効果</h4>
                <p className="text-2xl font-bold text-green-900">145 トン/年</p>
                <p className="text-xs text-green-700 mt-1">環境負荷の低減</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">設備寿命延長</h4>
                <p className="text-2xl font-bold text-yellow-900">+22%</p>
                <p className="text-xs text-yellow-700 mt-1">平均メンテナンス間隔</p>
              </div>
            </div>
          </div>

          {/* Facility Energy Usage and System Optimization Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facility Energy Usage Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">施設別エネルギー使用量</h3>
              <div className="h-80"> {/* Adjusted height */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={energyUsageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" fontSize={10} unit=" MWh"/>
                    <YAxis dataKey="facility" type="category" width={100} fontSize={10}/>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} MWh/月`} />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="usage" fill="#FF8042" name="現在の使用量" />
                    <Bar dataKey="optimized" fill="#0088FE" name="最適化後の使用量" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Optimization Progress */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">システム最適化の進捗状況</h3>
              <div className="space-y-3">
                {systemData.map((item, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <div className="flex items-baseline">
                        <span className="text-sm font-medium text-gray-900 mr-1">{item.implemented}%</span>
                        <span className="text-xs text-gray-500">/ {item.target}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${
                        item.implemented / item.target >= 0.9 ? 'bg-green-500' :
                        item.implemented / item.target >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} style={{ width: `${(item.implemented / item.target) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
                 <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">次期導入計画</h4>
                  <ul className="space-y-1 text-sm text-blue-700 list-disc list-inside">
                    <li>AIによる水質最適化システム (2024/09~)</li>
                    <li>リアルタイム水質モニタリング拡張 (2024/10~)</li>
                    <li>分散型制御システムの統合 (2025/01~)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Optimization Effects */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">システム最適化による総合効果</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cost Savings */}
              <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-base font-medium text-blue-800 mb-3">コスト削減効果</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-blue-700">エネルギーコスト:</span><span className="font-medium text-blue-900">2,240万円/年</span></div>
                  <div className="flex justify-between"><span className="text-blue-700">漏水対策:</span><span className="font-medium text-blue-900">4,076万円/年</span></div>
                  <div className="flex justify-between"><span className="text-blue-700">薬品使用量:</span><span className="font-medium text-blue-900">850万円/年</span></div>
                  <div className="flex justify-between"><span className="text-blue-700">メンテナンス:</span><span className="font-medium text-blue-900">1,250万円/年</span></div>
                  <div className="pt-2 border-t border-blue-200 mt-2"><div className="flex justify-between"><span className="font-medium text-blue-800">総削減額:</span><span className="font-bold text-blue-900">8,416万円/年</span></div></div>
                </div>
              </div>
              {/* Environmental Impact Reduction */}
              <div className="p-4 bg-green-50 rounded-md border border-green-200">
                 <h4 className="text-base font-medium text-green-800 mb-3">環境負荷低減効果</h4>
                 <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-green-700">CO₂排出削減:</span><span className="font-medium text-green-900">235トン/年</span></div>
                  <div className="flex justify-between"><span className="text-green-700">水資源保全:</span><span className="font-medium text-green-900">10.2万m³/年</span></div>
                  <div className="flex justify-between"><span className="text-green-700">水源負荷軽減:</span><span className="font-medium text-green-900">8.5%減</span></div>
                  <div className="flex justify-between"><span className="text-green-700">薬品使用量削減:</span><span className="font-medium text-green-900">12.8%減</span></div>
                  <div className="pt-2 border-t border-green-200 mt-2"><div className="flex justify-between"><span className="font-medium text-green-800">環境貢献度評価:</span><span className="font-bold text-green-900">AA (優良)</span></div></div>
                </div>
              </div>
              {/* Operational Improvement Effects */}
              <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                 <h4 className="text-base font-medium text-yellow-800 mb-3">運用改善効果</h4>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-yellow-700">設備稼働率最適化:</span><span className="font-medium text-yellow-900">+18.5%</span></div>
                    <div className="flex justify-between"><span className="text-yellow-700">水質管理精度向上:</span><span className="font-medium text-yellow-900">+15.2%</span></div>
                    <div className="flex justify-between"><span className="text-yellow-700">障害対応時間短縮:</span><span className="font-medium text-yellow-900">-65%</span></div>
                    <div className="flex justify-between"><span className="text-yellow-700">設備寿命延長:</span><span className="font-medium text-yellow-900">+22%</span></div>
                    <div className="pt-2 border-t border-yellow-200 mt-2"><div className="flex justify-between"><span className="font-medium text-yellow-800">サービス信頼性向上:</span><span className="font-bold text-yellow-900">+32%</span></div></div>
                </div>
              </div>
            </div>
             <div className="mt-4 flex justify-end">
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                詳細レポート
              </button>
            </div>
          </div>

          {/* Long-term Optimization Roadmap */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
             <h3 className="text-lg font-medium text-gray-900 mb-4">長期最適化ロードマップ</h3>
             <div className="space-y-1">
               {/* Phase 1 */}
               <div className="relative pb-8">
                 <div className="absolute left-3 top-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                 <div className="relative flex items-start space-x-3">
                   <div className="relative">
                     <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white">
                       <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                     </span>
                   </div>
                   <div className="min-w-0 flex-1">
                     <h5 className="text-sm font-medium text-gray-900">フェーズ1: 基本最適化（完了）</h5>
                     <p className="text-xs text-gray-500">ポンプ運転最適化、漏水検知の基本システム導入、圧力管理の一部導入</p>
                   </div>
                 </div>
               </div>
               {/* Phase 2 */}
                <div className="relative pb-8">
                 <div className="absolute left-3 top-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                 <div className="relative flex items-start space-x-3">
                   <div className="relative">
                     <span className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-white">
                       <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                     </span>
                   </div>
                   <div className="min-w-0 flex-1">
                     <h5 className="text-sm font-medium text-gray-900">フェーズ2: 高度最適化（進行中）</h5>
                     <p className="text-xs text-gray-500">AIによる予測モデル活用、全域圧力最適化、スマートメーター拡大（〜2024年12月）</p>
                   </div>
                 </div>
               </div>
               {/* Phase 3 */}
                <div className="relative pb-8">
                 <div className="absolute left-3 top-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                 <div className="relative flex items-start space-x-3">
                   <div className="relative">
                     <span className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center ring-4 ring-white">
                       <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                     </span>
                   </div>
                   <div className="min-w-0 flex-1">
                     <h5 className="text-sm font-medium text-gray-900">フェーズ3: 完全自動化（予定）</h5>
                     <p className="text-xs text-gray-500">自己学習型AIによる全自動制御、デジタルツイン導入（2025年1月〜6月）</p>
                   </div>
                 </div>
               </div>
               {/* Phase 4 */}
               <div className="relative"> {/* Removed pb-8 for the last item */}
                 <div className="relative flex items-start space-x-3">
                   <div className="relative">
                     <span className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center ring-4 ring-white">
                        <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                     </span>
                   </div>
                   <div className="min-w-0 flex-1">
                     <h5 className="text-sm font-medium text-gray-900">フェーズ4: 統合都市水管理（計画中）</h5>
                     <p className="text-xs text-gray-500">上下水道・雨水・環境水を含む統合水循環管理システム、広域連携（2025年7月〜）</p>
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

export default WaterOptimizationDashboard;
