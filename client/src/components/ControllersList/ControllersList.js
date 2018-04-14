// @flow

import React from 'react'
import { Query } from 'react-apollo'
import queries from '../../graphql'
import './ControllersList.css'


const ControllersList = () => (
  <Query query={queries.getControllers}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...'
      }
      if (error) {
        console.log(`GraphQL Error: ${error.message}`)
        return 'Error getting controllers.'
      }
      return (
        data.controllers.map(co => (
          <p key={co.id}>co.name</p>
        ))
      )
    }}
  </Query>
)

export default ControllersList
