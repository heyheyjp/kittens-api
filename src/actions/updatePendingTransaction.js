import notifyTransactionUpdated from './notifyTransactionUpdated'
import contractService from '../services/contractService'
import {Transaction} from '../services/dataService'

export default (async function updatePendingTransaction(tx) {
  const txReceipt = await contractService.getTransactionReceipt(tx.hash)
  const txStatus = _statusForTransactionReceipt(txReceipt)
  if (txStatus !== tx.status) {
    await Transaction.update(tx.id, {status: txStatus})
    await notifyTransactionUpdated()
  }
})

function _statusForTransactionReceipt(txReceipt) {
  return ''
}
