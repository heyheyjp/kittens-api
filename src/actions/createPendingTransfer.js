import createTransfer from './createTransfer'
import {CKContractABI, getTransaction, getTransactionReceipt} from '../services/contractService'
import {STATUS_PENDING, statusForTransaction, getTransferInputs} from '../utils'

export default (async function createPendingTransfer(values) {
  const {txHash} = values || {}
  const [tx, txReceipt] = await Promise.all([getTransaction(txHash), getTransactionReceipt(txHash)])

  let txStatus, txFrom, txTo, txKittenId
  if (tx) {
    // might not be available yet on the node we're using
    txFrom = tx.from
    txStatus = statusForTransaction(tx, txReceipt)
    if (txStatus !== STATUS_PENDING) {
      throw new Error(
        `Transaction ${txHash} is no longer in ${STATUS_PENDING}; it has changed to ${txStatus}`,
      )
    }
    const transferInputs = getTransferInputs(CKContractABI, tx) || {}
    txTo = transferInputs.to
    txKittenId = transferInputs.tokenId
  } else {
    txKittenId = values.kittenId
    txFrom = values.from
    txTo = values.to
    txStatus = STATUS_PENDING
  }

  return createTransfer({
    txHash,
    txMeta: tx || null,
    txReceiptMeta: txReceipt || null,
    from: txFrom || null,
    // store address the token was transferred to instead of the "to" address for the tx
    to: txTo || null,
    kittenId: txKittenId || null,
    status: txStatus || STATUS_PENDING,
  })
})
