// lib/firebase/auth.ts
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup
  } from 'firebase/auth';
  import { doc, setDoc, getDoc } from 'firebase/firestore';
  import { auth, db } from './config';
  
  export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'free' | 'basic' | 'professional' | 'enterprise' | 'admin';
    createdAt: string;
  }
  
  // ユーザー登録
  export const registerUser = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Firestoreにユーザープロファイルを保存
      await createUserProfile(user, displayName);
      
      // 認証トークンを取得してCookieに保存
      const token = await user.getIdToken();
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 14}`; // 14日間
      
      return { user };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  // ユーザープロファイルの作成
  export const createUserProfile = async (user: User, displayName: string) => {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName,
      role: 'free', // デフォルトは無料会員
      createdAt: new Date().toISOString(),
    };
  
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  };
  
  // メール/パスワードでログイン
  export const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 認証トークンを取得してCookieに保存
      const token = await user.getIdToken();
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 14}`; // 14日間
      
      return { user };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  
  // Googleでログイン
  export const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Firestoreでユーザープロファイルを確認し、なければ作成
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await createUserProfile(user, user.displayName || '');
      }
      
      // 認証トークンを取得してCookieに保存
      const token = await user.getIdToken();
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 14}`; // 14日間
      
      return { user };
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };
  
  // ログアウト
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      
      // 認証Cookieを削除
      document.cookie = 'firebase-auth-token=; path=/; max-age=0';
      
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };
  
  // パスワードリセットメールの送信
  export const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };
  
  // ユーザープロファイルの取得
  export const getUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };