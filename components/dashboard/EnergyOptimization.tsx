// components/dashboard/EnergyOptimization.tsx
"use client"

import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Type Definitions ---
type EquipmentStatusType = 'optimized' | 'manual' | 'error' | 'planned' | 'operational' | 'warning';
type MeasureStatus = 'active' | 'pending';
type AnomalyStatus = 'active' | 'resolved'; // Assuming resolved might be a status

interface HourlyEnergy {
  time: string;
  consumption: number;
  predicted: number;
  optimal: number;
  solar: number;
  grid: number;
  battery: number;
}

interface EquipmentEnergy {
  name: string;
  value: number; // Percentage consumption
  saving: number; // Percentage saving
  status: EquipmentStatusType;
}

interface MonthlyEnergy {
  month: string;
  consumption: number; // kWh
  baseline: number; // kWh
  cost: number; // Yen
  saving: number; // Yen
}

interface EnergySavingMeasure {
  id: number;
  measure: string;
  status: MeasureStatus;
  implemented: string | null;
  energySaving: number; // Percentage
  costSaving: number; // Yen per year
  roi: number; // Years
}

interface SolarPrediction {
  time: string;
  direct: number; // Actual kWh
  predicted: number; // Predicted kWh
}

interface EnergySource {
  name: string;
  value: number; // Percentage
}

interface AnomalyAlert {
  id: number;
  time: string;
  equipment: string;
  type: string;
  status: AnomalyStatus;
  detail: string;
}

interface EquipmentStatus {
  id: number;
  name: string;
  status: EquipmentStatusType;
  efficiency: number | null;
  lastMaintenance: string | null;
  nextMaintenance: string | null;
}

interface ElectricityPlan {
  name: string;
  base: number; // Yen
  usage: number; // Yen
  peak: number; // Yen
  total: number; // Yen
}

type HourlyEnergyKey = 'consumption' | 'predicted' | 'optimal';

// --- Data Definitions ---

// Hourly energy consumption data (時間別電力消費データ)
const hourlyEnergyData: HourlyEnergy[] = [
  { time: '00:00', consumption: 125, predicted: 130, optimal: 120, solar: 0, grid: 125, battery: 0 },
  { time: '01:00', consumption: 110, predicted: 115, optimal: 110, solar: 0, grid: 110, battery: 0 },
  { time: '02:00', consumption: 95, predicted: 100, optimal: 95, solar: 0, grid: 95, battery: 0 },
  { time: '03:00', consumption: 85, predicted: 90, optimal: 85, solar: 0, grid: 85, battery: 0 },
  { time: '04:00', consumption: 80, predicted: 85, optimal: 80, solar: 0, grid: 80, battery: 0 },
  { time: '05:00', consumption: 90, predicted: 95, optimal: 85, solar: 5, grid: 85, battery: 0 },
  { time: '06:00', consumption: 120, predicted: 125, optimal: 110, solar: 20, grid: 100, battery: 0 },
  { time: '07:00', consumption: 180, predicted: 185, optimal: 165, solar: 40, grid: 140, battery: 0 },
  { time: '08:00', consumption: 240, predicted: 250, optimal: 210, solar: 70, grid: 170, battery: 0 },
  { time: '09:00', consumption: 280, predicted: 290, optimal: 240, solar: 100, grid: 180, battery: 0 },
  { time: '10:00', consumption: 300, predicted: 310, optimal: 250, solar: 120, grid: 180, battery: 0 },
  { time: '11:00', consumption: 320, predicted: 330, optimal: 260, solar: 140, grid: 180, battery: 0 },
  { time: '12:00', consumption: 330, predicted: 340, optimal: 270, solar: 150, grid: 180, battery: 0 },
  { time: '13:00', consumption: 310, predicted: 320, optimal: 260, solar: 140, grid: 170, battery: 0 },
  { time: '14:00', consumption: 290, predicted: 300, optimal: 250, solar: 120, grid: 170, battery: 0 },
  { time: '15:00', consumption: 280, predicted: 290, optimal: 240, solar: 100, grid: 180, battery: 0 },
  { time: '16:00', consumption: 320, predicted: 310, optimal: 250, solar: 70, grid: 220, battery: 30 },
  { time: '17:00', consumption: 350, predicted: 340, optimal: 270, solar: 40, grid: 250, battery: 60 },
  { time: '18:00', consumption: 340, predicted: 330, optimal: 280, solar: 10, grid: 270, battery: 60 },
  { time: '19:00', consumption: 280, predicted: 290, optimal: 250, solar: 0, grid: 240, battery: 40 },
  { time: '20:00', consumption: 250, predicted: 260, optimal: 230, solar: 0, grid: 230, battery: 20 },
  { time: '21:00', consumption: 220, predicted: 230, optimal: 210, solar: 0, grid: 210, battery: 10 },
  { time: '22:00', consumption: 180, predicted: 185, optimal: 170, solar: 0, grid: 170, battery: 10 },
  { time: '23:00', consumption: 150, predicted: 155, optimal: 140, solar: 0, grid: 140, battery: 10 },
];

// Equipment energy consumption data (設備別電力消費データ)
const equipmentEnergyData: EquipmentEnergy[] = [
  { name: '空調設備', value: 35, saving: 12, status: 'optimized' },
  { name: '照明', value: 22, saving: 8, status: 'optimized' },
  { name: '製造装置', value: 18, saving: 4, status: 'manual' },
  { name: 'オフィス機器', value: 12, saving: 3, status: 'optimized' },
  { name: '給湯設備', value: 8, saving: 2, status: 'manual' },
  { name: 'その他', value: 5, saving: 1, status: 'manual' },
];

// Monthly energy consumption trend (月別電力消費トレンド)
const monthlyEnergyData: MonthlyEnergy[] = [
  { month: '1月', consumption: 42500, baseline: 48200, cost: 765000, saving: 102600 },
  { month: '2月', consumption: 41800, baseline: 47500, cost: 752400, saving: 102600 },
  { month: '3月', consumption: 40200, baseline: 46800, cost: 723600, saving: 118800 },
  { month: '4月', consumption: 38500, baseline: 45100, cost: 693000, saving: 118800 },
  { month: '5月', consumption: 37200, baseline: 44800, cost: 669600, saving: 136800 },
  { month: '6月', consumption: 39800, baseline: 47600, cost: 716400, saving: 140400 },
  { month: '7月', consumption: 45600, baseline: 54200, cost: 820800, saving: 154800 },
  { month: '8月', consumption: 46200, baseline: 55800, cost: 831600, saving: 172800 },
  { month: '9月', consumption: 42300, baseline: 50200, cost: 761400, saving: 142200 },
  { month: '10月', consumption: 39500, baseline: 46800, cost: 711000, saving: 131400 },
  { month: '11月', consumption: 40200, baseline: 47600, cost: 723600, saving: 133200 },
  { month: '12月', consumption: 41600, baseline: 49200, cost: 748800, saving: 136800 },
];

// Energy saving measures effectiveness (省エネ施策の効果)
const energySavingMeasuresData: EnergySavingMeasure[] = [
  { id: 1, measure: '空調制御最適化', status: 'active', implemented: '2025/01/15', energySaving: 12.5, costSaving: 225000, roi: 3.2 },
  { id: 2, measure: '照明LED化・調光制御', status: 'active', implemented: '2024/11/10', energySaving: 8.2, costSaving: 147600, roi: 2.8 },
  { id: 3, measure: '製造設備運転スケジュール最適化', status: 'active', implemented: '2025/02/05', energySaving: 6.8, costSaving: 122400, roi: 3.5 },
  { id: 4, measure: 'ピークカット運用', status: 'active', implemented: '2025/03/01', energySaving: 5.3, costSaving: 95400, roi: 1.5 },
  { id: 5, measure: '太陽光発電導入', status: 'pending', implemented: '2025/07予定', energySaving: 15.0, costSaving: 270000, roi: 6.2 },
  { id: 6, measure: '蓄電システム導入', status: 'pending', implemented: '2025/07予定', energySaving: 8.5, costSaving: 153000, roi: 7.5 },
];

// Solar power generation prediction data (太陽光発電予測データ)
const solarPredictionData: SolarPrediction[] = [
  { time: '05:00', direct: 5, predicted: 6 },
  { time: '06:00', direct: 20, predicted: 22 },
  { time: '07:00', direct: 40, predicted: 43 },
  { time: '08:00', direct: 70, predicted: 74 },
  { time: '09:00', direct: 100, predicted: 105 },
  { time: '10:00', direct: 120, predicted: 125 },
  { time: '11:00', direct: 140, predicted: 145 },
  { time: '12:00', direct: 150, predicted: 155 },
  { time: '13:00', direct: 140, predicted: 145 },
  { time: '14:00', direct: 120, predicted: 125 },
  { time: '15:00', direct: 100, predicted: 105 },
  { time: '16:00', direct: 70, predicted: 74 },
  { time: '17:00', direct: 40, predicted: 43 },
  { time: '18:00', direct: 10, predicted: 12 },
];

// Energy source breakdown (エネルギー源割合)
const energySourceData: EnergySource[] = [
  { name: '購入電力', value: 65 },
  { name: '自家発電（太陽光）', value: 25 },
  { name: '蓄電池放電', value: 10 },
];

// Anomaly detection alerts (異常検知アラート)
const anomalyAlerts: AnomalyAlert[] = [
  { id: 1, time: '08:45', equipment: '空調設備3F', type: '消費電力異常', status: 'active', detail: '通常パターンより32%高い消費電力を検知。効率低下の可能性。' },
  { id: 2, time: '12:20', equipment: '製造ライン2', type: '待機電力検知', status: 'active', detail: '稼働スケジュール外での電力消費を検知。不要稼働の可能性。' },
  { id: 3, time: '15:30', equipment: '太陽光発電システム', type: '発電効率低下', status: 'active', detail: '天候条件から予測される発電量より25%低い発電量。パネル劣化または汚れの可能性。' },
  { id: 4, time: '10:10', equipment: '照明制御装置', type: '応答なし', status: 'active', detail: '制御信号への応答がありません。装置の確認が必要です。' },
];

// Equipment status data (設備ステータスデータ)
const equipmentStatusData: EquipmentStatus[] = [
  { id: 1, name: '空調システム', status: 'operational', efficiency: 92, lastMaintenance: '2025/02/15', nextMaintenance: '2025/05/15' },
  { id: 2, name: '照明制御システム', status: 'operational', efficiency: 95, lastMaintenance: '2025/03/10', nextMaintenance: '2025/06/10' },
  { id: 3, name: '太陽光発電システム', status: 'warning', efficiency: 82, lastMaintenance: '2024/12/05', nextMaintenance: '2025/04/15' },
  { id: 4, name: '製造ライン電力管理', status: 'operational', efficiency: 88, lastMaintenance: '2025/01/20', nextMaintenance: '2025/04/20' },
  { id: 5, name: '蓄電システム', status: 'planned', efficiency: null, lastMaintenance: null, nextMaintenance: '2025/07/10' },
  { id: 6, name: 'エネルギー管理システム', status: 'operational', efficiency: 97, lastMaintenance: '2025/03/05', nextMaintenance: '2025/06/05' },
  { id: 7, name: '電力品質監視装置', status: 'error', efficiency: null, lastMaintenance: '2024/11/10', nextMaintenance: '調査中' },
];

// Electricity plan comparison data (電力料金プラン比較データ)
const electricityPlanData: ElectricityPlan[] = [
  { name: '現行プラン', base: 85000, usage: 472000, peak: 168000, total: 725000 },
  { name: '時間帯別プラン', base: 78000, usage: 435000, peak: 142000, total: 655000 },
  { name: 'ピークシフトプラン', base: 92000, usage: 412000, peak: 108000, total: 612000 },
  { name: '再エネ促進プラン', base: 82000, usage: 458000, peak: 135000, total: 675000 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main dashboard component
const EnergyOptimizationDashboard: React.FC = () => {
  // State for selected view (realtime, analysis, measures, equipment)
  const [selectedView, setSelectedView] = useState('realtime');
  // State for selected energy type in hourly chart
  const [selectedEnergyType, setSelectedEnergyType] = useState<HourlyEnergyKey>('consumption');

  // Function to get the display name for the selected energy type
  const getSelectedEnergyTypeName = (key: HourlyEnergyKey): string => {
    switch (key) {
      case 'consumption': return '実消費電力';
      case 'predicted': return '予測消費電力';
      case 'optimal': return '最適化目標';
      default: return '';
    }
  };

  // Helper function to get color based on status
  const getStatusColor = (status: EquipmentStatusType | MeasureStatus | AnomalyStatus): string => {
     switch (status) {
      case 'operational':
      case 'active': // For measures and anomalies
      case 'optimized':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'pending': // For measures
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'manual':
      case 'resolved': // Assuming resolved status for anomalies
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get text based on status
  const getStatusText = (status: EquipmentStatusType | MeasureStatus | AnomalyStatus): string => {
     switch (status) {
      case 'operational': return '正常稼働中';
      case 'active': return '運用中'; // Or '対応中' for anomalies
      case 'optimized': return '最適化済';
      case 'warning': return '要注意';
      case 'pending': return '計画中';
      case 'error': return '異常';
      case 'planned': return '計画中';
      case 'manual': return '手動';
      case 'resolved': return '解決済み';
      default: return String(status);
    }
  };


  return (
    <div className="space-y-6 font-sans"> {/* Added default font */}
      {/* Filters and View Selection Header */}
      <div className="bg-white p-4 rounded-lg shadow-md"> {/* Added shadow */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Energy Type Selector for Hourly Chart */}
          <div className="flex items-center space-x-2">
            <label htmlFor="energyTypeSelect" className="text-sm font-medium text-gray-700">表示項目:</label>
            <select
              id="energyTypeSelect"
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-1.5" // Adjusted padding
              value={selectedEnergyType}
              onChange={(e) => setSelectedEnergyType(e.target.value as HourlyEnergyKey)} // Cast value to type
            >
              <option value="consumption">実消費電力</option>
              <option value="predicted">予測消費電力</option>
              <option value="optimal">最適化目標</option>
            </select>
          </div>

          {/* View Selection Buttons */}
          <div className="flex space-x-2 flex-wrap gap-y-2"> {/* Added flex-wrap and gap */}
            {(['realtime', 'analysis', 'measures', 'equipment'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${ // Added font-medium and transition
                  selectedView === view
                    ? 'bg-green-600 text-white shadow-sm' // Active state
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Inactive state
                }`}
              >
                {view === 'realtime' ? 'リアルタイム' :
                 view === 'analysis' ? '分析' :
                 view === 'measures' ? '省エネ施策' : '設備管理'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card 1: Current Consumption */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      現在の消費電力
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        280 kWh {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">-12.5%</span>
                        <span className="ml-1 text-gray-500">(最適化前比)</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 2: Annual Savings */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      年間削減額
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {monthlyEnergyData.reduce((sum, d) => sum + d.saving, 0).toLocaleString()}円 {/* Dynamic Sum */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">ROI: 2.8年</span> {/* Example */}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Card 3: Solar Generation */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      太陽光発電量
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        100 kWh {/* Example */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-yellow-600 font-semibold">予測比: 95%</span>
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
                        {anomalyAlerts.filter(a => a.status === 'active').length}件 {/* Dynamic */}
                      </div>
                      <div className="flex items-baseline text-sm">
                        <span className="text-red-600 font-semibold">効率低下検出</span>
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
          {/* Hourly Energy Consumption Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">24時間の電力消費推移</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyEnergyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12}/>
                  <YAxis fontSize={12} unit="kWh"/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedEnergyType}
                    stroke="#10B981" // Green color
                    strokeWidth={2}
                    name={getSelectedEnergyTypeName(selectedEnergyType)} // Dynamic name
                    dot={false}
                  />
                  {/* Optionally show optimal or predicted as dashed lines */}
                  {selectedEnergyType !== 'optimal' && (
                     <Line type="monotone" dataKey="optimal" stroke="#A855F7" strokeDasharray="5 5" name="最適化目標" dot={false}/>
                  )}
                   {selectedEnergyType !== 'predicted' && (
                     <Line type="monotone" dataKey="predicted" stroke="#F59E0B" strokeDasharray="5 5" name="予測消費電力" dot={false}/>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Equipment Consumption and Energy Source Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Equipment Consumption Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">設備別電力消費（現在）</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={equipmentEnergyData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit="%" fontSize={12}/>
                    <YAxis dataKey="name" type="category" width={80} fontSize={12}/>
                    <Tooltip formatter={(value: number) => `${value}%`}/>
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" name="消費割合(%)" />
                    <Bar dataKey="saving" fill="#60A5FA" name="削減率(%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Energy Source Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">電力源内訳</h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energySourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {energySourceData.map((entry, index) => (
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

          {/* Solar Power Prediction Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">太陽光発電予測</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={solarPredictionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                   <defs>
                    <linearGradient id="colorSolarActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                    </linearGradient>
                     <linearGradient id="colorSolarPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12}/>
                  <YAxis fontSize={12} unit="kWh"/>
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="direct" stroke="#FBBF24" fillOpacity={1} fill="url(#colorSolarActual)" name="実発電量(kWh)" />
                  <Area type="monotone" dataKey="predicted" stroke="#F59E0B" fillOpacity={1} fill="url(#colorSolarPredicted)" name="予測発電量(kWh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Anomaly Alerts Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">異常・効率低下アラート</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                アラート設定
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時刻</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設備</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイプ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.equipment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {getStatusText(alert.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{alert.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Analysis View */}
      {selectedView === 'analysis' && (
        <>
          {/* Monthly Energy Consumption and Savings Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">月別電力消費・削減効果</h3>
            <div className="h-96"> {/* Increased height */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyEnergyData}
                  margin={{ top: 5, right: 40, left: 20, bottom: 5 }} // Adjusted right margin
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12}/>
                  {/* Y-axis for Bars (Consumption) */}
                  <YAxis yAxisId="left" orientation="left" stroke="#10B981" fontSize={12} unit="kWh"/>
                  {/* Y-axis for Line (Savings) */}
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" fontSize={12} unit="円"/>
                  <Tooltip formatter={(value: number, name: string) => [`${value.toLocaleString()}${name.includes('円') ? '円' : 'kWh'}`, name]}/>
                  <Legend />
                  <Bar yAxisId="left" dataKey="consumption" fill="#10B981" name="実電力消費(kWh)" />
                  <Bar yAxisId="left" dataKey="baseline" fill="#9CA3AF" name="最適化前想定(kWh)" />
                  <Line yAxisId="right" type="monotone" dataKey="saving" stroke="#3B82F6" name="削減効果(円)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Analysis Summary Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-1">年間消費電力</h4>
                <p className="text-2xl font-bold text-green-900">495,400 kWh</p>
                <p className="text-xs text-green-700 mt-1">前年比: -15.2%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">年間削減電力</h4>
                <p className="text-2xl font-bold text-blue-900">88,400 kWh</p>
                <p className="text-xs text-blue-700 mt-1">削減率: 15.2%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">CO2削減効果</h4>
                <p className="text-2xl font-bold text-yellow-900">42.4 t-CO2</p>
                <p className="text-xs text-yellow-700 mt-1">換算係数: 0.48kg-CO2/kWh</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 mb-1">再エネ比率</h4>
                <p className="text-2xl font-bold text-purple-900">25.3%</p>
                <p className="text-xs text-purple-700 mt-1">目標: 2026年までに40%</p>
              </div>
            </div>
          </div>

          {/* Electricity Plan Comparison and Optimization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Electricity Plan Comparison Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">電力料金プラン比較</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={electricityPlanData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10}/>
                    <YAxis fontSize={10} unit="円" tickFormatter={(value) => (value / 1000).toLocaleString() + '千'}/>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()}円`}/>
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="base" stackId="a" fill="#9CA3AF" name="基本料金" />
                    <Bar dataKey="usage" stackId="a" fill="#60A5FA" name="使用料金" />
                    <Bar dataKey="peak" stackId="a" fill="#F87171" name="ピーク料金" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">分析: </span>
                  現在の使用パターンでは、ピークシフトプランが最も経済的です。年間約110万円の削減が見込まれます。蓄電池導入後はさらに効果が高まる見込みです。
                </p>
              </div>
            </div>

            {/* Optimization Effects Details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">最適化効果の詳細分析</h3>
              <div className="space-y-4">
                {/* Peak Cut Effect */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">ピークカット効果</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">ピーク電力削減</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '28%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">料金削減効果</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">35%</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">ピーク時間帯（13-16時）の電力消費を抑制することで、基本料金の算定基準となる最大需要電力を削減しています。</p>
                  </div>
                </div>
                {/* Time-based Optimization Effect */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">時間帯別最適化効果</h4>
                   <div className="mt-2 space-y-2">
                     <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">昼間（9-17時）</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '18%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">夕方（17-22時）</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '12%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">12%</span>
                    </div>
                     <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">夜間（22-9時）</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '8%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">8%</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">昼間の高単価時間帯での削減効果が最も高く、料金削減に大きく貢献しています。</p>
                  </div>
                </div>
                {/* Self-Generation Contribution */}
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">自家発電貢献度</h4>
                  <div className="mt-2 space-y-2">
                     <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">太陽光発電</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 w-24">蓄電池システム</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2 overflow-hidden"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '10%' }}></div></div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">10%</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">太陽光発電と蓄電池の併用により、購入電力を約35%削減しています。蓄電池は主にピーク時間帯の電力供給に活用されています。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Optimization Effect Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">設備別最適化効果</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設備カテゴリ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消費割合</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">削減率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年間削減量</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最適化手法</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">追加施策提案</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Example Rows - Populate with actual data or map */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">空調設備</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '18%' }}></div></div>
                        <span>18%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31,200 kWh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AI温度制御、スケジュール最適化</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-green-600 hover:text-green-900">インバーター更新</button>
                    </td>
                  </tr>
                   <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">照明</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                        <span>25%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">27,250 kWh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LED化、人感センサー、調光制御</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-green-600 hover:text-green-900">タスク照明導入</button>
                    </td>
                  </tr>
                   <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">製造装置</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '10%' }}></div></div>
                        <span>10%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,900 kWh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">運転スケジュール最適化、待機電力削減</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-green-600 hover:text-green-900">高効率モーター導入</button>
                    </td>
                  </tr>
                   <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">オフィス機器</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                         <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div></div>
                        <span>15%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,950 kWh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">省エネ設定、自動スリープ制御</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button type="button" className="text-green-600 hover:text-green-900">電源管理システム導入</button>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Measures View */}
      {selectedView === 'measures' && (
        <>
          {/* Energy Saving Measures Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">省エネ施策一覧</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                施策追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">施策名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">導入時期</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">エネルギー削減率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年間削減額</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投資回収期間</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {energySavingMeasuresData.map((measure) => (
                    <tr key={measure.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{measure.measure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(measure.status)}`}>
                          {getStatusText(measure.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measure.implemented || '-'}</td>
                      {/* Energy Saving Rate */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${measure.energySaving * 5}%` }}></div></div>
                          <span>{measure.energySaving.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measure.costSaving.toLocaleString()}円</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measure.roi}年</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                        <button type="button" className="text-green-600 hover:text-green-900">編集</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details of AC and Lighting Optimization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* AC Optimization Details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">空調最適化詳細</h3>
               <div className="space-y-4">
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">現在の運用状況</h4>
                   <div className="mt-2 space-y-1 text-sm text-gray-600">
                     <p><span className="font-medium">制御方法:</span> AIによる自動温度・風量制御</p>
                     <p><span className="font-medium">稼働スケジュール:</span> 7:30-19:00（平日）、必要に応じて延長</p>
                     <p><span className="font-medium">設定温度:</span> 夏季26-28℃、冬季20-22℃（エリア別に最適化）</p>
                     <p><span className="font-medium">予測制御:</span> 気象データとオフィス使用予測に基づく先行制御</p>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">最適化手法</h4>
                   <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                     <li>機械学習による需要予測</li>
                     <li>ゾーン別制御（16ゾーン）</li>
                     <li>外気温連動制御</li>
                     <li>ピークカット協調制御</li>
                   </ul>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">次のステップ</h4>
                   <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                     <li>老朽化空調機のインバータ更新（3F, 4F）</li>
                     <li>在席検知センサーの追加</li>
                   </ul>
                 </div>
               </div>
            </div>

            {/* Lighting Optimization Details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">照明最適化詳細</h3>
               <div className="space-y-4">
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">現在の運用状況</h4>
                   <div className="mt-2 space-y-1 text-sm text-gray-600">
                     <p><span className="font-medium">LED化率:</span> 92%（残り8%は2025/05までに完了予定）</p>
                     <p><span className="font-medium">制御方法:</span> 人感センサー＋明るさセンサーによる自動制御</p>
                     <p><span className="font-medium">調光機能:</span> 全エリアで0-100%の無段階調光が可能</p>
                     <p><span className="font-medium">スケジュール:</span> 基本7:00-20:00、エリア別に最適化</p>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">最適化手法</h4>
                   <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                     <li>人感センサーによる自動点滅</li>
                     <li>自然光利用型調光制御</li>
                     <li>タスク・アンビエント照明の分離</li>
                     <li>時間帯別調光パターン</li>
                   </ul>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                   <h4 className="text-sm font-medium text-gray-900">次のステップ</h4>
                   <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                     <li>残りのLED化完了（工場エリア）</li>
                     <li>個別制御システムの拡充</li>
                     <li>照明の色温度制御導入検討</li>
                   </ul>
                 </div>
               </div>
            </div>
          </div>

          {/* Future Energy Saving Plan */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">将来の省エネ計画</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                2025-2026年に計画されている主要な省エネルギー施策です。これらの施策により、現状からさらに20%程度のエネルギー使用量の削減が見込まれています。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Plan 1: Solar */}
              <div className="bg-green-50 p-3 rounded-md border border-green-200">
                <h4 className="text-sm font-medium text-green-800 flex items-center justify-between">
                  <span>太陽光発電システム導入</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">2025/07</span>
                </h4>
                <div className="mt-2 text-xs text-green-700 space-y-1">
                  <p>・設置容量: 100kW</p>
                  <p>・年間発電量: 約95,000kWh</p>
                  <p>・CO2削減効果: 約45.6t-CO2/年</p>
                  <p>・初期投資: 2,700万円</p>
                  <p>・投資回収期間: 6.2年</p>
                  <p><span className="font-medium">状態:</span> 設計フェーズ</p>
                </div>
              </div>
              {/* Plan 2: Battery */}
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 flex items-center justify-between">
                  <span>蓄電システム導入</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">2025/07</span>
                </h4>
                 <div className="mt-2 text-xs text-blue-700 space-y-1">
                  <p>・蓄電容量: 100kWh</p>
                  <p>・主目的: ピークカット、太陽光余剰電力活用</p>
                  <p>・ピークカット容量: 約50kW</p>
                  <p>・初期投資: 1,800万円</p>
                  <p>・投資回収期間: 7.5年</p>
                  <p><span className="font-medium">状態:</span> 計画中</p>
                </div>
              </div>
              {/* Plan 3: BEMS */}
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 flex items-center justify-between">
                  <span>BEMS高度化</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">2025/10</span>
                </h4>
                <div className="mt-2 text-xs text-purple-700 space-y-1">
                  <p>・詳細データ収集: センサー増設（+150点）</p>
                  <p>・AIアルゴリズム強化: 予測精度+15%</p>
                  <p>・クラウド連携: リアルタイムデータ解析</p>
                  <p>・初期投資: 850万円</p>
                  <p>・投資回収期間: 3.8年</p>
                  <p><span className="font-medium">状態:</span> 要件定義中</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Equipment View */}
      {selectedView === 'equipment' && (
        <>
          {/* Equipment Status Table */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">エネルギー関連設備ステータス</h3>
              <button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                設備追加
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">設備名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">効率</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最終メンテナンス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">次回メンテナンス</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {equipmentStatusData.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{equipment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                          {getStatusText(equipment.status)}
                        </span>
                      </td>
                      {/* Efficiency */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {equipment.efficiency !== null ? (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                              <div className={`h-2.5 rounded-full ${
                                equipment.efficiency > 90 ? 'bg-green-500' :
                                equipment.efficiency > 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} style={{ width: `${equipment.efficiency}%` }}></div>
                            </div>
                            <span className="font-medium">{equipment.efficiency}%</span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.lastMaintenance || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{equipment.nextMaintenance}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button type="button" className="text-green-600 hover:text-green-900">詳細</button>
                        <button type="button" className="text-green-600 hover:text-green-900">制御</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Equipment Details and Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment Details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">空調システム詳細</h3> {/* Example */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">システム構成</h4>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">中央熱源:</span> 水冷チラー×2（計600kW）</p>
                    <p><span className="font-medium">エアハンドリングユニット:</span> 8台</p>
                    <p><span className="font-medium">ファンコイルユニット:</span> 42台</p>
                    <p><span className="font-medium">個別空調機:</span> 12台</p>
                    <p><span className="font-medium">導入年:</span> 2018年（一部2020年更新）</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">現在の運転状況</h4>
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between"><span>チラー1負荷率</span><span className="font-medium">65%</span></div>
                    <div className="flex items-center justify-between"><span>チラー2負荷率</span><span className="font-medium">42%</span></div>
                    <div className="flex items-center justify-between"><span>全体運転効率</span><span className="font-medium">92%</span></div>
                    <p className="mt-2 text-xs text-gray-500">システム全体が最適負荷率で運転されています。</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">メンテナンス履歴</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>2025/02/15: 定期点検 - フィルター交換、制御システム更新</li>
                    <li>2024/11/08: 冬季運転準備 - 熱交換器清掃</li>
                    <li>2024/08/20: 定期点検 - センサーキャリブレーション</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Equipment Control Panel */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">設備制御パネル</h3>
              <form className="space-y-4">
                {/* Equipment Selection */}
                <div>
                  <label htmlFor="equipment-select-control" className="block text-sm font-medium text-gray-700 mb-1">設備選択</label>
                  <select
                    id="equipment-select-control"
                    name="equipment-select-control"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-1.5"
                  >
                    {equipmentStatusData.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
                  </select>
                </div>

                {/* Operation Mode */}
                <div>
                  <label htmlFor="operation-mode" className="block text-sm font-medium text-gray-700 mb-1">運転モード</label>
                  <select
                    id="operation-mode"
                    name="operation-mode"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-1.5"
                  >
                    <option>AI最適化（推奨）</option>
                    <option>標準運転</option>
                    <option>省エネ運転</option>
                    <option>高負荷運転</option>
                    <option>マニュアル制御</option>
                  </select>
                </div>

                {/* Temperature Setting */}
                <div>
                  <label htmlFor="temperature-setting" className="block text-sm font-medium text-gray-700 mb-1">温度設定</label>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-8 text-center">18℃</span>
                    <input
                      id="temperature-setting"
                      type="range"
                      min="18" max="30" step="0.5" defaultValue="26"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500 mx-2"
                    />
                    <span className="text-sm text-gray-500 w-8 text-center">30℃</span>
                    <span className="ml-3 text-sm font-medium text-gray-900 w-12 text-right">26.0℃</span> {/* Display current value */}
                  </div>
                </div>

                {/* Zone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ゾーン選択</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <input id="zone-1f" name="zone-1f" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <label htmlFor="zone-1f" className="ml-2 block text-sm text-gray-700">1F</label>
                    </div>
                    <div className="flex items-center">
                      <input id="zone-2f" name="zone-2f" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <label htmlFor="zone-2f" className="ml-2 block text-sm text-gray-700">2F</label>
                    </div>
                    <div className="flex items-center">
                      <input id="zone-3f" name="zone-3f" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <label htmlFor="zone-3f" className="ml-2 block text-sm text-gray-700">3F</label>
                    </div>
                    <div className="flex items-center">
                      <input id="zone-4f" name="zone-4f" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <label htmlFor="zone-4f" className="ml-2 block text-sm text-gray-700">4F</label>
                    </div>
                    <div className="flex items-center">
                      <input id="zone-office" name="zone-office" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                      <label htmlFor="zone-office" className="ml-2 block text-sm text-gray-700">オフィス</label>
                    </div>
                    {/* Completed Checkbox */}
                    <div className="flex items-center">
                      <input id="zone-meeting" name="zone-meeting" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                      <label htmlFor="zone-meeting" className="ml-2 block text-sm text-gray-700">会議室</label>
                    </div>
                     <div className="flex items-center">
                      <input id="zone-factory" name="zone-factory" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                      <label htmlFor="zone-factory" className="ml-2 block text-sm text-gray-700">工場</label>
                    </div>
                     <div className="flex items-center">
                      <input id="zone-warehouse" name="zone-warehouse" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                      <label htmlFor="zone-warehouse" className="ml-2 block text-sm text-gray-700">倉庫</label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    リセット
                  </button>
                  <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    適用
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

export default EnergyOptimizationDashboard;
