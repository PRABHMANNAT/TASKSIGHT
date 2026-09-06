import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskSight — AI that verifies physical work',
  description:
    'Building AI that guides, verifies, and documents data-center maintenance. Explore the simulated workflow, proposed architecture and validation plan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
