import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'Here you can finde notes about everyting and create your own one',
  openGraph: {
    title: 'NoteHub',
    description:
      'Here you can finde notes about everyting and create your own one',
    url: 'https://notehub.app',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHube image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HoteHub',
    description:
      'Here you can finde notes about everyting and create your own one',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
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
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
