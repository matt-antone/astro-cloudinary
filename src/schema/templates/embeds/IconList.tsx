import type { Template } from 'tinacms'
import { imageFields } from '../../field-templates/image';
import CloudImage from '../../ui/CloudImage';


import { FunctionComponent } from 'react';

interface IIconListProps {
  title?: string,
  list: [{
    image: {
      src: string,
      alt: string,
    }
    content?: any
  }]
}

const IconList: FunctionComponent<IIconListProps> = (props) => {
  const { list, title } = props
  return list ? (
    <div className="text-center">
      <ol className='pl-0'>
        { list.map( item => {
          return (
            <li key={item+Math.floor(Math.random() * 999999 ).toString()} className='flex gap-4 items-center justify-start not-prose mb-4'>
              {item.image?.src && item.image?.alt ? (
                <span className='block w-20 h-20'>  
                  <CloudImage className="block w-20 h-20 max-w-none" src={item.image.src} alt={item.image.alt} width={60} height={60}/>
                </span>
              ) : (
                <span className="text-xs">No Image</span>
              )}
              {item.content ? (
                <span className='text-left text-primary text-xl font-bold uppercase leading-tight'>
                  {item.content}
                </span>
              ) : (
                <span className='text-xs'>No Content</span>
              )}
            </li>
          )
        }) }
      </ol>
    </div>
  ) : (
    <p>Add a icon list item</p>
  );
};

export default IconList;


export const iconListFields: Template= {
  name: "IconList",
  label: "Icon List",
  ui: {
    itemProps: item => {
      return { label: item.title || "News List" }
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "object",
      name: "list",
      label: "List",
      list: true,
      ui: {
        itemProps: item => {
          return { label: item.content || "News List Item" }
        }
      },    
      fields: [
        ...imageFields,
        {
          type: "string",
          name: "content",
          label: "Content",
          ui: {
            component: "textarea"
          }
        },
      ]
    }
  ],
}