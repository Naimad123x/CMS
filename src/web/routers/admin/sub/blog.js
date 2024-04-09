const {engine} = require("../../../../../index");

const blog = async function(req, res) {
  return res.render(
    `sites/admin/posts/index`,
    {
      siteName: engine.siteName,
      // posts: engine.posts,
    })
}

module.exports = {blog};