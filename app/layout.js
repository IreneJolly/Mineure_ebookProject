import Header from "../component/Header";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";
import { createClient } from "@supabase/supabase-js";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black">
        <Header />
        {children}
      </body>
    </html>
  );
}
