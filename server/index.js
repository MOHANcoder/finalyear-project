const express = require("express");
const app = express();
const cors = require("cors");
const {connectDB} = require("./db");
const toolsRoute = require("./routes/toolsRoute");
const { register, login, authenticate, logout, authorize } = require("./controllers/auth");
const { getAllCourses, createCourse, getAllEnrolledCourses, getAllCreatedCourses } = require('./controllers/explore');
const cookieParser = require("cookie-parser");
const { getCourseBuildDetails, buildCourseStructure, deleteCourse } = require("./controllers/course");
const { createPage } = require("./controllers/page");

require("dotenv").config();
connectDB();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/tools",toolsRoute);
app.post("/register",register);
app.post("/login",login);
app.get("/logout",authenticate,logout);
app.get("/explore",authenticate,getAllCourses);
app.post("/mycourses/create",authenticate,authorize(['instructor']),createCourse);
app.get("/mycourses/enrolled",authenticate,authorize(['student']),getAllEnrolledCourses);
app.get("/mycourses/created",authenticate,authorize(['instructor']),getAllCreatedCourses);
app.get("/mycourses/build/:course_id",authenticate,authorize(['instructor']),getCourseBuildDetails);
app.post("/mycourses/build/:course_id",authenticate,authorize(["instructor"]),buildCourseStructure);
app.get("/mycourses/del/:course_id",authenticate,authorize(['instructor']),deleteCourse);
app.post('/mycourses/edit/pages',authenticate,authorize(['instructor']),createPage);
app.use("*", (req, res) => {
    return res.status(404).send("<html><head><title>404</title></head><body><h1>Page Not Found</h1></body></html>");
});

app.use((error,req,res,next) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Internal Server Error.";
    res.status(status).json({
        error:{message}
    });
});

app.listen(1000,()=>{
    console.log("server started at http://localhost:1000");
});