import {Promise} from './utils'

import findPendingTransfers from './actions/findPendingTransfers'
import updatePendingTransfer from './actions/updatePendingTransfer'

/**
 * Starts a number of "sub-workers" all running in this same process
 * (usually just polling operations using simple unending intervals).
 */
export default function start() {
  console.log('Starting worker...')
  setInterval(_updatePendingTransactions, 5000)
}

async function _updatePendingTransactions() {
  const pendingTransfers = await findPendingTransfers()
  console.log(`${pendingTransfers.length} pending transfers found`)
  await Promise.each(pendingTransfers, updatePendingTransfer)
}

if (!module.parent) {
  start()
}
