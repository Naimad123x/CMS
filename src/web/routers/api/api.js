const express = require("express");
const getHashToken = require("./v1/getHashToken");
const {firstLogin} = require("./v1/firstLogin");
const {refreshUsers} = require("./v1/users");
const {newUsers} = require("./v1/userNew");
const {engine} = require("../../../../index");
const CryptoJS = require("crypto-js");
const userPasswordRegen = require("./v1/userPasswordRegen");
const userPasswordChange = require("./v1/usersPasswordChange");
const {userDelete} = require("./v1/userDelete");
const {blogNew} = require("./v1/blogApi");
const api = express.Router();

// main site http://localhost:port/
api.get(`/`, (req, res) =>{
  return res.sendStatus(404)
})

api.post('/v1/getHashToken', getHashToken)

api.post('/v1/firstLogin', firstLogin)

api.post('/v1/users/refresh', checkAuth, refreshUsers)

api.post('/v1/users/new', checkAuth, newUsers)

api.post('/v1/users/password/regen', checkAuth, userPasswordRegen)

api.post('/v1/users/password/change', checkAuth, userPasswordChange)

api.post('/v1/blog', checkAuth, blogNew)

api.delete("/v1/users", checkAuth, userDelete)

async function checkAuth(req, res, next) {
  if (!req.session.user)
    return res.sendStatus(401);
  next()
}


module.exports = api;