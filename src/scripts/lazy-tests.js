import createTransfer from '../actions/createTransfer'
import updateTransfer from '../actions/updateTransfer'
import findPendingTransfers from '../actions/findPendingTransfers'
import findTransfersForAccount from '../actions/findTransfersForAccount'
import {CKContractABI, getTransaction, getTransactionReceipt} from '../services/contractService'
import {getTransferInputs, statusForTransaction} from '../utils'

export async function create(values) {
  const transfer = await createTransfer(values)
  console.log('new transfer:', transfer)
}

export async function update(values) {
  const transfer = await updateTransfer(values)
  console.log('new transfer:', transfer)
}

export async function find() {
  const pendingTransfers = await findPendingTransfers()
  console.log('pendingTransfers:', pendingTransfers)
}

export async function findForAccount(accountAddress) {
  const accountTransfers = await findTransfersForAccount(accountAddress)
  console.log('accountTransfers:', accountTransfers)
}

export async function getTransactionData(txHash) {
  const [tx, txReceipt] = await Promise.all([getTransaction(txHash), getTransactionReceipt(txHash)])
  const inputs = getTransferInputs(CKContractABI, tx) || {}
  console.log('\n\ntx:', tx)
  console.log('\n\ntxReceipt:', txReceipt)
  console.log(`\n\n
from: ${tx.from}
to: ${inputs.to}
tokenId: ${inputs.to}
status: ${statusForTransaction(tx, txReceipt)}
`)
}

getTransactionData()
  .then(() => {
    console.log('Success!')
    process.exit(0)
  })
  .catch(err => {
    console.log('Oh noes:', err)
    process.exit(1)
  })
