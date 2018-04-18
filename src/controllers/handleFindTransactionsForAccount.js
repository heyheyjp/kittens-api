import findTransactionsForAccount from '../actions/findTransactionsForAccount'

export default (async function handleFindTransactionsForAccount(req, res, next) {
  try {
    const {accountId} = req.params
    const transactions = await findTransactionsForAccount(accountId)
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
})
