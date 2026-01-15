import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Metadata } from "next";

const roboto = Roboto({
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple web app to create, manage, and delete notes easily.",
  keywords: ["note", "reminder"],
  openGraph: {
    title: "Notes App",
    description: "Create, manage, and delete notes in a clean and simple way.",
    url: "https://08-zustand-brown-gamma.vercel.app/",
    siteName: "Notes App",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes App preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
