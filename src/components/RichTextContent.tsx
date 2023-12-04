import * as React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import embeds from '../schema/templates/embeds'

interface IRichTextContentProps {
  content: any;
}

const RichTextContent: React.FunctionComponent<IRichTextContentProps> = (props) => {
  return props.content && (
      <div className="prose max-w-none w-full">
        <TinaMarkdown content={props.content} components={embeds.components} />
      </div>
    )
};

export default RichTextContent;
