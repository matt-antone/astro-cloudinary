import {
  Highlight,
} from 'react-instantsearch';

import DateTime from "../../../../../components/DateTime";
import CloudImage from "../../../../../components/CloudImage"

const Symbol = ({ hit }:any) => {
  console.log(hit)
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null
  const featuredImgAlt  = hit?.featuredImg?.alt || "This image is decorative"
  return (<a
    href={`/symbols/${hit._sys.breadcrumbs.join('/')}`}
    className="grid w-full items-stretch p-4 text-nav text-center"
  >
    { featuredImgSource ? (
      <div className='overflow-hidden'>
        <CloudImage 
          src={featuredImgSource} 
          alt={featuredImgAlt} 
          width={320} 
          height={240}
          className='w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300'
        />
      </div>
      ) : null }

      <span className="uppercase pt-4 flex items-start flex-col justify-center">
        {/* <DateTime dateString={hit.date}/> */}
        <p className="text-lg tracking-tight">
          {hit.title}
        </p>
      </span>
  </a>)
}

const DefaultHit = ({ hit }:any) => {
  return <Symbol hit={hit}/>
}

export default DefaultHit