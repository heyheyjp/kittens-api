import {Router} from 'express'

import handleFindKittensForOwner from './controllers/handleFindKittensForOwner'
import handleFindTransfersForAccount from './controllers/handleFindTransfersForAccount'
import handleCreatePendingTransfer from './controllers/handleCreatePendingTransfer'

const router = new Router()

router.get('/accounts/:accountId/kittens', handleFindKittensForOwner)
router.get('/accounts/:accountId/transfers', handleFindTransfersForAccount)
router.post('/pending-transfers', handleCreatePendingTransfer)

export default router
