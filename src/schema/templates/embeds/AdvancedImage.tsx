import type { Template } from 'tinacms';
import type { FunctionComponent } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { imageFields } from '../field-groups/image';
import CloudImage from '../../../components/CloudImage';

type IAdvanceImageProps = {
  src: string,
  alt: string,
  contain: boolean,
  width: number,
  height: number,
  aspectRatio: string,
  caption?: any,
  className?: string,
}

const AdvanceImage = (props:any) => {
  return (
    <figure className={`block mx-auto ${props.className || ''} max-w-none`}>
      <CloudImage {...props} className='block mx-auto'/>
      { props.caption ? (
        <figcaption className="text-center"><TinaMarkdown content={props.caption}/></figcaption>
      ) : "" }
    </figure>
  )
};

export default AdvanceImage;

export const advancedImageFields: Template = {
  name: "AdvancedImage",
  label: "Advanced Image",
  ui: {
    defaultItem: {
      width: 640,
      height: 480,
      contain: false,
      priority: false,
      aspectRatio: "landscape"
    }
  },
  fields: [
    ...imageFields,
    {
      type: "rich-text",
      name: "caption",
      label: "Caption",
    },
    {
      type: "string",
      name: "className",
      label: "Class",
    }
  ],
}