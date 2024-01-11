const express = require("express");
const app = express();
const cors = require("cors");
const toolsRoute = require("./routes/toolsRoute");

app.use(cors());
app.use(express.json());
app.use("/tools",toolsRoute);

app.use("*", (req, res) => {
    return res.status(404).send("<html><head><title>404</title></head><body><h1>Page Not Found</h1></body></html>");
});

app.listen(1000,()=>{
    console.log("server started at http://localhost:1000");
});