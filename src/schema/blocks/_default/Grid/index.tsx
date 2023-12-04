import RichTextContent from "../../../../components/RichTextContent";
import Block from "../../Block";
import Heading from "../../../../components/Heading";
import slugify from "slugify";
import { tinaField } from "tinacms/dist/react";

export * as schema from "./schema";

import * as React from "react";
import TinaField from "../../../../components/TinaField";

interface IGridProps {
  data: any;
  id?: any;
}

const Grid: React.FunctionComponent<IGridProps> = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <Block {...props.data} data={data}>
      <div className={`${data.textAlign}`}>
        {data?.heading?.text ? (
            <Heading level={data.heading.level} size={data.heading.size}>
              {data.heading.text || ""}
            </Heading>
      ) : (
          ""
        )}

        {data.columnData?.length && (
          <div
            className={`grid md:grid-cols-${data.gridItems} gap-16 ${data.vAlignment} ${data.hAlignment}`}
          >
            {data.columnData.map((column: any, i: number) => (
              <div
                key={column.name + Math.floor(Math.random() * 999999)}
                id={`${slugify(
                  column.name || Math.floor(Math.random() * 999999).toString()
                )}-cell`}
                className={`prose prose-lg ${data.prose || ""} ${
                  data.textAlign || "text-left"
                } max-w-none`}
              >
                <RichTextContent content={column.content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Block>
  );
};

export default Grid;
