// app/(auth)/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  ChartBarIcon,
  ClockIcon,
  MapIcon,
  BellIcon,
  CogIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const DashboardCard = ({ title, value, description, icon: Icon, color }: DashboardCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const ServiceCard = ({ title, description, status, href, icon: Icon }: ServiceCardProps) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const statusText = {
    active: '利用中',
    inactive: '未利用',
    pending: '設定中',
  };

  return (
    <Link href={href} className="block">
      <div className="bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-[#f0f7ff] rounded-md">
                <Icon className="h-6 w-6 text-[#0056b3]" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[status]
              }`}
            >
              {statusText[status]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  const { userProfile } = useAuth();

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">ダッシュボード</h1>
        <p className="mt-1 text-sm text-gray-500">
          {userProfile?.displayName ? `${userProfile.displayName}様` : 'ようこそ'}、スマートシティAIへ
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900">概要</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="サービス利用状況"
            value="2/6"
            description="利用中のサービス数"
            icon={ChartBarIcon}
            color="bg-[#0056b3]"
          />
          <DashboardCard
            title="最終データ更新"
            value="2時間前"
            description="すべてのサービスの最新更新"
            icon={ClockIcon}
            color="bg-[#00a86b]"
          />
          <DashboardCard
            title="未読通知"
            value="3"
            description="確認が必要な通知"
            icon={BellIcon}
            color="bg-[#ff7e00]"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">利用中のサービス</h2>
          <Link
            href="/services"
            className="text-sm font-medium text-[#0056b3] hover:text-[#004494]"
          >
            すべて表示
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <ServiceCard
            title="交通AI予測"
            description="AIによる交通量の予測と最適化"
            status="active"
            href="/services/traffic"
            icon={MapIcon}
          />
          <ServiceCard
            title="予測分析AI"
            description="時系列データの分析と未来予測"
            status="active"
            href="/services/prediction"
            icon={ArrowTrendingUpIcon}
          />
          <ServiceCard
            title="エネルギー最適化"
            description="エネルギー消費の分析と最適化"
            status="pending"
            href="/services/energy"
            icon={ChartBarIcon}
          />
          <ServiceCard
            title="環境モニタリング"
            description="大気質と環境データの監視"
            status="inactive"
            href="/services/environment"
            icon={CogIcon}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg bg-gray-50 overflow-hidden shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              始めましょう
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                サービスを最大限に活用するためのクイックスタートガイド
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                <div className="mb-3 flex items-center justify-center h-10 w-10 rounded-md bg-[#0056b3] text-white">
                  1
                </div>
                <div className="text-sm font-medium text-gray-900">サービスの選択</div>
                <p className="mt-1 text-sm text-gray-500">必要なサービスを選択して有効化します</p>
              </div>
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                <div className="mb-3 flex items-center justify-center h-10 w-10 rounded-md bg-[#0056b3] text-white">
                  2
                </div>
                <div className="text-sm font-medium text-gray-900">データの接続</div>
                <p className="mt-1 text-sm text-gray-500">必要なデータソースを接続します</p>
              </div>
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                <div className="mb-3 flex items-center justify-center h-10 w-10 rounded-md bg-[#0056b3] text-white">
                  3
                </div>
                <div className="text-sm font-medium text-gray-900">分析と活用</div>
                <p className="mt-1 text-sm text-gray-500">AIによる分析結果を確認し活用します</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}