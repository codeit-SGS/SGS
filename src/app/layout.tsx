// src/app/layout.tsx
import "@/styles/globals.css";

export const metadata = {
  title: "wine",
  description: "Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
