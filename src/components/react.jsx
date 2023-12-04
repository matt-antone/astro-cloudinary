import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const MyComponent = (props) => {
  const { data } = useTina(props);

  return (
    <>
      <TinaMarkdown content={data?.post?.body || null}/>
      <pre style={{ margin: "100px auto", width: "1000px" }}>
        {JSON.stringify(data?.post?.body, null, 2)}
      </pre>
    </>
  );
};

export default MyComponent