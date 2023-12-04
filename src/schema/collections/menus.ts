import type { Collection } from "tinacms";
import slugify from "slugify";

const menus: Collection = {
  label: "Menus",
  name: "menus",
  path: "content/menus",
  format: "json",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: false,
    },
  },
  fields: [
    {
      name: "items",
      label: "Items",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.label ? item.label : "New Menu Item"}
        },
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
          label: "URL",
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
              return { label: item.label ? item.label : "New Menu Item"}
            },
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
              label: "URL",
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
                  return { label: item.label ? item.label : "New Menu Item"}
                },
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
                  label: "URL",
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description",
                  ui: {
                    component: "textarea"
                  }
                },    
              ]
            }        
          ]
        }
     ]
    },
  ],
}

export default menus