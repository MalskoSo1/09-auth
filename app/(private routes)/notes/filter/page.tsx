import NotesClient from "./[...slug]/Notes.client";

interface Props {
  params?: {
    tag?: string[];
  };
}

const NotesFilter = ({ params }: Props) => {
  const currentTag = params?.tag?.[0];

  const tagParam =
    currentTag && currentTag.toLowerCase() !== "all" ? currentTag : undefined;

  return (
    <>
      <NotesClient currentTag={tagParam} />
    </>
  );
};

export default NotesFilter;
