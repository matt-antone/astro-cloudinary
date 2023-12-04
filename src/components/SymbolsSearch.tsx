import * as React from "react";
import {
  SearchBox,
  CurrentRefinements,
} from "react-instantsearch";

interface IAppProps {}

const SymbolSearch: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <>
      <SearchBox
        // Optional props
        placeholder={"Search"}
        classNames={{
          root: "text-white fill-white flex relative items-center",
          form: "flex w-full",
          input: "bg-black/[.54] border-1 border-white text-white w-full p-4",
          submit: "inline-block border-1 border-white ml-1 hidden",
          submitIcon: "w-6 h-6",
          reset:
            "text-white absolute l-auto right-2 top-[50%] transform -translate-y-[50%]",
          resetIcon: "w-4 h-4 block ",
        }}
      />
      <CurrentRefinements
        classNames={{
          root: "my-4",
          list: "flex gap-4",
          item: "uppercase bg-white text-black p-2",
          label: "uppercase",
          category: "",
          categoryLabel: "",
          delete: "",
        }}
        transformItems={(items) => {
          return items.map((item) => {
            return { ...item, label: item.label.replace("taxonomy.", "") };
          });
        }}
      />
    </>
  );
};

export default SymbolSearch;
