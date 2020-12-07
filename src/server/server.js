/*
    * ================== handles server connections =============
 */
const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const session= require("express-session");
const cors = require("cors");
const path= require("path");

const normalizePort=(port, basePort=9000)=>(isNaN(port) || port <=0) ? basePort : parseInt(port);
const  port=  normalizePort(process.env.PORT);
/* import route manager to handle routing */
const routeManager= require("./routes/routeManager");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// manage session ------------------------
const sessionConfig={
    cookie:{},
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}
if (app.get("env")==="production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure=false;
    const buildPath=path.join(__dirname, "build");
    app.use(express.static(buildPath));
}
app.use(session(sessionConfig));
//-----------------------------------------------

// set cross origin
app.use(cors({
    credentials: false,
    origin: "http://localhost:3000"
    }));

app.use("/", routeManager);

/* handle errors */
app.on("error", (e)=>{
    console.log(e.message);
})

app.listen(port, ()=>{
    console.log(`Server running. Listening on port ${port}`)
});