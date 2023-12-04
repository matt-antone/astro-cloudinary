import * as React from "react";
import PageHeader from "../components/PageHeader";
import { useTina } from "tinacms/dist/react";
import CloudImage from "../components/CloudImage";
import RichTextContent from "../components/RichTextContent";
import slugify from "slugify";

interface IPageSymbolProps {
  data: any;
  query: string;
  variables: any;
  related?: any;
  "client:tina": boolean;
}

const PageSymbol: React.FunctionComponent<IPageSymbolProps> = (props) => {
  const {
    data: { symbol },
  } = useTina(props);

  const showTaxonomy = (symbol: any) => {
    if (symbol.taxonomy) {
      const tax: any = [];
      for (const property in symbol.taxonomy) {
        !property.startsWith("_") &&
          symbol.taxonomy[property] &&
          tax.push(
            <div
              key={slugify(property)}
              className="grid grid-cols-2 gap-12 mb-4"
            >
              <dt className="capitalize">{property}</dt>
              <dd>
                <a
                  href={`/symbols/${property}/${symbol.taxonomy[property]}`}
                  className="text-green hover:underline transition-all duration-300"
                >
                  {symbol.taxonomy[property]}
                </a>
              </dd>
            </div>
          );
      }
      return tax;
    }
  };
  return (
    <div className="w-full py-12 lg:grid lg:grid-cols-2 gap-12 items-stretch">
      <div className="flex items-center h-full w-full px-4 lg:px0">
        <CloudImage
          {...symbol.featuredImg}
          width={640}
          height={640}
          contain={true}
          className="w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="flex items-center h-full px-4 lg:px0">
        <div>
          <PageHeader title={symbol.title} />
          <dl className="pt-12">
            {symbol.taxonomy ? showTaxonomy(symbol) : ""}
          </dl>
          {symbol.designers || symbol.memory_alpha_url ? <hr /> : ""}
          <dl className="pt-4">
            {symbol.designers ? (
              <div className="grid grid-cols-2 gap-8 mb-4">
                <dt className="capitalize">Designers</dt>
                <dd>
                  <ul>
                    {symbol.designers.map((designer: string) => (
                      <li key={slugify(designer)}>{designer}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : (
              ""
            )}
            {symbol.memory_alpha_url ? (
              <div className="grid grid-cols-2 gap-12 mb-4">
                <dt className="capitalize">Reference</dt>
                <dd>
                  <RichTextContent content={symbol.primary_reference} />
                </dd>
              </div>
            ) : (
              ""
            )}
          </dl>
          <a
            href={symbol.memory_alpha_url}
            target="new"
            rel="noreferrer noopener"
            className="text-green"
          >
            Read More on Memory Alpha
          </a>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 col-span-2">
        <div className="col-span-2 px-4 lg:px0" >
          <RichTextContent content={symbol.body} />
        </div>
        <div className="px-4 lg:px0">
          <div className="prose">
            {props.related ? <h2>Related</h2> : ""}
            {props.related ? (
              <ul className="grid grid-cols-2 gap-3 list-none">
                {props.related.map((item: any) => (
                  <li key={item.title}>
                    <RelatedItem item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PageSymbol;

function RelatedItem({ item }: any) {
  return (
    <div className="not-prose">
      <a href={`/${item.id.replace('.md','')}`}>
        <div className="grid gap-0">
          <CloudImage
            {...item.featuredImg}
            width={640}
            height={640}
            contain={true}
            className="mx-auto"
          />
          {/* <h3 className="text-center m-0 leading-tight">{item.title}</h3> */}
        </div>
      </a>
    </div>
  );
}
