"use client";

import { useTranslations } from "next-intl";
import styles from "./About.module.css";

function AboutPage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <h1>{t("about.title")}</h1>
      <p>{t("about.welcome")}</p>
      <p>{t("about.description")}</p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>{t("about.benefits.title")}</h3>
          <ul>
            {t.raw("about.benefits.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.feature}>
          <h3>{t("about.commitments.title")}</h3>
          <ul>
            {t.raw("about.commitments.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.feature}>
          <h3>{t("about.vision.title")}</h3>
          <ul>
            {t.raw("about.vision.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
