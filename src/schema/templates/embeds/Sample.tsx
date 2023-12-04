import type { Template } from 'tinacms'
import { FunctionComponent } from 'react';

type SampleProps = {
  title: string
}

const Sample = (props: SampleProps) => {
  const { title } = props;

  return (
    <div className="text-center py-16">
      <p>Sample</p>
    </div>
  );
};

export default Sample;

export const sampleFields: Template= {
  name: "Sample",
  label: "Sample",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    }
  ],
}