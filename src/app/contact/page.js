"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./Contact.module.css";

function ContactPage() {
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
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (contactUs.phone.length !== 10) {
      toast.error("شماره تلفن باید دقیقاً ۱۰ رقم باشد");
      return;
    }

    if (!contactUs.phone.startsWith("09")) {
      toast.error("شماره تلفن باید با ۰۹ شروع شود");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(contactUs.email)) {
      toast.error("ایمیل معتبر وارد کنید");
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
        toast.success(
          "پیام شما با موفقیت ارسال شد! در اسرع وقت با شما تماس می‌گیریم"
        );
        setContactUs({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "خطا در ارسال پیام");
      }
    } catch (err) {
      console.error("خطای fetch:", err);
      toast.error("خطای شبکه! لطفاً اینترنت خود را چک کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        ارتباط با سامانه مشاور املاک
      </h1>

      <div className={styles.content}>
        {/* بخش راه‌های ارتباطی — کامل و زیبا */}
        <div className={styles.info}>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            راه‌های ارتباطی
          </h2>

          <div className="space-y-6 text-gray-700">
            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                دفتر مرکزی:
              </h3>
              <p>
                تهران، سعادت‌آباد، میدان کاج، مجتمع تجاری رز، طبقه ۴، واحد ۴۰۱
              </p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                شماره‌های تماس:
              </h3>
              <p>تلفن ثابت: ۰۲۱-۲۲۳۴۵۶۷۸</p>
              <p>موبایل: ۰۹۱۲-۳۴۵-۶۷۸۹</p>
              <p>واتساپ: ۰۹۱۲-۳۴۵-۶۷۸۹</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                پست الکترونیکی:
              </h3>
              <p>پشتیبانی: support@realestate.ir</p>
              <p>اطلاعات: info@realestate.ir</p>
              <p>همکاری: partnership@realestate.ir</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                ساعات کاری:
              </h3>
              <p>شنبه تا چهارشنبه: ۸:۳۰ صبح تا ۸ شب</p>
              <p>پنجشنبه: ۸:۳۰ صبح تا ۴ عصر</p>
              <p>جمعه و تعطیلات: ۱۰ صبح تا ۲ بعدازظهر</p>
            </div>

            <div className={styles.contactItem}>
              <h3 className="font-semibold text-lg text-blue-600">
                شبکه‌های اجتماعی:
              </h3>
              <p>اینستاگرام: @realestate.ir</p>
              <p>تلگرام: @realestate_support</p>
              <p>آپارات: realestate.ir</p>
            </div>
          </div>
        </div>

        {/* فرم تماس */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            فرم تماس با ما
          </h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">نام و نام خانوادگی *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactUs.name}
              onChange={handleChange}
              required
              placeholder="مثال: علی رضایی"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">ایمیل *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactUs.email}
              onChange={handleChange}
              required
              placeholder="example@gmail.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">شماره تماس (۱۰ رقم) *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contactUs.phone}
              onChange={handleChange}
              required
              placeholder="09123456789"
              maxLength="10"
              className={
                contactUs.phone && contactUs.phone.length !== 10
                  ? "border-red-500"
                  : ""
              }
            />
            {contactUs.phone && contactUs.phone.length !== 10 && (
              <small className="text-red-500">
                شماره باید دقیقاً ۱۰ رقم و با ۰۹ شروع شود
              </small>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">موضوع *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contactUs.subject}
              onChange={handleChange}
              required
              placeholder="مثال: مشاوره خرید آپارتمان در تهرانپارس"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">پیام شما *</label>
            <textarea
              id="message"
              name="message"
              value={contactUs.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="لطفاً جزئیات درخواست خود را بنویسید..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-70"
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
