import Content from "./_default/Content";
import Grid from "./_default/Grid";
import Testimonial from "./_default/Testimonial";
import AlgoliaSearch from "./_custom/AlgoliaSearch";

type BlocksProps = {
  page?: any;
  blocks?: [
    {
      __typename: string;
    }
  ];
};

export const Blocks = (props: BlocksProps) => {
  // console.log(props);
  const { page } = props;
  return (
    props.page && (
      <>
        {page.blocks
          ? page.blocks.map(function (block: any, i: number) {
              const blockProps = {
                data: block,
                parentField: `blocks.${i}`,
                page: props.page || null,
              };
              switch (true) {
                // Content Block
                case block.__typename.includes("Algolia"):
                  return (
                    <div id={`block-wraper-${i}`} key={`block-${i}`}>
                      <AlgoliaSearch client:only {...blockProps} id={`block-${i}`} />
                    </div>
                  );

                  // Content Block
                case block.__typename.includes("Content"):
                  return (
                    <div id={`block-wraper-${i}`} key={`block-${i}`}>
                      <Content {...blockProps} id={`block-${i}`} />
                    </div>
                  );

                // Grid
                case block.__typename.includes("Grid"):
                  return (
                    <div id={`block-wraper-${i}`} key={`block-${i}`}>
                      <Grid {...blockProps} id={`block-${i}`} />
                    </div>
                  );

                // Testimonial
                case block.__typename.includes("Grid"):
                  return (
                    <div id={`block-wraper-${i}`} key={`block-${i}`}>
                      <Testimonial {...blockProps} id={`block-${i}`} />
                    </div>
                  );
                default:
                  return null;
              }
            })
          : null}
      </>
    )
  );
};

export default Blocks;
