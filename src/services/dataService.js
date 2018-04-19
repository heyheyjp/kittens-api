import dynamodb from 'dynamodb'
import Joi from 'joi'

dynamodb.AWS.config.update({
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const Transfer = dynamodb.define('Transfer', {
  tableName: process.env.DYNAMODB_TABLE_TRANSFERS,
  hashKey: 'hash',
  timestamps: true,
  schema: {
    transactionHash: Joi.string().required(),
    transactionMeta: Joi.object(),
    from: Joi.string().required(),
    to: Joi.string(),
    status: Joi.string().required(),
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
