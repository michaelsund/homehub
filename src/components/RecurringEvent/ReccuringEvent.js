// @flow

import React from 'react'
import Moment from 'moment'
import './ReccuringEvent.css'

type Props = {
  title: string,
  note?: string,
  eventInterval: string
}

type State = {
  daysToEvent: number
}

const WeekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

class ReccuringEvent extends React.Component<Props, State> {
  state = {
    daysToEvent: 0
  }

  componentDidMount = () => {
    this.calcDaysLeft()
  }

  calcDaysLeft = () => {
    const today = Moment().format('dddd').substring(0, 3).toLowerCase()
    const eventIndex = WeekDays.indexOf(this.props.eventInterval.toLowerCase())
    const todayIndex = WeekDays.indexOf(today)
    if (todayIndex < eventIndex) {
      this.setState({ daysToEvent: eventIndex - todayIndex })
    } else if (todayIndex === eventIndex) {
      this.setState({
        daysToEvent: 0
      })
    } else {
      this.setState({
        daysToEvent: (WeekDays.length - todayIndex) + (WeekDays.length - eventIndex)
      })
    }
  }

  render() {
    return (
      <div className="col-wrapper">
        <p>{this.props.title}</p>
        <p>{this.props.note}</p>
        {this.state.daysToEvent <= 1 ? (
          this.state.daysToEvent === 0 ? <p>Today!</p> : <p>Tomorrow!</p>
        ) : (
          <p>{this.state.daysToEvent} days left</p>
        )}
      </div>
    )
  }
}

export default ReccuringEvent
