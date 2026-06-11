"use client";

import { useTranslations } from "next-intl";

function RadioList({ profileData, setProfileData }) {
  const t = useTranslations();
  const { category } = profileData;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const radioItems = [
    { id: "villa", label: t("common.villa") },
    { id: "apartment", label: t("common.apartment") },
    { id: "store", label: t("common.store") },
    { id: "office", label: t("common.office") },
  ];

  return (
    <div className="mb-10">
      <p className="text-lg mb-2">{t("radioList.category")}</p>
      <div className="flex flex-wrap gap-4">
        {radioItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-primary/10 text-primary px-3 py-1.5 rounded-md cursor-pointer min-w-[70px] hover:bg-primary/20 transition-colors duration-200"
          >
            <label htmlFor={item.id} className="cursor-pointer">
              {item.label}
            </label>
            <input
              type="radio"
              name="category"
              value={item.id}
              id={item.id}
              checked={category === item.id}
              onChange={changeHandler}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioList;
