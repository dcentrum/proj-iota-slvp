var ipfs = require('./ipfsService.js');
var mam = require('./mamService.js');
var db = require('./dbService.js');
mam.initialize();
//var mdbam = require('./dbService.js');
module.exports = {
    ProcessFile: async (platenum, buffer, geoLat, geoLng, desc) => {
        try {
            const ipfsResult = await ipfs.addFile(platenum, buffer);
            let mamrec = {
                challandate: Date().now(),
                challanNum: platenum + Date.now().getMilliseconds().toString(),
                platenum: platenum,
                ipfshash: ipfsResult[0].hash,//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv',
                geoLat: geoLat,
                geoLng: geoLng,
                locationName: "",
                description: desc,
                isAppealed: null,
                applCmnts: null,
                isApplAprvd: null,
                isApplAprvCmnts: null,
                isPaid: false,
                challanAmount: 0,
                payTransHash: null
            };
            const mamresult = await mam.publish(mamrec, true);
            await db.addChallan(mamrec.challanNum, mamrec.platenum, mamrec.challandate, mamresult.mamMsg.root, mamresult.mamMsg.state.seed, mamrec.ipfshash);
            return {
                iotaroot: mamresult.mamMsg.root,
                ipfshash: ipfsResult[0].hash//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv'
            };
        } catch (e) {
            throw `failed to Process File: ${e}`
        }
    },
    getImage: async (hash) => {
        try {
            const result = await ipfs.get(hash);
            return new Buffer(result[0].content, 'base64');
        } catch (e) {
            throw `failed to get file: ${e}`
        }
    },
    getChannel: async (root) => {
        try {
            const result = await mam.fetch(root);
            return result;
        } catch (e) {
            throw `failed to get Channel: ${e}`
        }
    },
    getChallans: async (platenum = "", date = null, isAppealed = null, isPaid = null) => {
        try {
            const result = await db.getChallans(platenum, date, isAppealed, isPaid);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    },
    appealChallan: async (challanNum, commnts) => {
        try {
            const dbChallan = await db.getChallan(challanNum);
            const mamPrevChallan = this.getChannel(challan.IOTA_Hash);
            let msg = {};
            mamPrevChallan.messages.forEach(element => {
                msg = element;

            });
            msg.isAppealed = true,
                msg.applCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })
            const result = await db.appealChallan(challanNum, mamres.mamMsg.root);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    },
    appealAction: async (challanNum, accept, commnts) => {
        try {
            const dbChallan = await db.getChallan(challanNum);
            const mamPrevChallan = this.getChannel(challan.IOTA_Hash);
            let msg = {};
            mamPrevChallan.messages.forEach(element => {
                msg = element;

            });
            msg.isApplAprvd = accept,
                msg.isApplAprvCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })

            const result = await db.appealAction(challanNum, accept, mamres.mamMsg.root);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    }
}