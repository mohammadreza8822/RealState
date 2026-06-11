"use client";

import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslations, useLocale } from "next-intl";
import { isRTLLocale } from "@/utils/locale";

function TextList({ title, profileData, setProfileData, type }) {
  const t = useTranslations("textList");
  const locale = useLocale();
  const isRTL = isRTLLocale(locale);
  const inputMargin = isRTL ? "ml-2.5" : "mr-2.5";
  const iconMargin = isRTL ? "mr-1" : "ml-1";

  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };

  const addHandler = () => {
    setProfileData({ ...profileData, [type]: [...profileData[type], ""] });
  };

  const deleteHandler = (index) => {
    const list = [...profileData[type]];
    list.splice(index, 1);
    setProfileData({ ...profileData, [type]: list });
  };

  return (
    <div className="mb-10">
      <p className="text-lg mb-2">{title}</p>
      {profileData[type].map((i, index) => (
        <div className="flex items-center my-2.5 animate-fadeIn" key={index}>
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
            className={`w-[300px] max-w-full border border-dashed border-primary text-gray-600 rounded-md px-3 py-2 text-base h-[38px] ${inputMargin} focus:border-solid focus:outline-none transition-all duration-200`}
          />
          <button
            onClick={() => deleteHandler(index)}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white text-base rounded-md px-3 py-1.5 transition-all duration-200 transform hover:scale-105"
          >
            {t("delete")}
            <AiOutlineDelete className={`${iconMargin} text-lg`} />
          </button>
        </div>
      ))}
      <button
        onClick={addHandler}
        className="flex items-center bg-primary hover:bg-primary/90 text-white text-base rounded-md px-3 py-1.5 mt-5 transition-all duration-200 transform hover:scale-105"
      >
        {t("add")} <MdOutlineLibraryAdd className={`${iconMargin} text-lg`} />
      </button>
    </div>
  );
}

export default TextList;
