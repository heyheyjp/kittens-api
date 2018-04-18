import dynamodb from 'dynamodb'
import Joi from 'joi'

dynamodb.AWS.config.update({
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const Transaction = dynamodb.define('Transaction', {
  tableName: process.env.DYNAMODB_TABLE_TRANSACTIONS,
  hashKey: 'hash',
  timestamps: true,
  schema: {
    hash: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string(),
    status: Joi.string().required(),
    blockNumber: Joi.number(),
  },
  indexes: [
    {
      hashKey: 'from',
      rangeKey: 'hash', // aka sort key
      name: 'from-hash-index',
      type: 'global',
    },
    {
      hashKey: 'to',
      rangeKey: 'hash',
      name: 'to-hash-index',
      type: 'global',
    },
  ],
})
