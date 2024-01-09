const express = require("express");
const app = express();
const cors = require("cors");
const toolsRoute = require("./routes/toolsRoute");

app.use(cors());
app.use(express.json());
app.use("/tools",toolsRoute);

app.listen(1000,()=>{
    console.log("server started at http://localhost:1000");
});