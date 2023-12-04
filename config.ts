import { defineConfig } from "tinacms";
import schema from '../src/schema'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || '', // Get this from tina.io & store in .env
  token: process.env.TINA_TOKEN, // Get this from tina.io & store in .env

  build: {
    outputFolder: "admin",
    publicFolder: "public",
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
    },
  },
  schema
});
