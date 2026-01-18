import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'Sorry, page you are looking for not found',
  openGraph: {
    title: 'Page not found',
    description: 'Sorry, page you are looking for not found',
    url: 'https://notehub.app/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'page not found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page not found',
    description: 'Sorry, page you are looking for not found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
