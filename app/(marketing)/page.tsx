// app/(marketing)/page.tsx
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <div className="relative bg-gradient-to-r from-[#0056b3] to-[#003b7a]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0056b3] opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI技術で<br />スマートシティを実現
          </h1>
          <p className="mt-6 text-xl text-white max-w-2xl">
            最先端のAI技術を活用し、中小企業や地方自治体向けにカスタマイズ可能なスマートシティソリューションを提供します。
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/services">
              <Button size="lg">
                サービスを見る
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white hover:bg-gray-100">
                お問い合わせ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* サービス概要セクション */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#00a86b] font-semibold tracking-wide uppercase">
              サービスラインナップ
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              最先端AIで都市課題を解決
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              それぞれの地域の特性やニーズに合わせて、最適なソリューションを提供します。
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* 交通ソリューション */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">交通ソリューション</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      AI交通量計測システムと交通予測分析により、渋滞を軽減し、最適な交通管理を実現します。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#traffic"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 環境モニタリング */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">環境モニタリング</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      大気質や騒音・振動を常時監視し、都市環境の改善と住民の健康を守ります。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#environment"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* エネルギー最適化 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#ff7e00] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">エネルギー最適化</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      機械学習による消費パターン分析で、エネルギー使用の最適化とコスト削減を実現します。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#energy"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 防災・セキュリティ */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">防災・セキュリティ</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      AI異常検知と災害予測・避難支援システムで、安全・安心な都市空間を構築します。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#security"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* スマートインフラ管理 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">スマートインフラ管理</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      インフラの劣化予測と上下水道最適化で、長期的なコスト削減と持続可能な都市管理を支援します。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#infrastructure"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 地域経済活性化 */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#ff7e00] rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">地域経済活性化</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      来街者分析・商圏分析と観光客行動分析で、地域経済の活性化と効果的な観光戦略を支援します。
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#economic"
                      className="inline-flex items-center text-[#0056b3] hover:text-[#004494]"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#00a86b] font-semibold tracking-wide uppercase">
              差別化ポイント
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              私たちの強み
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              10人規模の機動的な組織体制で、クライアント固有のニーズに迅速に対応します。
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* 強み1 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0056b3] text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">高度なカスタマイズ性</h3>
                  <p className="mt-2 text-base text-gray-500">
                    各クライアントの特定ニーズに合わせたソリューション開発を行います。大手企業の画一的なサービスとは異なり、地域特性や既存システムに柔軟に対応します。
                  </p>
                </div>
              </div>

              {/* 強み2 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0056b3] text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">先端技術の迅速導入</h3>
                  <p className="mt-2 text-base text-gray-500">
                    最新のAI・機械学習技術をいち早く実装し、常に最先端のソリューションを提供します。小規模組織の強みを活かし、意思決定から導入までのスピードを実現します。
                  </p>
                </div>
              </div>

              {/* 強み3 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0056b3] text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">中小企業に適した価格設定</h3>
                  <p className="mt-2 text-base text-gray-500">
                    大手企業が提供するソリューションより低コストで導入可能なプランを用意。初期投資を抑えた段階的導入オプションにより、予算に合わせたスタートが可能です。
                  </p>
                </div>
              </div>

              {/* 強み4 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0056b3] text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">継続的サポート</h3>
                  <p className="mt-2 text-base text-gray-500">
                    導入後の運用・保守・アップデートを含む包括的サービスを提供します。地域ITベンダーと連携し、地域密着型のサポート体制を構築しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTAセクション */}
      <div className="bg-[#0056b3]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">スマートシティの実現に向けて</span>
            <span className="block text-[#ff7e00]">まずはお気軽にご相談ください</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#0056b3] hover:bg-gray-100">
                  お問い合わせ
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/services">
                <Button variant="outline" size="lg" className="bg-[#0056b3] border-white text-white hover:bg-[#004494]">
                  サービス詳細
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}