"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import Loader from "@/module/Loader";

function SignInPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signInHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h4 className="text-[#304ffe] font-semibold text-2xl mb-5">{t("signin.title")}</h4>
      <form className="flex flex-col max-w-[700px] shadow-[0px_4px_15px_#304ffe4a] border-2 border-[#304ffe] p-10 rounded-lg mb-8">
        <label className="text-[#304ffe] mb-2.5 font-normal">{t("signin.email")}</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10 w-[250px] border border-[#304ffe] border-dashed text-gray-500 rounded-md p-2.5 ltr h-10 text-base focus:border-solid focus:outline-none"
        />
        <label className="text-[#304ffe] mb-2.5 font-normal">{t("signin.password")}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-10 w-[250px] border border-[#304ffe] border-dashed text-gray-500 rounded-md p-2.5 ltr h-10 text-base focus:border-solid focus:outline-none"
        />
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            onClick={signInHandler}
            className="border-none bg-[#304ffe] text-white text-lg font-normal rounded-md transition-all duration-100 cursor-pointer py-2 hover:scale-105"
          >
            {t("signin.submit")}
          </button>
        )}
      </form>
      <p className="text-gray-500 text-lg">
        {t("signin.noAccount")}{" "}
        <Link
          href="/signup"
          className="text-[#304ffe] mr-2.5 border-b-[3px] border-gray-500"
        >
          {t("signin.signup")}
        </Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignInPage;
