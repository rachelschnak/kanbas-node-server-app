import db from "../Database/index.js";

function AssignmentsRoutes(app) {
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === aid);
        if (assignmentIndex === -1) {
            res.status(404).send("Assignment not found");
            return;
        }
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };

        const assignment = req.body;
        //db.assignments = db.assignments.map((a) => a._id === id ? {...a, ...assignment} : a);

        res.sendStatus(assignment);
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const {aid} = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);
    });

    app.get("/api/assignments", (req, res) => {
        const assignments = db.assignments;
        res.json(assignments);
    });

    app.get("/api/assignments/:aid", (req, res) => {
        const {aid} = req.params;
        const assignments = db.assignments.filter((a) => a._id === aid );
        res.json(assignments);
    });

};
export default AssignmentsRoutes;