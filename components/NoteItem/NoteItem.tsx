// components/NoteItem/NoteItem.tsx

// import { Note } from "@/lib/api";

// type Props = {
//   item: Note;
// };

// const NoteItem = ({ item }: Props) => {
//   return (
//     <li>
//       <p>{item.title}</p>
//     </li>
//   );
// };

// export default NoteItem;

// components/NoteItem/NoteItem.tsx

import Link from "next/link";
import { Note } from "@/lib/api";

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`}>{item.title}</Link>
    </li>
  );
};

export default NoteItem;
