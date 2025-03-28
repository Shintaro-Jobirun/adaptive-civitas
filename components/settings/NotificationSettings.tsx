// components/settings/NotificationSettings.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface NotificationSettings {
  emailNotifications: boolean;
  serviceUpdates: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  dataReports: boolean;
  systemAlerts: boolean;
}

export default function NotificationSettings() {
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    serviceUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    dataReports: true,
    systemAlerts: true,
  });

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Firestoreからユーザーの通知設定を取得
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists() && userDocSnap.data().notificationSettings) {
            const notificationData = userDocSnap.data().notificationSettings;
            setSettings(notificationData);
          }
        }
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  const handleToggleChange = (settingName: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [settingName]: !prev[settingName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError(null);
    setUpdating(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Firestoreのユーザー通知設定を更新
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          notificationSettings: settings,
          updatedAt: new Date(),
        });

        setSaveSuccess(true);
        
        // 3秒後に成功メッセージを消す
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setSaveError('通知設定の更新中にエラーが発生しました。後でもう一度お試しください。');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 通知設定が全てオフの場合は、メールを一切受け取らない
  const allNotificationsDisabled = !settings.emailNotifications;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">通知設定</h2>
      
      <form onSubmit={handleSubmit}>
        {saveSuccess && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
            通知設定が正常に更新されました。
          </div>
        )}
        
        {saveError && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
            {saveError}
          </div>
        )}
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h3 className="font-medium text-gray-900">メール通知</h3>
              <p className="text-gray-500 text-sm">システムからのメール通知を受け取る</p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={() => handleToggleChange('emailNotifications')}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="emailNotifications"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></label>
            </div>
          </div>
          
          <div className={`pl-4 space-y-4 ${allNotificationsDisabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-900">サービスアップデート</h3>
                <p className="text-gray-500 text-sm">サービスの更新や新機能についての通知</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="serviceUpdates"
                  checked={settings.serviceUpdates && !allNotificationsDisabled}
                  onChange={() => handleToggleChange('serviceUpdates')}
                  disabled={allNotificationsDisabled}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="serviceUpdates"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.serviceUpdates && !allNotificationsDisabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-900">マーケティングメール</h3>
                <p className="text-gray-500 text-sm">新サービスやキャンペーンのお知らせ</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  checked={settings.marketingEmails && !allNotificationsDisabled}
                  onChange={() => handleToggleChange('marketingEmails')}
                  disabled={allNotificationsDisabled}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="marketingEmails"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.marketingEmails && !allNotificationsDisabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-900">セキュリティアラート</h3>
                <p className="text-gray-500 text-sm">アカウントセキュリティに関する重要な通知</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="securityAlerts"
                  checked={settings.securityAlerts && !allNotificationsDisabled}
                  onChange={() => handleToggleChange('securityAlerts')}
                  disabled={allNotificationsDisabled}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="securityAlerts"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.securityAlerts && !allNotificationsDisabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-900">データレポート</h3>
                <p className="text-gray-500 text-sm">定期的なデータ分析レポート</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="dataReports"
                  checked={settings.dataReports && !allNotificationsDisabled}
                  onChange={() => handleToggleChange('dataReports')}
                  disabled={allNotificationsDisabled}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="dataReports"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.dataReports && !allNotificationsDisabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-900">システムアラート</h3>
                <p className="text-gray-500 text-sm">システムのメンテナンスや障害情報</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="systemAlerts"
                  checked={settings.systemAlerts && !allNotificationsDisabled}
                  onChange={() => handleToggleChange('systemAlerts')}
                  disabled={allNotificationsDisabled}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="systemAlerts"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    settings.systemAlerts && !allNotificationsDisabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updating}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              updating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {updating ? (
              <span className="flex items-center">
                <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                更新中...
              </span>
            ) : (
              '変更を保存'
            )}
          </button>
        </div>
      </form>
      
      {/* トグルスイッチ用のスタイル */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          transform: translateX(100%);
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  );
}