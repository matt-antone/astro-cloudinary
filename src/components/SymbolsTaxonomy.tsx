import * as React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Configure,
  HierarchicalMenu,
  Pagination,
} from "react-instantsearch";

const menuClassnames = {
  root: "w-full",
  link: "w-full flex justify-between",
  selectedItem: "font-bold",
  count:
    "block text-xxs flex justify-center items-center w-5 h-5 leading-none",
};

interface ISymbolTaxonomyProps {}

const SymbolTaxonomy: React.FunctionComponent<ISymbolTaxonomyProps> = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl">Time Period</h2>
        <HierarchicalMenu
          attributes={["taxonomy.time"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl">Quadrant</h2>
        <HierarchicalMenu
          attributes={["taxonomy.quadrants"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl">Universe</h2>
        <HierarchicalMenu
          attributes={["taxonomy.universes"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl">Affiliation</h2>
        <HierarchicalMenu
          attributes={["taxonomy.affiliations"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}          
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl">Type</h2>
        <HierarchicalMenu
          attributes={["taxonomy.types"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl">Franchise</h2>
        <HierarchicalMenu
          attributes={["taxonomy.franchise"]}
          classNames={menuClassnames}
          showMore={true}
          showMoreLimit={50}
        />
      </div>
    </>
  );
};

export default SymbolTaxonomy;
