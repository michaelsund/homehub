import React from 'react'
import './Volume.css'

type Props = {
  value: number,
  unit: string
}


class Volume extends React.Component<Props> {
  render() {
    return (
      <p className="volume-value">{this.props.value}{this.props.unit}</p>
    )
  }
}

export default Volume
