import Promise from 'bluebird'

import findPendingTransactions from './actions/findPendingTransactions'
import updatePendingTransaction from './actions/updatePendingTransaction'

export default function start() {
  setInterval(_updatePendingTransactions, 5000)
}

async function _updatePendingTransactions() {
  const pendingTxs = await findPendingTransactions()
  await Promise.each(pendingTxs, updatePendingTransaction)
}

if (!module.parent) {
  start()
}
