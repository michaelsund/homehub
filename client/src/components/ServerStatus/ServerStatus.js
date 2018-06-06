import * as React from 'react'
import { ParentSize } from '@vx/responsive'
import './ServerStatus.css'
import HeatmapChart from '../HeatmapChart'

type State = {
  loading: boolean,
  data: Array
}

// const mockData = [
//   { serverName: 'frink', status: false }
// ]

class ServerStatus extends React.Component<{}, State> {
  state = {
    loading: false,
    data: []
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <div className="serverstatus-graph-container">
          {this.state.loading ? (
            <p className="loading-text">Loading...</p>
          ) : (
            <ParentSize>
              {parent => (
                <HeatmapChart
                  data={this.state.data}
                  width={parent.width}
                  height={parent.height}
                  margin={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
              )}
            </ParentSize>
          )}
        </div>
      </div>
    )
  }
}

export default ServerStatus
