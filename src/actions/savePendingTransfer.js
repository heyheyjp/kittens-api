import createTransfer from './createTransfer'
import {getTransaction, getTransactionReceipt} from '../services/contractService'
import {STATUS_PENDING, statusForTransactionReceipt, getToAddressFromTransaction} from '../utils'

export default (async function savePendingTransfer(txHash) {
  console.log('savePendingTransfer:', txHash)
  const [tx, txReceipt] = await Promise([getTransaction(txHash), getTransactionReceipt(txHash)])
  const txStatus = statusForTransactionReceipt(tx, txReceipt)
  console.log('txStatus:', txStatus)
  if (txStatus !== STATUS_PENDING) {
    throw new Error(`Transfer ${txHash} is not ${STATUS_PENDING}; it is ${txStatus}`)
  }
  return createTransfer({
    txHash,
    txMeta: tx,
    txReceiptMeta: txReceipt || null,
    from: tx.from,
    // store address the token was transferred to instead of the "to" address for the tx
    to: getToAddressFromTransaction(tx),
    status: txStatus || null,
  })
})
