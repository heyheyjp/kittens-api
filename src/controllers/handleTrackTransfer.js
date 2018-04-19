import savePendingTransfer from '../actions/savePendingTransfer'

export default (async function handleTrackTransfer(req, res, next) {
  try {
    const {txHash} = req.params
    const trackedTransfer = await savePendingTransfer(txHash)
    console.log('trackedTransfer:', trackedTransfer)
    res.status(200).json(trackedTransfer)
  } catch (err) {
    next(err)
  }
})
