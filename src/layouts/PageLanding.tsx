import * as React from "react";
import Blocks from "../schema/blocks/Blocks";
import { useTina } from "tinacms/dist/react";

interface ILandingPageProps {
  data: {};
  query: string;
  variables: {};
  "client:tina"?: boolean;
}

const LandingPage: React.FunctionComponent<ILandingPageProps> = (props) => {
  const { data } = useTina(props);
  return (
    <div className="py-12">
      <main>
        <Blocks {...data} />
      </main>
    </div>
  );
};

export default LandingPage;
