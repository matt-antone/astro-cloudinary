import imageComponent from "../field-groups/image"
import embeds from "../embeds"
const image = {...imageComponent}

image.name = "logo"
image.label = "Logo"

const site = {
  name: 'site',
  label: 'Site Info',
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
    image,
    {
      type: "boolean",
      name: "showName",
      label: "Show site name in header",
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
          label: "Active",
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
            },
          ]
        },
        {
          type: "rich-text",
          name: "body",
          label: "Message",
          templates: embeds.fields,
        },
        {
          type: "datetime",
          name: "expire",
          label: "Expire Date"
        }
      ]
    },
  ],
}

export default site
