const express = require("express");
const admin = express.Router();
const {engine} = require("../../../../index")
const builder = require("./sub/builder");
const {settings, settingsSave} = require("./sub/settings");

admin.get(`/`, (req, res) =>{
  return res.render(`main`)
})

admin.get(`/builder`, builder)

admin.get(`/settings`, settings)
admin.post(`/settings/save`, settingsSave)

admin.get('/blocks-data', (req, res) => {
  res.json({ blocks: engine.blocks });
});

admin.get('/block-data/:blockType', async (req, res) => {
  const block = await engine.blocks.find(a => a.name === req.params.blockType);

  const newBlock = new block();
  engine.addBlock(newBlock)
  const serialized = newBlock.serialize();
  return res.json(serialized);
});

module.exports = admin;