var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

module.exports = {

  // //getting content to ipfs. //contenthash = QmTgC2pWbbAfZ5UpRYsLgi62qbcormwnA1QBH2jarFwJ8Z
  get: async (hash) => {
    return ipfs.get(hash)
  },

  //adding content to ipfs
  add: async (data) => {
    return ipfs.add(Buffer.from(data));
  }
}
