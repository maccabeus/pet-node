const Mocha = require("mocha");
const assert= require("assert").strict;
const {expect} = require("chai");

const sub= require("./../src/server/routes/sub");

// define test
describe("Route Manager Test group", ()=>{

    beforeEach(()=>{
        // define global variable for test
        let req={
            query:{},
            session:{user_id:"testuserlid9090984566655",}
        };
        req.query['channel']="Test Channel";
        req.query['channel-id']="testchannelid9090984566655";

        let res={
            send:(content)=>content,
        };
        let next=()=>null;
    })

    // define test
    it("Subscription Update Test", async (done, req, res, next)=>{
        this.timeout(10000);
        // we will user a test table equivalent to test
        // this will be both unit and integration test
        const baseTable="test_channel_subscription";
        let result= await sub(req, res, next, baseTable);
        result=JSON.parse(result);
        expect(result).to.have.own.property("status");
        expect(result).to.have.own.property("msg");
        expect(result.status).to.be.deep.equal(true);
        done();

    })
})
