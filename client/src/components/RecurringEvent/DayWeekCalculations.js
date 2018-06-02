import Moment from 'moment'


const WeekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const weekdayCounter = (first, second) => {
  if (first > second) {
    return (WeekDays.length - first) + second
  }
  return second - first
}

const weeksCounter = (currW, eventW) => {
  if (currW > eventW) {
    return (5 - currW) * 7
  }
  return (eventW - currW) * 7
}

const weekOfMonth = () => (Moment(new Date()).isoWeek() - Moment(new Date()).startOf('month').isoWeek()) + 1

export const calcDaysLeft = (
  eventDay: string = '',
  everyWeek: boolean = false,
  evenWeeks: boolean = false,
  oddWeeks: boolean = false,
  weekInMonth: number = null
) => new Promise(resolve => {
  const today = Moment().format('dddd').substring(0, 3).toLowerCase()
  const eventIndex = WeekDays.indexOf(eventDay.toLowerCase())
  const todayIndex = WeekDays.indexOf(today)
  if (everyWeek) {
    resolve(weekdayCounter(todayIndex, eventIndex))
  } else if (evenWeeks) {
    if (Moment(new Date()).isoWeek() % 2 === 0) {
      resolve(weekdayCounter(todayIndex, eventIndex))
    }
    resolve(weekdayCounter(todayIndex, eventIndex) + 7)
  } else if (oddWeeks) {
    if (Moment(new Date()).isoWeek() % 2 !== 0) {
      resolve(weekdayCounter(todayIndex, eventIndex))
    }
    resolve(weekdayCounter(todayIndex, eventIndex) + 7)
  } else if (this.props.onceAMonth) {
    const monthWeek = weekOfMonth()
    if (monthWeek === weekInMonth) {
      resolve(weekdayCounter(todayIndex, eventIndex))
    }
    resolve(weekdayCounter(todayIndex, eventIndex) +
      weeksCounter(this.weekOfMonth(), weekInMonth))
  }
})
