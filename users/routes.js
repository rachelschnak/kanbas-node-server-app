import * as dao from "./dao.js";


//let currentUser = null;
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const {username, password, firstName, lastName, role} = req.params;
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const id = req.params.id;
        const status = await dao.deleteUser(id);
        res.json(status);
    };
    const findUserById = async (req, res) => {
        const id = req.params.id;
        const user = await dao.findUserById(id);
        res.json(user);
    };
    const findUserByUsername = async (req, res) => {
        const username = req.params.username;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    };
    const findUserByCredentials = async (req, res) => {
        const {username, password} = req.params;
        const user = await dao.findUserByCredentials(username, password);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        const id  = req.params.id;
        const updatedUser = req.body;
        const status = await dao.updateUser(id, updatedUser);
        const currentUser =  await dao.findUserById(id);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
                req.body.username);
        if (user) {
                res.status(400).json(
                    {message: "Username already taken"});
        } else {
            const currentUser = await dao.createUser(req.body);
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        }
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            const currentUser = user;
            req.session['currentUser'] = currentUser;
            res.json(req.session['currentUser']);
        } else {
            res.sendStatus(403);
        }
    };

    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
            res.json(users);
    };
    const findUsersByRole = async (req, res) => {
        const role = req.params.role;
        const users = await dao.findUsersByRole(role);
        res.json(users);
    };

    app.post("/api/users", createUser);
    app.get("/api/users/:id", findUserById);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/role/:role", findUsersByRole);
    app.get("/api/users/username/:username", findUserByUsername);
    app.get("/api/users/credentials/:username/:password", findUserByCredentials);
}
export default UserRoutes;