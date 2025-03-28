// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  // ボタンのスタイルをバリアントに応じて設定
  const variantClasses = {
    primary: 'bg-[#0056b3] hover:bg-[#004494] text-white shadow',
    secondary: 'bg-[#00a86b] hover:bg-[#008c59] text-white shadow',
    outline: 'bg-transparent border border-[#0056b3] text-[#0056b3] hover:bg-[#f0f7ff]',
    ghost: 'bg-transparent text-[#0056b3] hover:bg-[#f0f7ff]',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // サイズに応じたパディングを設定
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>読み込み中...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;