export const formatPhoneNumber = input => {
  input = input.replace(/[a-zA-z]/,'')
  if(!input){
    return input
  }
  const phone = input.replace(/[^\d]/g,'')
  if(phone.length < 4) return input
  if(phone.length < 7) {
    return `(${phone.slice(0,3)}) ${phone.slice(3)}`
  }
  return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`
}

const defaultPhone = {
  label: "Phone",
  name: "phone",
  type: "string",
  ui: {
    parse: (val) => formatPhoneNumber(val),
  }
}

export const getPhoneField = ({label = "Phone", name = "phone"}) => {
  return {...defaultPhone, label: label, name: name}
}

export default defaultPhone