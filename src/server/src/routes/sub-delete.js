const MidoDb = require("./../lib/MidoDb");
const Utils = require("./../lib/Utils");

module.exports = async (req, res, next, baseTable="channel_subscription") => {
    const data= req.query;
    if(!data || !data['channel-id'] || !data['user-id'])
        return res.send(Utils.buildResponse(false, "Missing params"));

    const userId =  data['user-id'];
    const channelId =  data['channel-id'];
    const query={user_id:userId, channel_id: channelId};

    MidoDb.init("mongodb").then(db=>{
        MidoDb.deleteRecord(baseTable, query)
            .then(result=>{
                if(result.deletedCount < 1) {
                    const msg="Could not unsubscribed";
                    MidoDb.closeDb();
                    return res.send(Utils.buildResponse(false, msg));
                }
                // done
                const msg="You are now unsubscribed";
                MidoDb.closeDb();
                return res.send(Utils.buildResponse(true, msg));
            })
    })
}