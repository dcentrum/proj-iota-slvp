const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443' //'http://localhost:14265'
});

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(error => {
        console.log(`Request error: ${error.message}`)
    })