export * as schema from "./schema";
import * as React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Configure, Pagination, SearchBox, CurrentRefinements } from 'react-instantsearch'

import Block from "../../Block";
import hits from "./hits"
import Heading from "../../../../components/Heading";

import { useMenu } from 'react-instantsearch';
import { HierarchicalMenu } from 'react-instantsearch';

export function MenuSelect(props:any) {
  const { items, refine } = useMenu({...props, });
  const [ selected, setSelected ] = React.useState(null)

  return (
    <div className="">
      {props.label}:<br/>
      <select className={'bg-transparent text-white w-full max-w-full'} onChange={(e:any)=>{
          setSelected(e.target.value)
          refine(e.target.value);
          return true
        }}>
        <option>Pick One</option>
        {items.map( i => {
          return (
        <option key={i.value} value={i.value} selected={ i.value === selected }>
          {i.label} {i.count}
        </option>
      )})}</select>
    </div>
  );
}

// Using only items
const transformItems = (items:any) => {
  return items.map((item:any,i:number) => ({
    ...item,
    index: i,
  }));
};

interface IAlgoliaSearchProps {
  id: string
  data: any
  slug?: string
  taxonomy?: string[]
  'client:only'?: boolean
}


const AlgoliaSearch: React.FunctionComponent<IAlgoliaSearchProps> = (props) => {
  props.slug && props.taxonomy && props.taxonomy.push(props.slug)

  const searchClient = algoliasearch(import.meta.env.PUBLIC_ALGOLIA_APP_ID, import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY)
  const { data: { heading, itemLayout = 'default', index = "pages", elementClass = "", itemClass = "", qty = 10, showPagination = false  }} = props
  const layout = hits[itemLayout?.toLowerCase()]

  const menuClassnames = {
    root: 'w-full',
    link: 'w-full flex justify-between',
    selectedItem: 'font-bold',
    count: 'block rounded-full border border-1 border-white text-xxs flex justify-center items-center w-5 h-5 leading-none'
  }
  return layout && index && (
    <Block {...props} id={`algolia-${index}`}>
        <>
          {heading?.text ? (
              <Heading level={heading.level} size={heading.size} className={`text-primary`}>
                {heading.text || ""}
              </Heading>
            ) : ''}
            { searchClient && (
              <InstantSearch
                indexName={"symbols"}
                searchClient={searchClient}
                // Optional props
                future={{
                  preserveSharedStateOnUnmount: true,
                }}
              >
                <Configure
                  key={index+Math.floor(Math.random() * 999999 )}
                  analytics={false}
                  hitsPerPage={40}
                />
                <div className="mb-8">
                <SearchBox
                    // Optional props
                    placeholder={'Search'}
                    classNames={{
                      root: 'MyCustomSearchBox text-white fill-white flex relative items-center',
                      form: 'MyCustomSearchBoxForm MyCustomSearchBoxForm--subclass flex w-full',
                      input: 'bg-black border-1 border-white text-white w-full',
                      submit: 'inline-block border-1 border-white ml-1 hidden',
                      submitIcon: 'w-6 h-6',
                      reset: 'text-white absolute l-auto right-2 top-[50%] transform -translate-y-[50%]',
                      resetIcon: 'w-4 h-4 block ',
                    }}
                  />
                  <CurrentRefinements
                    classNames={{
                      root: 'MyCustomCurrentRefinements mt-8',
                      list: 'MyCustomCurrentRefinementsList MyCustomCurrentRefinementsList--subclass flex gap-4',
                      item: 'uppercase bg-white text-black p-2',
                      label: 'uppercase',
                      category: '',
                      categoryLabel: '',
                      delete:'',
                    }} 
                    transformItems={ (items) => {
                      return items.map((item) => {
                        return {...item, label: item.label.replace('taxonomy.','')}
                      });
                    }}/>
                </div>
                <div className="grid grid-cols-12 gap-8">
                  <Hits transformItems={transformItems} hitComponent={ layout } classNames={{
                    root: 'algolia-list col-span-12 lg:col-span-10',
                    list: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-12',
                    item: itemClass || ''
                  }} />
                  <div className="hidden lg:block col-span-2">
                    <div className="mb-8">
                      <h2 className="text-xl">Time Period</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.time']}
                          classNames={menuClassnames}
                        />
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl">Quadrant</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.quadrants']}
                          classNames={menuClassnames}
                        />
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl">Universe</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.universes']}
                          classNames={menuClassnames}
                        />
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl">Affiliation</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.affiliations']}
                          classNames={menuClassnames}
                        />
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl">Type</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.types']}
                          classNames={menuClassnames}
                        />
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl">Franchise</h2>
                      <HierarchicalMenu
                          attributes={['taxonomy.franchise']}
                          classNames={menuClassnames}
                        />
                    </div>

                  </div>
                </div>
                { showPagination ? (
                  <Pagination classNames={{
                    root: 'algolia-pagination',
                    list: 'flex gap-8 text-lg',
                    item: 'text-nav',
                    link: 'text-nav'
                  }}/>
                ) : "" }

            </InstantSearch>        
            )}        
        </>
    </Block>
  )
};

export default AlgoliaSearch;