import express from 'express';
import "dotenv/config";
//import session from "express-session";
import Hello from './hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentsRoutes from "./assignments/routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
Lab5(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Hello(app)
//app.listen(4000)
app.listen(process.env.PORT || 4000);
