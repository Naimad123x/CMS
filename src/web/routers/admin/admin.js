const express = require("express");
const admin = express.Router();

admin.get(`/`, (req, res) =>{
  return res.render(`main`)
})

module.exports = admin;