const express = require("express");
const admin = express.Router();
const {engine} = require("../../../../index")
const {builder, builderSave} = require("./sub/builder");
const {settings, settingsSave} = require("./sub/settings");
const {loginPage, authenticate} = require("./sub/login");
const {snippets} = require("./sub/snippets");
const {users} = require("./sub/users");
const {addons} = require("./sub/addons");

admin.get(`/`,checkAuth, (req, res) =>{
  return res.render(`sites/admin/main`,
    {
      siteName: engine.siteName,
      modules: [
        {
          name: "Builder",
          description: "Build website!",
          link: "/admin/builder"
        },
        {
          name: "Snippets",
          description: "Create your own code",
          link: "/admin/snippets"
        },
        {
          name: "Settings",
          description: "Change site settings!",
          link: "/admin/settings"
        },
        {
          name: "Users",
          description: "Manage users",
          link: "/admin/users"
        },
        {
          name: "Addons",
          description: "List of addons",
          link: "/admin/addons"
        },
      ]
    })
})

admin.get(`/builder`,
  checkAuth,
  builder)
admin.post(`/builder/save`,
  checkAuth,
  builderSave)

admin.get(`/settings`,
  checkAuth,
  settings)
admin.post(`/settings/save`,
  checkAuth,
  settingsSave)

admin.get(`/snippets`,
  checkAuth,
  snippets)

admin.get(`/users`,
  checkAuth,
  users)

admin.get(`/addons`,
  checkAuth,
  addons)

admin.get('/blocks-data',
  checkAuth,
  (req, res) => {
  res.json({ blocks: engine.blocks });
});

admin.get('/block-data/:blockType',
  checkAuth,
  async (req, res) => {
  const block = await engine.blocks.find(a => a.name === req.params.blockType);

  const newBlock = new block();
  // engine.addBlock(newBlock)
  const serialized = newBlock.serialize();
  return res.json(serialized);
});

admin.get('/login',checkLogged, loginPage);

admin.post('/login', checkLogged, authenticate)

admin.get('/logout', checkAuth, (req, res)=>{
  req.session.destroy();
  res.redirect('/admin')
})


function checkAuth(req,res,next){
  if(req.session.user) next();
  else res.redirect("/admin/login");
}

function checkLogged(req,res,next){
  if(req.session.user){
    res.redirect("/admin")
  }else{
    next();
  }
}

module.exports = admin;