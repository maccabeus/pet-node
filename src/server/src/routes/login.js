const MidoDb = require("./../lib/MidoDb");
const Crypto = require("./../lib/Crypto");
const Utils = require("./../lib/Utils");

module.exports = async (req, res, next, baseTable = "users") => {
    /* get the params */
    const data = req.query;
    if (!data || !data.user || !data.password)
        return res.send(Utils.buildResponse(false, "invalid params"));

    let session = req.session;

    const password = Crypto.md5(data.password);
    const user = data.user;

    MidoDb.init("mongodb")
        .then(db => {
            const query = {user: user, password: password};
            //const query={};
            MidoDb.selectRecord(baseTable, query).then(record => {
                if (!record.length || record.length === 0) {
                    const msg = "Invalid login details";
                    return res.send(Utils.buildResponse(false, msg));
                }
                // check if this is an active user
                const user = record[0];
                if (user.status !== 1) {
                    const msg = `Account has been deactivated ${user.user}. Please contact admin`;
                    return res.send(Utils.buildResponse(false, msg));
                }
                // say user is login
                const msg = `Welcome ${user.user}`;
                session.user=user.user;
                session.user_email=user.email;
                session.user_id=user._id;
                return res.send(Utils.buildResponse(true, msg, user.user, user.email));

            }).catch(err => console.log(err.message));

        }).catch(err => console.log(err.message));
}