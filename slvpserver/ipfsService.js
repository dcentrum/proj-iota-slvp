'use strict'


// const node = new IPFS()

// node.on('ready', function(){
//   node.version(function(version)  {
//     console.log('Version:', version.version)

//   });


//   const filesAdded = await node.add({
//     path: 'hello.txt',
//     content: Buffer.from('Hello World 101')
//   })

//   console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

//   const fileBuffer = await node.cat(filesAdded[0].hash)

//   console.log('Added file contents:', fileBuffer.toString())
//})

// ipfs.on('ready', () => {
//   ipfs.version((err, version) => {
//     if (err) {
//       throw err
//     }
//     console.log(version)
//   })
// })


var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

module.exports = {
  // //getting content to ipfs. //contenthash = QmTgC2pWbbAfZ5UpRYsLgi62qbcormwnA1QBH2jarFwJ8Z
  //adding content to ipfs
  add: async (data) => {
    return ipfs.add(Buffer.from(data));
  },
  get: async (hash) => {
    return ipfs.get(hash)
  },
  addFile: async (path, value) => {
    return ipfs.files.write('/' + path, value, { create: true })
        // return ipfs.add({path:path, content: value});
  },
  getFile: async (hash) => {
    const fileBuffer = await this.ipfs.files.cat(hash);
    console.log(fileBuffer.toString());
  }
}
