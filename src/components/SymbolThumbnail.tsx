import * as React from "react";
import CloudImage, { type ICloudImageProps } from "./CloudImage";


interface SymbolThumbnailProps {
  "transition:persist": string;
  image: ICloudImageProps;
};

const SymbolThumbnail: React.FunctionComponent<SymbolThumbnailProps> = (
  props
) => {
  return (
    <div
      className="overflow-hidden"
    >
      <CloudImage
        {...props.image}
        className="w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300"
      />
    </div>
  );
};

export default SymbolThumbnail;
