// src/app/layout.tsx
import '@/stlyes/globals.css';

export const metadata = {
  title: 'My App',
  description: 'Next.js + Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
