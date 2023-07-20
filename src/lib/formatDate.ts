export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const formattedDate = formatter.format(date)
  return formattedDate
}
