import Promise from 'bluebird'

import findPendingTransactions from './actions/findPendingTransactions'
import updatePendingTransaction from './actions/updatePendingTransaction'

/**
 * Starts a number of "sub-workers" all running in this same process
 * (usually just polling operations using simple unending intervals).
 */
export default function start() {
  setInterval(_updatePendingTransactions, 5000)
}

/**
 * Queries for transactions recorded that are still unconfirmed,
 * then attempts to check for and record a status update (via web3).
 */
async function _updatePendingTransactions() {
  const pendingTxs = await findPendingTransactions()
  await Promise.each(pendingTxs, updatePendingTransaction)
}

if (!module.parent) {
  start()
}
