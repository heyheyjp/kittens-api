import savePendingTransaction from '../actions/savePendingTransaction'

export default (async function handleTrackTransaction(req, res, next) {
  try {
    const {transactionHash} = req.params
    const trackedTransaction = await savePendingTransaction(transactionHash)
    res.status(200).json(trackedTransaction)
  } catch (err) {
    next(err)
  }
})
