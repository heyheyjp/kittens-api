import socketCluster from 'socketcluster-client'

let socket = null // janky singleton

export function notify(channelName, message) {
  return _getSocket().publish(channelName, message)
}

function _getSocket() {
  if (socket) {
    return socket
  }
  socket = socketCluster.connect({hostname: process.env.SOCKET_HOST})
  socket.on('connect', () => console.log('Socket connected'))
  socket.on('disconnect', () => console.log('Socket disconnected; trying to reconnect...'))
  socket.on('connectAbort', () => null)
  socket.on('error', error => console.warn(error.message))
  return socket
}
