import css from './Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page not found, please try another option',
  openGraph: {
    title: 'Page not found',
    description: 'This page not found, please try another option',
    url: 'https://notehub.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Page not found`,
    description: 'This page not found, please try another option',
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
