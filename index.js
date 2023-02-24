let express = require("express");
let fs = require("fs");
let bodyparser = require("body-parser")

app = express();

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.end("Welcome to node js")
})

function readusers() {
    return JSON.parse(fs.readFileSync("users.json").toString());
}

app.get("/users", (req, res) => {
    let users = readusers()
    // console.log(users);
    res.end(JSON.stringify({ data: users }))
})

app.get("/users/:id", (req, res) => {
    let users = readusers();
    console.log(users["user" + req.params.id]);
    res.end(JSON.stringify({ data: users["user" + req.params.id] }))
    // res.end("single user")
})

app.post("/users", (req, res) => {
    let body = req.body;
    // console.log(body);
    let users = readusers();

    // console.log(body.id); 
    // console.log(users['user' + 3]);
    users["user" + body.id] = body                               // assign given data into new record
    fs.writeFileSync("users.json", JSON.stringify(users))        // write new data into users
    res.end(JSON.stringify({ status: "Success" }))
})

app.put("/users/:id", (req, res) => {
    let body = req.body;
    // console.log(body); 
    let users = readusers();


    // console.log(users["user" + req.params.id]);
    users["user" + req.params.id] = body;                       // assign given data to exit record
    fs.writeFileSync("users.json", JSON.stringify(users))      // write update data into users

    res.end(JSON.stringify({ status: "Success" }))
})

app.delete("/users/:id", (req, res) => {
    let users = readusers()
    // console.log(users["user" + req.params.id]);                get user
    delete users["user" + req.params.id]
    fs.writeFileSync("users.json", JSON.stringify(users))
    res.end(JSON.stringify({ status: "User deleted" }))
})

app.listen(8081, () => {
    console.log("API running on http://localhost:8081");
})