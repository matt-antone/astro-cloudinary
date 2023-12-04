import {
  Highlight,
} from 'react-instantsearch';

import DateTime from "../../../../../components/DateTime";
import CloudImage from "../../../../../components/CloudImage"


const Card = ({ hit }:any) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null
  const featuredImgAlt  = hit?.featuredImg?.alt || "This image is decorative"
  return (<a 
    href={`/symbol/${hit._sys.breadcrumbs.join('/')}`}
    className="grid w-full items-stretch p-4 text-nav"
  >
    { featuredImgSource ? (
      <div className='overflow-hidden'>
        <CloudImage 
          src={featuredImgSource} 
          alt={featuredImgAlt} 
          width={320} 
          height={240}
          contain={true}
          className='w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300'
        />
      </div>
      ) : null }

      <span className="uppercase pt-4">
        {/* <DateTime dateString={hit.date}/> */}
        <p className="text-base tracking-tight text-center">
          {hit.title}
        </p>
      </span>
  </a>)
}

const DefaultHit = ({ hit }:any) => {
  return <Card hit={hit}/>
}

export default DefaultHit