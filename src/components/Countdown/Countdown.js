// @flow

import React from 'react'
import Moment from 'react-moment';
// import 'moment-timezone';
import './Countdown.css'

type Props = {
  title: string,
  description: string,
  dueDate: any
}

type State = {
  nowDate: any,
  diffDays: number
}

class Countdown extends React.Component<Props, State> {
  state = {
    nowDate: Moment(new Date()),
    diffDays: 0
  }
  componentDidMount() {
    const diff = this.props.dueDate.diff(this.state.nowDate)
    this.setState({ diffDays: diff })
  }

  render() {
    return (
      <div className="countdown-wrapper">
        <h3>{this.props.title}</h3>
        <p className="countdown-description-text">{this.props.description}</p>
        <h1>{this.state.diffDays} days</h1>
        <h3>{this.props.dueDate}</h3>
      </div>
    )
  }
}

export default Countdown
