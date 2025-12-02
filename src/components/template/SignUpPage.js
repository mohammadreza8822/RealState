"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/module/Loader";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isConsultant, setIsConsultant] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("رمز و تکرار آن برابر نیست!");
      return;
    }

    setLoading(true);

    // اگر تیک "مشاور" زده شده بود → در واقع ادمین است!
    const role = isConsultant ? "ADMIN" : "USER";

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, role }), // نقش ارسال میشه
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 201) {
      toast.success("ثبت‌نام با موفقیت انجام شد!");
      router.push("/signin");
    } else {
      toast.error(data.error || "خطایی رخ داد");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h4 className="text-[#304ffe] font-semibold text-2xl mb-5">
        فرم ثبت نام
      </h4>
      <form className="flex flex-col max-w-[700px] shadow-[0px_4px_15px_#304ffe4a] border-2 border-[#304ffe] p-10 rounded-lg mb-8">
        <label className="text-[#304ffe] mb-2.5 font-normal">ایمیل:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10 w-[250px] border border-[#304ffe] border-dashed text-gray-500 rounded-md p-2.5 ltr h-10 text-base focus:border-solid focus:outline-none"
        />
        <label className="text-[#304ffe] mb-2.5 font-normal">رمز عبور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-10 w-[250px] border border-[#304ffe] border-dashed text-gray-500 rounded-md p-2.5 ltr h-10 text-base focus:border-solid focus:outline-none"
        />
        <label className="text-[#304ffe] mb-2.5 font-normal">
          تکرار رمز عبور:
        </label>
        <input
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="mb-5 w-[250px] border border-[#304ffe] border-dashed text-gray-500 rounded-md p-2.5 ltr h-10 text-base focus:border-solid focus:outline-none"
        />
        <div className="flex w-full items-center mb-10">
          <label className="text-[#304ffe] font-normal">
            میخواهید مشاور شوید ؟
          </label>
          <input
            type="checkbox"
            value={isConsultant}
            onChange={(e) => setIsConsultant(e.target.checked)}
            className="mr-2"
          />
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            onClick={signUpHandler}
            className="border-none bg-[#304ffe] text-white text-lg font-normal rounded-md transition-all duration-100 cursor-pointer py-2 hover:scale-105"
          >
            ثبت نام
          </button>
        )}
      </form>
      <p className="text-gray-500 text-lg">
        حساب کاربری دارید؟{" "}
        <Link
          href="/signin"
          className="text-[#304ffe] mr-2.5 border-b-[3px] border-gray-500"
        >
          ورود
        </Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignUpPage;
