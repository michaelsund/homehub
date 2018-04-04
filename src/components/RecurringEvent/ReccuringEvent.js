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
    // const today = Moment().format('dddd').substring(0, 3).toLowerCase()
    // const eventIndex = WeekDays.indexOf(this.props.eventDay.toLowerCase())
    // const todayIndex = WeekDays.indexOf(today)
    const todayIndex = 6
    const eventIndex = 1
    // Implement logic for everyOtherWeek and onceAMonth
    // if (this.props.everyWeek) {
    //   if (todayIndex === eventIndex) {
    //     this.setState({
    //       daysToEvent: 0
    //     })
    //   } else if (todayIndex < eventIndex) {
    //       if (todayIndex === 0) {
    //         console.log('toayIndex eq 0')
    //         this.setState({
    //           daysToEvent: (WeekDays.length - eventIndex) - 1
    //         })
    //       } else {
    //         this.setState({ daysToEvent: eventIndex - todayIndex })
    //       }
    //     } else if (eventIndex === 0) {
    //         console.log('eventIndex eq 0')
    //         this.setState({
    //           daysToEvent: (WeekDays.length - todayIndex) - 1
    //         })
    //       } else {
    //         this.setState({
    //           daysToEvent: ((WeekDays.length - todayIndex) + (WeekDays.length - eventIndex)) - 1
    //         })
    //       }
    //     }
    //   }
    // }
    if (this.props.everyWeek) {
      console.log(`todayIndex: ${todayIndex}`)
      console.log(`eventIndex: ${eventIndex}`)
      if (todayIndex === eventIndex) {
        this.setState({ daysToEvent: 0 })
      } else if (todayIndex > eventIndex) {
        console.log('today is bigger than event')
        console.log(`${WeekDays.length} - ${todayIndex} + ${WeekDays.length} - ${eventIndex}`)
        this.setState({
          daysToEvent: ((WeekDays.length - todayIndex) + (WeekDays.length - eventIndex) + 1)
        })
      } else {
        console.log('event is bigger than today')
        console.log(`${eventIndex} - ${todayIndex}`)
        this.setState({ daysToEvent: eventIndex - todayIndex })
      }
    }
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <p className="name">{this.props.title}</p>
        <p className="desc">{this.props.note}</p>
        <p>{this.props.eventDay}</p>
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
