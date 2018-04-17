export default `
  # custom types
  type Kitten {
    id: Int!
  }

  type Transaction {
    hash: String!
  }

  # root query, mutation, & subscription
  type RootQuery {
    findKittensForOwner(ownerAddress: String!): [Kitten]
    findTransactionsForAccount(accountAddress: String!): [Transaction]
  }

  type RootMutation {
    trackPendingTransaction(transactionHash: String!): Transaction
  }

  type RootSubscription {
    transactionUpdated(accountId: String!): Transaction
  }

  # final top-level schema
  schema {
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription,
  }
`
