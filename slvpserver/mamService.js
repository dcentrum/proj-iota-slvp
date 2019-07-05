const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');



module.exports = {
    mamState: {},
    seed: "",
    initialize: () => {
        if (this.seed.length > 0)
            this.mamState = Mam.init({ provider: 'https://nodes.devnet.iota.org:443' }, this.seed, null);
        else {
            this.mamState = Mam.init({ provider: 'https://nodes.devnet.iota.org:443' });
        }
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
            for (let i = 0; i < resp.messages.length; i++) {
                resp.messages[i] = trytesToAscii(resp.messages[i]);
            }
            return resp;
        } catch (error) {
            console.log('MAM publish error', error);
            return null;
        }
    },
    updateChannel = async (data, prevData) => {

        const mamState = {
            subscribed: [],
            channel: {
                side_key: null, mode: 'public', next_root: null, security: 2,
                start: prevData.start, count: 1, next_count: 1, index: 0,
            },
            seed: prevData.seed,
        };
        try {
            this.updateMamState(mamState);
            const mamData = await this.publish(data, true);
            return mamData;
        } catch (error) {
            console.log('MAM append error', error);
            return null;
        }
    }

}