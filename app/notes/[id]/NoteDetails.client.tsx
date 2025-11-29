// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchNoteById } from "@/lib/api";
// import css from "./page.module.css";

// type Props = {
//   id: string;
// };

// export default function NoteDetailsClient({ id }: Props) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["notes", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading, please wait...</p>;
//   if (error || !data) return <p>Something went wrong.</p>;

//   return (
//     <div className={css.container}>
//       <div className={css.item}>
//         <div className={css.header}>
//           <h2>{data?.title}</h2>
//         </div>
//         <p className={css.content}>{data?.content}</p>
//         <p className={css.date}>{data?.createdAt}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./page.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
