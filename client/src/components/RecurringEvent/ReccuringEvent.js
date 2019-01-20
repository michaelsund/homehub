import React from 'react'
import { calcDaysLeft } from './DayWeekCalculations'
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
    calcDaysLeft(
      this.props.eventDay,
      this.props.everyWeek,
      this.props.evenWeeks,
      this.props.oddWeeks,
      this.props.weekInMonth
    )
      .then(res => this.setState({ daysToEvent: res }))
  }

  render() {
    return (
      <div className="col-wrapper fixed-height">
        <p className="name">{this.props.title}</p>
        <p className="desc">{this.props.note}</p>
        {this.state.daysToEvent <= 1 ? (
          this.state.daysToEvent === 0 ? <p className="time-left-text_short">Today!</p> : <p className="time-left-text_short">Tomorrow!</p>
        ) : (
          <p className="time-left-text_long">{this.state.daysToEvent} days</p>
        )}
      </div>
    )
  }
}

export default ReccuringEvent
