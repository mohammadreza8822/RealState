"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogOutButton() {
  return (
    <button
      onClick={signOut}
      className="flex items-center w-full text-right text-base text-red-600 mt-5 hover:text-red-700 transition-colors duration-200"
    >
      <FiLogOut className="ml-2 text-xl" />
      خروج
    </button>
  );
}

export default LogOutButton;
