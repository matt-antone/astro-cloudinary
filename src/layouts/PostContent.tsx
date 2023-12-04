import * as React from "react";
import { useTina } from "tinacms/dist/react";
// import TinaField from "./TinaField";
import RichTextContent from "../components/RichTextContent";
import PageHeader from "../components/PageHeader";


interface IPostContentProps {
  data: any;
  query: string;
  variables: any;
  "client:tina": boolean;
}

const PostContent: React.FunctionComponent<IPostContentProps> = (props) => {

  const { data } = useTina(props);

  return (
    <div className="py-12">
      <PageHeader title={data.page.title}/>
      <div className="grid grid-cols-10 gap-12 w-full py-12">
        <main className="col-span-7">
          <RichTextContent content={data.page.body} />
        </main>
        <aside className="col-span-3">sidebar</aside>
      </div>
    </div>
  );
};

export default PostContent;
