import Block from "../../Block";
import {TinaMarkdown} from "tinacms/dist/rich-text";
import Heading from "../../../../components/Heading";

export * as schema from "./schema";

import * as React from 'react';

interface ITestimonialProps {
  data: any
  parentField: any
  id?: any
}

const Testimonial: React.FunctionComponent<ITestimonialProps> = (props) => {
  const { data, parentField } = props
  return (
    <Block {...props.data}>
      {data?.heading?.text ? (
        <Heading className="text-center" level={data.heading.level} size={data.heading.size}>
          {data.heading.text || ""}
        </Heading>
      ) : ''}
      <blockquote
        className={`${data.textAlign || 'text-left'} max-w-none`}
      >
        <span
          className={`prose prose-lg ${data.prose || ''} ${data.textAlign || 'text-left'} max-w-none`}        >
          <p
            data-tinafield={`${parentField}.quote`}
            className="relative opacity-95"
          >
            {`${data.quote}`}
          </p>
        </span>
        <cite 
            data-tinafield={`${parentField}.author`}
            className={`not-prose pt-4 ${data.prose || ''} max-w-none`}  
          >
            { data.author ? (
              <span className="block pt-4 text-lg">
                <TinaMarkdown content={data.author}/>
              </span>
            ) : ""}
        </cite>
      </blockquote>
    </Block>
  );
};

export default Testimonial