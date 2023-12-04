import type { Template } from 'tinacms'
import CloudImage from '../../../components/CloudImage';
import { useState } from 'react';
import MediaContainer from '../../../components/MediaContainer';
import { imageFields } from '../field-groups/image';

const youtubeParser = (url: string) => {
  const regExp = /^.*(((?:youtu.be|www.youtube.com)\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

export const youtubeFields: Template = {
  name: "YouTubeEmbed",
  label: "YouTube Video",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "url",
      label: "URL",
      type: "string",
      description: "Copy and Paste a YouTube URL."
    },
    {
      name: "thumbnail",
      label: "Thumbnail",
      type: "object",
      fields: [...imageFields],
    }
  ],
}

type YouTubeEmbedProps = {
  url: string
  title: string
  thumbnail: {
    src: string,
    alt?: string,
  }
}

const YouTubeEmbed = (props: YouTubeEmbedProps) => {
  const { url, thumbnail, title } = props
  const [isPlaying, play ] = useState(false);

  const playHandler = () => {
    play(true);
  }
  return url ? (
    <MediaContainer>
      <div className='w-full aspect-video relative bg-black flex justify-center items-center'>
      { thumbnail ? (
        <>
          {
            isPlaying ? (
              <iframe
                className={`${ !isPlaying && 'hidden' } w-full aspect-video h-full absolute inset-0`}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeParser(url)}?&autoplay=1`}
                title="YouTube video player"
                loading='lazy'
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>  
            ) : (
              <button onClick={playHandler} className='not-prose flex justify-center items-center absolute inset-0'>
                { thumbnail.src ? (<CloudImage {...thumbnail} width={560} height={315} alt={'play icon '} className='absolute block inset-0 z-10 w-full h-full'/>) : '' }
                <span className="text-white sr-only">Play</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 relative z-20">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </button>
            )
          }
        </>
      ) : (
        <iframe
          className='w-full h-full aspect-video absolute inset-0'
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeParser(url)}?&autoplay=0`}
          title="YouTube video player"
          loading='lazy'
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      ) }
      </div>
      { title ? (
        <p className='not-prose text-xl text-center font-bold'>{ title }</p>
      ) : '' }
    </MediaContainer>
  ) : (
    <p>
      Please provide a URL.
    </p>
  );
};

export default YouTubeEmbed;


