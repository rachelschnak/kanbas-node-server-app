import express from 'express';
import "dotenv/config";
import Hello from './hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentsRoutes from "./assignments/routes.js";
import cors from "cors";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import session from "express-session";

//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING, {dbName: 'kanbas'});

const app = express();

app.use(
    cors({
             credentials: true,
             origin: process.env.FRONTEND_URL
         }) );
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
};
app.use(session(sessionOptions));
app.use(express.json());
app.listen(process.env.PORT || 4000);
ModuleRoutes(app);
Lab5(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Hello(app);
UserRoutes(app);


