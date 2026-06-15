import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryParam = slug?.[0];

  const category =
    categoryParam === 'all' || !categoryParam
      ? 'All'
      : (categoryParam as NoteTag);

  return {
    title: `Notes ${category} | NoteHub`,
    description: `A notes list with filter for convenient tag: ${category}`,
    openGraph: {
      title: `Notes ${category} | NoteHub`,
      description: `A notes list with filter for convenient tag: ${category}`,
      url: `https://notehub.com/notes/filter/${categoryParam || 'all'}`,
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub Notes - ${category}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Notes ${category} | NoteHub`,
      description: `A notes list with filter for convenient tag: ${category}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const NotesByCategory = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const searchWord = resolvedSearch.search ?? '';
  const currentPage = Number(resolvedSearch.page) || 1;

  const categoryParam = resolvedParams.slug[0];
  const category: NoteTag | undefined =
    categoryParam === 'all' ? undefined : (categoryParam as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', searchWord, currentPage, category],
    queryFn: () => fetchNotes(searchWord, currentPage, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
