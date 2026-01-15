"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <p className={"text-error"}>Could not load sidebar. {error.message}</p>
  );
};

export default Error;
