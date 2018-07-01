import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import { cuClient } from '../../graphql/gqlClients'

type Props = {
  data: Array,
  serverName: string,
  getCuPlayerCount: Function
}

class CuPlayerCount extends React.Component<Props> {
  render() {
    return (
      !this.props.data.loading &&
        // <span style={{ float: 'right' }}>
        //   {this.props.data.metrics.currentPlayerCount.total}
        // </span>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <span style={{ color: '#FFC09F' }}>A </span>{this.props.data.metrics.currentPlayerCount.arthurian}&nbsp;
          <span style={{ color: '#ADF7B6' }}>T </span>{this.props.data.metrics.currentPlayerCount.tuatha}&nbsp;
          <span style={{ color: '#A0CED9' }}>V </span>{this.props.data.metrics.currentPlayerCount.viking}
        </div>
    )
  }
}

export default graphql(
  queries.getCuPlayerCount,
  {
    options: props => ({
      variables: { serverName: props.serverName },
      client: cuClient,
      pollInterval: 60000,
    })
  }
)(CuPlayerCount)
