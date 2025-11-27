// layout/Footer.jsx یا components/Footer.jsx
import Link from "next/link";
import { FiGithub, FiLinkedin, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // اسمت رو اینجا عوض کن
  const developerName = "محمدرضا اصغری";
  const linkedinUrl =
    "https://www.linkedin.com/in/mohammadreza-asghary-3b6a54322/";
  const githubUrl = "https://github.com/mohammadreza8822";

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* خط گرادیانتی ظریف */}
      <div className="h-1 bg-gradient-to-r from-[#304ffe] via-blue-500 to-cyan-500" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-right">
          {/* ستون ۱: لوگو و توضیح */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-[#304ffe] to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-7 h-7 bg-white rounded-lg"></div>
              </div>
              <span className="text-2xl font-bold text-[#304ffe]">
                سامانه املاک
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              پلتفرم هوشمند خرید، فروش و اجاره ملک با بهترین مشاوران ایران
            </p>
          </div>

          {/* ستون ۲ و ۳: لینک‌های سریع (دو ستونه در موبایل) */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">
              لینک‌های سریع
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                صفحه اصلی
              </Link>
              <Link
                href="/buy-residential"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                آگهی‌های خرید
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                تماس با ما
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-[#304ffe] transition-colors"
              >
                قوانین سایت
              </Link>
            </div>
          </div>

          {/* ستون ۴: کپی‌رایت + توسعه‌دهنده */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                © {currentYear} سامانه املاک
              </p>
              <p className="text-gray-500 text-xs mt-1">تمامی حقوق محفوظ است</p>
            </div>

            {/* بخش توسعه‌دهنده — غرورآفرین و حرفه‌ای */}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-md">
              <p className="text-gray-700 text-sm font-medium whitespace-nowrap">
                طراحی و توسعه توسط
              </p>
              <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
                <span className="font-bold text-[#304ffe]">
                  {developerName}
                </span>
                <div className="flex gap-2">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#304ffe] transition-colors"
                  >
                    <FiLinkedin className="text-xl" />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#304ffe] transition-colors"
                  >
                    <FiGithub className="text-xl" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 justify-center md:justify-start">
                ساخته شده با <FiHeart className="text-red-500" /> در ایران
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
