// app/(marketing)/page.tsx
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { 
  TruckIcon, 
  GlobeAsiaAustraliaIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

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

      {/* AI技術コアセクション */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#0056b3] font-semibold tracking-wide uppercase">
              テクノロジーコア
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              3つのAIコア技術から生まれる<br />統合型スマートシティソリューション
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              先進的なAI技術を基盤に、あらゆる都市課題に対応する総合的なエコシステムを構築します。
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {/* 画像処理AI */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-[#0056b3] hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <svg
                        className="h-8 w-8 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">画像処理AI</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      高度な画像認識技術により、交通量計測、インフラ劣化検出、防犯監視など多様な都市データを収集・分析します。
                    </p>
                  </div>
                </div>
              </div>

              {/* 異常検知AI */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-[#0056b3] hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <svg
                        className="h-8 w-8 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">異常検知AI</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      パターン認識技術により、不審行動の検出、設備の異常、環境変化などを早期に発見し、迅速な対応を可能にします。
                    </p>
                  </div>
                </div>
              </div>

              {/* 予測AI */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-[#0056b3] hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <svg
                        className="h-8 w-8 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">予測AI</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      過去データから未来の動向を予測し、交通量、エネルギー需要、災害リスクなどを事前に把握して最適な対策を立案します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 新ソリューションマップセクション - 大分類による区分け */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#ff7e00] font-semibold tracking-wide uppercase">
              ソリューションマップ
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              スマートシティを構成する<br />2つの柱と6つの連携ソリューション
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              各ソリューションは独立して導入可能ですが、連携することで相乗効果を発揮します。
            </p>
          </div>

          {/* 地域活性化セクション */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#0056b3] mb-6">地域活性化</h3>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {/* 交通ソリューション */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <TruckIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">交通ソリューション</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      AI画像認識による交通量計測と予測分析で渋滞を軽減し、最適な交通管理を実現します。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#0056b3]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        即時導入可能
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#traffic"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0056b3] hover:bg-[#004494] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 地域経済活性化 */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#0056b3] rounded-md p-3">
                      <UsersIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">地域経済活性化</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      来街者分析と観光客行動分析により、地域経済の活性化と効果的な観光戦略を支援します。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#0056b3]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        即時導入可能
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#economic"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0056b3] hover:bg-[#004494] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 地域資源管理セクション */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#00a86b] mb-6">地域資源管理</h3>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {/* 環境モニタリング */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <GlobeAsiaAustraliaIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">環境モニタリング</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      大気質や騒音・振動を常時監視し、都市環境の改善と住民の健康を守ります。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#00a86b]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        パートナーシップ連携
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#environment"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* エネルギー最適化 */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <BoltIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">エネルギー最適化</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      機械学習による消費パターン分析で、エネルギー使用の最適化とコスト削減を実現します。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#00a86b]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        予測AI応用
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#energy"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* スマートインフラ管理 */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">スマートインフラ管理</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      インフラの劣化予測と上下水道最適化で、長期的なコスト削減と持続可能な都市管理を支援します。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#00a86b]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        パートナーシップ連携
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#infrastructure"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 防災・セキュリティ */}
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-[#00a86b] rounded-md p-3">
                      <ShieldCheckIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">防災・セキュリティ</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-600">
                      AI異常検知と災害予測・避難支援システムで、安全・安心な都市空間を構築します。
                    </p>
                    <div className="mt-3 flex items-center text-sm text-[#00a86b]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        即時導入可能
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/services#security"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 導入アプローチセクション */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#ff7e00] font-semibold tracking-wide uppercase">
              導入アプローチ
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              段階的な導入で<br />持続可能なスマートシティへ
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              予算や優先課題に合わせた柔軟な導入プランをご提案します。
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* 接続線 */}
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>

              {/* ステップ */}
              <div className="relative flex justify-between">
                
                {/* ステップ1 */}
                <div className="bg-white px-4">
                  <div className="bg-[#0056b3] rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">現状分析</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs">
                      既存システム・インフラの評価と<br />クライアント固有の課題分析
                    </p>
                  </div>
                </div>

                {/* ステップ2 */}
                <div className="bg-white px-4">
                  <div className="bg-[#0056b3] rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">最適設計</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs">
                      地域特性と予算に合わせた<br />カスタムソリューション設計
                    </p>
                  </div>
                </div>

                {/* ステップ3 */}
                <div className="bg-white px-4">
                  <div className="bg-[#0056b3] rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">段階的導入</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs">
                      優先度の高い機能から<br />順次実装と効果検証
                    </p>
                  </div>
                </div>

                {/* ステップ4 */}
                <div className="bg-white px-4">
                  <div className="bg-[#0056b3] rounded-full h-12 w-12 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">継続的改善</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs">
                      データ蓄積による精度向上と<br />機能拡張の継続的実施
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              私たちの強み
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              機動的な組織体制で、クライアント固有のニーズに迅速に対応します。
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
                <Button variant="outline" size="lg" className="bg-white hover:bg-gray-100">
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