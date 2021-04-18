const express = require('express');
const actions = require("./actions/actions-router")
const projects = require("./projects/projects-router")
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// Complete your server here!
server.use(actions)
server.use(projects)

// Do NOT `server.listen()` inside this file!

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

module.exports = server;
