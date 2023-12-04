
import React from 'react';

type HeadingProps = {
  level?: string
  className?: string
  children: any
  size?: string
}

const Heading = (props: HeadingProps) => {
  const { level = "2", className = '', children, size = 'default'} = props
  const styles = "inline-block leading-tight not-prose text-lg pb-12 font-bold"
  const sizes:any = {
    default: "text-lg md:text-xl lg:text-2xl xl:text-3xl",
    large: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    larger: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    largest: "text-3xl md:text-4xl lg:text-5xl xl:text-7xl",
  }

  switch (level) {
    case "1":
      return (
          <h1 className={`${sizes[size]} ${styles}`}>{ children }</h1>
      );
  
    case "2":
      return (
          <h2 className={` ${sizes[size]} ${styles}`}>{ children }</h2>
      );
  
    case "3":
      return (
          <h3 className={` ${sizes[size]} ${styles}`}>{ children }</h3>
      );

    case "4":
      return (
          <h4 className={` ${sizes[size]} ${styles}`}>{ children }</h4>
      );
    case "5":
      return (
          <h5 className={` ${sizes[size]} ${styles}`}>{ children }</h5>
      );

    case "6":
      return (
          <h6 className={` ${sizes[size]} ${styles}`}>{ children }</h6>
      );
    default:
      return (
        <div>Please select a heading level.</div>
      )
  }

};

export default Heading;