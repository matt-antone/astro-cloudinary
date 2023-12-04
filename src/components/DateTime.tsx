import { format, formatDistance, formatRelative, subDays } from 'date-fns'

type Props = {
  dateString: string
}


const DateTime = (props: Props) => {
  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(Number(d));
  }

  const { dateString } = props
  const date = dateString ? new Date(dateString) : new Date();

  return isValidDate(date) ? (
    <time dateTime={dateString}>{ format(date,  'MM/dd/yyyy') }</time>
  ) : null
}

export default DateTime