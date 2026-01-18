import { Metadata } from 'next';
import CreateNote from './CreateNote.client';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note',
    url: 'https://08-zustand-wheat-three.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
