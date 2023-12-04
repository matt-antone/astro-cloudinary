import Container from "../../components/Container"
import Section from "../../components/Section"

type Props = {
  data: any
  parentField?: any
  children: any
  id: any
  theme?: string
}

const blockThemes: any = {
  default: {
    section: ""
  },
  primary: {
    section: "bg-lime p-12 rounded"
  },
  secondary: {
    section: "bg-orange p-12 rounded"
  },
  accent: {
    section: "bg-lemon p-12 rounded"
  },
  light: {
    section: "bg-light text-content p-12 rounded"
  },
  dark: {
    section: "bg-dark text-white p-12 rounded"
  },
}

const Block = (props: Props) => {
  const { data, parentField, children, id, theme } = props
  return (
    <Section
      id={id}
      className={`${data?.paddingTopOff ? 'pb-8' : 'py-8'}`}
    >
      {data?.alignment === 'full' ? (
        <div className={`full`}>
          {children}
        </div>
      ) : (
        <Container>
          <div className={``}>
            {children}
          </div>
        </Container>
      )}
    </Section>
  )
}

export default Block