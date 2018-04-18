/**
 * The CK contract function tokensOwnedBy does not seem
 * to be properly functional, so we attempt to query for
 * the tokens owned by an account via the CK web service API.
 */
import axios from 'axios'

export function findKittensForOwner(ownerAddress) {
  const url = `${process.env.CK_URL}/kitties`
  return axios.get(url, {
    params: {
      owner_wallet_address: ownerAddress,
      // parents: false,
      orderBy: 'id',
      orderDirection: 'desc',
    },
  })
}
