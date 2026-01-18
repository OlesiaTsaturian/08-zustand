import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Note Tag: ${tag} | NoteHub`,
    description: `Notes filtered by tag ${tag}`,
    openGraph: {
      title: `Tag: ${tag}`,
      description: `Notes filtered by tag ${tag}`,
      url: `https://notehub.app/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tag}`,
      description: `Notes filtered by tag ${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';
  const normalizedTag = tag === 'all' ? undefined : tag;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag: normalizedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
