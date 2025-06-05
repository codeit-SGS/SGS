import type { Metadata } from 'next';
import '@/src/stlye/globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'A Next.js app with Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}