const express = require("express");
const getHashToken = require("./v1/getHashToken");
const api = express.Router();

// main site http://localhost:port/
api.get(`/`, (req, res) =>{
  return res.sendStatus(404)
})

api.post('/v1/getHashToken', getHashToken)


module.exports = api;