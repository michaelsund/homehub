// @flow

import React from 'react'
import Moment from 'moment'
import './Countdown.css'

type Props = {
  title: string,
  description?: string,
  dueDate: Date,
}

type State = {
  diffDays: number
}

class Countdown extends React.Component<Props, State> {
  state = {
    diffDays: this.calcEvent(this.props.dueDate)
  }

  calcEvent(date: Date) {
    const event = Moment(date)
    const today = Moment().format('YYYY-MM-DD')
    return event.diff(today, 'days')
  }

  timeLeft = () => {
    switch (this.state.diffDays) {
      case 0:
        return (<h1 className="days-left_0">Today!</h1>)
      case 1:
        return (<h1 className="days-left_1">Tomorrow!</h1>)
      case 2:
        return (<h1 className="days-left_2">{this.state.diffDays} days!</h1>)
      default:
        return (<h1>{this.state.diffDays} days</h1>)
    }
  }

  render() {
    return (
      <div className="countdown-wrapper">
        <h3>{this.props.title}</h3>
        <h4>{Moment(new Date(this.props.dueDate)).format('YY-MM-DD')}</h4>
        <p className="countdown-description-text">{this.props.description}</p>
        {this.timeLeft()}
      </div>
    )
  }
}

export default Countdown
