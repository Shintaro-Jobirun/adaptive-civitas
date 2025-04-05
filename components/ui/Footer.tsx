// components/ui/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          {/* <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              <Link href="/" className="hover:text-blue-300 transition-colors">
                合同会社JOBIRUN
              </Link>
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              〒010-0923<br />
              秋田県秋田市保戸野金砂町４ー３１
            </p>
            <p className="text-gray-300 text-sm">
              <a href="https://jobirun.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                https://jobirun.com
              </a>
            </p>
          </div> */}
          
          {/* 会社情報 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  トップページ
                </Link>
              </li>
              <li>
                <a href="https://jobirun.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 地域活力創造 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">地域活力創造</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services?id=traffic" className="text-gray-300 hover:text-white text-sm transition-colors">
                  交通最適化
                </Link>
              </li>
              <li>
                <Link href="/services?id=economic" className="text-gray-300 hover:text-white text-sm transition-colors">
                  地域経済活性化
                </Link>
              </li>
              <li>
                <Link href="/services?id=security" className="text-gray-300 hover:text-white text-sm transition-colors">
                  防災・セキュリティ
                </Link>
              </li>
            </ul>
          </div>

          {/* 地域資源管理 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-300">地域資源管理</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services?id=environment" className="text-gray-300 hover:text-white text-sm transition-colors">
                  環境モニタリング
                </Link>
              </li>
              <li>
                <Link href="/services?id=energy" className="text-gray-300 hover:text-white text-sm transition-colors">
                  エネルギー最適化
                </Link>
              </li>
              <li>
                <Link href="/services?id=infrastructure" className="text-gray-300 hover:text-white text-sm transition-colors">
                  スマートインフラ管理
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} JOBIRUN LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;