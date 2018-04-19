export default function notifyTransferStatusUpated(transfer) {
  const accounts = [transfer.from, transfer.to]
  return Promise.each(accounts, account => {
    // notify
  })
}
