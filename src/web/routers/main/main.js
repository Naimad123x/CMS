const express = require("express");
const router = express.Router();
const limiter = require("../../../utils/limiter.js");

// main site http://localhost:port/
router.get(`/`, (req, res) =>{
  return res.render(`main`)
})

router.get('/reset', async (req, res) => {
  limiter.resetKey(req.ip);
  res.send('Rate limit is reset!')
})


module.exports = router;