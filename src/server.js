import express from 'express'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import socketClusterServer from 'socketcluster-server'
import cors from 'cors'

import routes from './routes'

const PORT = process.env.PORT
const app = express()
const httpServer = createServer(app)

app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.use('/', (req, res) => res.status(200).send('Hello!'))

// catch-all error handler
app.use((err, req, res, next) => {
  // TODO: distinguish between diff kinds of errors; handle accordingly
  console.error(err)
  res.status(500).json({errors: [err]})
})

const socketServer = socketClusterServer.attach(httpServer)
socketServer.on('connection', socket => {
  const clientId = socket.remoteAddress ? socket.remoteAddress : 'client'
  console.log(`${clientId} connected to socket`)
})

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
