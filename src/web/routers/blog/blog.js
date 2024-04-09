const express = require("express");
const blog = express.Router();
const {engine} = require("../../../../index");

function stripHtml(html){
  let temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

blog.get(`/`, (req, res) =>{

  const regex = /<[^>]*>(.*?)<\/[^>]*>/g;

  const extractedText = engine.posts[0].text.match(regex)?.[0]?.trim();

  console.log(extractedText);
  return res.render(`sites/blog/main`,{
    siteName: engine.siteName,
    posts: engine.posts,
    addons: engine.addonsCodes,
  })
})

blog.get(`/:post`, (req, res) =>{

  const {post} = req.params
  return res.render(`sites/blog/post`,{
    siteName: engine.siteName,
    post: engine.posts.find(a => a.link === post),
    addons: engine.addonsCodes,
  })
})

module.exports = blog;