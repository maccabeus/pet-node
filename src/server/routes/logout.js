const Utils = require("./../lib/Utils");

module.exports=async(req, res, next)=>{
    // clear session variables
    const session=req.session;
    session.destroy();
    // notify user
    const msg="Logout successful";
    res.send(Utils.buildResponse(true, msg));
}