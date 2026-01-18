'use client';

import { useState } from 'react';
import css from './NotesPage.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Link from 'next/link';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [queryDebounce] = useDebounce(search.trim(), 700);
  const normalizedTag = tag === 'all' ? undefined : tag;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, search: queryDebounce, tag: normalizedTag }],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: 12,
        search: queryDebounce,
        tag: normalizedTag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox searchNote={search} onSearch={handleSearch} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </header>

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isError && !isLoading && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
      </div>
    </>
  );
}
