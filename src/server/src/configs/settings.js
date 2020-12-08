/*
    -------------------------------------------------------------------
    This handles the database connection settings.
    -------------------------------------------------------------------
 */
module.exports={
    default: {
        conn: "mongodb+srv://<user>:<password>@pet.zzomf.mongodb.net/<dbname>?retryWrites=true&w=majority",
        //conn: "mongodb://<user>:<password>@pet-shard-00-00.zzomf.mongodb.net:27017,pet-shard-00-01.zzomf.mongodb.net:27017,pet-shard-00-02.zzomf.mongodb.net:27017/<dbname>?ssl=false&replicaSet=atlas-h5acfx-shard-0&authSource=admin&retryWrites=true&w=majority",
        db: "pet",
        user: "maccabeus",
        password: "JaNVRC8ujlZaSts0",
    },
    // other settings can also be defined for realtime switching
}
