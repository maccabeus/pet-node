const crypto= require("crypto");

const Crypto={
    /*
        * Create an MD5 hash of string
     */
    md5: (string, encoding="hex")=>{
        return crypto.createHash('md5').update(string).digest(encoding).toString();
    },

}

module.exports=Crypto;