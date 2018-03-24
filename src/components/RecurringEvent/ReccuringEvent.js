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
    console.log(`Today: ${today}, eventDay: ${this.props.eventInterval}`)
    const eventIndex = WeekDays.indexOf(this.props.eventInterval.toLowerCase())
    const todayIndex = WeekDays.indexOf(today)
    if (todayIndex < eventIndex) {
      this.setState({ daysToEvent: eventIndex - todayIndex })
    } else {
      this.setState({
        daysToEvent: (WeekDays.length - todayIndex) + (WeekDays.length - eventIndex)
      })
    }
  }

  render() {
    return (
      <div className="recurringevent-wrapper">
        <h3>{this.props.title}</h3>
        <h4>{this.props.note}</h4>
        {this.state.daysToEvent <= 1 ? (
          <p>Tomorrow!</p>
        ) : (
          <p>{this.state.daysToEvent} days left</p>
        )}

        {/* <h4>{Moment(new Date(this.props.dueDate)).format('YY-MM-DD')}</h4>
        <p className="recurringevent-description-text">{this.props.description}</p>
        {this.timeLeft()} */}
      </div>
    )
  }
}

export default ReccuringEvent
