import React from 'react';

const GraphsAnimation = () => (
    <g>
        {/* イラスト要素 - スマートシティのデータ可視化とレポート生成 */}
        <div className="relative w-full h-96 opacity-90">
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
            <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                {/* 背景グリッド */}
                <g opacity="0.2">
                <line x1="40" y1="40" x2="40" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="80" y1="40" x2="80" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="120" y1="40" x2="120" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="160" y1="40" x2="160" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="200" y1="40" x2="200" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="240" y1="40" x2="240" y2="240" stroke="white" strokeWidth="0.5" />
                <line x1="280" y1="40" x2="280" y2="240" stroke="white" strokeWidth="0.5" />
                
                <line x1="40" y1="40" x2="280" y2="40" stroke="white" strokeWidth="0.5" />
                <line x1="40" y1="80" x2="280" y2="80" stroke="white" strokeWidth="0.5" />
                <line x1="40" y1="120" x2="280" y2="120" stroke="white" strokeWidth="0.5" />
                <line x1="40" y1="160" x2="280" y2="160" stroke="white" strokeWidth="0.5" />
                <line x1="40" y1="200" x2="280" y2="200" stroke="white" strokeWidth="0.5" />
                <line x1="40" y1="240" x2="280" y2="240" stroke="white" strokeWidth="0.5" />
                </g>
                
                {/* 棒グラフ */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="1;0;0;0;0;0;1" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                <rect x="60" y="140" width="20" height="100" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;100" dur="1s" begin="0s" fill="freeze" />
                </rect>
                <rect x="100" y="100" width="20" height="140" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;140" dur="1s" begin="0.2s" fill="freeze" />
                </rect>
                <rect x="140" y="80" width="20" height="160" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;160" dur="1s" begin="0.4s" fill="freeze" />
                </rect>
                <rect x="180" y="120" width="20" height="120" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;120" dur="1s" begin="0.6s" fill="freeze" />
                </rect>
                <rect x="220" y="160" width="20" height="80" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;80" dur="1s" begin="0.8s" fill="freeze" />
                </rect>
                <rect x="260" y="110" width="20" height="130" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="height" values="0;130" dur="1s" begin="1s" fill="freeze" />
                </rect>
                
                <text x="70" y="250" text-anchor="middle" fill="white" font-size="8">Jan</text>
                <text x="110" y="250" text-anchor="middle" fill="white" font-size="8">Feb</text>
                <text x="150" y="250" text-anchor="middle" fill="white" font-size="8">Mar</text>
                <text x="190" y="250" text-anchor="middle" fill="white" font-size="8">Apr</text>
                <text x="230" y="250" text-anchor="middle" fill="white" font-size="8">May</text>
                <text x="270" y="250" text-anchor="middle" fill="white" font-size="8">Jun</text>
                </g>
                
                {/* 折れ線グラフ */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="0;1;0;0;0;0;0" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                <polyline 
                    points="70,140 110,100 150,80 190,120 230,160 270,110" 
                    stroke="rgba(255,126,0,0.8)" 
                    strokeWidth="3" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <animate attributeName="stroke-dasharray" values="500;0" dur="1.5s" begin="3s" fill="freeze" />
                </polyline>
                
                <circle cx="70" cy="140" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="3s" fill="freeze" />
                </circle>
                <circle cx="110" cy="100" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="3.2s" fill="freeze" />
                </circle>
                <circle cx="150" cy="80" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="3.4s" fill="freeze" />
                </circle>
                <circle cx="190" cy="120" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="3.6s" fill="freeze" />
                </circle>
                <circle cx="230" cy="160" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="3.8s" fill="freeze" />
                </circle>
                <circle cx="270" cy="110" r="5" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="r" values="0;5" dur="0.3s" begin="4s" fill="freeze" />
                </circle>
                </g>
                
                {/* 散布図 */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="0;0;1;0;0;0;0" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                {/* x軸散布点 */}
                <circle cx="60" cy="130" r="6" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="6s" fill="freeze" />
                </circle>
                <circle cx="85" cy="110" r="4" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;4" dur="0.5s" begin="6.1s" fill="freeze" />
                </circle>
                <circle cx="120" cy="90" r="8" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;8" dur="0.5s" begin="6.2s" fill="freeze" />
                </circle>
                <circle cx="160" cy="150" r="5" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;5" dur="0.5s" begin="6.3s" fill="freeze" />
                </circle>
                <circle cx="190" cy="100" r="7" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;7" dur="0.5s" begin="6.4s" fill="freeze" />
                </circle>
                <circle cx="210" cy="170" r="3" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;3" dur="0.5s" begin="6.5s" fill="freeze" />
                </circle>
                <circle cx="250" cy="120" r="5" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;5" dur="0.5s" begin="6.6s" fill="freeze" />
                </circle>
                <circle cx="270" cy="80" r="6" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="6.7s" fill="freeze" />
                </circle>
                </g>
                
                {/* ヒートマップ */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="0;0;0;1;0;0;0" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                <g>
                    <rect x="60" y="60" width="30" height="30" fill="rgba(0,86,179,0.3)">
                    <animate attributeName="fill-opacity" values="0;0.3" dur="0.3s" begin="9s" fill="freeze" />
                    </rect>
                    <rect x="60" y="90" width="30" height="30" fill="rgba(0,86,179,0.5)">
                    <animate attributeName="fill-opacity" values="0;0.5" dur="0.3s" begin="9.1s" fill="freeze" />
                    </rect>
                    <rect x="60" y="120" width="30" height="30" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="fill-opacity" values="0;0.7" dur="0.3s" begin="9.2s" fill="freeze" />
                    </rect>
                    <rect x="60" y="150" width="30" height="30" fill="rgba(0,86,179,0.9)">
                    <animate attributeName="fill-opacity" values="0;0.9" dur="0.3s" begin="9.3s" fill="freeze" />
                    </rect>
                    
                    <rect x="90" y="60" width="30" height="30" fill="rgba(0,86,179,0.4)">
                    <animate attributeName="fill-opacity" values="0;0.4" dur="0.3s" begin="9.4s" fill="freeze" />
                    </rect>
                    <rect x="90" y="90" width="30" height="30" fill="rgba(0,168,107,0.6)">
                    <animate attributeName="fill-opacity" values="0;0.6" dur="0.3s" begin="9.5s" fill="freeze" />
                    </rect>
                    <rect x="90" y="120" width="30" height="30" fill="rgba(255,126,0,0.8)">
                    <animate attributeName="fill-opacity" values="0;0.8" dur="0.3s" begin="9.6s" fill="freeze" />
                    </rect>
                    <rect x="90" y="150" width="30" height="30" fill="rgba(255,126,0,0.9)">
                    <animate attributeName="fill-opacity" values="0;0.9" dur="0.3s" begin="9.7s" fill="freeze" />
                    </rect>
                    
                    <rect x="120" y="60" width="30" height="30" fill="rgba(0,86,179,0.3)">
                    <animate attributeName="fill-opacity" values="0;0.3" dur="0.3s" begin="9.8s" fill="freeze" />
                    </rect>
                    <rect x="120" y="90" width="30" height="30" fill="rgba(0,168,107,0.5)">
                    <animate attributeName="fill-opacity" values="0;0.5" dur="0.3s" begin="9.9s" fill="freeze" />
                    </rect>
                    <rect x="120" y="120" width="30" height="30" fill="rgba(0,168,107,0.7)">
                    <animate attributeName="fill-opacity" values="0;0.7" dur="0.3s" begin="10s" fill="freeze" />
                    </rect>
                    <rect x="120" y="150" width="30" height="30" fill="rgba(255,126,0,0.8)">
                    <animate attributeName="fill-opacity" values="0;0.8" dur="0.3s" begin="10.1s" fill="freeze" />
                    </rect>
                    
                    <rect x="150" y="60" width="30" height="30" fill="rgba(0,86,179,0.2)">
                    <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" begin="10.2s" fill="freeze" />
                    </rect>
                    <rect x="150" y="90" width="30" height="30" fill="rgba(0,86,179,0.4)">
                    <animate attributeName="fill-opacity" values="0;0.4" dur="0.3s" begin="10.3s" fill="freeze" />
                    </rect>
                    <rect x="150" y="120" width="30" height="30" fill="rgba(0,168,107,0.6)">
                    <animate attributeName="fill-opacity" values="0;0.6" dur="0.3s" begin="10.4s" fill="freeze" />
                    </rect>
                    <rect x="150" y="150" width="30" height="30" fill="rgba(0,168,107,0.8)">
                    <animate attributeName="fill-opacity" values="0;0.8" dur="0.3s" begin="10.5s" fill="freeze" />
                    </rect>
                </g>
                </g>
                
                {/* ネットワークグラフ */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="0;0;0;0;1;0;0" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                {/* ノード */}
                <circle cx="160" cy="140" r="12" fill="rgba(255,126,0,0.7)">
                    <animate attributeName="r" values="0;12" dur="0.5s" begin="12s" fill="freeze" />
                </circle>
                <circle cx="100" cy="100" r="8" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="r" values="0;8" dur="0.5s" begin="12.1s" fill="freeze" />
                </circle>
                <circle cx="220" cy="100" r="8" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="r" values="0;8" dur="0.5s" begin="12.2s" fill="freeze" />
                </circle>
                <circle cx="90" cy="180" r="8" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="r" values="0;8" dur="0.5s" begin="12.3s" fill="freeze" />
                </circle>
                <circle cx="230" cy="180" r="8" fill="rgba(0,86,179,0.7)">
                    <animate attributeName="r" values="0;8" dur="0.5s" begin="12.4s" fill="freeze" />
                </circle>
                <circle cx="60" cy="140" r="6" fill="rgba(0,168,107,0.7)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="12.5s" fill="freeze" />
                </circle>
                <circle cx="140" cy="60" r="6" fill="rgba(0,168,107,0.7)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="12.6s" fill="freeze" />
                </circle>
                <circle cx="180" cy="60" r="6" fill="rgba(0,168,107,0.7)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="12.7s" fill="freeze" />
                </circle>
                <circle cx="260" cy="140" r="6" fill="rgba(0,168,107,0.7)">
                    <animate attributeName="r" values="0;6" dur="0.5s" begin="12.8s" fill="freeze" />
                </circle>
                
                {/* エッジ */}
                <line x1="160" y1="140" x2="100" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="100;0" dur="0.5s" begin="13s" fill="freeze" />
                </line>
                <line x1="160" y1="140" x2="220" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="100;0" dur="0.5s" begin="13.1s" fill="freeze" />
                </line>
                <line x1="160" y1="140" x2="90" y2="180" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="100;0" dur="0.5s" begin="13.2s" fill="freeze" />
                </line>
                <line x1="160" y1="140" x2="230" y2="180" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    <animate attributeName="stroke-dasharray" values="100;0" dur="0.5s" begin="13.3s" fill="freeze" />
                </line>
                <line x1="100" y1="100" x2="60" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7">
                    <animate attributeName="stroke-dasharray" values="80;0" dur="0.4s" begin="13.4s" fill="freeze" />
                </line>
                <line x1="100" y1="100" x2="140" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7">
                    <animate attributeName="stroke-dasharray" values="80;0" dur="0.4s" begin="13.5s" fill="freeze" />
                </line>
                <line x1="220" y1="100" x2="180" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7">
                    <animate attributeName="stroke-dasharray" values="80;0" dur="0.4s" begin="13.6s" fill="freeze" />
                </line>
                <line x1="220" y1="100" x2="260" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7">
                    <animate attributeName="stroke-dasharray" values="80;0" dur="0.4s" begin="13.7s" fill="freeze" />
                </line>
                </g>
                
                {/* レポート生成アニメーション */}
                <g>
                <animate 
                    attributeName="opacity" 
                    values="0;0;0;0;0;1;0" 
                    dur="18s" 
                    repeatCount="indefinite" 
                    begin="0s" 
                />
                
                {/* レポートドキュメント背景 */}
                <rect x="60" y="50" width="200" height="180" rx="4" fill="white" opacity="0.9">
                    <animate attributeName="height" values="0;180" dur="0.8s" begin="15s" fill="freeze" />
                </rect>
                
                {/* レポートヘッダー */}
                <rect x="60" y="50" width="200" height="30" rx="4" fill="#0056b3" opacity="0.9">
                    <animate attributeName="width" values="0;200" dur="0.6s" begin="15.2s" fill="freeze" />
                </rect>
                
                {/* レポートロゴ */}
                <circle cx="75" cy="65" r="8" fill="white" opacity="0.9">
                    <animate attributeName="r" values="0;8" dur="0.3s" begin="15.4s" fill="freeze" />
                </circle>
                
                {/* レポートタイトル */}
                <rect x="90" y="60" width="120" height="10" rx="2" fill="white" opacity="0.7">
                    <animate attributeName="width" values="0;120" dur="0.5s" begin="15.6s" fill="freeze" />
                </rect>
                
                {/* サブタイトル */}
                <rect x="70" y="90" width="180" height="8" rx="2" fill="#0056b3" opacity="0.7">
                    <animate attributeName="width" values="0;180" dur="0.7s" begin="15.8s" fill="freeze" />
                </rect>
                
                {/* グラフ1 */}
                <rect x="70" y="110" width="80" height="60" rx="2" fill="#f0f0f0" opacity="0.9">
                    <animate attributeName="height" values="0;60" dur="0.5s" begin="16s" fill="freeze" />
                </rect>
                
                {/* グラフ内バー */}
                <rect x="80" y="160" width="10" height="0" fill="#0056b3" opacity="0.8">
                    <animate attributeName="height" values="0;20" dur="0.3s" begin="16.2s" fill="freeze" />
                    <animate attributeName="y" values="160;140" dur="0.3s" begin="16.2s" fill="freeze" />
                </rect>
                <rect x="100" y="160" width="10" height="0" fill="#0056b3" opacity="0.8">
                    <animate attributeName="height" values="0;40" dur="0.3s" begin="16.3s" fill="freeze" />
                    <animate attributeName="y" values="160;120" dur="0.3s" begin="16.3s" fill="freeze" />
                </rect>
                <rect x="120" y="160" width="10" height="0" fill="#0056b3" opacity="0.8">
                    <animate attributeName="height" values="0;30" dur="0.3s" begin="16.4s" fill="freeze" />
                    <animate attributeName="y" values="160;130" dur="0.3s" begin="16.4s" fill="freeze" />
                </rect>
                
                {/* グラフ2 */}
                <rect x="170" y="110" width="80" height="60" rx="2" fill="#f0f0f0" opacity="0.9">
                    <animate attributeName="height" values="0;60" dur="0.5s" begin="16.1s" fill="freeze" />
                </rect>
                
                {/* グラフ内線 */}
                <path d="M180,150 L190,135 L200,145 L210,130 L220,140 L230,125" stroke="#ff7e00" strokeWidth="2" fill="none" opacity="0">
                    <animate attributeName="opacity" values="0;1" dur="0.8s" begin="16.3s" fill="freeze" />
                </path>
                
                {/* テーブル */}
                <rect x="70" y="180" width="180" height="40" rx="2" fill="#f0f0f0" opacity="0.9">
                    <animate attributeName="height" values="0;40" dur="0.5s" begin="16.5s" fill="freeze" />
                </rect>
                
                {/* テーブル行 */}
                <rect x="75" y="185" width="170" height="1" fill="#0056b3" opacity="0.5">
                    <animate attributeName="width" values="0;170" dur="0.5s" begin="16.6s" fill="freeze" />
                </rect>
                <rect x="75" y="195" width="170" height="1" fill="#0056b3" opacity="0.5">
                    <animate attributeName="width" values="0;170" dur="0.5s" begin="16.7s" fill="freeze" />
                </rect>
                <rect x="75" y="205" width="170" height="1" fill="#0056b3" opacity="0.5">
                    <animate attributeName="width" values="0;170" dur="0.5s" begin="16.8s" fill="freeze" />
                </rect>
                <rect x="75" y="215" width="170" height="1" fill="#0056b3" opacity="0.5">
                    <animate attributeName="width" values="0;170" dur="0.5s" begin="16.9s" fill="freeze" />
                </rect>
                
                {/* テーブル列 */}
                <rect x="120" y="185" width="1" height="30" fill="#0056b3" opacity="0.5">
                    <animate attributeName="height" values="0;30" dur="0.4s" begin="17s" fill="freeze" />
                </rect>
                <rect x="180" y="185" width="1" height="30" fill="#0056b3" opacity="0.5">
                    <animate attributeName="height" values="0;30" dur="0.4s" begin="17.1s" fill="freeze" />
                </rect>
                
                {/* 最終パルス効果 - レポート完成 */}
                <rect x="60" y="50" width="200" height="180" rx="4" fill="white" opacity="0">
                    <animate attributeName="opacity" values="0;0.3;0" dur="0.8s" begin="17.3s" fill="freeze" />
                </rect>
                </g>
            </svg>
            </div>
        </div>        
        </div>
    </g>
);

export default GraphsAnimation;