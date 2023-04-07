const { auth, requiresAuth } = require("express-openid-connect");
// import { auth } from "express-openid-connect";
const express = require("express");
const app = express();
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: "a long, randomly-generated string stored in env",
	baseURL: "http://localhost:3000",
	clientID: "HuBCq3epWqoZlNTgYRdLREOi6IGUEzRS",
	issuerBaseURL: "https://dev-6oycijtxqgktqwao.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

app.get("/profile", requiresAuth(), (req, res) => {
	res.send(JSON.stringify(req.oidc.user));
});
app.use(express.static(__dirname + "../../dist"));
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
	// res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
	res.sendFile(__dirname + "../../dist/index.html");
});
app.listen(3000, (req, res) => {
	console.log("Listening on 3000");
});
