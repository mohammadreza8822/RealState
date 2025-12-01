// app/dashboard/contact-us/page.js
import connectDB from "@/utils/connectDB";
import ContactUs from "@/models/ContactUs"; // مرحله ۲ این مدل رو می‌سازیم
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export const dynamic = "force-dynamic"; // خیلی مهم! بدون این پیام‌ها آپدیت نمی‌شن

export default async function ContactUsAnswers() {
  const session = await getServerSession(authOptions);

  // فقط ادمین و سوپرادمین اجازه دارن
  if (!session || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">دسترسی ممنوع</h1>
          <p className="text-gray-600">
            فقط مدیران می‌توانند پیام‌های تماس را ببینند.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            بازگشت به داشبورد
          </Link>
        </div>
      </div>
    );
  }

  await connectDB();
  const messages = await ContactUs.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">
              پیام‌های تماس با ما ({messages.length})
            </h1>
            <Link
              href="/dashboard"
              className="bg-gray-600 text-white px-5 py-3 rounded-xl hover:bg-gray-700 transition"
            >
              بازگشت به داشبورد
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              هنوز هیچ پیامی ارسال نشده است.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-4 rounded-tr-xl">تاریخ</th>
                    <th className="p-4">نام</th>
                    <th className="p-4">تلفن</th>
                    <th className="p-4">ایمیل</th>
                    <th className="p-4">موضوع</th>
                    <th className="p-4 rounded-tl-xl">پیام</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg, index) => (
                    <tr
                      key={msg._id}
                      className={`border-b hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-4 text-sm">
                        {new Date(msg.createdAt).toLocaleDateString("fa-IR")}{" "}
                        <br />
                        {new Date(msg.createdAt).toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4 font-semibold">{msg.name}</td>
                      <td className="p-4" dir="ltr">
                        {msg.phone}
                      </td>
                      <td className="p-4" dir="ltr">
                        {msg.email}
                      </td>
                      <td className="p-4">{msg.subject}</td>
                      <td className="p-4 max-w-xs text-gray-700">
                        {msg.message.length > 80
                          ? msg.message.substring(0, 80) + "..."
                          : msg.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
