// app/(auth)/settings/page.tsx
import React from 'react';
import { Metadata } from 'next';
import SettingsTabs from '@/components/settings/SettingsTabs';

export const metadata: Metadata = {
  title: 'アカウント設定 | スマートシティAIソリューション',
  description: 'ユーザープロファイル、通知設定、セキュリティ設定などを管理します。',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">アカウント設定</h1>
        <p className="text-gray-600">
          ユーザープロファイル、通知設定、セキュリティ設定を管理できます。
        </p>
      </div>
      
      <SettingsTabs />
    </div>
  );
}