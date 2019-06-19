var ipfs = require('./ipfsService.js');
var mam = require('./mamService.js');
//var mdbam = require('./dbService.js');
module.exports = {
    ProcessFile: async (platenum, buffer, geoLat, geoLng, desc) => {
        try {
            //const ipfsResult = await ipfs.addFile(platenum, buffer);
            let mamrec = {
                challandate: Date.now(),
                platenum: platenum,
                ipfshash: 'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv',//ipfsResult[0].hash
                geoLat: geoLat,
                geoLng: geoLng,
                description: desc,
                isAppealed: false,
                applCmnts: "",
                isApplAprvd: false,
                isApplAprvCmnts: "",
                isPaid: false,
                payTransHash: ""
            };
            const mamresult = await mam.publish(mamrec, true);
            //console.log(mamresult);
            return {
                iotaroot: mamresult.mamMsg.root,
                ipfshash: 'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv'//ipfsResult[0].hash
            };
        } catch (e) {
            throw `failed to Process File: ${e}`
        }

    }
}