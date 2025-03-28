// components/settings/SettingsTabs.tsx
'use client';

import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

type TabType = 'profile' | 'notifications' | 'security';

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleTabClick('profile')}
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              プロフィール
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => handleTabClick('notifications')}
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              通知設定
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => handleTabClick('security')}
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              セキュリティ
            </button>
          </li>
        </ul>
      </div>
      
      <div className="p-6">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
}