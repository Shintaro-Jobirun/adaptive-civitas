// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getUserProfile, UserProfile } from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // ユーザープロファイルを取得
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Firebase トークンを更新しCookieに保存
          // これにより、トークンが期限切れになっても自動的に更新される
          const token = await user.getIdToken(true);
          document.cookie = `firebase-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 14}`; // 14日間
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
        // ユーザーがログアウトしたらCookieを削除
        document.cookie = 'firebase-auth-token=; path=/; max-age=0';
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};