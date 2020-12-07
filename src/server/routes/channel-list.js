const MidoDb = require("./../lib/MidoDb");
const Utils = require("./../lib/Utils");

module.exports= async (req, res, next, baseTable="channels")=>{
    // load all the
    MidoDb.init("mongodb").then (db=>{
        // load all the channels
        MidoDb.selectRecord(baseTable, {}).then (record=>{
            if(!record.length  || record.length  <=0) {
                const msg="No Channel available";
                return res.send(Utils.buildResponse(false, msg ))
            }
            // send message
            const msg="Channels found";
            // switch _id for id
            record= Utils.copyRecordField(record);
            return res.send(Utils.buildResponse(true, msg,null,null, record ))
        })
    })
}