import notifyTransferUpdated from './notifyTransferUpdated'
import updateTransfer from '../actions/updateTransfer'
import {getTransaction, getTransactionReceipt} from '../services/contractService'
import {statusForTransaction} from '../utils'

export default (async function updatePendingTransfer(transfer) {
  if (!transfer) {
    throw new Error(`Invalid transfer ${transfer}`)
  }
  const [tx, txReceipt] = await Promise.all([
    getTransaction(transfer.txHash),
    getTransactionReceipt(transfer.txHash),
  ])
  const txStatus = statusForTransaction(tx, txReceipt)
  if (txStatus !== transfer.status) {
    const updatedTransfer = await updateTransfer({
      txHash: transfer.txHash,
      status: txStatus,
    })
    await notifyTransferUpdated(updatedTransfer)
    return updatedTransfer
  }
})
