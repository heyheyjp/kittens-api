import InputDecoder from 'ethereum-input-data-decoder'
export {default as Promise} from 'bluebird'

export const STATUS_PENDING = 'PENDING'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_FAILED = 'FAILED'

export function statusForTransaction(tx, txReceipt) {
  if (!tx) {
    return null
  }
  if (tx.blockNumber == null) {
    return STATUS_PENDING
  }
  if (!txReceipt) {
    throw new Error(`Invalid transaction receipt: ${txReceipt}`)
  }
  if (
    txReceipt &&
    !isNaN(txReceipt.blockNumber) &&
    !isNaN(txReceipt.gasUsed) &&
    !isNaN(tx.gas) &&
    txReceipt.gasUsed < tx.gas
  ) {
    return STATUS_SUCCESS
  }

  return STATUS_FAILED
}

export function getTransferInputs(contractABI, tx) {
  if (!contractABI || !tx) {
    throw new Error('Must provide contract ABI and transaction')
  }
  if (!tx.input) {
    return null
  }
  const decoder = new InputDecoder(contractABI)
  const {inputs} = decoder.decodeData(tx.input)
  if (!Array.isArray(inputs) || inputs.length !== 2) {
    return null
  }
  let to = String(inputs[0])
  if (!to.startsWith('0x')) {
    to = `0x${to}`
  }
  return {
    to,
    tokenId: parseInt(inputs[1], 10), // big number => integer
  }
}
