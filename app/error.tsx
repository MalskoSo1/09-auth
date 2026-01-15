"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <p className={"text-error"}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
};

export default Error;
