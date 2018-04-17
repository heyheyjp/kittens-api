import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'

import schema from './graphql/schema'

const PORT = process.env.PORT || 5000
const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

// catch-all error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({errors: [err]})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}. Visit /graphiql to run queries.`)
})
