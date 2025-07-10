import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axe Lumberjack',
  description: 'A game where you chop trees with Axe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
