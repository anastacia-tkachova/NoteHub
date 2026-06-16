import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  isModal?: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 3),
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const NoteDetails = async ({ params, isModal }: Props) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient isModal={isModal} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
