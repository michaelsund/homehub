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
    onceAMonth: false
  }

  componentDidMount = () => {
    this.calcDaysLeft()
  }

  calcDaysLeft = () => {
    const today = Moment().format('dddd').substring(0, 3).toLowerCase()
    const eventIndex = WeekDays.indexOf(this.props.eventDay.toLowerCase())
    const todayIndex = WeekDays.indexOf(today)
    // Implement logic for everyOtherWeek and onceAMonth
    if (this.props.everyWeek) {
      if (todayIndex > eventIndex) {
        this.setState({ daysToEvent: (WeekDays.length - todayIndex) + eventIndex })
      } else {
        this.setState({ daysToEvent: eventIndex - todayIndex })
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
