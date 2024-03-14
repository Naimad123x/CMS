const { nanoid } = require("nanoid")
const {engine} = require("../../../../../index")

const getHashToken = async function(req, res) {
  if(!req?.body)
    return res.sendStatus(400);
  const data = req.body;
  if(!data?.client)
    return res.sendStatus(400);
  const hash = nanoid(48);
  let hashFind = await engine.hashes.find(a => a.client === data?.client);
  if(!hashFind)
    hashFind = engine.addHash(data.client, hash);
  hashFind.hash = hash

  return res.send(JSON.stringify(hashFind));
}

const hash = async function(){
  let token;
  await crypto.randomBytes(48, function(err, buffer) {
    token = buffer.toString('hex');
  });
  return token;
}

module.exports = getHashToken;