import * as React from 'react';

interface IPageHeaderProps {
  title: string
}

const PageHeader: React.FunctionComponent<IPageHeaderProps> = (props) => {
  return (
    <div>
      <h1 className='text-5xl text-center lg:text-left'>{props.title}</h1>
    </div>
  );
};

export default PageHeader;
