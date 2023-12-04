import {
  Highlight,
} from 'react-instantsearch';

import DateTime from "../../../../../components/DateTime";
import CloudImage from "../../../../../components/CloudImage"

const DefaultItem = ({ hit }:any) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null
  const featuredImgAlt  = hit._values.featuredImg?.alt || "This image is decoratorative"
  
  return (<a
    href={`/symbol/${hit._sys.breadcrumbs.join('/')}`}
    className="text-primary"
  >
      <span className="grid grid-cols-12">
        <time className={ `col-span-12 lg:col-span-2  text-lg` }>
          <DateTime dateString={hit._values.date}/>
        </time>
        <h3 className="col-span-12 lg:col-span-10  text-xl tracking-tight">
          {hit._values.title}
        </h3>
      </span>
  </a>)
}

const FeaturedItem = ({ hit }:any) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null
  const featuredImgAlt  = hit._values.featuredImg?.alt || "This image is decoratorative"

  return (<a
    href={`/symbol/${hit._sys.breadcrumbs.join('/')}`}
    className="grid grid-cols-2 w-full gap-8 items-stretch pr-8"
  >
        { featuredImgSource ? (
          <div className=''>
            <CloudImage src={featuredImgSource} alt={featuredImgAlt} width={500} height={500} className='w-full h-auto'/>
          </div>
        ) : null }

      <span className="capitalize max-w-none flex items-start flex-col justify-center text-primary">
        <span className={ ` text-lg` }>
          <DateTime dateString={hit._values.date}/>
        </span>
        <h3 className=" text-5xl tracking-tight">
          <Highlight
            attribute="title"
            hit={hit}
          />
        </h3>
      </span>
  </a>)
}



const DefaultHit = ({ hit }:any) => {
  return hit._values.index === 0 ? (
    <FeaturedItem hit={hit}/>    
  ) : (
    <DefaultItem hit={hit}/>    
  )
}

export default DefaultHit