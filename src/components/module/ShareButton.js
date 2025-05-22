"use client";

import { LuShare2 } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "@/module/ShareButton.module.css";
import { useEffect, useState } from "react";

function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <CopyToClipboard text={`${url}`}>
      <div className={styles.container}>
        <LuShare2 />
        <button>اشتراک گذاری</button>
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
