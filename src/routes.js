import {Router} from 'express'

import handleFindKittensForOwner from './controllers/handleFindKittensForOwner'
import handleFindTransfersForAccount from './controllers/handleFindTransfersForAccount'
import handleTrackTransfer from './controllers/handleTrackTransfer'

const router = new Router()

router.get('/accounts/:accountId/kittens', handleFindKittensForOwner)
router.get('/accounts/:accountId/transfers', handleFindTransfersForAccount)
router.post('/transfers/:txHash/track', handleTrackTransfer) // awkward.

export default router
