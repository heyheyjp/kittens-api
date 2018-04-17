import findKittensForOwner from '../actions/findKittensForOwner'
import findTransactionsForAccount from '../actions/findTransactionsForAccount'
import savePendingTransaction from '../actions/savePendingTransaction'

export default {
  RootQuery: {
    findKittensForOwner: (rootValue, {ownerAddress}) => findKittensForOwner(ownerAddress),
    findTransactionsForAccount: (rootValue, {accountAddress}) =>
      findTransactionsForAccount(accountAddress),
  },

  RootMutation: {
    trackPendingTransaction: (rootValue, {transactionHash}) =>
      savePendingTransaction(transactionHash),
  },

  // RootSubscription: {
  //   transactionUpdated: () => {
  //   },
  // },
}
