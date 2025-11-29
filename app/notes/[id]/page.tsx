// app/notes/[id]/page.tsx

// import { getSingleNote } from "@/lib/api";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);
//   console.log(note);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

// app/notes/[id]/page.tsx

// import { getSingleNote } from "@/lib/api";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

//   return (
//     <div>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//       <button>Edit</button>
//       <p>{formattedDate}</p>
//     </div>
//   );
// };

// export default NoteDetails;

// app/notes/[id]/page.tsx

// import { QueryClient } from "@tanstack/react-query";
// import { getSingleNote } from "@/lib/api";
// import NoteDetailsClient from "./NoteDetails.client";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => getSingleNote(id),
//   });

//   return <NoteDetailsClient />;
// };

// export default NoteDetails;

// app/notes/[id]/page.tsx

// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query";
// // import { getSingleNote } from "@/lib/api";
// import { fetchNoteById } from "@/lib/api";
// import NoteDetailsClient from "./NoteDetails";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => getSingleNote(id),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient />
//     </HydrationBoundary>
//   );
// };

// export default NoteDetails;

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./page.module.css";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage(props: Props) {
  const params = await props.params;
  const id = params.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: async () => fetchNoteById(id),
  });
  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    </div>
  );
}
