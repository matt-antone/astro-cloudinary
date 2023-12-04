import React from 'react';

const MediaContainer = ({children}:any) => {
  return (
    <span className='block my-12 max-w-lg md:max-w-2xl 2xl:max-w-4xl mx-auto w-full'>
      { children }
    </span>
  );
};

export default MediaContainer;