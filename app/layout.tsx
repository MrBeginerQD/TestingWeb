import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'بازار محلی',
  description: 'خرید مستقیم از کشاورز',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#4a6741',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
