import type { FunctionComponent } from 'react';

export const getCloudinaryURL = ( src = '', width = 640, height = 480, format = '', contain = false, gravity = null ) => {
  const accountUrl = `https://res.cloudinary.com/${ import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""}/image/upload/`
  const newSrc = `${accountUrl}w_${width},h_${height},${ contain ? 'c_fit' : 'c_fill'},${ gravity ? `${gravity},` : '' },q_auto,dpr_2.0,f_auto/${src.replace(accountUrl,'')}`
  return src && src.includes(accountUrl) ? newSrc : src
}


const cloudSrc = ( { src, width = 640, height = 480, contain = false, gravity = ""}:any, accountUrl:string ) => {
  const newSrc =  src && src.includes(accountUrl) ? `${accountUrl}w_${width},h_${height},${ contain ? 'c_fit' : 'c_fill'},${ gravity ? `g_${gravity},` : '' },q_auto,dpr_2.0,f_auto/${src.replace(accountUrl,'')}` : src
  const newSrcSplit = newSrc.split(".")
  newSrcSplit.pop()

  return newSrcSplit.join('.')
}

export interface ICloudImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  aspectRatio?: string
  className?: string,
  priority?: boolean,
  contain?: boolean
  gravity?: string
  style?: {}
}

const CloudImage: FunctionComponent<ICloudImageProps> = (props) => {
  const accountUrl = `https://res.cloudinary.com/${import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""}/image/upload/`
  const imageSource = props.src?.includes('cloudinary') ? cloudSrc(props,accountUrl) : props.src

  const aspects = {
    "auto": "",
    "square": "aspect-w-1 aspect-h-1",
    "landscape": "aspect-w-4 aspect-h-3",
    "portrait": "aspect-w-3 aspect-h-4",
    "letterbox": "aspect-w-16 aspect-h-9"
  }
  
  return (
      <img 
        // { ...props }
        src={ imageSource }
        alt={ props.alt || ""}
        className={`
          max-w-full
          ${props.aspectRatio}
          ${ props.className } 
          ${ props.contain ? 'object-contain' : 'object-cover' }
        `}
        loading={ props.priority ? 'eager' : 'lazy'}
        width={props.width}
        height={props.height}
      />
  )
}
export default CloudImage;