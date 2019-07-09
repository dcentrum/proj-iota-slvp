var ipfs = require('./ipfsService.js');
var mam = require('./mamService.js');
var appdb = require('./dbService.js');
var mdb = require('./models');
mam.initialize();

var db = new appdb();
//var mdbam = require('./dbService.js');
module.exports = {
    addChallan: async (platenum, buffer, geoLat, geoLng, desc) => {

        const ipfsResult = await ipfs.addFile(platenum, buffer);
        let mamrec = {
            challandate: new Date(), challanNum: platenum + (new Date().getMilliseconds().toString()),
            platenum: platenum, ipfshash: ipfsResult[0].hash,//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv',
            geoLat: geoLat, geoLng: geoLng, locationName: "", description: desc, isAppealed: null,
            applCmnts: null, isApplAprvd: null, isApplAprvCmnts: null, isPaid: false, challanAmount: 0,
            payTransHash: null
        };
        const mamresult = await mam.publish(mamrec, true);

        const dbchallan = mdb.addChallan(mamrec.challanNum, mamrec.platenum, mamrec.challandate, mamresult.mamMsg.root, mamresult.mamMsg.state.seed, mamrec.ipfshash, desc, geoLat, geoLng);

        console.log(dbchallan);
        return {
            iotaroot: mamresult.mamMsg.root,
            ipfshash: ipfsResult[0].hash//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv'
        };

    },
    getMChallans: async (platenum = "", date = null, isAppealed = null, isPaid = null, func) => {
        try {
            let dbchallans = await mdb.getChallans(platenum, date, isAppealed, isPaid);


            dbchallans.forEach(dbchallan => {
                dbchallan.IOTA_Seed = "";
                //let mesgs = await this.getChannel(dbchallan.IOTA_Hash);
                //dbchallan.message = 'messages[0]';
            });



            // const mamPrevChallan = this.getChannel(dbChallan.IOTA_Hash);
            // let msg = {};
            // mamPrevChallan.messages.forEach(message => {
            //     msg = message;

            // });
            return dbchallans;
        } catch (e) {
            throw `failed to get Challans: ${e}`
            //console.log(e)
        }
        // finally {
        //     //retur
        //     //db.close();
        // }
    },
    ProcessFile: async (platenum, buffer, geoLat, geoLng, desc) => {

        try {
            console.log(Date.now());
            const ipfsResult = await ipfs.addFile(platenum, buffer);
            let mamrec = {
                challandate: new Date(),
                challanNum: platenum + (new Date().getMilliseconds().toString()),
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
            console.log(mamresult)
            db.addChallan(mamrec.challanNum, mamrec.platenum, mamrec.challandate, mamresult.mamMsg.root, mamresult.mamMsg.state.seed, mamrec.ipfshash);
            console.log(mamresult)
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
    getChallans: (platenum = "", date = null, isAppealed = null, isPaid = null, func) => {
        try {
            const result = db.getChallans(platenum, date, isAppealed, isPaid, func);


        } catch (e) {
            throw `failed to get Challans: ${e}`
            //console.log(e)
        }
        // finally {
        //     //retur
        //     //db.close();
        // }
    },
    appealChallan: async (challanNum, commnts) => {
        try {
            const dbChallan = await mdb.getChallan(challanNum);
            console.log(dbChallan);
            const mamPrevChallan =  await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
            console.log(mamPrevChallan);
            let msg = {};
            mamPrevChallan.messages.forEach(message => {
                msg = message;
            });
            msg.isAppealed = true,
            msg.applCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })
            const result = await mdb.appealChallan(challanNum);
            return result;
        } catch (e) {
            throw `failed to get appealChallan: ${e}`
        }
        finally {
            //db.close();
        }
    },
    appealAction: async (challanNum, accept, commnts) => {
        try {
            const dbChallan = await mdb.getChallan(challanNum);
            const mamPrevChallan =  await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
            let msg = {};
            mamPrevChallan.messages.forEach(element => {
                msg = element;

            });
            msg.isApplAprvd = accept,
            msg.isApplAprvCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })

            const result = await mdb.appealAction(challanNum, accept);
            return result;
        } catch (e) {
            throw `failed to get appealAction: ${e}`
        }
        finally {
            //db.close();
        }
    }
}