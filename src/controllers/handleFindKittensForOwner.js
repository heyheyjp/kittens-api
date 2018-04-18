import {findKittensForOwner} from '../services/ckService'

export default (async function handleFindKittensForOwner(req, res, next) {
  try {
    const {accountId} = req.params
    const kittens = await findKittensForOwner(accountId)
    res.status(200).json(kittens)
  } catch (err) {
    next(err)
  }
})
