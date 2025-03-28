// components/settings/ProfileSettings.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface ProfileData {
  displayName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  jobTitle: string;
  address: string;
}

export default function ProfileSettings() {
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    jobTitle: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Firestoreからユーザープロファイルを取得
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            setProfileData({
              displayName: userData.displayName || user.displayName || '',
              email: user.email || '',
              phoneNumber: userData.phoneNumber || user.phoneNumber || '',
              organization: userData.organization || '',
              jobTitle: userData.jobTitle || '',
              address: userData.address || '',
            });
          } else {
            // ユーザードキュメントが存在しない場合は、Authのデータを使用
            setProfileData({
              displayName: user.displayName || '',
              email: user.email || '',
              phoneNumber: user.phoneNumber || '',
              organization: '',
              jobTitle: '',
              address: '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
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
        // Firestoreのユーザープロファイルを更新
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          displayName: profileData.displayName,
          phoneNumber: profileData.phoneNumber,
          organization: profileData.organization,
          jobTitle: profileData.jobTitle,
          address: profileData.address,
          updatedAt: new Date(),
        });

        setSaveSuccess(true);
        
        // 3秒後に成功メッセージを消す
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError('プロファイルの更新中にエラーが発生しました。後でもう一度お試しください。');
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">プロフィール設定</h2>
      
      <form onSubmit={handleSubmit}>
        {saveSuccess && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
            プロフィールが正常に更新されました。
          </div>
        )}
        
        {saveError && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
            {saveError}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={profileData.displayName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              readOnly
              disabled
              className="w-full p-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              メールアドレスは変更できません
            </p>
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
              組織・会社名
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={profileData.organization}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              役職
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={profileData.jobTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              住所
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
    </div>
  );
}