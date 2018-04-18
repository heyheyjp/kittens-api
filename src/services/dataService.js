import dynamodb from 'dynamodb'
import Joi from 'joi'

dynamodb.AWS.config.update({
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const Transaction = dynamodb.define('Transaction', {
  hashKey: 'transactionHash',
  timestamps: true,
  schema: {
    transactionHash: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
  },
})
