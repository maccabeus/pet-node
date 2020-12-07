const MidoDb = require("./../lib/MidoDb");
const Utils = require("./../lib/Utils");

module.exports= async (req, res, next, baseTable="channel_subscription")=>{
    // load all the subscription
    const session= req.session;

    const user =  session.user
    const email =  session.user_email
    const userId = session.user_id;

    if (!userId || userId === null || !email || email === null || !user || user === null )
        return res.send(Utils.buildResponse(false, "Please login first"));

    MidoDb.init("mongodb").then (db=>{
        // load all the channels subscription
        const query={user_id: userId};
        MidoDb.selectRecord(baseTable, query).then (record=>{
            if(!record.length  || record.length  <=0) {
                const msg="No Subscription";
                return res.send(Utils.buildResponse(false, msg ))
            }
            // send message
            const msg="Subscription found";
            // copy _id to id
            record= Utils.copyRecordField(record);
            MidoDb.closeDb();
            return res.send(Utils.buildResponse(true, msg,user,email, record ))
        })
    })
}