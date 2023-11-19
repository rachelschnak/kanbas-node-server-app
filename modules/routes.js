import db from "../Database/index.js";
function ModuleRoutes(app) {
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        if (moduleIndex === -1) {
            res.status(404).send("Module not found");
            return;
        }

        //db.modules = db.modules.map((m) => m._id === mid ? {...m, ...module} : m);
        console.log(moduleIndex);

        db.modules[moduleIndex] = {
            ...db.modules[moduleIndex],
            ...req.body
        };
        const module = req.body;
        res.send(module);
    });

    app.delete("/api/modules/:mid", (req, res) => {
        const {mid} = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    app.post("/api/courses/:cid/modules", (req, res) => {
        const {cid} = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });

    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules
            .filter((m) => m.course === cid);
        res.send(modules);
    });

    app.get("/api/modules", (req, res) => {
        const modules = db.modules;
        res.json(modules);
    });

    app.get("/api/modules/:mid", (req, res) => {
        const {mid} = req.params;
        const modules = db.modules.filter((m) => m._id === mid);
        res.json(modules);
    });

}
export default ModuleRoutes;