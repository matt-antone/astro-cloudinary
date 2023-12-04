import type { Template } from 'tinacms'
import MediaContainer from '../../../components/MediaContainer';

type IframeProps = {
  url: string
  height: number
  width: number
}

const Iframe = (props: IframeProps) => {
  return props.url && (
    <MediaContainer>
      <div className='mx-auto max-w-full w-full'>
        <iframe src={props.url} // ?&autoplay=1
          // width={ props.width || 640 }
          height={ props.height || 360 }
          loading='lazy'
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="block w-full" 
          // style="margin-left: -2rem; margin-right: -2rem;" 
        >
        </iframe>
      </div>
    </MediaContainer>
  );
};

export default Iframe;

export const iframeFields: Template = {
  name: "Iframe",
  label: "Iframe",
  ui: {
    defaultItem: {
      width: 640,
      height: 360,
    },
  },
  fields: [
    {
      name: "url",
      label: "URL",
      type: "string",
      description: "Copy and Paste a YouTube URL."
    },
    {
      name: "width",
      label: "Width",
      type: "number",
      description: "Copy and Paste a YouTube URL."
    },
    {
      name: "height",
      label: "Height",
      type: "number",
      description: "Copy and Paste a YouTube URL."
    },
  ],
}