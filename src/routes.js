import {Router} from 'express'

import handleFindKittensForOwner from './controllers/handleFindKittensForOwner'
import handleFindTransactionsForAccount from './controllers/handleFindTransactionsForAccount'
import handleTrackTransaction from './controllers/handleTrackTransaction'

const router = new Router()

router.get('/accounts/:accountId/kittens', handleFindKittensForOwner)
router.get('/accounts/:accountId/transactions', handleFindTransactionsForAccount)
router.post('/track-transaction/:transactionHash', handleTrackTransaction) // awkward.

export default router
