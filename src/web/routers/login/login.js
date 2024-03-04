const express = require("express");
const login = express.Router();

login.get(`/`, (req, res) =>{
  return res.render(`main`)
})

module.exports = login;