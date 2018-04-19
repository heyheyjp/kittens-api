export {default as Promise} from 'bluebird'

export const STATUS_PENDING = 'PENDING'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_FAILED = 'FAILED'

export function statusForTransaction(tx, txReceipt) {
  if (!tx || typeof tx.blockNumber === 'undefined' || typeof tx.gas === 'undefined') {
    throw new Error('Invalid transaction')
  }
  if (tx.blockNumber === null) {
    return STATUS_PENDING
  }
  if (
    !txReceipt ||
    typeof txReceipt.blockNumber === 'undefined' ||
    typeof txReceipt.gasUsed === 'undefined'
  ) {
    throw new Error(`Invalid transaction receipt: ${txReceipt}`)
  }
  if (tx.gas < txReceipt.gasUsed) {
    return STATUS_SUCCESS
  }
  return STATUS_FAILED
}
