const express = require("express");
const getHashToken = require("./v1/getHashToken");
const {firstLogin} = require("./v1/firstLogin");
const {refreshUsers} = require("./v1/users");
const {newUsers} = require("./v1/userNew");
const api = express.Router();

// main site http://localhost:port/
api.get(`/`, (req, res) =>{
  return res.sendStatus(404)
})

api.post('/v1/getHashToken', getHashToken)

api.post('/v1/firstLogin', firstLogin)

api.post('/v1/users/refresh', refreshUsers)

api.post('/v1/users/new', newUsers)


module.exports = api;