"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <p className={"text-error"}>
      Could not fetch note details. {error.message}
    </p>
  );
};

export default Error;
