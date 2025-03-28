// components/settings/SecuritySettings.tsx
'use client';

import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  // パスワードの強度をチェック
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
    
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewPassword(newValue);
    checkPasswordStrength(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError(null);
    
    // 入力チェック
    if (!currentPassword) {
      setSaveError('現在のパスワードを入力してください');
      return;
    }
    
    if (!newPassword) {
      setSaveError('新しいパスワードを入力してください');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setSaveError('新しいパスワードと確認用パスワードが一致しません');
      return;
    }
    
    if (newPassword.length < 8) {
      setSaveError('パスワードは8文字以上である必要があります');
      return;
    }
    
    if (passwordStrength < 3) {
      setSaveError('より強力なパスワードを設定してください（大文字、小文字、数字、記号を含めることをお勧めします）');
      return;
    }
    
    setUpdating(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.email) {
        // 現在のパスワードでユーザーを再認証
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        
        await reauthenticateWithCredential(user, credential);
        
        // パスワード更新
        await updatePassword(user, newPassword);
        
        // フォームをリセット
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordStrength(0);
        
        setSaveSuccess(true);
        
        // 3秒後に成功メッセージを消す
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      
      // エラーメッセージをより具体的に設定
      if (error.code === 'auth/wrong-password') {
        setSaveError('現在のパスワードが正しくありません');
      } else if (error.code === 'auth/weak-password') {
        setSaveError('パスワードが弱すぎます。より強力なパスワードを設定してください');
      } else if (error.code === 'auth/requires-recent-login') {
        setSaveError('セキュリティのため、再度ログインした後に操作を行ってください');
      } else {
        setSaveError('パスワードの更新中にエラーが発生しました。後でもう一度お試しください');
      }
    } finally {
      setUpdating(false);
    }
  };

  // パスワード強度に応じた色とテキストを定義
  const strengthColors = ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];
  const strengthTexts = ['', '非常に弱い', '弱い', '普通', '強い', '非常に強い'];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">セキュリティ設定</h2>
      
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4">パスワード変更</h3>
        
        <form onSubmit={handleSubmit}>
          {saveSuccess && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
              パスワードが正常に更新されました。
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
              {saveError}
            </div>
          )}
          
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                現在のパスワード
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                新しいパスワード
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              {/* パスワード強度インジケーター */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 w-1/5 ${passwordStrength >= level ? strengthColors[level] : 'bg-gray-200'}`}
                      ></div>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    パスワードの強度: {strengthTexts[passwordStrength]}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    ※ 大文字、小文字、数字、記号を含めると強度が高まります
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                新しいパスワード（確認）
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                'パスワードを変更'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">二要素認証</h3>
        <p className="text-gray-600 mb-4">
          アカウントのセキュリティを強化するために二要素認証を有効にすることをお勧めします。
          現在この機能は開発中です。
        </p>
        <button
          disabled
          className="px-4 py-2 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
        >
          近日公開予定
        </button>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="font-medium text-gray-900 mb-4">セッション管理</h3>
        <p className="text-gray-600 mb-4">
          アクティブなセッションを確認し、必要に応じてログアウトすることができます。
          現在この機能は開発中です。
        </p>
        <button
          disabled
          className="px-4 py-2 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
        >
          近日公開予定
        </button>
      </div>
    </div>
  );
}