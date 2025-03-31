// app/(marketing)/case-studies/page.tsx
import React from 'react';
import Link from 'next/link';

// 型定義
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
  tags: string[];
}

// 事例データ
const caseStudies: CaseStudy[] = [
  {
    id: 'smart-traffic-toyama',
    title: '北陸地方中規模都市におけるAI交通量予測システム導入',
    client: '富山県T市',
    category: '交通ソリューション',
    summary: '人口約10万人の地方都市での交通渋滞緩和と公共交通機関の最適化を目的としたAI交通量予測システムの導入事例',
    challenge: '観光シーズンの交通渋滞や高齢化に伴う公共交通の最適化が課題となっていた地方都市において、限られた予算内でデータ駆動型の交通政策を実現する必要があった。',
    solution: '街頭カメラとIoTセンサーを活用したAI交通量計測システムを導入し、時間帯別・地域別の交通量データを収集・分析。機械学習モデルによる予測システムを構築し、交通状況に応じた信号制御の最適化とバス路線の再編を実施。',
    results: [
      '主要交差点における平均待ち時間を32%削減',
      '公共交通利用率が導入前と比較して18%向上',
      '二酸化炭素排出量を推定で年間約120トン削減',
      '交通事故発生件数が前年比15%減少'
    ],
    imageUrl: '/images/case-studies/traffic-management.jpg',
    tags: ['交通最適化', 'AI予測', '地方創生', '環境負荷低減']
  },
  {
    id: 'energy-optimization-industrial',
    title: '中小製造業向けエネルギー消費最適化システム',
    client: '関東圏製造業グループ（5社）',
    category: 'エネルギー最適化ソリューション',
    summary: '従業員30〜100名規模の中小製造業5社におけるエネルギー消費の可視化と最適化を実現した共同プロジェクト',
    challenge: '電力コストの上昇と脱炭素化の要請に対応するため、限られた投資予算内でエネルギー消費の効率化を図る必要があった。大手企業向けの高額なソリューションは導入できない状況だった。',
    solution: '低コストのIoTセンサーを各社の主要設備に設置し、エネルギー消費パターンの詳細データを収集。機械学習アルゴリズムによる分析で無駄を特定し、最適な稼働スケジュールを提案。クラウドベースのダッシュボードで各社が自社データを管理できる体制を構築。',
    results: [
      '参加企業の平均電力消費量が23%減少',
      '年間のエネルギーコストを平均で約350万円削減',
      'CO2排出量を年間平均28%削減',
      '設備の予防保守により突発的な停止が45%減少'
    ],
    imageUrl: '/images/case-studies/energy-optimization.jpg',
    tags: ['省エネルギー', '製造業', 'コスト削減', 'カーボンニュートラル']
  },
  {
    id: 'disaster-prevention-coastal',
    title: '沿岸地域における防災AIシステム実証実験',
    client: '九州地方J市',
    category: '防災・セキュリティソリューション',
    summary: '津波・高潮リスクの高い沿岸地域における住民避難支援システムの実証実験',
    challenge: '津波・高潮リスクの高い沿岸地域において、高齢化が進む住民の迅速かつ安全な避難誘導が課題となっていた。従来の防災無線だけでは避難率が低く、個別的な対応が必要だった。',
    solution: '気象データとIoTセンサー、AIカメラを連携させた早期警戒システムを構築。住民ごとに最適な避難経路をリアルタイムで提示し、スマートフォンや地域設置のデジタルサイネージに表示。要支援者の位置情報を共有する見守りシステムとも連携。',
    results: [
      '避難訓練における避難完了時間が平均42%短縮',
      '避難行動開始率が従来比65%から89%に向上',
      '要支援者の避難支援マッチング成功率98%を達成',
      '地域住民の防災意識調査で満足度92%を記録'
    ],
    imageUrl: '/images/case-studies/disaster-prevention.jpg',
    tags: ['防災', '避難支援', '高齢者見守り', '地域安全']
  }
];

// 事例紹介一覧ページ
export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">導入事例</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          様々な地域や企業における、当社のスマートシティソリューション導入事例をご紹介します。
          それぞれのクライアントが直面していた課題と、AIソリューションによってもたらされた成果をご覧ください。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((caseStudy) => (
          <Link 
            href={`/case-studies/${caseStudy.id}`} 
            key={caseStudy.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                {/* 実際の画像が用意できるまではプレースホルダーを表示 */}
                <div className="text-2xl font-bold text-white">
                  {caseStudy.category}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  {caseStudy.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{caseStudy.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{caseStudy.client}</p>
              <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">詳細を見る</span>
                <div className="bg-blue-50 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}