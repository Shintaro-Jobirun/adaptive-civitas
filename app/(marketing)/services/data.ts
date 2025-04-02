import { Service } from '@/types/servicesTypes';

// サービスデータの定義
export const servicesData: Service[] = [
  // 交通サービス
  {
    id: 'traffic',
    name: '交通ソリューション',
    category: 'revitalization',
    overview: 'AI技術を活用した交通管理ソリューションで、渋滞の軽減と交通フローの最適化を実現します。リアルタイムデータと機械学習モデルにより、正確な交通予測と最適な経路提案が可能です。',
    challenges: [
      '慢性的な交通渋滞による経済損失と環境負荷',
      '交通量データ収集の人的コストと精度の問題',
      'イベント時や災害時の交通混乱',
      '交通流の最適化による公共交通機関の効率的運用の難しさ'
    ],
    services: [
      {
        name: 'AI交通量計測システム',
        description: '既存の街頭カメラやIoTセンサーを活用し、AI画像認識技術で車両・歩行者・自転車を自動カウント。交通量の可視化と分析を行うシステム。',
        features: [
          '交通量リアルタイム計測（車両タイプ別分類、歩行者・自転車のカウント、方向別通行量解析）',
          'ダッシュボード機能（リアルタイムモニタリング、トレンド分析、異常検知）',
          'レポート生成機能（定期レポート自動生成、カスタムレポート作成）'
        ]
      },
      {
        name: '交通予測分析',
        description: '収集した交通量データと外部データを組み合わせ、機械学習モデルによる高精度な交通予測を提供するシステム。',
        features: [
          '短期予測機能（数時間〜1日先の交通量予測、渋滞発生確率予測）',
          'シナリオシミュレーション（イベント開催時の交通影響予測、道路工事・規制の影響シミュレーション）',
          '最適経路提案（リアルタイム最適経路計算、予測を加味した先読み型経路提案）'
        ]
      }
    ],
    benefits: [
      '交通量データの自動収集による人的コスト削減',
      '渋滞予測による効率的な交通誘導と経済損失の軽減',
      'イベント時や災害時の交通シミュレーションによる混乱防止',
      '交通フロー最適化によるCO2排出量削減と環境負荷軽減'
    ],
    faqs: [
      {
        question: '既存のカメラ設備を活用できますか？',
        answer: 'はい、多くの場合、既存の街頭カメラやCCTVカメラをそのまま活用できます。カメラの画角や解像度によっては調整が必要な場合もございますので、導入前の環境調査で確認いたします。'
      },
      {
        question: '交通量予測の精度はどの程度ですか？',
        answer: '初期導入時で約80%の精度を実現し、データ蓄積と機械学習により3〜6ヶ月で85〜90%まで向上します。地域特性や過去データの質により異なりますので、詳細は個別にご相談ください。'
      },
      {
        question: 'プライバシーへの配慮はどうなっていますか？',
        answer: '全ての映像処理はエッジデバイスで行い、個人を特定できる情報は一切クラウドに送信しません。また、解析後の映像データは即時削除し、集計データのみを保存する仕組みになっています。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
        title: '交通状況調査',
        description: '現状の交通課題の洗い出しと最適なソリューション特定のため、交通フローの分析と既存設備の調査を実施します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>',
        title: 'カメラ・センサー設置',
        description: '最適な位置にカメラやセンサーを設置し、エッジデバイスでの処理環境を構築します。既存カメラの活用も可能です。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
        title: 'データ収集・AIモデル調整',
        description: '2〜4週間のデータ収集期間を設け、地域特性に合わせたAIモデルのカスタマイズと精度チューニングを行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
        title: 'ダッシュボード構築',
        description: 'クライアント要件に合わせたカスタムダッシュボードを構築し、必要な分析機能や通知設定を実装します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
        title: '本格稼働と継続改善',
        description: 'システムの本格稼働を開始し、定期的な精度検証と継続的な改善を行います。データ蓄積により予測精度は向上します。'
      }
    ]
  },
  
  // 地域経済活性化
  {
    id: 'economic',
    name: '地域経済活性化ソリューション',
    category: 'revitalization',
    overview: '匿名化された人流データとAI分析で、来街者や観光客の行動パターンを把握。データ駆動型の地域経済活性化戦略と効果的な観光プロモーションを支援します。',
    challenges: [
      '来街者数の減少と商店街の衰退',
      '観光客の行動パターンや嗜好の把握困難',
      '効果的なイベント計画やプロモーション戦略の立案難易度',
      '地域資源の最適活用と観光コンテンツ開発'
    ],
    services: [
      {
        name: '来街者分析・商圏分析',
        description: 'Wi-Fiセンサーによる人流データ収集、来街者の属性・行動パターン分析、小売店・飲食店向け需要予測を提供します。',
        features: [
          '人流データ収集・分析（滞在時間、移動経路、リピート率の測定）',
          '来街者属性分析（年齢層、性別、居住エリアなどの推計）',
          '商圏分析レポート（時間帯別・曜日別の来客傾向、競合施設との比較）'
        ]
      },
      {
        name: '観光客行動分析',
        description: '観光客の移動経路・滞在時間分析、多言語観光案内の最適配置提案、観光資源の効果的活用戦略立案を支援します。',
        features: [
          '観光客行動パターン分析（人気スポット、周遊ルート、滞在時間の可視化）',
          '効果的な観光案内提案（多言語案内の最適配置、デジタルサイネージ活用戦略）',
          '観光コンテンツ開発支援（未活用資源の発掘、体験型コンテンツの提案）'
        ]
      }
    ],
    benefits: [
      'データに基づく効果的な商業施策の立案',
      '観光客の行動理解による満足度向上とリピート率増加',
      '地域資源の最適活用による観光収入の増加',
      '効果測定に基づくプロモーション戦略の継続的改善'
    ],
    faqs: [
      {
        question: '個人情報やプライバシーは守られますか？',
        answer: '全てのデータは匿名化・集計化されており、個人を特定できる情報は収集しません。Wi-Fiセンサーも端末の識別子のみを一方向ハッシュ化して利用し、プライバシーに最大限配慮しています。'
      },
      {
        question: '小規模な商店街でも導入できますか？',
        answer: 'はい、規模に合わせたカスタマイズが可能です。小規模商店街向けには低コストで簡易的に導入できるパッケージもご用意しています。導入効果を見ながら段階的に機能拡張していくことも可能です。'
      },
      {
        question: 'どのような成功事例がありますか？',
        answer: '地方の温泉街での導入事例では、観光客の滞在時間が平均30%増加し、土産品売上が20%向上しました。また、駅前商店街でのイベント最適化により来街者数が前年比15%増加した事例もあります。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
        title: '地域経済現状分析',
        description: '現状の来街状況、商業動向、観光資源を調査し、重点的に取り組むべき課題と機会を特定します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
        title: 'センサー・ビーコン設置',
        description: '人流データ収集のためのWi-Fiセンサーやビーコンを、来街者の動線を効果的に捉えられる位置に設置します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
        title: '基礎データ収集',
        description: '1〜2ヶ月間の基礎データ収集を行い、来街パターンの把握と初期分析モデルの構築を行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
        title: '活性化戦略策定',
        description: '収集したデータに基づき、商業施策、イベント企画、観光プロモーション等の具体的な活性化戦略を策定します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>',
        title: '施策実施と効果測定',
        description: '策定した戦略に基づく施策を実施し、リアルタイムデータで効果を測定。継続的な改善サイクルを確立します。'
      }
    ]
  },
  
  // 環境モニタリング
  {
    id: 'environment',
    name: '環境モニタリングソリューション',
    category: 'resource-management',
    overview: '低コストセンサーネットワークと高度なAI分析で、大気質や騒音レベルをリアルタイムに監視します。環境データの可視化と予測分析により、都市環境の改善と住民の健康保護を支援します。',
    challenges: [
      '都市部の大気汚染による健康リスク',
      '騒音・振動による生活環境悪化と苦情対応',
      '環境モニタリングのコスト高と測定点の不足',
      '環境データの活用不足と住民への情報共有の難しさ'
    ],
    services: [
      {
        name: '大気質モニタリングシステム',
        description: '低コストセンサーネットワークを活用し、大気汚染物質を測定・分析するシステム。健康リスク評価と情報提供を行います。',
        features: [
          'マルチポイント測定ネットワーク（複数地点でのリアルタイム大気質測定、異常値の自動検出）',
          '空間分布可視化（地図ベースの汚染物質濃度マップ、時間変化アニメーション）',
          '健康リスク評価と通知システム（汚染物質濃度に基づくリスク指標、アプリ/メール経由の警告通知）'
        ]
      },
      {
        name: '騒音・振動モニタリング',
        description: '都市環境における騒音レベルと振動を測定し、生活環境への影響評価と対策提案を行うシステム。',
        features: [
          '騒音・振動の測定・分析（24時間連続モニタリング、周波数分析、発生源特定）',
          '規制基準管理（地域・時間帯別の規制基準値との比較、超過状況の記録）',
          '影響予測・評価と通知機能（新規開発・工事の影響予測、基準値超過時の即時通知）'
        ]
      }
    ],
    benefits: [
      '環境リスクの早期発見と対策実施',
      '住民の健康保護と生活環境の改善',
      '客観的データに基づく環境政策の立案',
      '環境情報の可視化による住民理解と協力促進'
    ],
    faqs: [
      {
        question: 'センサーの設置はどのように行いますか？',
        answer: '電源と通信環境があれば設置可能です。公共施設や街路灯への設置が一般的で、太陽光パネル+バッテリーによる自立型の設置も可能です。設置場所の選定から工事まで一貫してサポートします。'
      },
      {
        question: 'データの精度はどの程度ですか？',
        answer: '低コストセンサーを使用しながらも、独自のキャリブレーション技術と補正アルゴリズムにより、業務用測定器の約85-90%の精度を実現しています。定期的な精度検証と調整を行い、信頼性を維持します。'
      },
      {
        question: '住民への情報提供はどのように行われますか？',
        answer: '専用のウェブポータルとモバイルアプリで常時確認可能なほか、基準値超過時には登録者にプッシュ通知やメールでアラートを送信します。また、オープンデータとしての公開や、自治体広報との連携も可能です。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>',
        title: '環境課題マッピング',
        description: '地域の環境課題を特定し、最適な測定ポイントを選定するための現地調査と環境データ分析を行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
        title: 'センサーネットワーク構築',
        description: '環境センサーの設置と通信ネットワークの構築を行い、データ収集基盤を整備します。省電力設計で維持コストを抑制します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
        title: 'データ収集・キャリブレーション',
        description: '初期データ収集期間（2〜4週間）を設け、実環境での測定値キャリブレーションと基準値の設定を行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>',
        title: '可視化プラットフォーム構築',
        description: '収集したデータを分かりやすく可視化するウェブプラットフォームとアラートシステムを構築します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        title: '運用開始と住民啓発',
        description: 'システムの本格運用を開始し、住民への情報提供と環境意識啓発プログラムを実施します。継続的なメンテナンスも実施します。'
      }
    ]
  },
  
  // エネルギー最適化
  {
    id: 'energy',
    name: 'エネルギー最適化ソリューション',
    category: 'resource-management',
    overview: '機械学習を用いたエネルギー消費パターン分析で、無駄を特定し最適化します。中小企業向けの省エネ対策やマイクログリッド管理により、コスト削減と環境負荷軽減を同時に実現します。',
    challenges: [
      '中小企業のエネルギーコスト上昇と省エネノウハウ不足',
      '再生可能エネルギーの不安定さと系統連携の課題',
      '災害時のエネルギーレジリエンス確保',
      'カーボンニュートラル実現への対応と投資効率'
    ],
    services: [
      {
        name: '中小企業向けエネルギー消費最適化',
        description: '中小企業の電力使用パターンを分析し、機械学習による省エネ施策を提案。コスト削減と環境負荷軽減を両立させるシステム。',
        features: [
          '電力使用分析（設備・時間帯・季節ごとの電力消費パターン可視化、異常・無駄の自動検出）',
          'AI最適化提案（機械学習による省エネ施策提案、コスト削減効果のシミュレーション）',
          '自動制御連携とレポーティング（AIによる設備制御推奨値の算出、削減効果の可視化）'
        ]
      },
      {
        name: '地域マイクログリッド管理',
        description: '地域内の分散型エネルギーリソースを統合管理し、需給バランスを最適化するシステム。災害時のレジリエンス強化も実現。',
        features: [
          'エネルギーリソース統合管理（太陽光発電・蓄電池・EVなどの統合監視、リアルタイム発電量・蓄電量・使用量の可視化）',
          '需給バランス最適化（気象予測と連動した発電量予測、需要予測モデルによる使用量予測）',
          '災害時運用モード（系統遮断時の自立運転管理、優先供給先の設定と制御）'
        ]
      }
    ],
    benefits: [
      'エネルギーコストの削減（平均15-20%）',
      'CO2排出量の削減とカーボンニュートラルへの貢献',
      '災害時のエネルギー自立性向上と事業継続性強化',
      '設備の効率的運用による寿命延長と投資最適化'
    ],
    faqs: [
      {
        question: '導入にあたり大規模な設備投資は必要ですか？',
        answer: '基本的には既存の設備を活かした導入が可能です。電力メーターへの簡易センサー設置から始め、効果を確認しながら段階的に拡張することで、初期投資を抑えることができます。'
      },
      {
        question: '投資回収期間はどのくらいですか？',
        answer: '省エネ施策の内容により異なりますが、平均的には6ヶ月〜2年で初期投資の回収が可能です。運用コスト削減と設備投資のバランスを考慮した最適な提案を行います。'
      },
      {
        question: 'マイクログリッドはどのような施設に適していますか？',
        answer: '太陽光発電設備を持つ施設群や、災害時に電力確保が重要な公共施設、医療施設、避難所などに特に適しています。また、工業団地や商業施設など、複数の建物が集まるエリアでの導入効果が高くなります。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
        title: 'エネルギー診断',
        description: '現状のエネルギー使用状況を詳細に分析し、無駄やピークを特定。省エネポテンシャルを定量的に評価します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
        title: '計測システム導入',
        description: '主要な電力使用設備にスマートメーターを設置し、詳細な電力使用データをリアルタイムで収集する基盤を構築します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
        title: '最適化モデル構築',
        description: '収集したデータをもとに、機械学習モデルによるエネルギー使用の最適化アルゴリズムを構築。施設特性に合わせてカスタマイズします。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>',
        title: '制御システム連携',
        description: '既存の設備制御システムとの連携インターフェースを構築し、AIによる最適制御の実装、または運用者への推奨値の提示を行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>',
        title: '効果検証と継続改善',
        description: '実装した最適化施策の効果を定量的に検証し、さらなる改善点を特定。継続的な省エネとコスト削減のサイクルを確立します。'
      }
    ]
  },
  
  // 防災・セキュリティ
  {
    id: 'security',
    name: '防災・セキュリティソリューション',
    category: 'resource-management',
    overview: 'AIによる映像解析と異常検知で、セキュリティリスクや災害の早期発見を実現。リアルタイムアラートと避難支援システムにより、安全・安心な都市環境の構築に貢献します。',
    challenges: [
      '災害発生時の情報収集と避難誘導の遅れ',
      '監視カメラの膨大な映像データの人的監視限界',
      '要支援者の把握と優先的支援の難しさ',
      '犯罪・事故の未然防止と早期対応'
    ],
    services: [
      {
        name: 'AI異常検知システム',
        description: '監視カメラ映像からAIが異常行動や危険な状況を自動検出し、管理者にリアルタイムで通知するシステム。',
        features: [
          '行動異常検知（暴力・トラブル行為の検出、立入禁止区域への侵入検知、不審な滞留・徘徊の検出）',
          '危険状況検知（火災・煙の早期検出、水漏れ・浸水の検出、転倒・事故の検知）',
          '自動追跡・記録と通知（検知対象の自動追跡、検知イベントの証拠保全、管理者へのリアルタイム通知）'
        ]
      },
      {
        name: '災害予測・避難支援',
        description: '気象データと地理情報を組み合わせたAI分析により災害リスクを評価し、最適な避難計画を提供するシステム。',
        features: [
          '災害リスク分析（降雨量・河川水位データの監視、浸水・土砂災害リスクの予測）',
          '避難計画最適化（リアルタイム状況に応じた避難経路提案、避難所の収容状況管理）',
          '要支援者管理（要支援者データベース管理、位置情報に基づく支援優先順位付け）'
        ]
      }
    ],
    benefits: [
      '災害や事故の早期発見による被害最小化',
      '自動監視による人的コスト削減と24時間365日の安全確保',
      '要支援者への効果的な支援による安全性向上',
      'データに基づく防災・防犯計画の策定と資源の効率的配分'
    ],
    faqs: [
      {
        question: 'プライバシーへの配慮はどうなっていますか？',
        answer: '映像分析はエッジデバイス上で行い、映像そのものはクラウドに送信しません。また、分析結果からも個人特定情報を除去し、プライバシー保護法制に完全準拠したシステム設計となっています。'
      },
      {
        question: '誤検知の可能性はありますか？',
        answer: '初期導入時は環境に合わせたチューニングを行い、誤検知を最小限に抑えます。それでも発生する可能性はあるため、重要度に応じた通知設定や、人による最終確認プロセスを組み込むことで対応しています。'
      },
      {
        question: '災害時に通信が途絶えた場合はどうなりますか？',
        answer: '避難支援システムはオフライン機能を備えており、最後に取得したデータを基に基本的な避難誘導が可能です。また、分散型のエッジサーバーにより、一部の通信障害でもシステム全体が停止しない冗長設計を採用しています。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
        title: 'リスク評価',
        description: '対象エリアの安全リスク評価を行い、優先度の高い監視ポイントと必要な検知項目を特定します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
        title: '監視システム構築',
        description: 'AIカメラの設置または既存カメラへのAI処理装置の追加を行い、基本的な監視システムを構築します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
        title: 'AIモデル調整',
        description: '設置環境に合わせたAIモデルのチューニングを行い、誤検知の最小化と検知精度の向上を図ります。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>',
        title: '通知・対応システム連携',
        description: '検知時の通知システムと関係機関（警備・消防・警察等）との連携体制を構築します。緊急時の対応フローも確立します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        title: '検証と訓練',
        description: 'システムの総合検証と、実際の緊急事態を想定した対応訓練を実施。定期的な運用レビューと機能強化も行います。'
      }
    ]
  },
  
  // スマートインフラ管理
  {
    id: 'infrastructure',
    name: 'スマートインフラ管理',
    category: 'resource-management',
    overview: 'センサーデータとAI分析によるインフラの状態モニタリングと劣化予測を提供。予防的メンテナンスで長期コスト削減を実現し、上下水道システムの最適化で資源利用効率を向上させます。',
    challenges: [
      'インフラの老朽化と維持管理コスト増大',
      '点検人員の不足と技術継承の課題',
      '突発的な故障・事故のリスク',
      '上下水道の漏水や非効率な運用による資源・エネルギー損失'
    ],
    services: [
      {
        name: 'インフラ劣化予測',
        description: '道路・橋梁などのインフラの状態をセンサーデータと画像分析で監視し、AIによる劣化予測で効率的な保守計画を提案するシステム。',
        features: [
          '状態監視・分析（カメラ画像によるひび割れ・劣化検出、振動・傾斜センサーによる構造変化検知）',
          '劣化予測モデル（機械学習による劣化進行予測、環境要因の影響分析、寿命予測と重大リスク評価）',
          '保守計画最適化と点検・記録管理（優先補修箇所の自動ランク付け、点検記録のデジタル化・一元管理）'
        ]
      },
      {
        name: '上下水道最適化',
        description: '上下水道ネットワークの監視と最適管理を行い、漏水検出・水質監視・需要予測に基づく効率的な運用を実現するシステム。',
        features: [
          '漏水検出システム（流量・圧力センサーネットワークによる監視、異常パターン検知による漏水早期発見）',
          '水質モニタリング（リアルタイム水質センサーデータ収集、異常値の即時検出とアラート）',
          '需要予測と供給最適化（時間帯・季節・天候による需要予測、ポンプ運転スケジュール最適化）'
        ]
      }
    ],
    benefits: [
      '予防的メンテナンスによる長期的コスト削減（30%程度）',
      'インフラ寿命の延長（20%程度）と突発的故障リスクの低減',
      '限られた予算・人員での効率的な維持管理の実現',
      '水資源の有効活用と漏水削減（20-30%）によるコスト削減'
    ],
    faqs: [
      {
        question: '既存のインフラ管理システムとの連携は可能ですか？',
        answer: '標準的なAPIを通じて既存システムとの連携が可能です。完全に置き換える必要はなく、既存システムを補完・拡張する形での導入も可能です。具体的な連携方法は個別にご相談ください。'
      },
      {
        question: '小規模自治体でも導入は可能ですか？',
        answer: 'はい、規模に合わせたスケーラブルな導入が可能です。重要度の高いインフラから段階的に導入することで、初期投資を抑えながら効果を得ることができます。広域連携による複数自治体での共同導入も支援しています。'
      },
      {
        question: '精度の高い劣化予測のために必要なデータ期間はどれくらいですか？',
        answer: '初期モデルは類似インフラの一般的データを基に構築します。そのため、導入直後から一定の予測が可能です。自治体固有のデータが6ヶ月〜1年蓄積されるとともに、予測精度は段階的に向上していきます。'
      }
    ],
    implementationProcess: [
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
        title: 'インフラ健全度評価',
        description: '既存点検記録の分析と現地調査により、対象インフラの現状評価と優先監視対象の特定を行います。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>',
        title: 'センサー・計測機器設置',
        description: '重要監視ポイントにセンサーや計測機器を設置し、データ収集ネットワークを構築します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
        title: '基礎データ収集・モデル構築',
        description: '初期データ収集と過去の点検記録を統合し、インフラ劣化予測の基礎モデルを構築します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
        title: '管理プラットフォーム構築',
        description: 'インフラ状態の可視化と予測結果を一元管理するプラットフォームを構築。点検・保守計画の最適化機能も実装します。'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>',
        title: '予防保全計画実施と効果検証',
        description: 'AIが提案した予防保全計画を実施し、効果検証を行います。継続的なデータ収集と予測モデルの精度向上も進めます。'
      }
    ]
  }
];