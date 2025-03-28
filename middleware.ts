// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

// 認証が必要なパスの一覧
const protectedPaths = [
  '/dashboard',
  '/services/',
  '/account',
  '/support',
];

// 認証ページのパス
const authPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/reset-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 静的アセットやAPIリクエストはスキップ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // ファイル（画像など）へのリクエスト
  ) {
    return NextResponse.next();
  }

  // Firebase認証のセッションCookieをチェック
  // Firebase認証ではクライアントサイドでトークンを管理するため、ミドルウェアでは
  // セッションCookie（firebase-auth-token）の有無だけをチェックする単純な方法を採用
  const firebaseAuthCookie = request.cookies.get('firebase-auth-token');
  const isAuthenticated = !!firebaseAuthCookie;

  // 認証が必要なパスかどうかをチェック
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // 認証ページかどうかをチェック
  const isAuthPath = authPaths.some(path => pathname === path);

  // 認証が必要なパスにアクセスしたが、認証されていない場合はログインページにリダイレクト
  if (isProtectedPath && !isAuthenticated) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 認証済みユーザーが認証ページにアクセスした場合はダッシュボードにリダイレクト
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    /*
     * マッチパターン:
     * - /dashboard, /account, /support で始まるすべてのルート
     * - /services/ で始まるルート (認証が必要なサービス管理ページ)
     * - /auth で始まるルート
     * - マーケティングサイトのルート
     */
    '/dashboard/:path*',
    '/account/:path*',
    '/support/:path*',
    '/services/:path*',
    '/auth/:path*',
    '/',
    '/about/:path*',
    '/services',
    '/case-studies/:path*',
    '/pricing/:path*',
    '/contact/:path*',
    '/blog/:path*',
  ],
};