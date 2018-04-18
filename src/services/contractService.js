import Web3 from 'web3'

export const web3 = new Web3(process.env.ETH_NODE_URL)
export const CKContract = web3.eth.contract(JSON.parse(process.env.CK_CONTRACT_ABI))
export const CKContractInstance = CKContract.at(process.env.CK_CONTRACT_ADDRESS)
