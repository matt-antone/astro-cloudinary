import type { Template } from 'tinacms'
import type { FunctionComponent } from 'react';

interface IBlockQuoteProps {
  quote: string;
  authorName: string;
}

const BlockQuote: FunctionComponent<IBlockQuoteProps> = ({ quote, authorName, }) => {
  return (
    <div className='not-prose'>
      <blockquote className='block max-w-[720px] mx-auto p-4 bg-blue-200'>
        <span className='text-4xl'>
          {quote}
        </span>
        <cite className='block pt-4'>{authorName}</cite>
      </blockquote>
    </div>
  );
};

export default BlockQuote;


export const blockQuoteFields: Template = {
  name: "BlockQuote",
  label: "Block Quote",
  ui: {
    itemProps: item => {
      return {label: item.quote ? item.quote : "New Blockquote"}
    }
  },
  fields: [
    {
      name: "quote",
      label: "Quote",
      type: "string",
      ui: {
        component: "textarea"
      }
    },
    {
      name: "authorName",
      label: "Author",
      type: "string",
    },
  ],
}
