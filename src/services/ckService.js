/**
 * The CK contract function tokensOwnedBy does not seem
 * to be properly functional, so we attempt to query for
 * the tokens owned by an account via the CK web service API.
 */
import axios from 'axios'

export async function findKittensForOwner(ownerAddress) {
  const url = `${process.env.CK_URL}/kitties`
  const options = {
    params: {
      owner_wallet_address: ownerAddress,
      parents: false,
      orderBy: 'id',
      orderDirection: 'desc',
    },
  }
  const result = await axios.get(url, options)
  return result.data.kitties || []
}
