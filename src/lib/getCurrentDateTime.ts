export function getCurrentDateTime(): string {
  const date = new Date()
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()
  const month = monthsOfYear[date.getMonth()]
  const year = date.getFullYear()
  let hour = date.getHours()
  const minute = date.getMinutes()
  let period = 'AM'

  if (hour >= 12) {
    hour -= 12
    period = 'PM'
  }

  if (hour === 0) {
    hour = 12
  }

  const formattedDateTime = `${dayOfWeek} ${dayOfMonth}, ${year} | ${hour}:${minute
    .toString()
    .padStart(2, '0')} ${period}`

  return formattedDateTime
}
