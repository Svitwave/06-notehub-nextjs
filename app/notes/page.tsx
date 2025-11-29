// "use client";

// import { useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import NoteList from "@/components/NoteList/NoteList";
// import css from "@/components/NotesPage/NotesPage.module.css";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { Toaster } from "react-hot-toast";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import fetchNotes from "@/lib/api";
// import Modal from "@/components/modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import Pagination from "@/components/Pagination/Pagination";

// export default function App() {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const debouncedSearchQuery = useDebouncedCallback((value: string) => {
//     setSearchQuery(value);
//     setCurrentPage(1);
//   }, 300);

//   const { data, isSuccess, isLoading } = useQuery({
//     queryKey: ["notes", searchQuery, currentPage],
//     queryFn: () => fetchNotes(searchQuery, currentPage),
//     placeholderData: keepPreviousData,
//   });

//   const notes = data?.notes ?? [];
//   const totalPages = data?.totalPages ?? 0;

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={searchQuery} onSearch={debouncedSearchQuery} />
//         <Toaster position="top-center" />
//         {isSuccess && totalPages > 1 && (
//           <Pagination
//             totalPages={totalPages}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <button className={css.button} onClick={openModal}>
//           Create note +
//         </button>
//       </header>
//       <NoteList notes={notes} />
//       {isLoading && <p>Loading...</p>}
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <NoteForm onSuccess={closeModal} onCancel={closeModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// app/notes/page.tsx
// import { QueryClient, dehydrate } from "@tanstack/react-query";
// import { HydrationBoundary } from "@tanstack/react-query";
// import fetchNotes from "@/lib/api";
// import NotesClient from "./Notes.client";

// export default async function NotesPage({
//   searchParams,
// }: {
//   searchParams: { search?: string; page?: string };
// }) {
//   const search = searchParams.search ?? "";
//   const page = Number(searchParams.page ?? 1);

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["notes", search, page],
//     queryFn: () => fetchNotes(search, page),
//   });

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <NotesClient initialSearch={search} initialPage={page} />
//     </HydrationBoundary>
//   );
// }

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import NotesClient from "./Notes.client";
import fetchNotes from "@/lib/api";

export default async function Notes() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const notes = await fetchNotes("", 1);
      return notes;
    },
  });
  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <NotesClient /> */}
        {/* <NotesClient initialSearch={searchValue} initialPage={1} /> */}
        <NotesClient initialSearch="" initialPage={1} />
      </HydrationBoundary>
    </div>
  );
}
