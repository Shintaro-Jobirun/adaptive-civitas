// app/(marketing)/contact/page.tsx
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  planInterest: string;
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      planInterest: planParam,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // ここでは実際のAPI送信は行わず、成功のシミュレーションのみ
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Submit data:', data);
      reset();
      setIsSuccess(true);
    } catch (err) {
      setError('送信に失敗しました。後ほど再度お試しいただくか、直接お電話でお問い合わせください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* ヘッダー */}
      <div className="bg-[#0056b3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              お問い合わせ
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
              スマートシティソリューションについてのご質問や導入のご相談など、お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* コンタクト情報 */}
              <div className="relative overflow-hidden py-10 px-6 bg-[#0056b3] sm:px-10 lg:col-span-1">
                <div className="absolute inset-0 pointer-events-none">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width="404"
                    height="404"
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="4"
                          className="text-blue-500"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="404"
                      height="404"
                      fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white">お問い合わせ先</h3>
                  <p className="mt-6 text-base text-blue-50 max-w-3xl">
                    サービスの導入やカスタマイズについてのご相談、価格のお見積り、デモのご依頼など、お気軽にお問い合わせください。
                  </p>
                  <dl className="mt-8 space-y-6">
                    <dt>
                      <span className="sr-only">住所</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="ml-3">
                        〒000-0000
                        <br />
                        ○○県○○市○○町0-0
                      </span>
                    </dd>
                    <dt>
                      <span className="sr-only">電話番号</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="ml-3">TEL: 00-0000-0000</span>
                    </dd>
                    <dt>
                      <span className="sr-only">メールアドレス</span>
                    </dt>
                    <dd className="flex text-base text-blue-50">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-blue-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="ml-3">Email: info@example.com</span>
                    </dd>
                  </dl>
                  <ul role="list" className="mt-8 flex space-x-12">
                    <li>
                      <a className="text-blue-200 hover:text-blue-100" href="#" target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Facebook</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-200 hover:text-blue-100" href="#" target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Twitter</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-200 hover:text-blue-100" href="#" target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* お問い合わせフォーム */}
              <div className="py-10 px-6 sm:px-10 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900">お問い合わせフォーム</h3>
                
                {isSuccess ? (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          お問い合わせを受け付けました
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            担当者より1営業日以内にご連絡させていただきます。お急ぎの場合は、お電話でもお問い合わせいただけます。
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={() => setIsSuccess(false)}
                          >
                            新しいお問い合わせを作成
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form
                    className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {error && (
                      <div className="sm:col-span-2 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              エラーが発生しました
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{error}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Input
                        id="firstName"
                        label="姓"
                        type="text"
                        autoComplete="given-name"
                        placeholder="例：山田"
                        fullWidth
                        error={errors.firstName?.message}
                        {...register('firstName', {
                          required: '姓を入力してください',
                        })}
                      />
                    </div>
                    <div>
                      <Input
                        id="lastName"
                        label="名"
                        type="text"
                        autoComplete="family-name"
                        placeholder="例：太郎"
                        fullWidth
                        error={errors.lastName?.message}
                        {...register('lastName', {
                          required: '名を入力してください',
                        })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        id="company"
                        label="会社名/組織名"
                        type="text"
                        autoComplete="organization"
                        placeholder="例：株式会社○○○"
                        fullWidth
                        error={errors.company?.message}
                        {...register('company', {
                          required: '会社名/組織名を入力してください',
                        })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        id="email"
                        label="メールアドレス"
                        type="email"
                        autoComplete="email"
                        placeholder="例：example@example.com"
                        fullWidth
                        error={errors.email?.message}
                        {...register('email', {
                          required: 'メールアドレスを入力してください',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '有効なメールアドレスを入力してください',
                          },
                        })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        id="phone"
                        label="電話番号"
                        type="tel"
                        autoComplete="tel"
                        placeholder="例：03-1234-5678"
                        fullWidth
                        error={errors.phone?.message}
                        {...register('phone', {
                          required: '電話番号を入力してください',
                        })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        お問い合わせ内容
                      </label>
                      <div className="mt-1">
                        <select
                          id="subject"
                          className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
                          {...register('subject', {
                            required: 'お問い合わせ内容を選択してください',
                          })}
                        >
                          <option value="">選択してください</option>
                          <option value="demo">デモのリクエスト</option>
                          <option value="quotation">お見積り依頼</option>
                          <option value="consultation">導入相談</option>
                          <option value="customization">カスタマイズについて</option>
                          <option value="support">サポートについて</option>
                          <option value="other">その他</option>
                        </select>
                      </div>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                    {planParam && (
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="planInterest"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ご興味のあるプラン
                        </label>
                        <div className="mt-1">
                          <select
                            id="planInterest"
                            className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
                            {...register('planInterest')}
                          >
                            <option value="">選択してください</option>
                            <option value="standard">スタンダード</option>
                            <option value="professional">プロフェッショナル</option>
                            <option value="enterprise">エンタープライズ</option>
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        メッセージ
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          rows={4}
                          className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
                          placeholder="ご質問やご要望をお書きください"
                          {...register('message', {
                            required: 'メッセージを入力してください',
                            minLength: {
                              value: 10,
                              message: 'メッセージは10文字以上で入力してください',
                            },
                          })}
                        ></textarea>
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <input
                            id="privacy-policy"
                            name="privacy-policy"
                            type="checkbox"
                            className="h-4 w-4 text-[#0056b3] focus:ring-[#0056b3] border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base text-gray-500">
                            個人情報の取り扱いについて{' '}
                            <a href="#" className="font-medium text-[#0056b3] underline">
                              プライバシーポリシー
                            </a>
                            に同意します
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        送信する
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}