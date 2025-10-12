import styles from "./About.module.css";

function AboutPage() {
  return (
    <div className={styles.container}>
      <h1>درباره سامانه املاک</h1>
      <p>
        سامانه املاک یک پلتفرم آنلاین برای خرید، فروش و اجاره املاک است. ما با
        هدف تسهیل فرآیند معاملات املاک و ایجاد فضایی امن و شفاف برای خریداران و
        فروشندگان ایجاد شده‌ایم.
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>چرا ما را انتخاب کنید؟</h3>
          <ul>
            <li>دسترسی به آگهی‌های به‌روز و معتبر</li>
            <li>امکان ثبت و مدیریت آگهی به صورت رایگان</li>
            <li>رابط کاربری ساده و کاربرپسند</li>
            <li>پشتیبانی ۲۴/۷</li>
          </ul>
        </div>
        <div className={styles.feature}>
          <h3>اهداف ما</h3>
          <ul>
            <li>ایجاد بستری امن برای معاملات ملکی</li>
            <li>تسهیل ارتباط مستقیم خریدار و فروشنده</li>
            <li>ارائه اطلاعات شفاف و دقیق از املاک</li>
            <li>صرفه‌جویی در زمان و هزینه کاربران</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
