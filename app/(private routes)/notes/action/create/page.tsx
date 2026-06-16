import css from './CreateNote.module.css';
import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create your personal note',
  openGraph: {
    title: `Create Note | NoteHub`,
    description: `Create your personal note`,
    url: `https://notehub.com/notes/action/create`,
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NoteHub Create Note`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Create Note | NoteHub`,
    description: `Create your personal note`,
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
