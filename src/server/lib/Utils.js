
/*
    ------------------------------
    Some utility functions
    ------------------------------
 */
const Utils={
    buildResponse : (status = null, msg = null, user=null, email=null, content = null) => {
        return ({status, msg, user, email, content})
    },

   // buildPath : (path, basePath = "process", delim = "/") => (!path || path === undefined || path === null) ? null : `${delim}${basePath}${delim}${path}`,
    buildPath : (path, basePath = "process", delim = "/") => (!path || path === undefined || path === null) ? null : `${delim}${path}`,

    copyRecordField:(record, copyFromField="_id", copyToField="id")=>{
        return (
            record.map(curRecord=>{
                if(curRecord[copyFromField]) {
                    curRecord[copyToField]= curRecord[copyFromField];
                }
                return curRecord;
            })
        )
    },
}
module.exports=Utils;