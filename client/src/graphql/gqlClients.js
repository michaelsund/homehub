import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import settings from '../settings.json'

const wsLink = new WebSocketLink({
  uri: settings.dev ? 'ws://localhost:5000/subscriptions' : `ws://${settings.prodIp}:5000/subscriptions`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: localStorage.getItem(AUTH_TOKEN),
    // }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  new HttpLink()
)

export const localClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  }),
})

export const cuClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://hatcheryapi.camelotunchained.com/graphql' }),
  cache: new InMemoryCache()
})
