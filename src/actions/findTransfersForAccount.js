import {Transfer} from '../services/dataService'

export default (async function findTransfersForAccount(accountAddress) {
  const [transfersFrom, transfersTo] = await Promise.all([
    _query(accountAddress, 'from-txHash-index'),
    _query(accountAddress, 'to-txHash-index'),
  ])
  return transfersFrom.concat(transfersTo)
})

function _query(key, index) {
  return new Promise((resolve, reject) => {
    Transfer.query(key)
      .usingIndex(index)
      .exec((err, data) => {
        if (err) reject(err)
        else resolve(data.Items.map(item => item.attrs))
      })
  })
}
