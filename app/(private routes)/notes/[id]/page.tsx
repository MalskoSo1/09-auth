import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { Note } from "@/types/note";
import { fetchNoteById } from "@/lib/api/clientApi";

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  const metadata: Metadata = {
    title: note.title + " | Notes App",
    description: note.content.slice(0, 150),
    keywords: ["note", "reminder"],
    openGraph: {
      title: note.title + " | Notes App",
      description: note.content.slice(0, 150),
      url: `https://09-auth-six-dusky.vercel.app/notes/${note.id}`,
      siteName: "Notes App",
      type: "article",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
  return metadata;
}

const NoteDetails = async ({ params }: PostDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </main>
  );
};

export default NoteDetails;
