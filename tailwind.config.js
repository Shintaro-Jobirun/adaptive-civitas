/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // プライマリーカラー: 信頼性を表す青
          primary: {
            DEFAULT: '#0056b3',
            light: '#0f77e6',
            dark: '#004494',
            50: '#e6f1ff',
            100: '#c4dcff',
            200: '#9fc5fb',
            300: '#77abf6',
            400: '#4d90f0',
            500: '#0056b3',
            600: '#0047a3',
            700: '#003982',
            800: '#002b61',
            900: '#001c40',
          },
          // セカンダリーカラー: 持続可能性を表す緑
          secondary: {
            DEFAULT: '#00a86b',
            light: '#00d287',
            dark: '#008c59',
            50: '#e6fff3',
            100: '#b3ffe0',
            200: '#80ffcd',
            300: '#4dfcb9',
            400: '#1ae9a0',
            500: '#00a86b',
            600: '#00915c',
            700: '#007a4d',
            800: '#00633f',
            900: '#004d30',
          },
          // アクセントカラー: 活力を表すオレンジ
          accent: {
            DEFAULT: '#ff7e00',
            light: '#ff9a33',
            dark: '#cc6500',
            50: '#fff3e6',
            100: '#ffe0b3',
            200: '#ffcb80',
            300: '#ffb54d',
            400: '#ff9a1a',
            500: '#ff7e00',
            600: '#e67200',
            700: '#cc6500',
            800: '#a35200',
            900: '#7a3d00',
          },
          // 中性色
          neutral: {
            50: '#f8f9fa',
            100: '#e9ecef',
            200: '#dee2e6',
            300: '#ced4da',
            400: '#adb5bd',
            500: '#6c757d',
            600: '#495057',
            700: '#343a40',
            800: '#212529',
            900: '#131619',
          },
        },
        fontFamily: {
          // 見出し用フォント
          heading: ['Inter', 'sans-serif'],
          // 本文用フォント（日本語対応）
          body: ['Noto Sans JP', 'sans-serif'],
          // コード表示用フォント
          mono: ['Source Code Pro', 'monospace'],
        },
        borderRadius: {
          // 角丸設定
          'sm': '0.125rem',
          DEFAULT: '0.25rem',
          'md': '0.375rem',
          'lg': '0.5rem',
          'xl': '0.75rem',
          '2xl': '1rem',
        },
        spacing: {
          // 余白設定の拡張
          '72': '18rem',
          '80': '20rem',
          '96': '24rem',
          '128': '32rem',
        },
        boxShadow: {
          // 影設定
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          'none': 'none',
        },
        screens: {
          // レスポンシブブレイクポイント
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
        animation: {
          // アニメーション設定
          'fade-in': 'fadeIn 0.5s ease-out',
          'slide-in': 'slideIn 0.5s ease-out',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideIn: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [
      // require('@tailwindcss/forms'), // フォーム要素のスタイリング
      // require('@tailwindcss/typography'), // 文書コンテンツのスタイリング
      // require('@tailwindcss/aspect-ratio'), // アスペクト比の制御
    ],
  };