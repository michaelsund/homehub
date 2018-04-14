// @flow

import React from 'react'
// import { connect } from 'react-redux'
// import { Col } from 'react-simple-flex-grid'
// import * as actions from '../../actions'
import './ControllerList.css'

// type Props = {
//   controllers: [],
//   onSetSensors: Function
// }

// const mapStateToProps = state => state

// const mapDispatchToProps = dispatch => ({
//   onSetSensors: sensors => dispatch(actions.setSensors(sensors))
// })

class ControllerList extends React.Component<{}> {
  // componentDidMount = () => {
  //   // Initial fetch of List
  //   if (this.props.sensors.length === 0) {
  //     this.fetchAllSensors()
  //   }
  // }

  // fetchAllSensors = () => {
  //   fetch('http://localhost:8080/api/sensors', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.props.onSetSensors(response.sensors)
  //     })
  // }

  render() {
    return (
      <p>ControllerList</p>
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ControllerList)
export default ControllerList
