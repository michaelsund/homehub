import React from 'react'
import './GaugeVolume.css'

type Props = {
  value: number,
  unit: string
}


class GaugeVolume extends React.Component<Props> {
  render() {
    return (
      <div className="gauge-volume-wrapper">
        <h1>{this.props.value}{this.props.unit}</h1>
      </div>
    )
  }
}

export default GaugeVolume
