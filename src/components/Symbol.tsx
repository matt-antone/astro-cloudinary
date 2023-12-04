import slugify from "slugify"
import CloudImage from "./CloudImage"

const Symbol = ({ hit }:any) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null
  const featuredImgAlt  = hit?.featuredImg?.alt || "This image is decorative"
  return (<a
    href={`/${slugify(hit._sys.breadcrumbs.join('/'))}`}
    className="grid w-full items-stretch p-4 text-nav text-center"
  >
    <article>
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
      <header className="pt-4 flex items-start flex-col justify-center">
        {/* <DateTime dateString={hit.date}/> */}
        <h2 className="text-lg tracking-tight w-full">
          {hit.title}
        </h2>
      </header>
    </article>
  </a>)
}

const DefaultHit = ({ hit }:any) => {
  return <Symbol hit={hit}/>
}

export default DefaultHit