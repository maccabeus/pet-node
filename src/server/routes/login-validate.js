const Utils = require("./../lib/Utils");
module.exports=async(req, res, next)=>{
    // clear session variables
    const session=req.session;
    const user=session.user;
    const userId=session.user_id;
    const email=session.email;
    console.log(session);

    // notify user
    if(!user|| !userId || !email) {
        const msg="Please login first";
        res.send(Utils.buildResponse(false, msg));
    } else {
        // user is logged in
        const msg=`You are logged in ${user}`;
        res.send(Utils.buildResponse(true, msg));
    }
}