import * as React from "react";
import { tinaField } from "tinacms/dist/react";

interface ITinaFieldProps {
  data: any;
  fieldName: string;
  children?: any;
}

const TinaField: React.FunctionComponent<ITinaFieldProps> = ({data,fieldName,children}) => {

  return data && fieldName && (
    <span
      data-tina-field={tinaField(data, fieldName)}
      className="outline-1"
    >
      {children}
    </span>
  );
};

export default TinaField;
