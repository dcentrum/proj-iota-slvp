var ipfs = require('./ipfsService.js');
var mam = require('./mamService.js');
var db = require('./dbService.js');
mam.initialize();
//var mdbam = require('./dbService.js');
module.exports = {
    ProcessFile: async (platenum, buffer, geoLat, geoLng, desc) => {
        try {
            //const ipfsResult = await ipfs.addFile(platenum, buffer);
            let mamrec = {
                challandate: Date().now(),
                challanNum: platenum + Date.now().getMilliseconds().toString(),
                platenum: platenum,
                ipfshash: 'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv',//ipfsResult[0].hash
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
            await db.addChallan(mamresult, mamresult.mamMsg.root);
            return {
                iotaroot: mamresult.mamMsg.root,
                ipfshash: 'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv'//ipfsResult[0].hash
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
    getChallans: async (platenum, date = null, isAppealed = false, isPaid = false) => {
        try {
            const result = await db.getChallans(platenum, date, isAppealed, isPaid);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    },
    appealChallan: async (platenum, challanNum, commnts) => {
        try {
            const result = await db.appealChallan(platenum, challanNum, commnts);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    },
    appealAction: async (platenum, challanNum, accept, commnts) => {
        try {
            const result = await db.appealAction(platenum, challanNum, accept, commnts);
            return result;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    }
}