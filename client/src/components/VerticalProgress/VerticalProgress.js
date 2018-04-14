import React from 'react'
import './VerticalProgress.css'

type Props = {
  value: number,
  bgColor: string,
  debug: boolean
}

type State = {
  color: string,
  debugValue: number,
  value: number
}

class VerticalProgress extends React.Component<Props, State> {
  state = {
    color: '#FFFFFF',
    debugValue: 0,
    value: 0
  }

  static defaultProps = {
    debug: false,
    value: 0
  }

  componentWillReceiveProps = nextProps => {
    this.valueChanged(nextProps.value)
    setTimeout(() => {
      this.setState({ value: nextProps.value })
    }, 1000)
  }

  randomValue = () => {
    const randomVal = Math.floor((Math.random() * 100) + 1)
    this.setState({ debugValue: randomVal })
    this.valueChanged(randomVal)
  }

  valueChanged = () => {
    if (this.props.value <= 10) {
      this.setState({ color: 'red' })
    } else if (this.props.value <= 20) {
      this.setState({ color: 'yellow' })
    } else if (this.props.value <= 30) {
      this.setState({ color: 'green' })
    } else {
      this.setState({ color: 'green' })
    }
  }

  render() {
    return (
      <div
        className="progress-container"
        style={{ backgroundColor: this.props.bgColor }}
      >
        {this.props.debug ? (
          <div>
            <div className="progress" style={{ height: `${this.state.debugValue}%`, backgroundColor: this.state.color }}></div>
            <button onClick={() => this.randomValue()}>random</button>
          </div>
        ) : (
          <div className="progress" style={{ height: `${this.state.value}%`, backgroundColor: this.state.color }}></div>
        )}
      </div>
    )
  }
}

export default VerticalProgress
