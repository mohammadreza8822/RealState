import styles from "./Contact.module.css";

function ContactPage() {
  return (
    <div className={styles.container}>
      <h1>ارتباط با سامانه مشاور املاک</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>راه‌های ارتباطی</h2>
          <div className={styles.contactItem}>
            <h3>دفتر مرکزی:</h3>
            <p>
              تهران، سعادت‌آباد، میدان کاج، مجتمع تجاری رز، طبقه ۴، واحد ۴۰۱
            </p>
          </div>
          <div className={styles.contactItem}>
            <h3>شماره‌های تماس:</h3>
            <p>تلفن ثابت: ۰۲۱-۲۲۳۴۵۶۷۸</p>
            <p>شماره همراه: ۰۹۱۲-۳۴۵-۶۷۸۹</p>
            <p>فکس: ۰۲۱-۲۲۳۴۵۶۷۹</p>
          </div>
          <div className={styles.contactItem}>
            <h3>پست الکترونیکی:</h3>
            <p>پشتیبانی: support@realestate.ir</p>
            <p>روابط عمومی: info@realestate.ir</p>
            <p>همکاری: jobs@realestate.ir</p>
          </div>
          <div className={styles.contactItem}>
            <h3>ساعات پاسخگویی:</h3>
            <p>شنبه تا چهارشنبه: ۸:۳۰ صبح تا ۸ شب</p>
            <p>پنجشنبه: ۸:۳۰ صبح تا ۴ عصر</p>
            <p>جمعه و تعطیلات رسمی: ۱۰ صبح تا ۲ بعد از ظهر</p>
          </div>
          <div className={styles.contactItem}>
            <h3>شبکه‌های اجتماعی:</h3>
            <p>اینستاگرام: @realestate.ir</p>
            <p>تلگرام: @realestate_support</p>
            <p>لینکدین: RealEstate.ir</p>
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
