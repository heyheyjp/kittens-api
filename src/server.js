import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import socketClusterServer from 'socketcluster-server'
import serveStatic from 'serve-static'

import routes from './routes'

const PORT = process.env.PORT
const app = express()
const httpServer = createServer(app)

app.use(bodyParser.json())
app.use(serveStatic(path.resolve(__dirname, '../public')))
app.use(routes)

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
