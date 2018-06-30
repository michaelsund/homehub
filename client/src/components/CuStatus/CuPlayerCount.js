import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import { cuClient } from '../../graphql/gqlClients'

type Props = {
  data: Array,
  server: string
}

class CuPlayerCount extends React.Component<Props> {
  componentDidUpdate = () => {
    console.log(`${this.props.server} updated!`)
  }

  render() {
    return (
      this.props.data.loading ? (
        <span>Loading...</span>
      ) : (
        <span>: {this.props.data.metrics.currentPlayerCount.total}</span>
        // <div style={{ display: 'inline-block' }}>
        //   <span>
        //     A {this.props.data.metrics.currentPlayerCount.arthurian}&nbsp;
        //   </span>
        //   <span>
        //     T {this.props.data.metrics.currentPlayerCount.tuatha}&nbsp;
        //   </span>
        //   <span>
        //     V {this.props.data.metrics.currentPlayerCount.viking}
        //   </span>
        // </div>
      )
    )
  }
}

// export default CuPlayerCount
export default graphql(queries.getCuPlayerCount, {
  options: {
    client: cuClient,
  }
})(CuPlayerCount)
