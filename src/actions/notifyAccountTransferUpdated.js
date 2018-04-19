import {Promise} from '../utils'
import {notify} from '../services/notificationService'

export default function notifyAccountTransferUpdated(transfer) {
  const accountAddresses = [transfer.from, transfer.to]
  return Promise.each(accountAddresses, accountAddress => {
    if (accountAddress) {
      console.log('notifying:', `accountTransferUpdated-${accountAddress}`)
      notify(`accountTransferUpdated-${accountAddress}`, transfer)
    }
  })
}
