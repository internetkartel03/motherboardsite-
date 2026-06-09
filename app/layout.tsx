import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'METALLIC.V1',
  description: 'Private ecosystem of AI systems, automation tools, and flagship products.',
  icons: {
    icon: '/uploads/Metallic.v1 product image.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
