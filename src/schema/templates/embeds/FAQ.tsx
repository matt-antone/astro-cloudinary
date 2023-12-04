import type { Template } from 'tinacms'
import * as React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
interface IFAQProps {
  faqs: any[]
}

const FAQ: React.FunctionComponent<IFAQProps> = ({ faqs }) => {
  return (
    <dl>
      {
        faqs ? faqs.map( ({ question, answer }) => {
          return (
            <>
              <dt key={question} className='font-bold mb-4 text-lg'>
                {question}
              </dt>
              <dd className='prose font-italic mb-12'>
                <TinaMarkdown content={answer}/>
              </dd>
            </>
          )
        }) : ""
      }
    </dl>
  );
};

export default FAQ;

export const faqFields: Template= {
  name: "FAQ",
  label: "FAQ List",
  fields: [
    {
      type: "object",
      name: "faqs",
      label: "Questions",
      list: true,
      ui: {
        itemProps: item => {
          return { label:  item.question ? item.question : "New Question" }
        }
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
        },
        {
          type: "rich-text",
          name: "answer",
          label: "Answer",
        },

      ]
    }
  ],
}