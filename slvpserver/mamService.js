const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');



module.exports = {
    mamState: {},
    initialize: () => {
        this.mamState = Mam.init({ provider: 'https://nodes.devnet.iota.org:443' });
    },
    updateMamState: (newMamState) => { this.mamState = newMamState },
    // Publish to tangle
    publish: async (data, isJSON) => {
        try {
            const trytes = asciiToTrytes(isJSON ? JSON.stringify(data) : data);
            const message = Mam.create(this.mamState, trytes);
            this.mamState = message.state;
            let attachResult = await Mam.attach(message.payload, message.address);
            return { transArr: attachResult, mamMsg: message, mamState: this.mamState };
        } catch (error) {
            console.log('MAM publish error', error);
            return null;
        }
    },
    fetch: async (root, key = "") => {
        try {
            var resp = await Mam.fetch(root,
                (key.length > 0 ? 'restricted' : 'public'), (key.length == 0 ? null : key));
                console.log(resp);
                for(let i=0;i<resp.messages.length;i++)
                {
                    resp.messages[i] = trytesToAscii(resp.messages[i]);
                }
            return resp;
        } catch (error) {
            console.log('MAM publish error', error);
            return null;
        }
    }
}