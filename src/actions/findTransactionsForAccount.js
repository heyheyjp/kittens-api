import {Transaction} from '../services/dataService'

export default (async function findTransactionsForAccount(accountAddress) {
  const [transactionsFrom, transactionsTo] = await Promise.all([
    _query(accountAddress, 'from-hash-index'),
    _query(accountAddress, 'to-hash-index'),
  ])
  console.log('transactionsFrom:', transactionsFrom)
  return transactionsFrom.concat(transactionsTo)
})

function _query(key, index) {
  return new Promise((resolve, reject) => {
    Transaction.query(key)
      .usingIndex(index)
      .exec((err, data) => {
        if (err) reject(err)
        else resolve(data.Items)
      })
  })
}
