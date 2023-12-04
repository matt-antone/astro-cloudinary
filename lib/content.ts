import { format } from "date-fns";

export const hasContent = (tinaContent: { children:[] } ) => {
  return tinaContent?.children.length > 0 ? true : false;
};

const getUrlFromPath = (path: string) => {
  return path.replace("content", "").replace(".mdx", "").replace("/pages", "");
};

export const formatLongDate = (date: string) => {
  return format(new Date(date), "EEEE, MMMM do yyyy, hh:mm aa");
};

const functions = {
  getUrlFromPath: getUrlFromPath,
  hasContent: hasContent,
  formatLongDate: formatLongDate,
};

export default functions;
