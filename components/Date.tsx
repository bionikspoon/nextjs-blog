import { format, parseISO } from 'date-fns'
import React, { ReactElement } from 'react'

interface DateProps {
  date: string
}

export function Date(props: DateProps): ReactElement {
  const date = parseISO(props.date)
  const formattedDate = format(date, 'LLLL d, yyyy')

  return <time dateTime={props.date}>{formattedDate}</time>
}
