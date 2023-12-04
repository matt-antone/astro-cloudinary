import AdvancedImage, { advancedImageFields } from "./AdvancedImage";
import BlockQuote, { blockQuoteFields } from "./BlockQuote";
import DateTime, { dateTimeFields } from "./DateTime";
import VimeoEmbed, { vimeoFields } from "./Vimeo";
import YouTubeEmbed, { youtubeFields }  from "./Youtube";
import LinkButton, { linkButtonFields } from "./LinkButton";
import Gallery, { galleryFields } from "./Gallery";
import CsvTable, {csvTableFields} from "./CsvTable";
import FAQ, { faqFields } from "./FAQ";
import Iframe, { iframeFields } from "./Iframe";
//custom
import EventRegisterButton, { EventRegisterButtonFields } from "./EventRegisterButton";

export const templateFields = [
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
  EventRegisterButtonFields,
]

const templates:{} = {
  AdvancedImage,
  BlockQuote,
  DateTime,
  FAQ,
  Iframe,
  VimeoEmbed,
  YouTubeEmbed,
  LinkButton,
  Gallery,
  CsvTable,
  EventRegisterButton,
};


const d = {
  components:  {
    AdvancedImage,
    BlockQuote,
    DateTime,
    FAQ,
    Iframe,
    VimeoEmbed,
    YouTubeEmbed,
    LinkButton,
    Gallery,
    CsvTable,
    EventRegisterButton,
  },
  fields: templateFields,
}

export default d

