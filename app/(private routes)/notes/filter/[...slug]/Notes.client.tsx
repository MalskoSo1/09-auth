"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../../../components/NoteList/NoteList";
import css from "./page.module.css";
import { fetchNotes } from "../../../../lib/api";
import { useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Link from "next/link";

interface NotesClientProps {
  currentTag?: string;
}

const NotesClient = ({ currentTag }: NotesClientProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 700);

  const perPage = 12;

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["getNotes", debouncedSearch, page, currentTag],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage, currentTag),
    placeholderData: keepPreviousData,
    // refetchOnMount: false,
  });

  if (isError) {
    throw error;
  }

  const newSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={newSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {data?.notes.length === 0 && search !== "" && (
        <ErrorMessage message={"No notes were found, try another search"} />
      )}
      {data?.notes.length === 0 && search === "" && (
        <ErrorMessage message={"No notes were found, try another tag"} />
      )}
      {isError && (
        <ErrorMessage message={"There was an error, please try again..."} />
      )}
      {!isError && isLoading && <Loader />}
    </div>
  );
};

export default NotesClient;
