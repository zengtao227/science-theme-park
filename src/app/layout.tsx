import type { Metadata } from 'next';
import { Rajdhani, JetBrains_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import './globals.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Science Theme Park // WEB',
  description: 'The world does not revolve around you... unless you understand the rules.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${mono.variable} font-sans antialiased text-white bg-black`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
