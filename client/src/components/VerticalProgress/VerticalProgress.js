import React from 'react'
import './VerticalProgress.css'

type Props = {
  value: number,
  bgColor: string,
}

type State = {
  color: string
}

class VerticalProgress extends React.Component<Props, State> {
  state = {
    color: '#FFFFFF'
  }

  static defaultProps = {
    value: 0
  }

  componentWillMount = () => this.valueChanged(this.props.value)

  componentWillReceiveProps = nextProps => this.valueChanged(nextProps.value)

  valueChanged = val => {
    if (val === 0) {
      this.setState({ color: 'transparent' })
    } else if (val <= 20) {
      this.setState({ color: 'red' })
    } else if (val <= 40) {
      this.setState({ color: 'orange' })
    } else if (val > 40 && val <= 100) {
      this.setState({ color: 'green' })
    }
  }

  render() {
    return (
      <div
        className="progress-container"
        style={{ backgroundColor: this.props.bgColor }}
      >
        <div className="progress" style={{ height: `${this.props.value}%`, backgroundColor: this.state.color }}></div>
      </div>
    )
  }
}

export default VerticalProgress
