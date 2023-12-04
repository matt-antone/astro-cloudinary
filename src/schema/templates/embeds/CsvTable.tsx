import type { Template } from 'tinacms'
import * as React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

type TableProps = {
  title?: any,
  thead?: any,
  tbody?: any,
  footer?: any,
  className?: any
}

const CsvTable = (props:TableProps) => {
  const { title, tbody, footer, className = "" } = props
  const [ header, setHeader] = React.useState([])
  const [ body, setBody ] = React.useState([])

  React.useEffect(()=>{
    const tdata:any = tbody?.split(/\r?\n/) || [];
    const head:any = tdata?.shift()?.split(",") || [];
    const body:any = tdata
    setHeader(head)
    setBody(tdata)
  },[tbody])

  return body.length && header.length ? (
      <table className={`w-full ${className}`}>
        { header.length > 0 ? (
          <thead>
            <tr>
              { header.map( th => (<th key={th} className='font-bold'>{th}</th>) ) }
            </tr>
          </thead>
        ) : ""}
        {
          body.length > 0 ? (
            <tbody>
              { body.map( (tr:string,r:number) => <tr key={`row-${r}`}>{ tr.split(",").map( (td,i) => <td key={`td-${r}-${i}`}>{td}</td>) }</tr>)}
            </tbody>
          ) : ""
        }
        {/* {
          footer?.children?.length ? (
            <tfoot>
              <tr>
                <td colSpan={header.length}>
                  <TinaMarkdown content={footer}/>
                </td>
              </tr>
            </tfoot>
          ) : ""
        } */}
      </table>
  ): null;
};

export default CsvTable;

export const csvTableFields:Template= {
  name: "CsvTable",
  label: "CsvTable",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "tbody",
      label: "Table Data",
      ui: {
        component: "textarea"
      },
      description: "Enter comma separated values. Each new line is a new row in the table. The first row will be rendered as a table header."
    },
    {
      type: "string",
      name: "className",
      label: "Class",
      description: "Add custom class names here. This site used Tailwind, so you can use any of their classes to style this table."
    },
    { 
      type: "rich-text",
      name: "footer",
      label: "Footer Text",
    }
  ],
}