import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'All notes', template: '%s | NoteHub' },
  description:
    'Here you can find notes about everything and create your own one',
};

interface Props {
  children: React.ReactNode;
}

export default function NotesLayoutPage({ children }: Props) {
  return <section>{children}</section>;
}
