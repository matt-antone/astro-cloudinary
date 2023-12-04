import type { Template } from 'tinacms'
import type { FunctionComponent } from 'react';
import MediaContainer from '../../../components/MediaContainer';

interface IVimeoEmbedProps {
  url: string
}

const getVimeoId = (url: string) => {
  const match = /vimeo.*\/(\d+)/i.exec(url);
  if (match) {
    return match[1];
  }
};

const VimeoEmbed: FunctionComponent<IVimeoEmbedProps> = ({ url }) => {
  return url ? (
    <MediaContainer>
      <div className='w-full aspect-video relative mx-auto'>
        <iframe src={`https://player.vimeo.com/video/${url.includes("http") ? getVimeoId(url) : url}`} // ?&autoplay=1
          width="640"
          height="360"
          loading='lazy'
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className='absolute w-full h-full mx-auto max-w-full'>
          </iframe>
      </div>
    </MediaContainer>
  ) : (
    <p>
      Please provide a URL.
    </p>
  );
};

export default VimeoEmbed;


export const vimeoFields: Template = {
  name: "VimeoEmbed",
  label: "Vimeo Video",
  fields: [
    {
      name: "url",
      label: "URL",
      type: "string",
      description: "Copy and Paste a YouTube URL."
    },
  ],
}