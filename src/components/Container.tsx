import React from "react";

type Props = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

const Container = (props: Props) => {
  const { className, children, id } = props;
  return (
    <div
      id={id || ""}
      className={`px-2 xs:px-4 sm:px-8 md:px-0 w-full mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
