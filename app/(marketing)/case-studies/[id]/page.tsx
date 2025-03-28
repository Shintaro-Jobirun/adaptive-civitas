// app/(marketing)/case-studies/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    challenge: '観光シーズンの交通渋滞や高齢化に伴う公共交通の最適化が課題となっていた地方都市において、限られた予算内でデータ駆動型の交通政策を実現する必要があった。特に週末の商業エリアでの渋滞と公共交通機関の利用率低下が深刻な問題となっていた。従来の固定的な交通制御では季節変動や時間帯による変化に対応できず、観光客と地域住民双方の不満が高まっていた。',
    solution: '街頭カメラとIoTセンサーを活用したAI交通量計測システムを主要20箇所に導入し、時間帯別・地域別の交通量データを収集・分析。3ヶ月のデータ蓄積後、機械学習モデルによる予測システムを構築。これにより、翌日の交通量を95%の精度で予測可能になった。予測データに基づき、交通信号のリアルタイム制御と公共バスの運行スケジュール最適化を実施。また、市民向けアプリで混雑予測情報を提供し、分散移動を促進した。導入コストは従来の交通システム改修費の30%以下に抑えられた。',
    results: [
      '主要交差点における平均待ち時間を32%削減',
      '公共交通利用率が導入前と比較して18%向上',
      '二酸化炭素排出量を推定で年間約120トン削減',
      '交通事故発生件数が前年比15%減少',
      '観光客の滞在時間が平均45分増加（市内消費額の向上につながる）',
      '市民満足度調査において交通環境の評価が23%向上'
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
    challenge: '電力コストの上昇と脱炭素化の要請に対応するため、限られた投資予算内でエネルギー消費の効率化を図る必要があった。大手企業向けの高額なソリューションは導入できない状況だった。各社とも設備の老朽化と運用ノウハウの属人化が進み、エネルギー使用の無駄が発生していたが、具体的な改善ポイントの特定ができていなかった。地域の工業団地に立地する5社が共同でコスト削減と環境対応を模索していた。',
    solution: '低コストのIoTセンサーを各社の主要設備に設置し、電力・ガス・水道などのエネルギー消費パターンの詳細データを収集。機械学習アルゴリズムによる分析で無駄を特定し、設備ごとの最適な稼働スケジュールを提案。クラウドベースのダッシュボードで各社が自社データを管理できる体制を構築。工業団地全体としてのピークシフト調整による契約電力の削減も実現。共同導入により1社あたりの導入コストを60%削減。当初の投資回収期間は1.8年だったが、実際には1.2年で投資回収を達成。',
    results: [
      '参加企業の平均電力消費量が23%減少',
      '年間のエネルギーコストを平均で約350万円削減',
      'CO2排出量を年間平均28%削減',
      '設備の予防保守により突発的な停止が45%減少',
      '生産効率が平均8%向上',
      '5社合計で年間約2,000万円のコスト削減を実現'
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
    challenge: '津波・高潮リスクの高い沿岸地域において、高齢化が進む住民の迅速かつ安全な避難誘導が課題となっていた。従来の防災無線だけでは避難率が低く、個別的な対応が必要だった。特に高齢者の多い地区では、避難の遅れが人的被害につながるリスクが高く、過去の災害時には避難率が50%に満たなかった。また、避難所への経路が天候や潮位によって使用できなくなるケースもあり、状況に応じた避難誘導が必要だった。',
    solution: '気象データとIoTセンサー、AIカメラを連携させた早期警戒システムを構築。住民ごとに最適な避難経路をリアルタイムで提示し、スマートフォンや地域設置のデジタルサイネージに表示。要支援者の位置情報を共有する見守りシステムとも連携。AIによる潮位・波高予測と連動し、安全な避難経路を動的に更新。高齢者向けには簡易型の通知デバイスを配布し、デジタルデバイドの解消を図った。地域のコミュニティFMと連携し、システムからの情報を自動的に放送する仕組みも導入。',
    results: [
      '避難訓練における避難完了時間が平均42%短縮',
      '避難行動開始率が従来比65%から89%に向上',
      '要支援者の避難支援マッチング成功率98%を達成',
      '地域住民の防災意識調査で満足度92%を記録',
      '高齢者（75歳以上）の避難率が従来比で38%向上',
      '避難訓練参加率が従来比で45%増加'
    ],
    imageUrl: '/images/case-studies/disaster-prevention.jpg',
    tags: ['防災', '避難支援', '高齢者見守り', '地域安全']
  }
];

// 静的パラメータを生成
export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    id: caseStudy.id,
  }));
}

// 事例詳細ページ
export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const caseStudy = caseStudies.find((cs) => cs.id === params.id);
  
  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/case-studies" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          事例一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 w-full bg-blue-900/10 flex items-center justify-center">
          <div className="text-3xl font-bold text-white px-6 py-4 bg-blue-900/70 rounded-lg">
            {caseStudy.category}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-4">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-3 text-gray-900">{caseStudy.title}</h1>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold">クライアント:</span> {caseStudy.client}
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">概要</h2>
            <p className="text-gray-700">{caseStudy.summary}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">課題</h2>
            <p className="text-gray-700">{caseStudy.challenge}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">ソリューション</h2>
            <p className="text-gray-700">{caseStudy.solution}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">成果</h2>
            <ul className="list-disc pl-5 space-y-2">
              {caseStudy.results.map((result, index) => (
                <li key={index} className="text-gray-700">{result}</li>
              ))}
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">関連ソリューション</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href={`/services/${caseStudy.category.toLowerCase().replace(/・/g, '-').replace(/ソリューション/g, '')}`}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <h3 className="font-medium text-blue-800 mb-2">{caseStudy.category}</h3>
                <p className="text-sm text-gray-600">詳細を見る</p>
              </Link>
              {/* 他の関連サービスへのリンクもここに追加可能 */}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">お問い合わせ</h2>
            <p className="text-gray-700 mb-4">
              本事例のような導入をご検討の方は、詳細な情報や個別のご相談を承っております。
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}