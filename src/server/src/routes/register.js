const MidoDb = require("./../lib/MidoDb");
const Crypto = require("./../lib/Crypto");
const Utils = require("./../lib/Utils");

module.exports = async (req, res, next, baseTable = "users") => {
    /* get the params */
    const data = req.query;

    if (!data || !data.user || !data.password || !data.email || !data['password-confirm'])
        return res.send(Utils.buildResponse(false, "invalid params"));

    const user = data.user;
    let password = Crypto.md5(data.password);
    const passwordConfirm = Crypto.md5(data['password-confirm']);
    const email = data.email.toString();

    if (password !== passwordConfirm) {
        const msg = "Password mismatch";
        return res.send(Utils.buildResponse(false, msg));
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        const msg = "Invalid email address";
        return res.send(Utils.buildResponse(false, msg));
    }
    // attempt to add user to database
    let userFound=false;
    MidoDb.init("mongodb")
        .then(db => {
            const query = {user:user, email:email, password: password};
            MidoDb.selectRecord(baseTable, query).then(record => {
                console.log(record);
                if (record.length && record.length >= 0) {
                    console.log("user found");
                    const msg = "User already exist. Please use another email address or username";
                    MidoDb.closeDb();
                    return res.send(Utils.buildResponse(false, msg));
                }

                if(userFound===false) {
                    // insert our record in the database
                    MidoDb.init("mongodb")
                        .then(db => {
                            // Add this user to the database
                            const insertRecord={user, email, password, status:1};
                            MidoDb.insertRecord(insertRecord, baseTable).then(result=>{
                                if(result.ok!==1)  {
                                    const msg = "Could not complete registration. Please try again";
                                    MidoDb.closeDb();
                                    return res.send(Utils.buildResponse(false, msg));
                                }
                                // registration completed
                                const msg = "Account created. Please wait...";
                                MidoDb.closeDb();
                                return res.send(Utils.buildResponse(true, msg, user, email, result));
                            }).catch(err=>console.log(err.message));
                        }).catch(err=>console.log(err.message));
                }
            })
                .catch(err=>console.log(err.message));
        }).catch(err=>console.log(err));
}