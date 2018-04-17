export default function notifyTransactionStatusUpated(transaction) {
  const accounts = [transaction.from, transaction.to]
  return Promise.each(accounts, account => {
    // notify
  })
}
