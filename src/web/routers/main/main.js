const express = require("express");
const router = express.Router();
const limiter = require("../../../utils/limiter.js");
const {engine} = require("../../../../index");

// main site http://localhost:port/
router.get(`/`, (req, res) =>{
  return res.render(`sites/main/index`,{
    siteName: engine.siteName,
    blocks: engine.placedBlocks
  })
})

router.get('/reset', async (req, res) => {
  limiter.resetKey(req.ip);
  res.send('Rate limit is reset!')
})


module.exports = router;