import {Transfer} from '../services/dataService'

export default function updateTransfer(values) {
  return new Promise((resolve, reject) => {
    Transfer.update(values, (err, item) => {
      if (err) reject(err)
      else resolve(item.attrs)
    })
  })
}
