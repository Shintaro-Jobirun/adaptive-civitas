// app/(marketing)/services/page.tsx
"use client"

import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ServiceSection {
  id: string;
  title: string;
  description: string;
  features: {
    name: string;
    description: string;
  }[];
  imageUrl?: string;
}

const services: ServiceSection[] = [
  {
    id: 'traffic',
    title: '交通',
    description:
      'AI技術を活用した交通管理ソリューションで、渋滞の軽減と交通フローの最適化を実現します。リアルタイムデータと機械学習モデルにより、正確な交通予測と最適な経路提案が可能です。',
    features: [
      {
        name: 'AI交通量計測システム',
        description: '街頭カメラを活用した車両・歩行者・自転車の自動カウント、時間帯別・車種別の詳細なデータ収集、ダッシュボードによるリアルタイムモニタリングを提供します。',
      },
      {
        name: '交通予測分析',
        description: '機械学習モデルによる交通量予測、渋滞予測と最適経路提案、イベント時や災害時の交通シミュレーションを実現します。',
      },
    ],
  },
  {
    id: 'environment',
    title: '環境モニタリング',
    description:
      '低コストセンサーネットワークと高度なAI分析で、大気質や騒音レベルをリアルタイムに監視します。環境データの可視化と予測分析により、都市環境の改善と住民の健康保護を支援します。',
    features: [
      {
        name: '大気質モニタリングシステム',
        description: '低コストセンサーネットワークによる大気汚染物質の測定、地点別・時間別の大気質データ可視化、健康リスク予測と住民向け通知システムを提供します。',
      },
      {
        name: '騒音・振動モニタリング',
        description: '都市環境における騒音レベル測定、工事現場や交通機関からの振動監視、規制基準超過の自動アラート機能を実装します。',
      },
    ],
  },
  {
    id: 'energy',
    title: 'エネルギー最適化',
    description:
      '機械学習を用いたエネルギー消費パターン分析で、無駄を特定し最適化します。中小企業向けの省エネ対策やマイクログリッド管理により、コスト削減と環境負荷軽減を同時に実現します。',
    features: [
      {
        name: '中小企業向けエネルギー消費最適化',
        description: '電力使用パターン分析と無駄の検出、機械学習による省エネ施策提案、コスト削減効果の可視化と検証を行います。',
      },
      {
        name: '地域マイクログリッド管理',
        description: '分散型エネルギーリソースの統合管理、需給バランス最適化によるエネルギーコスト削減、災害時のレジリエンス強化を支援します。',
      },
    ],
  },
  {
    id: 'security',
    title: '防災・セキュリティ',
    description:
      'AIによる映像解析と異常検知で、セキュリティリスクや災害の早期発見を実現。リアルタイムアラートと避難支援システムにより、安全・安心な都市環境の構築に貢献します。',
    features: [
      {
        name: 'AI異常検知システム',
        description: '監視カメラ映像からの不審行動自動検出、火災・水害などの早期発見、管理者へのリアルタイムアラート配信を実現します。',
      },
      {
        name: '災害予測・避難支援',
        description: '気象データと地理情報を組み合わせた災害リスク評価、避難経路最適化と住民への情報提供、要支援者の位置把握と優先的支援計画を提供します。',
      },
    ],
  },
  {
    id: 'infrastructure',
    title: 'スマートインフラ管理',
    description:
      'センサーデータとAI分析によるインフラの状態モニタリングと劣化予測を提供。予防的メンテナンスで長期コスト削減を実現し、上下水道システムの最適化で資源利用効率を向上させます。',
    features: [
      {
        name: 'インフラ劣化予測',
        description: 'センサーデータに基づく道路・橋梁の劣化予測、優先的メンテナンス箇所の特定、予防的保守による長期コスト削減を支援します。',
      },
      {
        name: '上下水道最適化',
        description: '漏水検出と節水推進、水質モニタリングと異常検知、使用量予測に基づく供給最適化を行います。',
      },
    ],
  },
  {
    id: 'economic',
    title: '地域経済活性化',
    description:
      '匿名化された人流データとAI分析で、来街者や観光客の行動パターンを把握。データ駆動型の地域経済活性化戦略と効果的な観光プロモーションを支援します。',
    features: [
      {
        name: '来街者分析・商圏分析',
        description: 'Wi-Fiセンサーによる人流データ収集、来街者の属性・行動パターン分析、小売店・飲食店向け需要予測を提供します。',
      },
      {
        name: '観光客行動分析',
        description: '観光客の移動経路・滞在時間分析、多言語観光案内の最適配置提案、観光資源の効果的活用戦略立案を支援します。',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* ヘッダーセクション */}
      <div className="bg-[#0056b3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              サービスラインナップ
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
              最先端AI技術を活用した、中小企業や地方自治体向けのカスタマイズ可能なスマートシティソリューション
            </p>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto py-4 hide-scrollbar">
            <ul className="flex space-x-8">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* サービス詳細セクション */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <section
                id={service.id}
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  <p className="mt-4 text-lg text-gray-500">{service.description}</p>
                  
                  <div className="mt-8 space-y-8">
                    {service.features.map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#0056b3] text-white">
                            <svg
                              className="h-6 w-6"
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-16 text-xl font-medium text-gray-900">
                            {feature.name}
                          </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          {feature.description}
                        </dd>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10">
                    <Link href="/contact">
                      <Button>詳細を相談する</Button>
                    </Link>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex items-center`}>
                  <div className="bg-gray-200 w-full aspect-video rounded-lg flex items-center justify-center">
                    <svg
                      className="h-24 w-24 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* スタイル追加 */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* CTA セクション */}
      <div className="bg-[#f0f7ff] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              カスタマイズ可能なソリューション
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              地域や企業の特性に合わせて最適なソリューションをカスタマイズします。専門家チームがニーズをヒアリングし、最適な提案を行います。
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <Button size="lg">お問い合わせ</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}