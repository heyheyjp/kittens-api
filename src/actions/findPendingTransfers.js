import {Transfer} from '../services/dataService'
import {STATUS_PENDING} from '../utils'

export default function findPendingTransfers() {
  return new Promise((resolve, reject) => {
    Transfer.query(STATUS_PENDING)
      .usingIndex('status-txHash-index')
      .exec((err, data) => {
        if (err) reject(err)
        else resolve(data.Items.map(item => item.attrs))
      })
  })
}
