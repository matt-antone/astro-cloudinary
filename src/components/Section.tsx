export const Section = ({ children, noPadding = false, className = "", id = "" }:any) => {
  return children ? (
    <section
      id={id}
      className={`${className ? className : ""}`}
    >
      {children}
    </section>
  ) : null;
};

export default Section
