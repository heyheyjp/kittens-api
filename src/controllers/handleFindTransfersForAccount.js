import findTransfersForAccount from '../actions/findTransfersForAccount'

export default (async function handleFindTransfersForAccount(req, res, next) {
  try {
    const {accountId} = req.params
    const transactions = await findTransfersForAccount(accountId)
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
})
