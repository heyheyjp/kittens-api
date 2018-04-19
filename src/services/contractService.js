import Eth from 'web3-eth'

export const eth = new Eth(process.env.ETH_NODE_URL)
export const CKContract = new eth.Contract(
  JSON.parse(process.env.CK_CONTRACT_ABI),
  process.env.CK_CONTRACT_ADDRESS,
)

export function getTransaction(txHash) {
  return new Promise((resolve, reject) => {
    eth.getTransaction(txHash, (err, tx) => {
      if (err) reject(err)
      else resolve(tx)
    })
  })
}

export function getTransactionReceipt(txHash) {
  return new Promise((resolve, reject) => {
    eth.getTransactionReceipt(txHash, (err, txReceipt) => {
      if (err) reject(err)
      else resolve(txReceipt)
    })
  })
}
