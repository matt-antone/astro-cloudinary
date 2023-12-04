import type { Template } from 'tinacms'
import * as React from 'react';

interface IDateTimeProps {
  format?: string,
}


const DateTime: React.FunctionComponent<IDateTimeProps> = ({ format }) => {
  const dt = React.useMemo(() => {
    return new Date();
  }, []);

  switch (format) {
    case "iso":
      return <time dateTime={dt.toUTCString()}>{dt.toISOString()}</time>;
    case "utc":
      return <time dateTime={dt.toUTCString()}>{dt.toUTCString()}</time>;
    case "local":
    default:
      return <time dateTime={dt.toUTCString()}>{dt.toLocaleDateString()}</time>;
  }
};


export default DateTime;


export const dateTimeFields: Template = {
  name: "DateTime",
  label: "Date/Time",
  fields: [
    {
      name: "format",
      label: "Format",
      type: "string",
      options: [
        {
          label: "ISO",
          value: 'iso'
        },
        {
          label: "UTC",
          value: 'utc',
        },
        {
          label: "Local",
          value: 'local',
        },
      ],
    },
    {
      name: "authorName",
      label: "Author",
      type: "string",
    },
  ],
}
