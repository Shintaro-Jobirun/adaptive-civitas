// lib/utils/mockDataGenerator.ts
import { TrafficData } from '@/components/traffic/TrafficDashboard';

// 観測地点のサンプルデータ
const sampleLocations = [
  { id: 'loc1', name: '中央交差点', lat: 35.652, lng: 139.712 },
  { id: 'loc2', name: '駅前広場', lat: 35.658, lng: 139.701 },
  { id: 'loc3', name: '商業エリア北', lat: 35.665, lng: 139.705 },
  { id: 'loc4', name: '商業エリア南', lat: 35.661, lng: 139.714 },
  { id: 'loc5', name: '住宅街入口', lat: 35.668, lng: 139.722 },
  { id: 'loc6', name: '工業地区', lat: 35.657, lng: 139.732 },
  { id: 'loc7', name: '学校前', lat: 35.673, lng: 139.709 },
  { id: 'loc8', name: '公園通り', lat: 35.669, lng: 139.716 },
];

/**
 * 指定された時間範囲に基づいてモック交通データを生成する
 * @param count 生成するデータポイント数
 * @param timeFrame 時間範囲
 * @returns 生成された交通データの配列
 */
export function generateMockTrafficData(
  count: number,
  timeFrame: 'realtime' | '24h' | '7days' | '30days'
): TrafficData[] {
  const now = new Date();
  const result: TrafficData[] = [];

  // 時間範囲に基づいて開始時間を決定
  let startTime: Date;
  switch (timeFrame) {
    case 'realtime':
      startTime = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2時間前
      break;
    case '24h':
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24時間前
      break;
    case '7days':
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7日前
      break;
    case '30days':
      startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30日前
      break;
  }

  // データポイント間の時間間隔を計算
  const timeRangeMs = now.getTime() - startTime.getTime();
  const timeStepMs = timeRangeMs / count;

  // それぞれの場所ごとにデータを生成
  sampleLocations.forEach(location => {
    // 基本的な交通量を設定（場所によって異なる）
    const baseTrafficVolume = 100 + Math.floor(Math.random() * 400);
    const baseSpeed = 30 + Math.floor(Math.random() * 30);
    
    // 各時間ポイントでデータを生成
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(startTime.getTime() + i * timeStepMs);
      const hour = timestamp.getHours();
      
      // 時間帯による変動（朝と夕方のピーク）
      let timeMultiplier = 1;
      if (hour >= 7 && hour <= 9) {
        timeMultiplier = 1.5; // 朝のピーク
      } else if (hour >= 17 && hour <= 19) {
        timeMultiplier = 1.7; // 夕方のピーク
      } else if (hour >= 22 || hour <= 5) {
        timeMultiplier = 0.4; // 深夜
      }
      
      // 交通量を計算（基本値 + 時間変動 + ランダム変動）
      const randomFactor = 0.7 + (Math.random() * 0.6); // 0.7～1.3のランダム係数
      const trafficVolume = Math.floor(baseTrafficVolume * timeMultiplier * randomFactor);
      
      // 渋滞レベルを決定（交通量に基づく）
      let congestionLevel: 0 | 1 | 2 | 3;
      if (trafficVolume < baseTrafficVolume * 0.8) {
        congestionLevel = 0; // 空いている
      } else if (trafficVolume < baseTrafficVolume * 1.2) {
        congestionLevel = 1; // やや混雑
      } else if (trafficVolume < baseTrafficVolume * 1.6) {
        congestionLevel = 2; // 混雑
      } else {
        congestionLevel = 3; // 非常に混雑
      }
      
      // 平均速度を計算（渋滞レベルに基づく）
      let speedFactor;
      switch (congestionLevel) {
        case 0: speedFactor = 0.9 + (Math.random() * 0.2); break; // 90-110%
        case 1: speedFactor = 0.7 + (Math.random() * 0.2); break; // 70-90%
        case 2: speedFactor = 0.5 + (Math.random() * 0.2); break; // 50-70%
        case 3: speedFactor = 0.3 + (Math.random() * 0.2); break; // 30-50%
      }
      const averageSpeed = Math.floor(baseSpeed * speedFactor);
      
      // 車両タイプの内訳を生成
      const carRatio = 0.6 + (Math.random() * 0.2); // 60-80%
      const busRatio = 0.03 + (Math.random() * 0.03); // 3-6%
      const truckRatio = 0.05 + (Math.random() * 0.05); // 5-10%
      const motorcycleRatio = 0.05 + (Math.random() * 0.05); // 5-10%
      
      // 残りを自転車と歩行者に割り当て
      const remainingRatio = 1 - (carRatio + busRatio + truckRatio + motorcycleRatio);
      const bicycleRatio = remainingRatio * 0.6; // 残りの60%
      const pedestrianRatio = remainingRatio * 0.4; // 残りの40%
      
      const car = Math.floor(trafficVolume * carRatio);
      const bus = Math.floor(trafficVolume * busRatio);
      const truck = Math.floor(trafficVolume * truckRatio);
      const motorcycle = Math.floor(trafficVolume * motorcycleRatio);
      const bicycle = Math.floor(trafficVolume * bicycleRatio);
      const pedestrian = Math.floor(trafficVolume * pedestrianRatio);
      
      // データポイントを作成
      result.push({
        timestamp,
        location: {
          id: location.id,
          name: location.name,
          lat: location.lat,
          lng: location.lng
        },
        trafficVolume,
        congestionLevel,
        averageSpeed,
        vehicleTypes: {
          car,
          bus,
          truck,
          motorcycle,
          bicycle,
          pedestrian
        }
      });
    }
  });

  return result;
}