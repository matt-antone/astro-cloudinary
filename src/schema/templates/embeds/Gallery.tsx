import CloudImage from '../../../components/CloudImage';
import type { Template } from 'tinacms'
import { imageFields } from '../field-groups/image';
import * as React from 'react';

export interface IGalleryProps { 
  images: [{
    src: string,
    alt: string,
  }], 
  columns: number, 
}



export default function Gallery (props: IGalleryProps) {
  const { images, columns } = props
  const [activeImage, setActiveImage] = React.useState(0)

  const getColumns = (cols:number) => {
    switch (cols) {
      case 2:
        return "grid-cols-2"
      case 3:
        return "grid-cols-3"
      case 4:
        return "grid-cols-4"
      default:
        return "grid-cols-4"
    }
  }
  return (
    <div className="text-center py-16">
      { images ? (
        <div className={`grid ${getColumns(columns)} gap-8 items-center`}>
          { images.map( ({ src, alt },i:number) => {
            const curImage = i+1
            return (
              <div key={src+Math.floor(Math.random() * 999999 )}>
                <button onClick={()=>{setActiveImage(curImage)}}>
                  <CloudImage src={src} alt={alt} width={150} height={150} contain={true} className='block mx-auto'/>
                </button>
                <div className={`${ activeImage === curImage ? 'fixed' : 'hidden'} inset-0 flex items-center justify-center z-10 not-prose`} >
                  <div className='absolute inset-0 bg-black opacity-50' onClick={()=>{setActiveImage(0)}}></div>
                  <div className='relative'>
                    <CloudImage src={src} alt={alt} width={1024} height={768} contain={true} className='block mx-auto relative z-20'/>
                    <button onClick={()=>{setActiveImage(0)}} className='text-black fill-black circle bg-white rounded-full absolute top-0 right-0 z-30 -mr-5 -mt-5'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>  
            )
          }) }
        </div>
      ) : ""}
    </div>
  )
}

export const galleryFields: Template= {
  name: "Gallery",
  label: "Gallery",
  fields: [
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
      fields: imageFields,
    }
  ],
}