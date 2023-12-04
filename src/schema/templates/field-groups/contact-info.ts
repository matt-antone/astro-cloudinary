import phone from "./phone"

export default {
  name: 'contactInfo',
  label: 'Contct Info',
  fields: [
    phone,
    {
      type: "string",
      name: "email",
      label: "Email",
    },
  ],
}