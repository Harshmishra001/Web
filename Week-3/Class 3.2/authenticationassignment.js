const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const app = express();
app.use(express.json());
const ALL_USERS = [
	{
		username: "harkirat@gmail.com",
		password: "123",
		name: "harkirat singh",
	},
	{
		username: "raman@gmail.com",
		password: "123321",
		name: "Raman singh",
	},
	{
		username: "priya@gmail.com",
		password: "123321",
		name: "Priya kumari",
	},
];

function userExists(username, password) {
	for (let i = 0; i < ALL_USERS.length; i++) {
		if (ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
			return true;
		}
	}
	return false;
}

app.post("/signin", function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (!userExists(username, password)) {
		 res.status(403).json({
			msg: "User doesnt exist in our in memory db",
		});
	}

	var token = jwt.sign({ username: username }, jwtPassword); // { username: username } is payload of the token, 
	                                                           // which contains the data you want to include in token
	res.json(token);
});

app.get("/users", function (req, res) {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, jwtPassword); // verifying a jwt 
		if(decoded) {
			res.json("token in correct")
		}
	} catch (err) {
		 res.status(403).json({ msg: "Invalid token"})
	}
})

app.listen(5006);