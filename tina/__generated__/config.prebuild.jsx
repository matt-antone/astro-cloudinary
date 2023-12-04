var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// tina/config.ts
import { defineConfig } from "tinacms";

// src/schema/blocks/_default/index.ts
var default_exports = {};
__export(default_exports, {
  AlgoliaSearch: () => AlgoliaSearch_exports,
  Content: () => Content_exports,
  Grid: () => Grid_exports,
  Testimonial: () => Testimonial_exports
});

// src/schema/blocks/_default/Content/index.tsx
var Content_exports = {};
__export(Content_exports, {
  default: () => Content_default,
  schema: () => schema_exports
});

// src/components/RichTextContent.tsx
import "react";
import { TinaMarkdown as TinaMarkdown4 } from "tinacms/dist/rich-text";

// src/schema/templates/embeds/AdvancedImage.tsx
import { TinaMarkdown } from "tinacms/dist/rich-text";

// src/schema/templates/field-groups/apscect-ratio.ts
var ar = {
  type: "string",
  name: "aspectRatio",
  label: "Aspect Ratio",
  options: [
    {
      label: "Square",
      value: "square"
    },
    {
      label: "Portrait",
      value: "portrait"
    },
    {
      label: "Landscape",
      value: "landscape"
    },
    {
      label: "Letterbox",
      value: "letterbox"
    }
  ]
};
var aspectRatio = [
  ar
];
var apscect_ratio_default = aspectRatio;

// src/schema/templates/field-groups/image.ts
var image = {
  type: "object",
  name: "image",
  label: "Image",
  ui: {
    defaultItem: {
      width: 640,
      height: 480,
      aspectRatio: "landscape",
      priority: false
    }
  },
  fields: [
    {
      type: "image",
      name: "src",
      label: "Image"
    },
    {
      type: "string",
      name: "alt",
      label: "Alternative Text"
    },
    {
      type: "number",
      name: "width",
      label: "Width"
    },
    {
      type: "number",
      name: "height",
      label: "Height"
    },
    ...apscect_ratio_default,
    {
      type: "boolean",
      name: "contain",
      label: "Contain Image",
      description: "If true the entire image will be contained in the aspect ratio above."
    },
    {
      type: "boolean",
      name: "priority",
      label: "Priority",
      description: "If true, the image will no longer lazy load. Use only if this image is above the bottom of the browser on page load."
    }
  ]
};
var image_default = image;
var imageFields = [...image.fields];

// src/components/CloudImage.tsx
import { jsx } from "react/jsx-runtime";
var cloudSrc = ({ src, width = 640, height = 480, contain = false, gravity = "" }, accountUrl) => {
  const newSrc = src && src.includes(accountUrl) ? `${accountUrl}w_${width},h_${height},${contain ? "c_fit" : "c_fill"},${gravity ? `g_${gravity},` : ""},q_auto,dpr_2.0,f_auto/${src.replace(accountUrl, "")}` : src;
  const newSrcSplit = newSrc.split(".");
  newSrcSplit.pop();
  return newSrcSplit.join(".");
};
var CloudImage = (props) => {
  const accountUrl = `https://res.cloudinary.com/${import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""}/image/upload/`;
  const imageSource = props.src?.includes("cloudinary") ? cloudSrc(props, accountUrl) : props.src;
  const aspects = {
    "auto": "",
    "square": "aspect-w-1 aspect-h-1",
    "landscape": "aspect-w-4 aspect-h-3",
    "portrait": "aspect-w-3 aspect-h-4",
    "letterbox": "aspect-w-16 aspect-h-9"
  };
  return jsx(
    "img",
    {
      src: imageSource,
      alt: props.alt || "",
      className: `
          max-w-full
          ${props.aspectRatio}
          ${props.className} 
          ${props.contain ? "object-contain" : "object-cover"}
        `,
      loading: props.priority ? "eager" : "lazy",
      width: props.width,
      height: props.height
    }
  );
};
var CloudImage_default = CloudImage;

// src/schema/templates/embeds/AdvancedImage.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var AdvanceImage = (props) => {
  return jsxs("figure", { className: `block mx-auto ${props.className || ""} max-w-none`, children: [
    jsx2(CloudImage_default, { ...props, className: "block mx-auto" }),
    props.caption ? jsx2("figcaption", { className: "text-center", children: jsx2(TinaMarkdown, { content: props.caption }) }) : ""
  ] });
};
var AdvancedImage_default = AdvanceImage;
var advancedImageFields = {
  name: "AdvancedImage",
  label: "Advanced Image",
  ui: {
    defaultItem: {
      width: 640,
      height: 480,
      contain: false,
      priority: false,
      aspectRatio: "landscape"
    }
  },
  fields: [
    ...imageFields,
    {
      type: "rich-text",
      name: "caption",
      label: "Caption"
    },
    {
      type: "string",
      name: "className",
      label: "Class"
    }
  ]
};

// src/schema/templates/embeds/BlockQuote.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var BlockQuote = ({ quote, authorName }) => {
  return jsx3("div", { className: "not-prose", children: jsxs2("blockquote", { className: "block max-w-[720px] mx-auto p-4 bg-blue-200", children: [
    jsx3("span", { className: "text-4xl", children: quote }),
    jsx3("cite", { className: "block pt-4", children: authorName })
  ] }) });
};
var BlockQuote_default = BlockQuote;
var blockQuoteFields = {
  name: "BlockQuote",
  label: "Block Quote",
  ui: {
    itemProps: (item) => {
      return { label: item.quote ? item.quote : "New Blockquote" };
    }
  },
  fields: [
    {
      name: "quote",
      label: "Quote",
      type: "string",
      ui: {
        component: "textarea"
      }
    },
    {
      name: "authorName",
      label: "Author",
      type: "string"
    }
  ]
};

// src/schema/templates/embeds/DateTime.tsx
import * as React from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var DateTime = ({ format: format3 }) => {
  const dt = React.useMemo(() => {
    return /* @__PURE__ */ new Date();
  }, []);
  switch (format3) {
    case "iso":
      return jsx4("time", { dateTime: dt.toUTCString(), children: dt.toISOString() });
    case "utc":
      return jsx4("time", { dateTime: dt.toUTCString(), children: dt.toUTCString() });
    case "local":
    default:
      return jsx4("time", { dateTime: dt.toUTCString(), children: dt.toLocaleDateString() });
  }
};
var DateTime_default = DateTime;
var dateTimeFields = {
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
          value: "iso"
        },
        {
          label: "UTC",
          value: "utc"
        },
        {
          label: "Local",
          value: "local"
        }
      ]
    },
    {
      name: "authorName",
      label: "Author",
      type: "string"
    }
  ]
};

// src/components/MediaContainer.tsx
import "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var MediaContainer = ({ children }) => {
  return jsx5("span", { className: "block my-12 max-w-lg md:max-w-2xl 2xl:max-w-4xl mx-auto w-full", children });
};
var MediaContainer_default = MediaContainer;

// src/schema/templates/embeds/Vimeo.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var getVimeoId = (url) => {
  const match = /vimeo.*\/(\d+)/i.exec(url);
  if (match) {
    return match[1];
  }
};
var VimeoEmbed = ({ url }) => {
  return url ? jsx6(MediaContainer_default, { children: jsx6("div", { className: "w-full aspect-video relative mx-auto", children: jsx6(
    "iframe",
    {
      src: `https://player.vimeo.com/video/${url.includes("http") ? getVimeoId(url) : url}`,
      width: "640",
      height: "360",
      loading: "lazy",
      allow: "autoplay; fullscreen; picture-in-picture",
      allowFullScreen: true,
      className: "absolute w-full h-full mx-auto max-w-full"
    }
  ) }) }) : jsx6("p", { children: "Please provide a URL." });
};
var Vimeo_default = VimeoEmbed;
var vimeoFields = {
  name: "VimeoEmbed",
  label: "Vimeo Video",
  fields: [
    {
      name: "url",
      label: "URL",
      type: "string",
      description: "Copy and Paste a YouTube URL."
    }
  ]
};

// src/schema/templates/embeds/Youtube.tsx
import { useState } from "react";
import { Fragment, jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var youtubeParser = (url) => {
  const regExp = /^.*(((?:youtu.be|www.youtube.com)\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};
var youtubeFields = {
  name: "YouTubeEmbed",
  label: "YouTube Video",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string"
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
      fields: [...imageFields]
    }
  ]
};
var YouTubeEmbed = (props) => {
  const { url, thumbnail, title: title2 } = props;
  const [isPlaying, play] = useState(false);
  const playHandler = () => {
    play(true);
  };
  return url ? jsxs3(MediaContainer_default, { children: [
    jsx7("div", { className: "w-full aspect-video relative bg-black flex justify-center items-center", children: thumbnail ? jsx7(Fragment, { children: isPlaying ? jsx7(
      "iframe",
      {
        className: `${!isPlaying && "hidden"} w-full aspect-video h-full absolute inset-0`,
        width: "560",
        height: "315",
        src: `https://www.youtube.com/embed/${youtubeParser(url)}?&autoplay=1`,
        title: "YouTube video player",
        loading: "lazy",
        allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }
    ) : jsxs3("button", { onClick: playHandler, className: "not-prose flex justify-center items-center absolute inset-0", children: [
      thumbnail.src ? jsx7(CloudImage_default, { ...thumbnail, width: 560, height: 315, alt: "play icon ", className: "absolute block inset-0 z-10 w-full h-full" }) : "",
      jsx7("span", { className: "text-white sr-only", children: "Play" }),
      jsx7("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-24 h-24 relative z-20", children: jsx7("path", { fillRule: "evenodd", d: "M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z", clipRule: "evenodd" }) })
    ] }) }) : jsx7(
      "iframe",
      {
        className: "w-full h-full aspect-video absolute inset-0",
        width: "560",
        height: "315",
        src: `https://www.youtube.com/embed/${youtubeParser(url)}?&autoplay=0`,
        title: "YouTube video player",
        loading: "lazy",
        allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }
    ) }),
    title2 ? jsx7("p", { className: "not-prose text-xl text-center font-bold", children: title2 }) : ""
  ] }) : jsx7("p", { children: "Please provide a URL." });
};
var Youtube_default = YouTubeEmbed;

// src/schema/templates/embeds/LinkButton.tsx
import "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var LinkButton = (props) => {
  const { text: text2, href, bgColor = "bg-content" } = props;
  return text2 && href ? jsx8("div", { className: "text-left pb-4", children: jsx8("a", { href, target: href.includes("http") ? "new" : "self", className: `${bgColor || ""} py-2 px-4 inline-block text-lg rounded-sm text-black border no-underline text-center`, children: text2 }) }) : null;
};
var LinkButton_default = LinkButton;
var linkButtonFields = {
  name: "LinkButton",
  label: "Link Button",
  fields: [
    {
      type: "string",
      name: "text",
      label: "Text"
    },
    {
      type: "string",
      name: "href",
      label: "Href"
    },
    {
      type: "string",
      name: "bgColor",
      label: "Background Color",
      options: [
        { label: "Transparent", value: "bg-transparent" },
        { label: "Black", value: "bg-black" },
        { label: "White", value: "bg-white" },
        { label: "Lime", value: "bg-lime" },
        { label: "Orange", value: "bg-orange" },
        { label: "Lemon", value: "bg-lemon" },
        { label: "Light", value: "bg-light" },
        { label: "Dark", value: "bg-dark" },
        { label: "Primary", value: "bg-primary" },
        { label: "Secondary", value: "bg-secondary" },
        { label: "Accent", value: "bg-accent" },
        { label: "Success", value: "bg-success" },
        { label: "Info", value: "bg-info" },
        { label: "Warning", value: "bg-warning" },
        { label: "Danger", value: "bg-danger" }
      ]
    }
  ]
};

// src/schema/templates/embeds/Gallery.tsx
import * as React4 from "react";
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
function Gallery(props) {
  const { images, columns } = props;
  const [activeImage, setActiveImage] = React4.useState(0);
  const getColumns = (cols) => {
    switch (cols) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-4";
    }
  };
  return jsx9("div", { className: "text-center py-16", children: images ? jsx9("div", { className: `grid ${getColumns(columns)} gap-8 items-center`, children: images.map(({ src, alt }, i) => {
    const curImage = i + 1;
    return jsxs4("div", { children: [
      jsx9("button", { onClick: () => {
        setActiveImage(curImage);
      }, children: jsx9(CloudImage_default, { src, alt, width: 150, height: 150, contain: true, className: "block mx-auto" }) }),
      jsxs4("div", { className: `${activeImage === curImage ? "fixed" : "hidden"} inset-0 flex items-center justify-center z-10 not-prose`, children: [
        jsx9("div", { className: "absolute inset-0 bg-black opacity-50", onClick: () => {
          setActiveImage(0);
        } }),
        jsxs4("div", { className: "relative", children: [
          jsx9(CloudImage_default, { src, alt, width: 1024, height: 768, contain: true, className: "block mx-auto relative z-20" }),
          jsx9("button", { onClick: () => {
            setActiveImage(0);
          }, className: "text-black fill-black circle bg-white rounded-full absolute top-0 right-0 z-30 -mr-5 -mt-5", children: jsx9("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-10 h-10", children: jsx9("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) })
        ] })
      ] })
    ] }, src + Math.floor(Math.random() * 999999));
  }) }) : "" });
}
var galleryFields = {
  name: "Gallery",
  label: "Gallery",
  fields: [
    {
      type: "string",
      name: "columns",
      label: "Columns",
      options: ["2", "3", "4"]
    },
    {
      type: "object",
      name: "images",
      label: "Images",
      list: true,
      fields: imageFields
    }
  ]
};

// src/schema/templates/embeds/CsvTable.tsx
import * as React5 from "react";
import "tinacms/dist/rich-text";
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var CsvTable = (props) => {
  const { title: title2, tbody, footer, className = "" } = props;
  const [header, setHeader] = React5.useState([]);
  const [body2, setBody] = React5.useState([]);
  React5.useEffect(() => {
    const tdata = tbody?.split(/\r?\n/) || [];
    const head = tdata?.shift()?.split(",") || [];
    const body3 = tdata;
    setHeader(head);
    setBody(tdata);
  }, [tbody]);
  return body2.length && header.length ? jsxs5("table", { className: `w-full ${className}`, children: [
    header.length > 0 ? jsx10("thead", { children: jsx10("tr", { children: header.map((th) => jsx10("th", { className: "font-bold", children: th }, th)) }) }) : "",
    body2.length > 0 ? jsx10("tbody", { children: body2.map((tr, r) => jsx10("tr", { children: tr.split(",").map((td, i) => jsx10("td", { children: td }, `td-${r}-${i}`)) }, `row-${r}`)) }) : ""
  ] }) : null;
};
var CsvTable_default = CsvTable;
var csvTableFields = {
  name: "CsvTable",
  label: "CsvTable",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "string",
      name: "tbody",
      label: "Table Data",
      ui: {
        component: "textarea"
      },
      description: "Enter comma separated values. Each new line is a new row in the table. The first row will be rendered as a table header."
    },
    {
      type: "string",
      name: "className",
      label: "Class",
      description: "Add custom class names here. This site used Tailwind, so you can use any of their classes to style this table."
    },
    {
      type: "rich-text",
      name: "footer",
      label: "Footer Text"
    }
  ]
};

// src/schema/templates/embeds/FAQ.tsx
import "react";
import { TinaMarkdown as TinaMarkdown3 } from "tinacms/dist/rich-text";
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
var FAQ = ({ faqs }) => {
  return jsx11("dl", { children: faqs ? faqs.map(({ question, answer }) => {
    return jsxs6(Fragment2, { children: [
      jsx11("dt", { className: "font-bold mb-4 text-lg", children: question }, question),
      jsx11("dd", { className: "prose font-italic mb-12", children: jsx11(TinaMarkdown3, { content: answer }) })
    ] });
  }) : "" });
};
var FAQ_default = FAQ;
var faqFields = {
  name: "FAQ",
  label: "FAQ List",
  fields: [
    {
      type: "object",
      name: "faqs",
      label: "Questions",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.question ? item.question : "New Question" };
        }
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question"
        },
        {
          type: "rich-text",
          name: "answer",
          label: "Answer"
        }
      ]
    }
  ]
};

// src/schema/templates/embeds/Iframe.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var Iframe = (props) => {
  return props.url && jsx12(MediaContainer_default, { children: jsx12("div", { className: "mx-auto max-w-full w-full", children: jsx12(
    "iframe",
    {
      src: props.url,
      height: props.height || 360,
      loading: "lazy",
      allow: "autoplay; fullscreen; picture-in-picture",
      allowFullScreen: true,
      className: "block w-full"
    }
  ) }) });
};
var Iframe_default = Iframe;
var iframeFields = {
  name: "Iframe",
  label: "Iframe",
  ui: {
    defaultItem: {
      width: 640,
      height: 360
    }
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
    }
  ]
};

// src/schema/templates/embeds/EventRegisterButton.tsx
import * as React7 from "react";
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
var EventRegisterButton = (props) => {
  const { title: title2, startDate, endDate, street1, street2, city, state, postcode, registrationUrl, locationName } = props;
  const now = React7.useMemo(() => {
    return /* @__PURE__ */ new Date();
  }, []);
  const st = React7.useMemo(() => {
    return new Date(startDate);
  }, []);
  const ed = React7.useMemo(() => {
    return new Date(endDate);
  }, []);
  console.log(now, st, ed, ed < now);
  return ed > now ? jsx13("div", { className: "not-prose inline", children: jsxs7("article", { className: "article not-prose", children: [
    jsxs7("header", { children: [
      jsx13("h2", { children: jsx13("span", { className: "text-lg font-bold text-balance", children: title2 }) }),
      jsx13("time", { children: st.toLocaleString() })
    ] }),
    jsxs7("address", { className: "py-4", children: [
      jsxs7("strong", { className: "font-medium", children: [
        locationName && `${locationName}`,
        locationName && jsx13("br", {})
      ] }),
      street1,
      street2 && `, ${street2}`,
      jsx13("br", {}),
      city,
      ", ",
      state,
      ", ",
      postcode,
      jsx13("br", {})
    ] }),
    jsx13("footer", { children: jsx13(
      "a",
      {
        className: `inline-flex text-lg p-3 rounded-sm bg-lime`,
        href: registrationUrl,
        target: "new",
        rel: "noopener noreferer",
        children: "Register Now"
      }
    ) })
  ] }) }) : "";
};
var EventRegisterButton_default = EventRegisterButton;
var EventRegisterButtonFields = {
  name: "EventRegisterButton",
  label: "Event Register Button",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "datetime",
      name: "startDate",
      label: "Start Date",
      ui: {
        timeFormat: "HH:mm"
      }
    },
    {
      type: "datetime",
      name: "endDate",
      label: "End Date",
      ui: {
        timeFormat: "HH:mm"
      }
    },
    {
      type: "string",
      name: "locationName",
      label: "Location Name"
    },
    {
      type: "string",
      name: "street1",
      label: "Street 1"
    },
    {
      type: "string",
      name: "street2",
      label: "Street 2"
    },
    {
      type: "string",
      name: "city",
      label: "City"
    },
    {
      type: "string",
      name: "state",
      label: "State"
    },
    {
      type: "string",
      name: "postcode",
      label: "Postcode"
    },
    {
      type: "string",
      name: "registrationUrl",
      label: "Registration Url"
    }
  ]
};

// src/schema/templates/embeds/index.tsx
var templateFields = [
  advancedImageFields,
  blockQuoteFields,
  dateTimeFields,
  linkButtonFields,
  vimeoFields,
  youtubeFields,
  iframeFields,
  galleryFields,
  csvTableFields,
  faqFields,
  EventRegisterButtonFields
];
var d = {
  components: {
    AdvancedImage: AdvancedImage_default,
    BlockQuote: BlockQuote_default,
    DateTime: DateTime_default,
    FAQ: FAQ_default,
    Iframe: Iframe_default,
    VimeoEmbed: Vimeo_default,
    YouTubeEmbed: Youtube_default,
    LinkButton: LinkButton_default,
    Gallery,
    CsvTable: CsvTable_default,
    EventRegisterButton: EventRegisterButton_default
  },
  fields: templateFields
};
var embeds_default = d;

// src/components/RichTextContent.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var RichTextContent = (props) => {
  return props.content && jsx14("div", { className: "prose max-w-none w-full", children: jsx14(TinaMarkdown4, { content: props.content, components: embeds_default.components }) });
};
var RichTextContent_default = RichTextContent;

// src/components/Container.tsx
import "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var Container = (props) => {
  const { className, children, id } = props;
  return jsx15(
    "div",
    {
      id: id || "",
      className: `px-2 xs:px-4 sm:px-8 md:px-0 w-full mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  ${className ? className : ""}`,
      children
    }
  );
};
var Container_default = Container;

// src/components/Section.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var Section = ({ children, noPadding = false, className = "", id = "" }) => {
  return children ? jsx16(
    "section",
    {
      id,
      className: `${className ? className : ""}`,
      children
    }
  ) : null;
};
var Section_default = Section;

// src/schema/blocks/Block.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var Block = (props) => {
  const { data, parentField, children, id, theme } = props;
  return jsx17(
    Section_default,
    {
      id,
      className: `${data?.paddingTopOff ? "pb-8" : "py-8"}`,
      children: data?.alignment === "full" ? jsx17("div", { className: `full`, children }) : jsx17(Container_default, { children: jsx17("div", { className: ``, children }) })
    }
  );
};
var Block_default = Block;

// src/schema/blocks/_default/Content/index.tsx
import "tinacms/dist/react";

// src/schema/blocks/_default/Content/schema.ts
var schema_exports = {};
__export(schema_exports, {
  schema: () => schema
});

// src/schema/templates/field-groups/heading.ts
var text = {
  label: "Text",
  name: "text",
  type: "string",
  required: false
};
var level = {
  label: "Heading Level",
  name: "level",
  type: "string",
  required: false,
  options: [
    {
      label: "h1",
      value: "1"
    },
    {
      label: "h2",
      value: "2"
    },
    {
      label: "h3",
      value: "3"
    },
    {
      label: "h4",
      value: "4"
    },
    {
      label: "h5",
      value: "5"
    },
    {
      label: "h6",
      value: "6"
    }
  ]
};
var size = {
  label: "Heading Size",
  name: "size",
  type: "string",
  ui: {
    // default: "Default",
    component: "select"
  },
  options: [
    {
      label: "Default",
      value: "default"
    },
    {
      label: "Large",
      value: "large"
    },
    {
      label: "Larger",
      value: "larger"
    },
    {
      label: "Largest",
      value: "largest"
    }
  ],
  required: false
};
var headingSchema = {
  label: "Heading",
  name: "heading",
  type: "object",
  fields: [
    text,
    level,
    size
  ]
};
var heading_default = headingSchema;

// src/schema/templates/field-groups/block-styles.ts
var blockId = {
  label: "Block ID",
  name: "blockId",
  type: "string"
};
var blockClass = {
  label: "Block Class",
  name: "blockClass",
  type: "string"
};
var containerClass = {
  label: "Container Class",
  name: "containerClass",
  type: "string"
};
var blockStyleSchema = [
  blockId,
  blockClass,
  containerClass
];

// src/schema/blocks/_default/Content/default.ts
var defaultContent = {};

// src/schema/blocks/_default/Content/schema.ts
var schema = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/Content.png",
    defaultItem: defaultContent
  },
  fields: [
    headingSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: embeds_default.fields
    },
    ...blockStyleSchema
  ]
};

// src/schema/blocks/_default/Content/index.tsx
import "react";

// lib/content.ts
import { format } from "date-fns";
var hasContent = (tinaContent) => {
  return tinaContent?.children.length > 0 ? true : false;
};

// src/schema/blocks/_default/Content/index.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var Content = ({ data }) => {
  return hasContent(data.body) && jsx18(Block_default, { ...data, children: jsx18("div", { className: `${data.textAlign}`, children: jsx18(
    RichTextContent_default,
    {
      content: data.body
    }
  ) }) });
};
var Content_default = Content;

// src/schema/blocks/_default/Grid/index.tsx
var Grid_exports = {};
__export(Grid_exports, {
  default: () => Grid_default,
  schema: () => schema_exports2
});

// src/components/Heading.tsx
import "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Heading = (props) => {
  const { level: level2 = "2", className = "", children, size: size2 = "default" } = props;
  const styles = "inline-block leading-tight not-prose text-lg pb-12 font-bold";
  const sizes = {
    default: "text-lg md:text-xl lg:text-2xl xl:text-3xl",
    large: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
    larger: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
    largest: "text-3xl md:text-4xl lg:text-5xl xl:text-7xl"
  };
  switch (level2) {
    case "1":
      return jsx19("h1", { className: `${sizes[size2]} ${styles}`, children });
    case "2":
      return jsx19("h2", { className: ` ${sizes[size2]} ${styles}`, children });
    case "3":
      return jsx19("h3", { className: ` ${sizes[size2]} ${styles}`, children });
    case "4":
      return jsx19("h4", { className: ` ${sizes[size2]} ${styles}`, children });
    case "5":
      return jsx19("h5", { className: ` ${sizes[size2]} ${styles}`, children });
    case "6":
      return jsx19("h6", { className: ` ${sizes[size2]} ${styles}`, children });
    default:
      return jsx19("div", { children: "Please select a heading level." });
  }
};
var Heading_default = Heading;

// src/schema/blocks/_default/Grid/index.tsx
import slugify from "slugify";
import "tinacms/dist/react";

// src/schema/blocks/_default/Grid/schema.ts
var schema_exports2 = {};
__export(schema_exports2, {
  schema: () => schema2
});

// src/schema/blocks/_default/Grid/default.ts
var defaultGrid = {};

// src/schema/blocks/_default/Grid/schema.ts
var schema2 = {
  label: "Grid",
  name: "grid",
  ui: {
    previewSrc: "/blocks/grid.png",
    defaultItem: defaultGrid
  },
  fields: [
    headingSchema,
    {
      label: "Columns",
      name: "columnData",
      type: "object",
      list: true,
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string"
        },
        {
          label: "Content",
          name: "content",
          type: "rich-text",
          templates: embeds_default.fields
        }
      ]
    },
    {
      label: "Grid items per row",
      name: "gridItems",
      type: "string",
      ui: {
        defaultValue: "2"
      },
      options: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        },
        {
          label: "4",
          value: "4"
        }
      ]
    },
    ...blockStyleSchema
  ]
};

// src/schema/blocks/_default/Grid/index.tsx
import "react";

// src/components/TinaField.tsx
import "react";
import { tinaField as tinaField2 } from "tinacms/dist/react";
import { jsx as jsx20 } from "react/jsx-runtime";

// src/schema/blocks/_default/Grid/index.tsx
import { jsx as jsx21, jsxs as jsxs8 } from "react/jsx-runtime";
var Grid = (props) => {
  const { data } = props;
  console.log(data);
  return jsx21(Block_default, { ...props.data, data, children: jsxs8("div", { className: `${data.textAlign}`, children: [
    data?.heading?.text ? jsx21(Heading_default, { level: data.heading.level, size: data.heading.size, children: data.heading.text || "" }) : "",
    data.columnData?.length && jsx21(
      "div",
      {
        className: `grid md:grid-cols-${data.gridItems} gap-16 ${data.vAlignment} ${data.hAlignment}`,
        children: data.columnData.map((column, i) => jsx21(
          "div",
          {
            id: `${slugify(
              column.name || Math.floor(Math.random() * 999999).toString()
            )}-cell`,
            className: `prose prose-lg ${data.prose || ""} ${data.textAlign || "text-left"} max-w-none`,
            children: jsx21(RichTextContent_default, { content: column.content })
          },
          column.name + Math.floor(Math.random() * 999999)
        ))
      }
    )
  ] }) });
};
var Grid_default = Grid;

// src/schema/blocks/_default/Testimonial/index.tsx
var Testimonial_exports = {};
__export(Testimonial_exports, {
  default: () => Testimonial_default,
  schema: () => schema_exports3
});
import { TinaMarkdown as TinaMarkdown5 } from "tinacms/dist/rich-text";

// src/schema/blocks/_default/Testimonial/schema.ts
var schema_exports3 = {};
__export(schema_exports3, {
  schema: () => schema3
});

// src/schema/blocks/_default/Testimonial/default.ts
var defaultTestimonialBlock = {
  quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
  author: "Phil Karlton",
  alignment: "default",
  textAlign: "left",
  prose: "prose prose-lg",
  theme: "default"
};
var default_default = defaultTestimonialBlock;

// src/schema/blocks/_default/Testimonial/schema.ts
var schema3 = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: default_default
  },
  fields: [
    heading_default,
    {
      type: "string",
      ui: {
        component: "textarea"
      },
      label: "Quote",
      name: "quote"
    },
    {
      type: "rich-text",
      label: "Author",
      name: "author"
    }
  ]
};

// src/schema/blocks/_default/Testimonial/index.tsx
import "react";
import { jsx as jsx22, jsxs as jsxs9 } from "react/jsx-runtime";
var Testimonial = (props) => {
  const { data, parentField } = props;
  return jsxs9(Block_default, { ...props.data, children: [
    data?.heading?.text ? jsx22(Heading_default, { className: "text-center", level: data.heading.level, size: data.heading.size, children: data.heading.text || "" }) : "",
    jsxs9(
      "blockquote",
      {
        className: `${data.textAlign || "text-left"} max-w-none`,
        children: [
          jsx22(
            "span",
            {
              className: `prose prose-lg ${data.prose || ""} ${data.textAlign || "text-left"} max-w-none`,
              children: jsx22(
                "p",
                {
                  "data-tinafield": `${parentField}.quote`,
                  className: "relative opacity-95",
                  children: `${data.quote}`
                }
              )
            }
          ),
          jsx22(
            "cite",
            {
              "data-tinafield": `${parentField}.author`,
              className: `not-prose pt-4 ${data.prose || ""} max-w-none`,
              children: data.author ? jsx22("span", { className: "block pt-4 text-lg", children: jsx22(TinaMarkdown5, { content: data.author }) }) : ""
            }
          )
        ]
      }
    )
  ] });
};
var Testimonial_default = Testimonial;

// src/schema/blocks/_custom/AlgoliaSearch/index.tsx
var AlgoliaSearch_exports = {};
__export(AlgoliaSearch_exports, {
  MenuSelect: () => MenuSelect,
  default: () => AlgoliaSearch_default,
  schema: () => schema_exports4
});

// src/schema/blocks/_custom/AlgoliaSearch/schema.ts
var schema_exports4 = {};
__export(schema_exports4, {
  schema: () => schema4
});
var schema4 = {
  name: "algolia",
  label: "Algolia Search",
  ui: {
    previewSrc: "/blocks/Content.png",
    defaultItem: {
      index: "posts",
      alignment: "default",
      textAlign: "left",
      prose: "prose prose-white prose-lg",
      theme: "default"
    }
  },
  fields: [
    headingSchema,
    {
      type: "string",
      name: "index",
      label: "Algolia Index",
      description: "Select an index to show."
      // ui: {
      //   defaultItem: "posts",
      // },
      // options: [
      //   {
      //     value: "posts",
      //     label: "Posts"
      //   },
      //   {
      //     value: "all",
      //     label: "All Content"
      //   },
      // ]
    },
    {
      type: "string",
      name: "elementClass",
      label: "List Class Attribute",
      description: "This is a class attribute of the post container. You can use Tailwind classes here to modify the layout."
    },
    {
      type: "string",
      name: "itemClass",
      label: "Item Class Attribute",
      description: "This is a class attribute of the post. You can use Tailwind classes here to modify the post layout."
    },
    {
      type: "number",
      name: "qty",
      label: "Number of posts",
      description: "Defaults to 10 if empty"
    },
    {
      type: "boolean",
      name: "showPagination",
      label: "Show Pagination"
    },
    {
      type: "string",
      name: "itemLayout",
      label: "Item Layout",
      options: [
        "Default",
        "Card",
        "Post"
      ]
    },
    ...blockStyleSchema
  ]
};

// src/schema/blocks/_custom/AlgoliaSearch/index.tsx
import * as React15 from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, Configure, Pagination, SearchBox, CurrentRefinements } from "react-instantsearch";

// src/schema/blocks/_custom/AlgoliaSearch/hits/default.tsx
import {
  Highlight
} from "react-instantsearch";

// src/components/DateTime.tsx
import { format as format2 } from "date-fns";
import { jsx as jsx23 } from "react/jsx-runtime";
var DateTime2 = (props) => {
  const isValidDate = (d2) => {
    return d2 instanceof Date && !isNaN(Number(d2));
  };
  const { dateString } = props;
  const date2 = dateString ? new Date(dateString) : /* @__PURE__ */ new Date();
  return isValidDate(date2) ? jsx23("time", { dateTime: dateString, children: format2(date2, "MM/dd/yyyy") }) : null;
};
var DateTime_default2 = DateTime2;

// src/schema/blocks/_custom/AlgoliaSearch/hits/default.tsx
import { jsx as jsx24, jsxs as jsxs10 } from "react/jsx-runtime";
var DefaultItem = ({ hit }) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null;
  const featuredImgAlt = hit._values.featuredImg?.alt || "This image is decoratorative";
  return jsx24(
    "a",
    {
      href: `/symbol/${hit._sys.breadcrumbs.join("/")}`,
      className: "text-primary",
      children: jsxs10("span", { className: "grid grid-cols-12", children: [
        jsx24("time", { className: `col-span-12 lg:col-span-2  text-lg`, children: jsx24(DateTime_default2, { dateString: hit._values.date }) }),
        jsx24("h3", { className: "col-span-12 lg:col-span-10  text-xl tracking-tight", children: hit._values.title })
      ] })
    }
  );
};
var FeaturedItem = ({ hit }) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null;
  const featuredImgAlt = hit._values.featuredImg?.alt || "This image is decoratorative";
  return jsxs10(
    "a",
    {
      href: `/symbol/${hit._sys.breadcrumbs.join("/")}`,
      className: "grid grid-cols-2 w-full gap-8 items-stretch pr-8",
      children: [
        featuredImgSource ? jsx24("div", { className: "", children: jsx24(CloudImage_default, { src: featuredImgSource, alt: featuredImgAlt, width: 500, height: 500, className: "w-full h-auto" }) }) : null,
        jsxs10("span", { className: "capitalize max-w-none flex items-start flex-col justify-center text-primary", children: [
          jsx24("span", { className: ` text-lg`, children: jsx24(DateTime_default2, { dateString: hit._values.date }) }),
          jsx24("h3", { className: " text-5xl tracking-tight", children: jsx24(
            Highlight,
            {
              attribute: "title",
              hit
            }
          ) })
        ] })
      ]
    }
  );
};
var DefaultHit = ({ hit }) => {
  return hit._values.index === 0 ? jsx24(FeaturedItem, { hit }) : jsx24(DefaultItem, { hit });
};
var default_default2 = DefaultHit;

// src/schema/blocks/_custom/AlgoliaSearch/hits/card.tsx
import "react-instantsearch";
import { jsx as jsx25, jsxs as jsxs11 } from "react/jsx-runtime";
var Card = ({ hit }) => {
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null;
  const featuredImgAlt = hit?.featuredImg?.alt || "This image is decorative";
  return jsxs11(
    "a",
    {
      href: `/symbol/${hit._sys.breadcrumbs.join("/")}`,
      className: "grid w-full items-stretch p-4 text-nav",
      children: [
        featuredImgSource ? jsx25("div", { className: "overflow-hidden", children: jsx25(
          CloudImage_default,
          {
            src: featuredImgSource,
            alt: featuredImgAlt,
            width: 320,
            height: 240,
            contain: true,
            className: "w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300"
          }
        ) }) : null,
        jsx25("span", { className: "uppercase pt-4", children: jsx25("p", { className: "text-base tracking-tight text-center", children: hit.title }) })
      ]
    }
  );
};
var DefaultHit2 = ({ hit }) => {
  return jsx25(Card, { hit });
};
var card_default = DefaultHit2;

// src/schema/blocks/_custom/AlgoliaSearch/hits/symbol.tsx
import "react-instantsearch";
import { jsx as jsx26, jsxs as jsxs12 } from "react/jsx-runtime";
var Symbol2 = ({ hit }) => {
  console.log(hit);
  const featuredImgSource = hit?.featuredImg?.src || hit?.images || null;
  const featuredImgAlt = hit?.featuredImg?.alt || "This image is decorative";
  return jsxs12(
    "a",
    {
      href: `/symbols/${hit._sys.breadcrumbs.join("/")}`,
      className: "grid w-full items-stretch p-4 text-nav text-center",
      children: [
        featuredImgSource ? jsx26("div", { className: "overflow-hidden", children: jsx26(
          CloudImage_default,
          {
            src: featuredImgSource,
            alt: featuredImgAlt,
            width: 320,
            height: 240,
            className: "w-full h-auto object-cover aspect-landscape group-hover:scale-110 transition-all duration-300"
          }
        ) }) : null,
        jsx26("span", { className: "uppercase pt-4 flex items-start flex-col justify-center", children: jsx26("p", { className: "text-lg tracking-tight", children: hit.title }) })
      ]
    }
  );
};
var DefaultHit3 = ({ hit }) => {
  return jsx26(Symbol2, { hit });
};
var symbol_default = DefaultHit3;

// src/schema/blocks/_custom/AlgoliaSearch/hits/index.ts
var hits = {
  default: default_default2,
  card: card_default,
  symbol: symbol_default
};
var hits_default = hits;

// src/schema/blocks/_custom/AlgoliaSearch/index.tsx
import { useMenu } from "react-instantsearch";
import { HierarchicalMenu } from "react-instantsearch";
import { Fragment as Fragment3, jsx as jsx27, jsxs as jsxs13 } from "react/jsx-runtime";
function MenuSelect(props) {
  const { items, refine } = useMenu({ ...props });
  const [selected, setSelected] = React15.useState(null);
  return jsxs13("div", { className: "", children: [
    props.label,
    ":",
    jsx27("br", {}),
    jsxs13("select", { className: "bg-transparent text-white w-full max-w-full", onChange: (e) => {
      setSelected(e.target.value);
      refine(e.target.value);
      return true;
    }, children: [
      jsx27("option", { children: "Pick One" }),
      items.map((i) => {
        return jsxs13("option", { value: i.value, selected: i.value === selected, children: [
          i.label,
          " ",
          i.count
        ] }, i.value);
      })
    ] })
  ] });
}
var transformItems = (items) => {
  return items.map((item, i) => ({
    ...item,
    index: i
  }));
};
var AlgoliaSearch = (props) => {
  props.slug && props.taxonomy && props.taxonomy.push(props.slug);
  const searchClient = algoliasearch(import.meta.env.PUBLIC_ALGOLIA_APP_ID, import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY);
  const { data: { heading, itemLayout = "default", index = "pages", elementClass = "", itemClass = "", qty = 10, showPagination = false } } = props;
  const layout = hits_default[itemLayout?.toLowerCase()];
  const menuClassnames = {
    root: "w-full",
    link: "w-full flex justify-between",
    selectedItem: "font-bold",
    count: "block rounded-full border border-1 border-white text-xxs flex justify-center items-center w-5 h-5 leading-none"
  };
  return layout && index && jsx27(Block_default, { ...props, id: `algolia-${index}`, children: jsxs13(Fragment3, { children: [
    heading?.text ? jsx27(Heading_default, { level: heading.level, size: heading.size, className: `text-primary`, children: heading.text || "" }) : "",
    searchClient && jsxs13(
      InstantSearch,
      {
        indexName: "symbols",
        searchClient,
        future: {
          preserveSharedStateOnUnmount: true
        },
        children: [
          jsx27(
            Configure,
            {
              analytics: false,
              hitsPerPage: 40
            },
            index + Math.floor(Math.random() * 999999)
          ),
          jsxs13("div", { className: "mb-8", children: [
            jsx27(
              SearchBox,
              {
                placeholder: "Search",
                classNames: {
                  root: "MyCustomSearchBox text-white fill-white flex relative items-center",
                  form: "MyCustomSearchBoxForm MyCustomSearchBoxForm--subclass flex w-full",
                  input: "bg-black border-1 border-white text-white w-full",
                  submit: "inline-block border-1 border-white ml-1 hidden",
                  submitIcon: "w-6 h-6",
                  reset: "text-white absolute l-auto right-2 top-[50%] transform -translate-y-[50%]",
                  resetIcon: "w-4 h-4 block "
                }
              }
            ),
            jsx27(
              CurrentRefinements,
              {
                classNames: {
                  root: "MyCustomCurrentRefinements mt-8",
                  list: "MyCustomCurrentRefinementsList MyCustomCurrentRefinementsList--subclass flex gap-4",
                  item: "uppercase bg-white text-black p-2",
                  label: "uppercase",
                  category: "",
                  categoryLabel: "",
                  delete: ""
                },
                transformItems: (items) => {
                  return items.map((item) => {
                    return { ...item, label: item.label.replace("taxonomy.", "") };
                  });
                }
              }
            )
          ] }),
          jsxs13("div", { className: "grid grid-cols-12 gap-8", children: [
            jsx27(Hits, { transformItems, hitComponent: layout, classNames: {
              root: "algolia-list col-span-12 lg:col-span-10",
              list: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-12",
              item: itemClass || ""
            } }),
            jsxs13("div", { className: "hidden lg:block col-span-2", children: [
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Time Period" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.time"],
                    classNames: menuClassnames
                  }
                )
              ] }),
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Quadrant" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.quadrants"],
                    classNames: menuClassnames
                  }
                )
              ] }),
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Universe" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.universes"],
                    classNames: menuClassnames
                  }
                )
              ] }),
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Affiliation" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.affiliations"],
                    classNames: menuClassnames
                  }
                )
              ] }),
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Type" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.types"],
                    classNames: menuClassnames
                  }
                )
              ] }),
              jsxs13("div", { className: "mb-8", children: [
                jsx27("h2", { className: "text-xl", children: "Franchise" }),
                jsx27(
                  HierarchicalMenu,
                  {
                    attributes: ["taxonomy.franchise"],
                    classNames: menuClassnames
                  }
                )
              ] })
            ] })
          ] }),
          showPagination ? jsx27(Pagination, { classNames: {
            root: "algolia-pagination",
            list: "flex gap-8 text-lg",
            item: "text-nav",
            link: "text-nav"
          } }) : ""
        ]
      }
    )
  ] }) });
};
var AlgoliaSearch_default = AlgoliaSearch;

// src/schema/blocks/index.ts
var blocks = { ...default_exports };
var getBlockSchemas = () => {
  const schemas = [];
  for (const property in blocks) {
    schemas.push(blocks[property].schema.schema);
  }
  return schemas;
};

// src/schema/collections/taxonomy.ts
var categories = {
  label: "Taxonomies",
  name: "taxonomies",
  path: "content/taxonomies",
  format: "json",
  fields: [
    {
      name: "value",
      label: "Items",
      type: "string",
      list: true
    }
  ],
  ui: {
    global: true
  }
};
var taxonomy_default = categories;

// src/schema/collections/menus.ts
import "slugify";
var menus = {
  label: "Menus",
  name: "menus",
  path: "content/menus",
  format: "json",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: false
    }
  },
  fields: [
    {
      name: "items",
      label: "Items",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.label ? item.label : "New Menu Item" };
        }
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label"
        },
        {
          type: "string",
          name: "href",
          label: "URL"
        },
        {
          type: "string",
          name: "title",
          label: "Title"
        },
        {
          type: "object",
          name: "items",
          label: "Submenu Items",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.label ? item.label : "New Menu Item" };
            }
          },
          fields: [
            {
              type: "string",
              name: "label",
              label: "Label"
            },
            {
              type: "string",
              name: "href",
              label: "URL"
            },
            {
              type: "string",
              name: "description",
              label: "Description",
              ui: {
                component: "textarea"
              }
            },
            {
              type: "object",
              name: "items",
              label: "Submenu Items",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item.label ? item.label : "New Menu Item" };
                }
              },
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label"
                },
                {
                  type: "string",
                  name: "href",
                  label: "URL"
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description",
                  ui: {
                    component: "textarea"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
var menus_default = menus;

// src/schema/templates/pages/site.ts
var image2 = { ...image_default };
image2.name = "logo";
image2.label = "Logo";
var site = {
  name: "site",
  label: "Site Info",
  ui: {
    default: {
      className: "bg-white text-content",
      filename: "site.json"
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Site Name"
    },
    image2,
    {
      type: "boolean",
      name: "showName",
      label: "Show site name in header"
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "copyrightText",
      label: "Copyright Text"
    },
    {
      type: "object",
      name: "headerMessage",
      label: "Header Message",
      fields: [
        {
          type: "boolean",
          name: "active",
          label: "Active"
        },
        {
          type: "string",
          name: "className",
          label: "Type",
          options: [
            {
              label: "Default",
              value: "message default bg-white text-content"
            },
            {
              label: "Info",
              value: "message info bg-info text-content"
            },
            {
              label: "Warning",
              value: "message warning bg-warning text-content"
            },
            {
              label: "Emergency",
              value: "message emergency bg-danger text-content"
            }
          ]
        },
        {
          type: "rich-text",
          name: "body",
          label: "Message",
          templates: embeds_default.fields
        },
        {
          type: "datetime",
          name: "expire",
          label: "Expire Date"
        }
      ]
    }
  ]
};
var site_default = site;

// src/schema/templates/field-groups/phone.js
var formatPhoneNumber = (input) => {
  input = input.replace(/[a-zA-z]/, "");
  if (!input) {
    return input;
  }
  const phone = input.replace(/[^\d]/g, "");
  if (phone.length < 4)
    return input;
  if (phone.length < 7) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
  }
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
};
var defaultPhone = {
  label: "Phone",
  name: "phone",
  type: "string",
  ui: {
    parse: (val) => formatPhoneNumber(val)
  }
};
var phone_default = defaultPhone;

// src/schema/templates/field-groups/contact-info.ts
var contact_info_default = {
  name: "contactInfo",
  label: "Contct Info",
  fields: [
    phone_default,
    {
      type: "string",
      name: "email",
      label: "Email"
    }
  ]
};

// src/schema/templates/pages/theme.ts
var site2 = {
  name: "theme",
  label: "Theme",
  fields: [
    {
      type: "object",
      name: "colors",
      label: "Colors",
      fields: [
        {
          type: "string",
          name: "primary",
          label: "Primary",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "secondary",
          label: "Secondary",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "accent",
          label: "Accent",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "light",
          label: "Light",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "dark",
          label: "Dark",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "content",
          label: "Content",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "black",
          label: "Black",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "white",
          label: "White",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "danger",
          label: "Danger",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "warning",
          label: "Warning",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "info",
          label: "Info",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "success",
          label: "Success",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "disabled",
          label: "Disabled",
          ui: {
            component: "color"
          }
        },
        {
          type: "string",
          name: "focus",
          label: "Focus",
          ui: {
            component: "color"
          }
        }
      ]
    }
  ]
};
var theme_default = site2;

// src/schema/templates/pages/taxonomy.ts
var presetField = {
  name: "presetField",
  label: "Preset Field",
  ui: {
    itemProps: (item) => {
      return { label: item.label ? item.label : "New Field" };
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name"
    },
    {
      type: "string",
      name: "label",
      label: "Label"
    },
    {
      type: "string",
      name: "options",
      label: "Options",
      list: true
    }
  ]
};
var tagsField = {
  name: "tagsField",
  label: "Tags Field",
  ui: {
    itemProps: (item) => {
      return { label: item.label ? item.label : "New Field" };
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name"
    },
    {
      type: "string",
      name: "label",
      label: "Label"
    }
  ]
};
var singleField = {
  name: "single",
  label: "Single Fields",
  ui: {
    itemProps: (item) => {
      return {
        label: item.label ? item.label : "New Field"
      };
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name"
    },
    {
      type: "string",
      name: "label",
      label: "Label"
    }
  ]
};
var taxnonomies = {
  name: "taxonomies",
  label: "Taxonomies",
  fields: [
    {
      type: "object",
      list: true,
      name: "list",
      label: "Fields",
      ui: {
        visualSelector: false
      },
      templates: [
        presetField,
        singleField,
        tagsField
      ]
    }
  ]
};
var taxonomy_default2 = taxnonomies;

// src/schema/collections/settings.ts
import "slugify";
var settings = {
  name: "settings",
  label: "Settings",
  path: "content/settings",
  format: "json",
  templates: [
    site_default,
    contact_info_default,
    theme_default,
    // locations,
    taxonomy_default2
  ]
};
var settings_default = settings;

// src/schema/collections/pages.ts
import slugify4 from "slugify";

// src/schema/templates/field-groups/title-block.ts
var published = {
  type: "boolean",
  label: "Published",
  name: "published"
};
var date = {
  type: "datetime",
  label: "Posted Date",
  name: "date",
  required: true,
  ui: {
    dateFormat: "MMMM DD YYYY",
    timeFormat: "hh:mm A"
  }
};
var title = {
  type: "string",
  label: "Title",
  name: "title",
  required: true,
  description: "Title displayed in an H1 element on this page."
};
var metaTitle = {
  type: "string",
  label: "Meta Title",
  name: "metaTitle",
  required: false,
  description: "Title in the tab. Also used for SEO."
};
var titleBlock = [
  published,
  title,
  metaTitle,
  date
];

// src/schema/templates/field-groups/post-meta-block.ts
var featured = {
  type: "object",
  name: "featuredImg",
  label: "Featured Image",
  required: false,
  description: "Add some images for SEM use.",
  ui: {
    itemProps: (item) => {
      return { label: `${item.alt ? item.alt : "New Image"}` };
    }
  },
  fields: [
    {
      label: "Source",
      name: "src",
      type: "image",
      required: false
    },
    {
      label: "Alternative Text",
      name: "alt",
      type: "string",
      required: false
    }
  ]
};
var excerpt = {
  type: "string",
  label: "Description",
  name: "description",
  description: "Used on archive pages and for SEO. This description is displayed in search engine results.",
  ui: {
    component: "textarea"
  }
};
var categories2 = {
  type: "string",
  name: "categories",
  label: "Categories",
  list: true
};
var tags = {
  type: "string",
  name: "tags",
  label: "Tags",
  list: true,
  ui: {
    component: "tags"
  }
};
var pageTemplate = {
  type: "string",
  name: "_template",
  label: "Template",
  ui: {
    component: () => {
      return null;
    }
  }
};
var metaBlock = [
  featured,
  excerpt,
  categories2,
  tags,
  pageTemplate
  // indexPage
];

// src/schema/templates/pages/landing-page.ts
var landingPageTemplate = {
  name: "landingPage",
  label: "Landing Page",
  fields: [
    ...titleBlock,
    {
      type: "boolean",
      name: "showPageTitle",
      label: "Show Page Title"
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: false
      },
      templates: getBlockSchemas()
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page"
    },
    ...metaBlock
  ]
};

// src/schema/templates/field-groups/page-meta-block.ts
var featured2 = {
  type: "object",
  name: "featuredImg",
  label: "Featured Image",
  required: false,
  description: "Add some images for SEM use.",
  ui: {
    itemProps: (item) => {
      return { label: `${item.alt ? item.alt : "New Image"}` };
    }
  },
  fields: [
    {
      label: "Source",
      name: "src",
      type: "image",
      required: false
    },
    {
      label: "Alternative Text",
      name: "alt",
      type: "string",
      required: false
    }
  ]
};
var excerpt2 = {
  type: "string",
  label: "Description",
  name: "description",
  description: "Used on archive pages and for SEO. This description is displayed in search engine results.",
  ui: {
    component: "textarea"
  }
};
var pageTemplate2 = {
  type: "string",
  name: "_template",
  label: "Template",
  ui: {
    component: () => {
      return null;
    }
  }
};
var metaBlock2 = [
  featured2,
  excerpt2,
  pageTemplate2
];

// src/schema/templates/pages/page.ts
var body = {
  type: "rich-text",
  name: "body",
  label: "Content",
  isBody: true,
  templates: embeds_default.fields
};
var pageTemplate3 = {
  name: "contentPage",
  label: "Content Page",
  fields: [
    ...titleBlock,
    body,
    ...metaBlock2
  ]
};

// src/schema/templates/pages/list.ts
var listPageTemplate = {
  name: "listPage",
  label: "List Page",
  fields: [
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds_default.fields
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page"
    },
    ...metaBlock
  ]
};

// src/schema/templates/pages/faqPage.ts
var faqTemplate = {
  name: "faqPage",
  label: "FAQ Page",
  fields: [
    ...titleBlock,
    {
      type: "object",
      name: "faqs",
      label: "Questions",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.question || "New Question" };
        }
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question"
        },
        {
          type: "rich-text",
          name: "answer",
          label: "Answer"
        }
      ]
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds_default.fields
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page"
    },
    ...metaBlock
  ]
};

// src/schema/templates/pages/blocks-page.ts
var blocksPageTemplate = {
  name: "blocksPage",
  label: "Blocks Page",
  fields: [
    ...titleBlock,
    {
      type: "boolean",
      name: "showPageTitle",
      label: "Show Page Title"
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: false
      },
      templates: getBlockSchemas()
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page"
    },
    ...metaBlock
  ]
};

// src/schema/collections/pages.ts
var pages = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: false,
      // Example of using a custom slugify function
      slugify: (values) => slugify4(values.title)
    },
    router: async ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.relativePath.replace(".mdx", "")}`;
    }
  },
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: "New Page",
      date: (/* @__PURE__ */ new Date()).toISOString(),
      indexPage: true
    };
  },
  // fields: [
  //   ...titleBlock
  // ],
  templates: [
    pageTemplate3,
    landingPageTemplate,
    listPageTemplate,
    faqTemplate,
    blocksPageTemplate
  ]
};
var pages_default = pages;

// src/schema/collections/posts.ts
import slugify5 from "slugify";
var featuredImg = { ...image_default };
featuredImg.name = "featuredImg";
featuredImg.label = "Featured Image";
var posts = {
  label: "Blog",
  name: "post",
  path: "content/blog",
  format: "mdx",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: (values) => slugify5(values.title || "")
    },
    router: async ({ document }) => {
      return `/blog/${document._sys.filename}`;
    }
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: "New Post",
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  fields: [
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds_default.fields
    },
    ...metaBlock
  ]
};
var posts_default = posts;

// src/schema/collections/help.ts
import slugify6 from "slugify";

// src/schema/templates/pages/help.ts
var helpTemplate = {
  name: "helpPage",
  label: "Help Page",
  fields: [
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds_default.fields
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page"
    },
    ...metaBlock
  ]
};

// src/schema/collections/help.ts
var featuredImg2 = { ...image_default };
featuredImg2.name = "featuredImg";
featuredImg2.label = "Featured Image";
var help = {
  label: "Help",
  name: "help",
  path: "content/help",
  format: "mdx",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: (values) => slugify6(values.title || "")
    },
    router: async ({ document }) => {
      return `/loan-help/${document._sys.filename}`;
    }
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: "New Post",
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  templates: [
    helpTemplate,
    faqTemplate
  ]
};
var help_default = help;

// src/schema/templates/field-groups/meta-block.ts
var featured3 = {
  type: "object",
  name: "featuredImg",
  label: "Featured Image",
  required: false,
  description: "Add some images for SEM use.",
  ui: {
    itemProps: (item) => {
      return { label: `${item.alt ? item.alt : "New Image"}` };
    }
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
      required: false
    },
    {
      label: "Source",
      name: "src",
      type: "image",
      required: false
    },
    {
      label: "Alternative Text",
      name: "alt",
      type: "string",
      required: false
    }
  ]
};
var excerpt3 = {
  type: "string",
  label: "Excerpt",
  name: "excerpt",
  description: "Used on archive pages and for SEO. This description is displayed in search engine results.",
  ui: {
    component: "textarea"
  }
};
var pageTemplate4 = {
  type: "string",
  name: "_template",
  label: "Template",
  ui: {
    component: () => {
      return null;
    }
  }
};
var metaBlock4 = [
  featured3,
  excerpt3,
  // categories,
  // tags,
  pageTemplate4
];

// content/settings/taxonomies.json
var taxonomies_default = {
  list: [
    {
      name: "affiliations",
      label: "Affiliations",
      _template: "tagsField"
    },
    {
      name: "quadrants",
      label: "Quadrants",
      options: [
        "",
        "Alpha",
        "Beta",
        "Delta",
        "Gamma",
        "Other"
      ],
      _template: "presetField"
    },
    {
      name: "time",
      label: "Time Period",
      options: [
        "800s",
        "1400s",
        "1900s",
        "2000s",
        "2100s",
        "2200s",
        "2300s",
        "2400s",
        "2800s",
        "3100s"
      ],
      _template: "presetField"
    },
    {
      name: "universes",
      label: "Universe",
      _template: "tagsField"
    },
    {
      name: "franchise",
      label: "Franchise",
      _template: "single"
    },
    {
      name: "types",
      label: "Types",
      _template: "tagsField"
    }
  ],
  _template: "taxonomies"
};

// src/schema/collections/symbols.ts
var featuredImg3 = { ...image_default };
featuredImg3.name = "featuredImg";
featuredImg3.label = "Featured Image";
var pages2 = {
  label: "Symbols",
  name: "symbol",
  path: "content/symbols",
  format: "md",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: (values) => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      }
    },
    router: ({ document }) => {
      return `/${document._sys.filename}`;
    }
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: "New Symbol",
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  fields: [
    ...titleBlock,
    {
      type: "object",
      name: "taxonomy",
      label: "Taxonomy",
      fields: taxonomies_default.list.map((tax) => {
        switch (tax._template) {
          case "presetField":
            return {
              type: "string",
              name: tax.name,
              label: tax.label,
              options: tax?.options?.map((o) => {
                return {
                  label: o,
                  value: o
                };
              }) || []
            };
          case "tagsField":
            return {
              type: "string",
              name: tax.name,
              label: tax.label,
              list: true,
              ui: {
                component: "tags"
              }
            };
          default:
            return {
              type: "string",
              name: tax.name,
              label: tax.label
            };
        }
      })
    },
    {
      type: "string",
      name: "designers",
      label: "Designers",
      list: true
    },
    {
      type: "string",
      name: "memory_alpha_url",
      label: "Memory Alpha url"
    },
    {
      type: "rich-text",
      name: "primary_reference",
      label: "Primary Reference"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true
    },
    ...metaBlock4
  ]
};
var symbols_default = pages2;

// src/schema/collections/related.ts
import slugify7 from "slugify";
var featuredImg4 = { ...image_default };
featuredImg4.name = "featuredImg";
featuredImg4.label = "Featured Image";
var related = {
  label: "Related",
  name: "related",
  path: "content/related",
  format: "json",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: (values) => slugify7(values.title || "")
    },
    router: async ({ document }) => {
      return `/blog/${document._sys.filename}`;
    }
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: "New Post",
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "datetime",
      name: "date",
      label: "Date"
    },
    {
      type: "string",
      name: "file",
      label: "File Name"
    },
    {
      type: "object",
      name: "related",
      label: "Related",
      list: true,
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title"
        },
        {
          type: "string",
          name: "id",
          label: "Path"
        },
        {
          type: "object",
          name: "featuredImg",
          label: "Featured Image",
          fields: [
            {
              name: "src",
              label: "Image",
              type: "image"
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string"
            },
            {
              name: "title",
              label: "Title",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};
var related_default = related;

// src/schema/collections/index.ts
var collections = [
  symbols_default,
  posts_default,
  pages_default,
  help_default,
  taxonomy_default,
  menus_default,
  settings_default,
  related_default
];
var getCollections = () => {
  return collections;
};

// src/schema/index.ts
var schema_default = {
  blocks: getBlockSchemas(),
  collections: getCollections()
};

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  // Get this from tina.io & store in .env
  token: process.env.TINA_TOKEN,
  // Get this from tina.io & store in .env
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    // git based media store
    // tina: {
    //   mediaRoot: "",
    //   publicFolder: "public",
    // },
    // cloudinary based media store
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    }
  },
  schema: schema_default
});
export {
  config_default as default
};
