import {Transfer} from '../services/dataService'

export default (async function createTransfer(values) {
  await _checkExists(values)
  return _create(values)
})

async function _checkExists(values) {
  return new Promise((resolve, reject) => {
    if (!values || !values.txHash) {
      reject(new Error('Invalid transaction values'))
    }
    Transfer.get(values.txHash, (err, item) => {
      if (err) {
        return reject(err)
      }
      if (item) {
        return reject(new Error(`Transfer ${values.txHash} already exists`))
      }
      resolve()
    })
  })
}

async function _create(values) {
  return new Promise((resolve, reject) => {
    Transfer.create(values, (err, item) => {
      if (err) reject(err)
      else resolve(item.attrs)
    })
  })
}
