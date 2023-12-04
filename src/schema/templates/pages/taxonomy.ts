import {templateFields} from "../../templates/embeds"

const presetField = {
  name: "presetField",
  label: "Preset Field",
  ui: {
    itemProps: (item:any) => {
      return { label: item.label ? item.label : "New Field"}
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
    },
    {
      type: "string",
      name: "label",
      label: "Label",
    },
    {
      type: "string",
      name: "options",
      label: "Options",
      list: true,
    }
  ]
}

const tagsField = {
  name: "tagsField",
  label: "Tags Field",
  ui: {
    itemProps: (item:any) => {
      return { label: item.label ? item.label : "New Field"}
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
    },
    {
      type: "string",
      name: "label",
      label: "Label",
    },
  ]
}

const singleField = {
  name: "single",
  label: "Single Fields",
  ui: {
    itemProps: (item:any) => {
      return {
        label: item.label ? item.label : "New Field"
      }
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Name",
    },
    {
      type: "string",
      name: "label",
      label: "Label",
    },
  ]
}

const taxnonomies = {
  name: 'taxonomies',
  label: 'Taxonomies',
  fields: [
    {
      type: "object",
      list: true,
      name: "list",
      label: "Fields",
      ui: {
        visualSelector: false,
      },
      templates: [
        presetField,
        singleField,
        tagsField
      ]
    },
  ]
}

export default taxnonomies
