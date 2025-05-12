import Layout from "@/layout/Layout";
import { yekan } from "@/utils/fonts";
import "./globals.css";
import NextAuthProvider from "@/provides/NextAuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
