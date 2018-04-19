import notifyTransferUpdated from './notifyTransferUpdated'
import contractService from '../services/contractService'
import {Transfer} from '../services/dataService'

export default (async function updatePendingTransfer(tx) {
  const txReceipt = await contractService.getTransactionReceipt(tx.hash)
  const txStatus = _statusForTransactionReceipt(txReceipt)
  if (txStatus !== tx.status) {
    const updatedTransfer = await Transfer.update(tx.id, {status: txStatus})
    await notifyTransferUpdated(updatedTransfer)
  }
})

function _statusForTransactionReceipt(txReceipt) {
  return ''
}
