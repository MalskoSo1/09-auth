import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

interface NotesFilterProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesFilterProps): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug?.[0];

  const tagName =
    currentTag && currentTag.toLowerCase() !== "all"
      ? currentTag.charAt(0).toUpperCase() + currentTag.slice(1).toLowerCase()
      : "All";

  const metadata: Metadata = {
    title: `Notes - ${tagName} | Notes App`,
    description: `View all notes tagged as ${tagName}.`,
    keywords: ["notes", "reminder", tagName],
    openGraph: {
      title: `Notes - ${tagName} | Notes App`,
      description: `View all notes tagged as ${tagName}.`,
      url: `https://08-zustand-brown-gamma.vercel.app/notes/filter/${
        currentTag || "all"
      }`,
      siteName: "Notes App",
      type: "website",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes App - ${tagName}`,
        },
      ],
    },
  };
  return metadata;
}

const NotesFilter = async ({ params }: NotesFilterProps) => {
  const { slug } = await params;
  const currentTag = slug?.[0];

  const tagParam =
    currentTag && currentTag.toLowerCase() !== "all"
      ? currentTag.charAt(0).toUpperCase() + currentTag.slice(1).toLowerCase()
      : undefined;

  const queryClient = new QueryClient();

  const debouncedSearch = "";
  const page = 1;
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", debouncedSearch, page, currentTag],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage, currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient currentTag={tagParam} />
    </HydrationBoundary>
  );
};

export default NotesFilter;
