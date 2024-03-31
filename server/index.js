const express = require("express");
const app = express();
const cors = require("cors");
const {connectDB} = require("./db");
const toolsRoute = require("./routes/toolsRoute");
const { register, login, authenticate, logout, authorize } = require("./controllers/auth");
const { getAllCourses, createCourse, getAllEnrolledCourses, getAllCreatedCourses, getAllPublishedCourses, getAuthorDetails } = require('./controllers/explore');
const cookieParser = require("cookie-parser");
const { getCourseBuildDetails, buildCourseStructure, deleteCourse, publishCourse, unPublishCourse } = require("./controllers/course");
const { createPage, deletePage, getPage, updatePageContent } = require("./controllers/page");
const {deleteChapter} = require('./controllers/chapter');
const {deleteModule} = require('./controllers/module');
const {enroll} = require('./controllers/user');

require("dotenv").config();
connectDB();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use("/tools",toolsRoute);
app.post("/register",register);
app.post("/login",login);
app.get("/logout",authenticate,logout);
app.get("/explore",authenticate,getAllPublishedCourses);
app.post("/mycourses/create",authenticate,authorize(['instructor']),createCourse);
app.get("/mycourses/enrolled",authenticate,authorize(['student','instructor']),getAllEnrolledCourses);
app.get("/mycourses/created",authenticate,authorize(['instructor']),getAllCreatedCourses);
app.get("/explore/:course_id",authenticate,getCourseBuildDetails);
app.get("/mycourses/build/:course_id",authenticate,authorize(['instructor']),getCourseBuildDetails);
app.post("/mycourses/build/:course_id",authenticate,authorize(["instructor"]),buildCourseStructure);
app.delete("/mycourses/course/:course_id",authenticate,authorize(['instructor']),deleteCourse);
app.post('/mycourses/edit/pages',authenticate,authorize(['instructor']),createPage);
app.delete('/mycourses/page/:page_id',authenticate,authorize(['instructor']),deletePage);
app.delete('/mycourses/chapter/:chapter_id',authenticate,authorize(['instructor']),deleteChapter);
app.delete('/mycourses/module/:module_id',authenticate,authorize(['instructor']),deleteModule);
app.get('/mycourses/page/:page_id',authenticate,getPage);
app.put('/mycourses/page/:page_id',authenticate,authorize(['instructor']),updatePageContent);
app.get('/explore/author/:course_id',authenticate,getAuthorDetails);
app.get('/enroll/:course_id',authenticate,enroll);
app.put('/mycourses/publish/:course_id',authenticate,authorize(['instructor']),publishCourse);
app.put('/mycourses/unpublish/:course_id',authenticate,authorize(['instructor']),unPublishCourse);

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