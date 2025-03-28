// app/(marketing)/pricing/page.tsx
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/outline';

interface PricingTier {
  name: string;
  id: string;
  href: string;
  price: string;
  description: string;
  features: string[];
  mostPopular: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'スタンダード',
    id: 'tier-standard',
    href: '/contact?plan=standard',
    price: '10万円〜/月',
    description: '中小企業向けの基本的なスマートシティ機能',
    features: [
      '交通量計測システム（基本機能）',
      '環境モニタリング（1地点）',
      'エネルギー消費分析',
      '基本的なAIダッシュボード',
      '平日サポート（メールのみ）',
      'データ保存期間：3ヶ月',
    ],
    mostPopular: false,
  },
  {
    name: 'プロフェッショナル',
    id: 'tier-professional',
    href: '/contact?plan=professional',
    price: '30万円〜/月',
    description: '地方自治体や企業向けの高度なAI機能',
    features: [
      '交通予測分析（高度なAI機能）',
      '環境モニタリング（複数地点）',
      'エネルギー最適化ソリューション',
      '防災・セキュリティシステム',
      'スマートインフラ管理',
      '24時間サポート',
      'データ保存期間：1年',
      'カスタムレポート機能',
    ],
    mostPopular: true,
  },
  {
    name: 'エンタープライズ',
    id: 'tier-enterprise',
    href: '/contact?plan=enterprise',
    price: 'お問い合わせ',
    description: '大規模プロジェクト向けの完全カスタマイズソリューション',
    features: [
      '全サービスの完全カスタマイズ',
      '無制限のモニタリングポイント',
      '地域経済活性化ソリューション',
      'APIアクセス・連携',
      '専任コンサルタントによるサポート',
      'データ保存期間：無制限',
      'カスタムAIモデル開発',
      '定期的な訪問サポート',
    ],
    mostPopular: false,
  },
];

const frequentlyAskedQuestions = [
  {
    id: 1,
    question: '初期費用はいくらかかりますか？',
    answer:
      '初期費用は導入するサービスの規模やカスタマイズ度によって異なりますが、基本的には50万円からとなります。詳細はお問い合わせください。',
  },
  {
    id: 2,
    question: '契約期間の縛りはありますか？',
    answer:
      '基本的な契約期間は1年となっておりますが、3ヶ月のトライアル期間もご用意しています。長期契約の場合は割引も適用されます。',
  },
  {
    id: 3,
    question: 'カスタマイズはどの程度可能ですか？',
    answer:
      'すべてのプランでカスタマイズが可能です。特にプロフェッショナルプラン以上では、地域特性や既存システムに合わせた高度なカスタマイズを提供しています。エンタープライズプランでは完全オーダーメイドの開発も可能です。',
  },
  {
    id: 4,
    question: '既存システムとの連携はできますか？',
    answer:
      'はい、可能です。当社のソリューションは、APIを通じて既存の都市システムやデータベースと連携できるよう設計されています。連携の難易度や範囲によって追加費用が発生する場合があります。',
  },
  {
    id: 5,
    question: 'データの所有権や安全性はどうなっていますか？',
    answer:
      'すべてのデータの所有権はお客様にあります。当社はデータの安全な管理と分析のみを行い、厳格なセキュリティ対策と暗号化技術によってデータを保護しています。個人情報保護法やGDPRなどの国際基準に準拠しています。',
  },
  {
    id: 6,
    question: 'どのようなサポートが含まれますか？',
    answer:
      'すべてのプランに基本的なサポートが含まれており、プラン別にサポートレベルが異なります。プロフェッショナルプラン以上では24時間サポートが、エンタープライズプランでは専任コンサルタントによる定期訪問サポートが含まれています。',
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* ヘッダー */}
      <div className="bg-[#0056b3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              料金プラン
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 max-w-3xl mx-auto">
              規模や予算に応じた柔軟なプランをご用意。初期投資を抑えた段階的導入も可能です。
            </p>
          </div>
        </div>
      </div>

      {/* 料金プラン */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* プラン比較表 */}
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  tier.mostPopular ? 'ring-2 ring-[#0056b3]' : 'border border-gray-200'
                }`}
              >
                <div className="p-6 bg-white">
                  {tier.mostPopular && (
                    <div className="inline-block bg-[#0056b3] py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-4">
                      人気プラン
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-gray-900">{tier.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
                  <p className="mt-4">
                    <span className="text-3xl font-extrabold text-gray-900">{tier.price}</span>
                  </p>
                  <Link href={tier.href} className="mt-6 block w-full">
                    <Button
                      variant={tier.mostPopular ? 'primary' : 'outline'}
                      fullWidth
                    >
                      {tier.price === 'お問い合わせ' ? '詳細を確認する' : '申し込みを始める'}
                    </Button>
                  </Link>
                </div>
                <div className="px-6 pt-6 pb-8 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    含まれる機能
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 料金情報補足 */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              すべてのプランは初期導入費用が別途必要です。料金は税抜きです。<br />
              地方自治体向けの特別プランもございます。詳細はお問い合わせください。
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">よくある質問</h2>
            <p className="mt-4 text-lg text-gray-500">
              料金プランに関するよくある質問をまとめました。他にご不明点がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              {frequentlyAskedQuestions.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#00a86b] font-semibold tracking-wide uppercase">
              カスタマイズプラン
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              お客様に最適なプランをご提案します
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              料金表に記載のないカスタマイズや特別なニーズにも対応いたします。まずはお気軽にご相談ください。
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