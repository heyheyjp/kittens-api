import savePendingTransfer from '../actions/savePendingTransfer'

export default (async function handleTrackTransfer(req, res, next) {
  try {
    const {transactionHash} = req.params
    const trackedTransfer = await savePendingTransfer(transactionHash)
    res.status(200).json(trackedTransfer)
  } catch (err) {
    next(err)
  }
})
