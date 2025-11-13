"use client";

import { LuShare2 } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

function ShareButton() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CopyToClipboard text={`${url}`}>
      <div className="flex items-center justify-center cursor-pointer group">
        <LuShare2 className="ml-2 text-xl text-primary transition-colors duration-200" />
        <button className="border-none bg-transparent text-base text-gray-500 group-hover:text-primary transition-colors duration-200">
          اشتراک گذاری
        </button>
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
