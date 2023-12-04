import type { Template } from 'tinacms'
import { imageFields } from '../../field-templates/image';

import CloudImage from '../../ui/CloudImage';
import { FunctionComponent } from 'react';

interface IImageGridProps { 
  images: [{
    src: string,
    alt: string,
  }], 
  title: string, 
  columns: number, 
};


const ImageGrid: FunctionComponent<IImageGridProps> = ({images,title,columns}) => {
  return (
    <div className="text-center py-16">
      { images ? (
        <div className={`grid grid-cols-${columns || 4} gap-8 items-center`}>
          { images.map( ({ src, alt }) => {
            return (
              <div key={src+Math.floor(Math.random() * 999999 )}>
                <CloudImage src={src} alt={alt} width={150} height={150} contain={true} className='block mx-auto'/>
              </div>  
            )
          }) }
        </div>
      ) : ""}
    </div>
  );
};

export default ImageGrid;


export const imageGridFields: Template= {
  name: "ImageGrid",
  label: "ImageGrid",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "columns",
      label: "Columns",
      options: ["2","3","4"]
    },
    {
      type: "object",
      name: "images",
      label: "Images",
      list: true,
      fields: [
        ...imageFields
      ]
    }
  ],
}