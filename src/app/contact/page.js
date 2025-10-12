import styles from "./Contact.module.css";

function ContactPage() {
  return (
    <div className={styles.container}>
      <h1>تماس با ما</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>راه‌های ارتباطی</h2>
          <div className={styles.contactItem}>
            <h3>آدرس:</h3>
            <p>تهران، خیابان ولیعصر، ساختمان مرکزی سامانه املاک</p>
          </div>
          <div className={styles.contactItem}>
            <h3>شماره تماس:</h3>
            <p>۰۲۱-۸۸۸۸۸۸۸۸</p>
          </div>
          <div className={styles.contactItem}>
            <h3>ایمیل:</h3>
            <p>info@example.com</p>
          </div>
          <div className={styles.contactItem}>
            <h3>ساعات کاری:</h3>
            <p>شنبه تا چهارشنبه ۹ صبح تا ۶ عصر</p>
            <p>پنجشنبه ۹ صبح تا ۱ بعد از ظهر</p>
          </div>
        </div>
        <form className={styles.form}>
          <h2>فرم تماس با ما</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">نام و نام خانوادگی:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">ایمیل:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">موضوع:</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">پیام:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">ارسال پیام</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
