/*
    This file create the database object for connection
 */
const settings = require("./../configs/settings");
const assert = require("assert");

const MidoDb = {

    // define private properties
    baseDbType: "mongoDb",
    baseConn: null,
    dbType: null,
    db: null,
    dbConfigIndex: null,
    dbClient: null,
    conn: null,
    connUri: null,

    /* add supported db to an array of supported db types */
    supportedDb : ["mongodb"],

    /*
        * This method initialize the Database connector
     */
    //init: async (dbType = null, config="default", conn = null) => {
    init: (dbType = null, config = "default", conn = null) => new Promise(async (resolve, reject) => {
        {
            /* init parameters */
            this.dbType = dbType !== null ? dbType.toLowerCase() : this.baseDbType.toLowerCase();

            /* check if we support the connection type selected */
            if (MidoDb.supportedDb.indexOf(this.dbType) === -1)
                return ({status: false, msg: "Database type not supported", content: null});

            if (conn === null) {
                // attempt to use connection defined in the settings
                if (!settings.default || !settings.default.conn)
                    return ({status: false, msg: "You must provide connection string", content: null});

                /* if all is well and fine, create the connection */
                const validDbType = this.dbType.toLowerCase();
                /* create support for multiple database type in the future */
                if (validDbType == "mongodb") {
                    /* build our connection string using the details in settings */
                    const MongoClient = require('mongodb').MongoClient;

                    const dbUser = settings[config].user;
                    const password = settings[config].password;
                    const db = settings[config].db;
                    const conn = settings[config].conn;

                    /* build the full uri for our database calls */
                    const uri = conn.replace("<user>", dbUser)
                        .replace("<password>", password)
                        .replace("<dbname>", db);

                    console.log(uri);
                    const client = new MongoClient(uri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        keepAlive: 1,
                    });
                    // set the valid db name before we move on to next
                    MidoDb.db = db;
                    MidoDb.dbConfigIndex = config;
                    MidoDb.connUri = uri;
                    // connect client
                    await client.connect(err => {
                        if (err) {
                            reject(err.message);
                        }
                        MidoDb.dbClient = client;
                        resolve(client);
                    });
                } else {
                    const msg = "not a valid connection call";
                    console.log(msg);
                    reject({status: false, msg: msg, content: null});
                }
            }
        }
    }),

    closeDb: () => {
        MidoDb.dbClient.close();
        MidoDb.dbClient = null;
    },

    openTable: (client, dbName, baseTable) => new Promise(async (resolve, reject) => {
        {
            /* create a table for connection */
            const table = await client.db(dbName).collection(baseTable);
            if (!table)
                reject("error")
            resolve(table);
        }
    }),
    selectRecord: async (baseTable, query, project = false, projections = {}, limit = 0) => new Promise(async (resolve, reject) => {
        MidoDb.openTable(MidoDb.dbClient, MidoDb.getDbName(), baseTable)
            .then(async curCollection => {
                if (project === true) {
                    await curCollection.find(query)
                        .project(projections)
                        .limit(limit)
                        .toArray((err, result) => {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(result);
                        });
                } else {
                    await curCollection.find(query)
                        .limit(limit)
                        .toArray((err, result) => {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(result);
                        });
                }
            })
            .catch(err => reject(err));
    }),

    insertRecord: async (insertRecord, baseTable, insertMany = false) => new Promise(async (resolve, reject) => {
        await MidoDb.openTable(MidoDb.dbClient, MidoDb.getDbName(), baseTable)
            .then(async curCollection => {
                if (insertMany === false) {
                    curCollection.insertOne(insertRecord)
                        .then(result => resolve(result.result))
                        .catch(err => reject(err))
                }
            })
            .catch(err => reject(err));
    }),

    deleteRecord: async (baseTable, query, insertMany = false) => new Promise(async (resolve, reject) => {
        await MidoDb.openTable(MidoDb.dbClient, MidoDb.getDbName(), baseTable)
            .then(async curCollection => {
                if (insertMany === false) {
                    curCollection.deleteOne(query)
                        .then(result => resolve(result))
                        .catch(err => reject(err))
                }
            })
            .catch(err => reject(err));
    }),

    /*
        ------------------------------------------------------------------------------
                                    The get functions
        ------------------------------------------------------------------------------
     */
    getDbName: () => MidoDb.db,
    getConnUri: () => MidoDb.connUri,
}

module.exports = MidoDb;