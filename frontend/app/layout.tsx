import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export const metadata = {
  title: "EventEz",
  description: "Book and manage venues",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
      </head>
      <body className="bg-white text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-10">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

