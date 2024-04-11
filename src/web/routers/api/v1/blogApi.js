const {engine} = require("../../../../../index")
const {savePost} = require("../../../../utils/storage");
const {customAlphabet} = require("nanoid")
const randomNum = customAlphabet('1234567890', 5);

const blogNew = async function(req, res) {

  if(!req.body.title || !req.body.editor)
    return res.sendStatus(400)

  await savePost(
    {
      author: req.session.user.user,
      text: req.body.editor,
      title: req.body.title,
      image: req.body.image ? req.body.image : "https://placehold.co/600x400?text=Image",
      link: encodeURIComponent(req.body.title.replace(/\s/g, "-")+"-"+randomNum()),
      date: Date.now()
    }
  )

  engine.loadPosts()
  return res.sendStatus(200)
}


module.exports = { blogNew };