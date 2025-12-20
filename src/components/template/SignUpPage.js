"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import Loader from "@/module/Loader";

function SignUpPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isConsultant, setIsConsultant] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error(t("signup.passwordMismatch"));
      return;
    }

    if (password.length < 6) {
      toast.error(t("signup.passwordMinLength"));
      return;
    }

    setLoading(true);

    // تغییر مهم: دیگه role رو نمی‌فرستیم! فقط می‌گیم درخواست مشاور داره یا نه
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        requestAgent: isConsultant,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 201) {
      toast.success(
        isConsultant
          ? t("signup.successConsultant")
          : t("signup.success")
      );
      router.push("/signin");
    } else {
      toast.error(data.error || t("signup.error"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] my-20">
      <h4 className="text-[#304ffe] font-semibold text-2xl mb-5">
        {t("signup.title")}
      </h4>

      <form className="flex flex-col max-w-[700px] shadow-[0px_4px_15px_#304ffe4a] border-2 border-[#304ffe] p-10 rounded-lg mb-8">
        <label className="text-[#304ffe] mb-2.5 font-normal">{t("signup.email")}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10 w-[350px] border border-[#304ffe] border-dashed text-gray-700 rounded-md p-2.5 ltr h-12 text-base focus:border-solid focus:outline-none"
        />

        <label className="text-[#304ffe] mb-2.5 font-normal">{t("signup.password")}</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-10 w-[350px] border border-[#304ffe] border-dashed text-gray-700 rounded-md p-2.5 ltr h-12 text-base focus:border-solid focus:outline-none"
        />

        <label className="text-[#304ffe] mb-2.5 font-normal">
          {t("signup.rePassword")}
        </label>
        <input
          type="password"
          required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="mb-8 w-[350px] border border-[#304ffe] border-dashed text-gray-700 rounded-md p-2.5 ltr h-12 text-base focus:border-solid focus:outline-none"
        />

        {/* تیک مشاور — حالا فقط درخواست می‌فرسته */}
        <div className="flex items-center gap-3 mb-10 bg-amber-50 p-4 rounded-xl border border-amber-300">
          <input
            type="checkbox"
            id="consultant"
            checked={isConsultant}
            onChange={(e) => setIsConsultant(e.target.checked)}
            className="w-6 h-6 text-amber-600 rounded cursor-pointer"
          />
          <label
            htmlFor="consultant"
            className="text-amber-800 font-bold cursor-pointer select-none"
          >
            {t("signup.consultantRequest")}
          </label>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            onClick={signUpHandler}
            className="border-none bg-[#304ffe] text-white text-lg font-bold rounded-md py-4 hover:scale-105 transition-all shadow-lg"
          >
            {isConsultant ? t("signup.submitRequest") : t("signup.submit")}
          </button>
        )}
      </form>

      <p className="text-gray-500 text-lg mb-20">
        {t("signup.hasAccount")}{" "}
        <Link
          href="/signin"
          className="text-[#304ffe] font-bold border-b-2 border-[#304ffe] pb-1"
        >
          {t("signup.signin")}
        </Link>
      </p>

      <Toaster position="top-center" />
    </div>
  );
}

export default SignUpPage;
