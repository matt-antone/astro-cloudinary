import RichTextContent from "../../../../components/RichTextContent";
import Block from "../../Block";
import { tinaField } from "tinacms/dist/react";
export * as schema from "./schema";

import * as React from 'react';
import { hasContent } from "../../../../../lib/content";

interface IContentProps {
  data: any
  id?: string
}

const Content: React.FunctionComponent<IContentProps> = ({data}) => {
  return hasContent(data.body) && (
    <Block {...data}>
        <div className={`${data.textAlign}`}>
          <RichTextContent
            content={data.body}
          />
        </div>
    </Block>
  );
};


export default Content

