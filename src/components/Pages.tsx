import * as React from 'react';
import PageContent from '../layouts/PageContent';
import PageLanding from '../layouts/PageLanding';

interface IPagesProps {
  data: any;
  query: string;
  variables: any;
  'client:tina': boolean
}

const Pages: React.FunctionComponent<IPagesProps> = (props) => {
  switch (props.data.page?._template && props.data.page._template) {
    case 'landingPage':
      return <PageLanding {...props} />;
    case 'contentPage':
    default:
      return <PageContent {...props} />;
  }
};

export default Pages;