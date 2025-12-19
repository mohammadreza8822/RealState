"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import styles from "./Contact.module.css";

function ContactPage() {
  const t = useTranslations();
  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 10) {
        setContactUs({ ...contactUs, [name]: numericValue });
      }
      return;
    }

    setContactUs({ ...contactUs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی
    if (
      !contactUs.name ||
      !contactUs.email ||
      !contactUs.phone ||
      !contactUs.subject ||
      !contactUs.message
    ) {
      toast.error(t("contact.fillAllFields"));
      return;
    }

    if (contactUs.phone.length !== 10) {
      toast.error(t("contact.phoneLengthError"));
      return;
    }

    if (!contactUs.phone.startsWith("09")) {
      toast.error(t("contact.phoneStartError"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(contactUs.email)) {
      toast.error(t("contact.emailError"));
      return;
    }

    setLoading(true);

    try {
      // مهم: حتماً از این فرمت استفاده کن + cache: "no-store"
      const res = await fetch("/api/contact-us", {
        method: "POST",
        body: JSON.stringify(contactUs),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // این حتماً باشه
        next: { revalidate: 0 }, // اینم اضافه کن برای اطمینان بیشتر
      });

      // برای دیباگ — حتماً اینو تو کنسول ببین
      console.log("وضعیت پاسخ:", res.status);

      if (res.ok) {
        toast.success(t("contact.successMessage"));
        setContactUs({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || t("contact.errorMessage"));
      }
    } catch (err) {
      console.error("خطای fetch:", err);
      toast.error(t("contact.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        {t("contact.title")}
      </h1>

      <div className={styles.content}>
        {/* بخش راه‌های ارتباطی — کامل و زیبا */}
        <div className={styles.info}>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            {t("contact.contactMethods")}
          </h2>

          <div className="space-y-6 text-gray-700">
            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                {t("contact.headOffice")}
              </h3>
              <p>{t("contact.headOfficeAddress")}</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                {t("contact.phoneNumbers")}
              </h3>
              <p>{t("contact.landline")}</p>
              <p>{t("contact.mobile")}</p>
              <p>{t("contact.whatsapp")}</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                {t("contact.email")}
              </h3>
              <p>{t("contact.supportEmail")}</p>
              <p>{t("contact.infoEmail")}</p>
              <p>{t("contact.partnershipEmail")}</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                {t("contact.workingHours")}
              </h3>
              <p>{t("contact.weekdays")}</p>
              <p>{t("contact.thursday")}</p>
              <p>{t("contact.friday")}</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                {t("contact.socialMedia")}
              </h3>
              <p>{t("contact.instagram")}</p>
              <p>{t("contact.telegram")}</p>
              <p>{t("contact.aparat")}</p>
            </div>
          </div>
        </div>

        {/* فرم تماس */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            {t("contact.contactForm")}
          </h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">{t("contact.name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactUs.name}
              onChange={handleChange}
              required
              placeholder={t("contact.namePlaceholder")}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">{t("contact.email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactUs.email}
              onChange={handleChange}
              required
              placeholder={t("contact.emailPlaceholder")}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">{t("contact.phone")}</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contactUs.phone}
              onChange={handleChange}
              required
              placeholder={t("contact.phonePlaceholder")}
              maxLength="10"
              className={
                contactUs.phone && contactUs.phone.length !== 10
                  ? "border-red-500"
                  : ""
              }
            />
            {contactUs.phone && contactUs.phone.length !== 10 && (
              <small className="text-red-500">
                {t("contact.phoneError")}
              </small>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">{t("contact.subject")}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contactUs.subject}
              onChange={handleChange}
              required
              placeholder={t("contact.subjectPlaceholder")}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">{t("contact.message")}</label>
            <textarea
              id="message"
              name="message"
              value={contactUs.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-70"
          >
            {loading ? t("contact.sending") : t("contact.send")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
