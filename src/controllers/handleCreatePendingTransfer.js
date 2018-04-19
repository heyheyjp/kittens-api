import createPendingTransfer from '../actions/createPendingTransfer'

export default (async function handleCreatePendingTransfer(req, res, next) {
  try {
    const transfer = await createPendingTransfer(req.body)
    res.status(200).json(transfer)
  } catch (err) {
    next(err)
  }
})
