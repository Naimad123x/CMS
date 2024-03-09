const express = require("express");
const admin = express.Router();
const {engine} = require("../../../../index")

admin.get(`/`, (req, res) =>{
  return res.render(`main`)
})

admin.get(`/builder`, async (req, res) => {
  // console.log("admin.js", await engine.getBlocksData())
  return res.render(
    `sites/builder/index`,
    {
      siteName: engine.siteName,
      blocks: await engine.getBlocksData(),
    })
})

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