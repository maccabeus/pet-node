const MidoDb = require("./../lib/MidoDb");
const Utils = require("./../lib/Utils");

module.exports = async (req, res, next, baseTable = "channel_subscription") => {
    /* get the params */
    const data = req.query;
    const session = req.session;

    if (!data || !data['channel-id'])
        return res.send(Utils.buildResponse(false, "invalid params"));

    const channelId = data['channel-id'];
    const channel = data.channel;
    const userId = session.user_id;

    if (!userId || userId === null || userId === undefined)
        return res.send(Utils.buildResponse(false, "Please login first"));

    if (!channel || channel === null || channel === undefined)
        return res.send(Utils.buildResponse(false, "Invalid channel selected"));

    // check if this user is already subscribe to channel
    MidoDb.init("mongodb")
        .then(db => {
            const query = {user_id: userId, channel_id: channelId};
            MidoDb.selectRecord(baseTable, query).then(record => {
                console.log(record);
                if (record.length && record.length >= 0) {
                    const msg = "You are already subscribed";
                    MidoDb.closeDb();
                    return res.send(Utils.buildResponse(false, msg));
                }
                // add subscription
                MidoDb.init("mongodb")
                    .then(db => {
                        const insertRecord = {user_id: userId, channel_id: channelId, channel: channel, status: 1};
                        MidoDb.insertRecord(insertRecord, baseTable).then(result => {
                            if (result.ok !== 1) {
                                const msg = "Could not subscribe. Please try again";
                                MidoDb.closeDb();
                                return res.send(Utils.buildResponse(false, msg));
                            }
                            // registration completed
                            const msg = "You are now subscribed";
                            MidoDb.closeDb();
                            return res.send(Utils.buildResponse(true, msg, null, null, result));

                        }).catch(err => console.log(err.message));

                    }).catch(err => console.log(err.message));
            })
                .catch(err => console.log(err.message));

        }).catch(err => console.log(err));

}