import type { Metadata } from "next";
import { Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-hindi",
  weight: "400",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Drishty AI — Detect AI Cheating in Interviews",
  description:
    "Drishty AI identifies candidates using AI copilots, ChatGPT, and interview assistants in real-time — so you hire real talent, not AI-generated answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1822628721726758');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1822628721726758&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.variable} ${tiroDevanagari.variable} antialiased`}>{children}</body>
    </html>
  );
}
