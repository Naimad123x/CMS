const express = require("express");
const builder = express.Router();

builder.get(`/`, (req, res) =>{
  return res.render(`builder/index`)
})

module.exports = builder;