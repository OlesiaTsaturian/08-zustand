import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'All notes', template: '%s | All notes' },
  description:
    'Here you can finde notes about everyting and create your own one',
};

interface Props {
  children: React.ReactNode;
}

export default function NotesLayoutPage({ children }: Props) {
  return <section>{children}</section>;
}
