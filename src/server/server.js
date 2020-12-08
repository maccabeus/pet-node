/*
    * ================== handles server connections =============
 */
const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const session= require("express-session");
const cors = require("cors");
const path= require("path");

const normalizePort=(port, basePort=9000)=> {
    if (isNaN(port) || port <=0)
        return basePort;
    else
        return parseInt(port);
}
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

app.use(session(sessionConfig));
//-----------------------------------------------

// set cross origin
app.use(cors({
    credentials: false,
    //origin: "http://localhost:3000"
}));

//if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure=false;
    const buildPath=path.join("build");
    app.use(express.static(buildPath));
//}

// api calls router
app.use("/process",routeManager);

// Call any pending react file 
app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,buildPath, "index.html"));
        //res.sendFile(path.resolve(buildPath, "index.html"));
    });

/* handle errors */
app.on("error", (e)=>{
    console.log(e.message);
})

app.listen(port, ()=>{
    console.log(`Server running. Listening on port ${port}`)
});
