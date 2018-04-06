// @flow

import React from 'react'
import Moment from 'moment'
import './ReccuringEvent.css'

type Props = {
  title: string,
  note?: string,
  eventDay: string,
  everyWeek?: boolean,
  oddWeeks?: boolean,
  evenWeeks?: boolean,
  onceAMonth?: boolean,
  weekInMonth?: number
}

type State = {
  daysToEvent: number
}

const WeekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

class ReccuringEvent extends React.Component<Props, State> {
  state = {
    daysToEvent: 0
  }

  static defaultProps = {
    everyWeek: true,
    oddWeeks: false,
    evenWeels: false,
    onceAMonth: false,
    weekInMonth: null
  }

  componentDidMount = () => {
    this.calcDaysLeft()
  }

  weekdayCounter = (first, second) => {
    if (first > second) {
      return (WeekDays.length - first) + second
    }
    return second - first
  }

  weekOfMonth() {
    return (Moment(new Date()).isoWeek() - Moment(new Date()).startOf('month').isoWeek()) + 1;
  }

  calcDaysLeft = () => {
    const today = Moment().format('dddd').substring(0, 3).toLowerCase()
    const eventIndex = WeekDays.indexOf(this.props.eventDay.toLowerCase())
    const todayIndex = WeekDays.indexOf(today)
    if (this.props.everyWeek) {
      this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) })
    } else if (this.props.evenWeeks) {
      if (Moment(new Date()).isoWeek() % 2 === 0) {
        this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) })
      } else {
        this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) + 7 })
      }
    } else if (this.props.oddWeeks) {
      if (Moment(new Date()).isoWeek() % 2 !== 0) {
        this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) })
      } else {
        this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) + 7 })
      }
    } else if (this.props.onceAMonth) {
      const monthWeek = this.weekOfMonth()
      console.log(`monthWeek: ${monthWeek}`)
      if (monthWeek === this.props.weekInMonth) {
        console.log('this week!')
        this.setState({ daysToEvent: this.weekdayCounter(todayIndex, eventIndex) })
      } else {
        // TODO:
        this.setState({
          daysToEvent: this.weekdayCounter(todayIndex, eventIndex) +
            ((4 - monthWeek) * 7)
        })
      }
    }
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <p className="name">{this.props.title}</p>
        <p className="desc">{this.props.note}</p>
        {this.state.daysToEvent <= 1 ? (
          this.state.daysToEvent === 0 ? <p className="time-left-text_short">Today!</p> : <p className="time-left-text_short">Tomorrow!</p>
        ) : (
          <p className="time-left-text_long">{this.state.daysToEvent} days left</p>
        )}
      </div>
    )
  }
}

export default ReccuringEvent
