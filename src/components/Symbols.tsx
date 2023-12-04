import * as React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Configure,
  Pagination,
  Stats,
} from "react-instantsearch";
import SymbolSearch from "./SymbolsSearch";
import Symbol from "./Symbol";
import SymbolTaxonomy from "./SymbolsTaxonomy";

const searchClient = algoliasearch(
  import.meta.env.PUBLIC_ALGOLIA_APP_ID,
  import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY
);

// Using only items
const transformItems = (items: any) => {
  return items.map((item: any, i: number) => ({
    ...item,
    index: i,
  }));
};

interface ISymbolsProps {
  "client:load"?: boolean;
  taxonomy?: string;
  value?: string;
  showTaxonomy?: boolean;
}


const Symbols: React.FunctionComponent<ISymbolsProps> = ({taxonomy,value,showTaxonomy=true}) => {
  return (
    <>
    <InstantSearch
      indexName="symbols"
      searchClient={searchClient}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <Configure
        key={"sybmols" + Math.floor(Math.random() * 999999)}
        analytics={false}
        hitsPerPage={40}
        filters={taxonomy && value && `taxonomy.${taxonomy}: ${decodeURI(value)}` || undefined}
      />
      <div className="mb-8">
        <SymbolSearch />
        <div className="flex gap-12 justify-center lg:justify-between flex-wrap">
          <Pagination
            classNames={{
              root: "algolia-pagination",
              list: "flex gap-8 text-lg",
              item: "text-nav",
              link: "text-nav",
            }}
          />
          <Stats />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <Hits
          transformItems={transformItems}
          hitComponent={Symbol}
          classNames={{
            root: `algolia-list col-span-12 ${(showTaxonomy || !value) && 'lg:col-span-10'}`,
            list: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-12",
            item: "search-item text-center w-full",
          }}
        />
        <div className="hidden lg:block col-span-2">
          { (showTaxonomy || !value) && <SymbolTaxonomy />}
        </div>
      </div>
      <Pagination
        classNames={{
          root: "algolia-pagination",
          list: "flex gap-8 text-lg",
          item: "text-nav",
          link: "text-nav",
        }}
      />
    </InstantSearch>    
    </>
  );
};

export default Symbols;