import notifyAccountTransferUpated from './notifyAccountTransferUpdated'
import updateTransfer from '../actions/updateTransfer'
import {getTransaction, getTransactionReceipt} from '../services/contractService'
import {STATUS_PENDING, statusForTransaction, getTransferInputs} from '../utils'

export default (async function updatePendingTransfer(transfer) {
  if (!transfer) {
    throw new Error(`Invalid transfer ${transfer}`)
  }
  const [tx, txReceipt] = await Promise.all([
    getTransaction(transfer.txHash),
    getTransactionReceipt(transfer.txHash),
  ])
  // in case the originally stored values were incorrect pre-tx verification,
  // update these properties based on the actual transaction data
  const updateValues = {
    txHash: transfer.txHash,
  }
  let currentStatus = transfer.status
  if (tx) {
    const transferInputs = getTransferInputs(tx, txReceipt) || {}
    currentStatus = statusForTransaction(tx, txReceipt)
    updateValues.from = tx.from
    updateValues.to = transferInputs.to
    updateValues.kittenId = transferInputs.tokenId
    updateValues.txMeta = tx
    updateValues.txReceiptMeta = txReceipt
    updateValues.status = currentStatus || STATUS_PENDING
  }
  const updatedTransfer = await updateTransfer(updateValues)
  if (currentStatus !== transfer.status) {
    await notifyAccountTransferUpated(updatedTransfer)
  }
  return updatedTransfer
})
