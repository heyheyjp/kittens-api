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
  hashKey: 'txHash',
  timestamps: true,
  schema: {
    txHash: Joi.string().required(),
    txMeta: Joi.object(),
    txReceiptMeta: Joi.object(),
    from: Joi.string().required(),
    to: Joi.string(),
    status: Joi.string().required(),
  },
  indexes: [
    {
      hashKey: 'from',
      rangeKey: 'txHash', // a.k.a. sort key
      name: 'from-txHash-index',
      type: 'global',
    },
    {
      hashKey: 'to',
      rangeKey: 'txHash',
      name: 'to-txHash-index',
      type: 'global',
    },
    {
      hashKey: 'status',
      rangeKey: 'txHash',
      name: 'status-txHash-index',
      type: 'global',
    },
  ],
})
