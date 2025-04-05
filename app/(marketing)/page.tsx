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
  UsersIcon,
  SparklesIcon,
  ChartBarIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import GraphsAnimation from '@/components/landing/Graphs'

export default function HomePage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ヒーローセクション - モダンなグラデーションとシェイプ */}
      <div className="relative bg-gradient-to-br from-[#0056b3] via-[#0063cc] to-[#004494] overflow-hidden">
        {/* 抽象的な装飾要素 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#ff7e00] opacity-10 blur-3xl"></div>
          <div className="absolute left-1/3 bottom-0 w-64 h-64 rounded-full bg-[#00a86b] opacity-10 blur-3xl"></div>
          
          {/* SVG装飾 - 抽象的な接続線や点を表現 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"></path>
            <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)"></circle>
            <circle cx="80" cy="30" r="1" fill="rgba(255,255,255,0.2)"></circle>
            <circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.2)"></circle>
            <circle cx="30" cy="70" r="1" fill="rgba(255,255,255,0.2)"></circle>
            <circle cx="70" cy="80" r="1" fill="rgba(255,255,255,0.2)"></circle>
            <line x1="20" y1="20" x2="80" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"></line>
            <line x1="80" y1="30" x2="50" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"></line>
            <line x1="50" y1="50" x2="30" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"></line>
            <line x1="30" y1="70" x2="70" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"></line>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto py-28 px-4 sm:py-36 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="block mb-2 text-[#ff7e00] opacity-90">AI技術で</span>
                <span className="block font-extrabold">スマートシティを実現</span>
              </h1>
              <p className="mt-6 text-xl text-white/90 max-w-2xl leading-relaxed">
                最先端のAI技術を活用し、個別の事例に最適化した<br/>
                スマートシティソリューションを提供します。
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/demo-dashboard/login">
                  <Button size="lg" className="w-full sm:w-auto bg-[#ff7e00] text-white hover:bg-[#e67200] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    デモ画面を体験する
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-[#0056b3] text-white hover:bg-[#004494] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    サービス詳細を見る
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300">
                    お問い合わせ
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-5 mt-16 lg:mt-0">
              <GraphsAnimation/>
            </div>
          </div>
        </div>
        
        {/* 下部のウェーブシェイプ */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20 lg:h-24">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* AI技術コアセクション - より洗練されたカード */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-[#0056b3] mb-4">
              テクノロジーコア
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              4つのAIコア技術から生まれる<br className="hidden sm:block" />統合型スマートシティソリューション
            </h2>
            <p className="mt-4 max-w-4xl mx-auto text-xl text-gray-500">
              先進的なAI技術を基盤に、あらゆる課題に対応する総合的なエコシステムを構築します。
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* 画像処理AI */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0056b3] to-[#0092ff] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#0056b3] to-[#0078c7]">
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
                      <div className="ml-5">
                        <h3 className="text-xl font-bold text-gray-900">画像処理AI</h3>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        高度な画像認識技術により、交通量計測、インフラ劣化検出、防犯監視など多様な都市データを収集・分析します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 異常検知AI */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff7e00] to-[#ffb266] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#ff7e00] to-[#ff9a33]">
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
                      <div className="ml-5">
                        <h3 className="text-xl font-bold text-gray-900">異常検知AI</h3>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        パターン認識技術により、不審行動の検出、設備の異常、環境変化などを早期に発見し、迅速な対応を可能にします。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 予測AI */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00a86b] to-[#00d488] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#00a86b] to-[#00c47d]">
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
                      <div className="ml-5">
                        <h3 className="text-xl font-bold text-gray-900">予測AI</h3>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        過去データから未来の動向を予測し、交通量、エネルギー需要、災害リスクなどを事前に把握して最適な対策を立案します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LLM技術 - 新規追加 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9333ea] to-[#c084fc] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#9333ea] to-[#a855f7]">
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
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-xl font-bold text-gray-900">LLM技術</h3>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-base text-gray-600 leading-relaxed">
                        大規模言語モデルを活用し、データからの重要な情報の見逃し防止、包括的な意思決定支援とナレッジベースの構築を実現します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ソリューションマップセクション - 視覚的改善 */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 w-64 h-64 -translate-x-1/2 bg-[#0056b3] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00a86b] opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-orange-50 text-[#ff7e00] mb-4">
              ソリューションマップ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              スマートシティを構成するソリューション
            </h2>
            <p className="mt-4 max-w-4xl mx-auto text-xl text-gray-500">
              各ソリューションは独立して導入可能です。連携することで相乗効果を発揮します。
            </p>
          </div>

          {/* 地域活力創造セクション */}
          <div className="mt-16">
            <div className="inline-flex items-center bg-[#0056b3]/10 rounded-full px-5 py-2 mb-8">
              <BuildingOffice2Icon className="h-5 w-5 text-[#0056b3] mr-2" />
              <h3 className="text-lg font-bold text-[#0056b3]">地域活力創造</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 relative">
              {/* 接続線
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 hidden sm:block">
                <div className="w-full h-full border-2 border-[#0056b3]/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#0056b3]/10 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#0056b3]/20 rounded-full"></div>
                  </div>
                </div>
              </div> */}
              
              {/* 交通ソリューション */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056b3] to-[#0078c7] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#0056b3] to-[#0078c7]">
                        <TruckIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">交通ソリューション</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        AI画像認識による交通量計測と予測分析で渋滞を軽減し、最適な交通管理を実現します。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#traffic"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0056b3] hover:bg-[#004494] focus:outline-none transition-all duration-300 transform group-hover:translate-x-1"
                      >
                        詳細を見る
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 地域経済活性化 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056b3] to-[#0078c7] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#0056b3] to-[#0078c7]">
                        <UsersIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">地域経済活性化</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        来街者分析と観光客行動分析により、地域経済の活性化と効果的な観光戦略を支援します。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#economic"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0056b3] hover:bg-[#004494] focus:outline-none transition-all duration-300 transform group-hover:translate-x-1"
                      >
                        詳細を見る
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 防災・セキュリティ - 地域活力創造に移動 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0056b3] to-[#0078c7] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#0056b3] to-[#0078c7]">
                        <ShieldCheckIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">防災・セキュリティ</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        AI異常検知と災害予測・避難支援システムで、安全・安心な都市空間を構築します。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#security"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0056b3] hover:bg-[#004494] focus:outline-none transition-all duration-300 transform group-hover:translate-x-1"
                      >
                        詳細を見る
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 地域資源管理セクション */}
          <div className="mt-20">
            <div className="inline-flex items-center bg-[#00a86b]/10 rounded-full px-5 py-2 mb-8">
              <ChartBarIcon className="h-5 w-5 text-[#00a86b] mr-2" />
              <h3 className="text-lg font-bold text-[#00a86b]">地域資源管理</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {/* 環境モニタリング */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00a86b] to-[#00c47d] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#00a86b] to-[#00c47d]">
                        <GlobeAsiaAustraliaIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">環境モニタリング</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        大気質や騒音・振動を常時監視し、都市環境の改善と住民の健康を守ります。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#environment"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none transition-all duration-300"
                      >
                        詳細を見る
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* エネルギー最適化 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00a86b] to-[#00c47d] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#00a86b] to-[#00c47d]">
                        <BoltIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">エネルギー最適化</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        機械学習による消費パターン分析で、エネルギー使用の最適化とコスト削減を実現します。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#energy"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none transition-all duration-300"
                      >
                        詳細を見る
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* スマートインフラ管理 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00a86b] to-[#00c47d] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-[#00a86b] to-[#00c47d]">
                        <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">スマートインフラ管理</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-base text-gray-600 leading-relaxed">
                        インフラの劣化予測や最適化で、長期的なコスト削減と持続可能な都市管理を支援します。
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/services#infrastructure"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00a86b] hover:bg-[#008f5b] focus:outline-none transition-all duration-300"
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
      </div>

      {/* 導入アプローチセクション - より動的でインタラクティブなデザイン */}
      <div className="py-24 bg-white relative overflow-hidden">
        {/* 背景装飾 - より立体的な効果 */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-bl-full opacity-70 blur-md"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-green-50 to-green-100 rounded-tr-full opacity-70 blur-md"></div>
        <div className="absolute top-1/3 left-1/6 w-16 h-16 bg-orange-50 rounded-full opacity-30 blur-md"></div>
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-purple-50 rounded-full opacity-40 blur-md"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-orange-50 text-[#ff7e00] mb-4 animate-pulse">
              導入アプローチ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              段階的な導入で<br className="hidden sm:block" />持続可能なスマートシティへ
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              予算や優先課題に合わせた柔軟な導入プランをご提案します。
            </p>
          </div>

          <div className="mt-20 relative">
            {/* ステップトラッカー - アニメーション付き */}
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0">
              <div className="h-1 w-full bg-gray-200 rounded-full"></div>
              <div className="h-1 w-3/4 bg-gradient-to-r from-[#0056b3] via-[#3387ea] to-[#00a86b] rounded-full absolute top-0 left-0 
                            animate-pulse"></div>
            </div>

            {/* 接続線（モバイル用） */}
            <div className="sm:hidden absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-[#0056b3] to-[#00a86b] rounded-full"></div>

            <div className="relative flex flex-col sm:flex-row justify-between gap-16 sm:gap-8">
              {/* ステップ1 */}
              <div className="group flex-1 relative">
                <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0056b3] to-[#0078c7] flex items-center justify-center shadow-lg 
                                transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  {/* 矢印 */}
                  <div className="absolute top-14 left-16 hidden sm:block">
                    <svg className="h-10 w-20 text-[#0056b3]/30 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8 sm:pt-16 transition-all duration-500 hover:shadow-xl 
                              border border-gray-100 h-full transform group-hover:-translate-y-2 
                              hover:border-[#0056b3]/20 relative z-0 overflow-hidden">
                  {/* 装飾背景パターン */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  
                  {/* モバイル用のステップ表示 */}
                  <div className="sm:hidden absolute -left-10 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#0056b3] to-[#0078c7] flex items-center justify-center shadow-lg">
                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-6 h-6 bg-[#0056b3] text-white rounded-full text-sm">1</span>
                    現状分析
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    既存システム・インフラの評価とクライアント固有の課題分析を行い、最適なソリューションの基盤を形成します。
                  </p>
                  
                  {/* 具体的なメリットポイント */}
                  <div className="mt-4 mb-6 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#0056b3]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">詳細なデータ収集と分析</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#0056b3]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">課題の優先順位付け</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                      データ収集
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                      課題特定
                    </span>
                  </div>
                </div>
              </div>

              {/* ステップ2 */}
              <div className="group flex-1 relative">
                <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1976d2] to-[#42a5f5] flex items-center justify-center shadow-lg 
                                transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  {/* 矢印 */}
                  <div className="absolute top-14 left-16 hidden sm:block">
                    <svg className="h-10 w-20 text-[#1976d2]/30 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8 sm:pt-16 transition-all duration-500 hover:shadow-xl 
                              border border-gray-100 h-full transform group-hover:-translate-y-2 
                              hover:border-[#1976d2]/20 relative z-0 overflow-hidden">
                  {/* 装飾背景パターン */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  
                  {/* モバイル用のステップ表示 */}
                  <div className="sm:hidden absolute -left-10 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#1976d2] to-[#42a5f5] flex items-center justify-center shadow-lg">
                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-6 h-6 bg-[#1976d2] text-white rounded-full text-sm">2</span>
                    最適設計
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    地域特性と予算に合わせたカスタムソリューション設計により、費用対効果の高いシステムを実現します。
                  </p>
                  
                  {/* 具体的なメリットポイント */}
                  <div className="mt-4 mb-6 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#1976d2]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">地域特性を考慮した設計</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#1976d2]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">予算制約内での最適化</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                      カスタマイズ
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
                      コスト最適化
                    </span>
                  </div>
                </div>
              </div>

              {/* ステップ3 */}
              <div className="group flex-1 relative">
                <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00838f] to-[#4dd0e1] flex items-center justify-center shadow-lg 
                                transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  {/* 矢印 */}
                  <div className="absolute top-14 left-16 hidden sm:block">
                    <svg className="h-10 w-20 text-[#00838f]/30 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8 sm:pt-16 transition-all duration-500 hover:shadow-xl 
                              border border-gray-100 h-full transform group-hover:-translate-y-2 
                              hover:border-[#00838f]/20 relative z-0 overflow-hidden">
                  {/* 装飾背景パターン */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  
                  {/* モバイル用のステップ表示 */}
                  <div className="sm:hidden absolute -left-10 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#00838f] to-[#4dd0e1] flex items-center justify-center shadow-lg">
                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-6 h-6 bg-[#00838f] text-white rounded-full text-sm">3</span>
                    段階的導入
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    優先度の高い機能から順次実装と効果検証を行い、確実な成果を積み上げながら拡張していきます。
                  </p>
                  
                  {/* 具体的なメリットポイント */}
                  <div className="mt-4 mb-6 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#00838f]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">投資リスクの分散</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#00838f]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">早期の効果実現</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-800 border border-cyan-100">
                      段階的実装
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-800 border border-cyan-100">
                      効果検証
                    </span>
                  </div>
                </div>
              </div>

              {/* ステップ4 */}
              <div className="group flex-1 relative">
                <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a86b] to-[#4caf50] flex items-center justify-center shadow-lg 
                                transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8 sm:pt-16 transition-all duration-500 hover:shadow-xl 
                              border border-gray-100 h-full transform group-hover:-translate-y-2 
                              hover:border-[#00a86b]/20 relative z-0 overflow-hidden">
                  {/* 装飾背景パターン */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
                  
                  {/* モバイル用のステップ表示 */}
                  <div className="sm:hidden absolute -left-10 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#00a86b] to-[#4caf50] flex items-center justify-center shadow-lg">
                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2 inline-flex items-center justify-center w-6 h-6 bg-[#00a86b] text-white rounded-full text-sm">4</span>
                    継続的改善
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    データ蓄積による精度向上と機能拡張の継続的実施により、長期的な価値を創出し続けます。
                  </p>
                  
                  {/* 具体的なメリットポイント */}
                  <div className="mt-4 mb-6 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#00a86b]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">AIモデルの進化</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-4 w-4 text-[#00a86b]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">長期的な価値創出</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-100">
                      アップデート
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-100">
                      精度向上
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特徴セクション - テスティモニアル風要素 */}
      <div className="py-20 bg-gray-50 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-[#0056b3] mb-4">
              私たちの強み
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              先端研究と個別事例へのカスタマイズで<br className="hidden sm:block" />
              クライアント第一のサービスを提供
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              機動的な組織体制で、クライアント固有のニーズに迅速に対応します。
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* 強み1 & 2 */}
              <div className="space-y-10">
                {/* 強み1 */}
                <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative border border-gray-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-[#0056b3] to-[#0078c7] text-white shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">高度なカスタマイズ性</h3>
                      <p className="mt-3 text-base text-gray-600 leading-relaxed">
                        各クライアントの特定ニーズに合わせたソリューション開発を行います。画一的なサービスとは異なり、地域特性や既存システムに柔軟に対応します。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 強み2 */}
                <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative border border-gray-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-[#00a86b] to-[#00c47d] text-white shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">先端技術の迅速導入</h3>
                      <p className="mt-3 text-base text-gray-600 leading-relaxed">
                        最新のAI・機械学習技術をいち早く実装し、常に最先端のソリューションを提供します。機動的な組織の強みを活かし、意思決定から導入までのスピードを実現します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 強み3 & 4 */}
              <div className="space-y-10">
                {/* 強み3 */}
                <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative border border-gray-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-[#ff7e00] to-[#ff9a33] text-white shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">最適化した価格設定</h3>
                      <p className="mt-3 text-base text-gray-600 leading-relaxed">
                        課題に最適化させることでコスト削減を実現します。初期投資を抑えた段階的導入オプションにより、予算に合わせたスタートが可能です。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 強み4 */}
                <div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg relative border border-gray-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">継続的サポート</h3>
                      <p className="mt-3 text-base text-gray-600 leading-relaxed">
                        導入後の運用・保守・アップデートを含む包括的サービスを提供します。密着型のサポート体制を構築し、安心して継続利用できるように尽力します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTAセクション - グラスモーフィズム効果 */}
      <div className="relative py-20 bg-gradient-to-r from-[#0056b3] via-[#0063cc] to-[#004494] overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#ff7e00] opacity-10 blur-3xl"></div>
          <div className="absolute left-1/3 bottom-0 w-64 h-64 rounded-full bg-[#00a86b] opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-xl border border-white/20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <span className="block">スマートシティの実現に向けて</span>
                  <span className="block text-[#ff7e00]">まずはお気軽にご相談ください</span>
                </h2>
                <p className="mt-4 text-lg text-white/80 leading-relaxed">
                  地域の課題やニーズに合わせた最適なソリューションをご提案します。
                  お気軽にお問い合わせください。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-[#00a86b]" />
                    </div>
                    <p className="ml-2 text-sm text-white/90">
                      無料相談
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-[#00a86b]" />
                    </div>
                    <p className="ml-2 text-sm text-white/90">
                      段階的導入プラン
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-[#00a86b]" />
                    </div>
                    <p className="ml-2 text-sm text-white/90">
                      専任サポート担当
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
                <div className="w-full sm:w-80 md:w-96">
                  <Link href="/demo-dashboard/login">
                    <Button size="lg" className="w-full bg-[#ff7e00] hover:bg-[#e67200] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      デモ画面を体験する
                    </Button>
                  </Link>
                  
                  {/* 明示的な空白スペース */}
                  <div className="h-6"></div>
                  
                  <Link href="/services">
                    <Button size="lg" className="w-full bg-[#0056b3] hover:bg-[#004494] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      サービス詳細を見る
                    </Button>
                  </Link>
                  
                  {/* 明示的な空白スペース */}
                  <div className="h-6"></div>
                  
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300">
                      お問い合わせ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}