const { rateLimit } = require('express-rate-limit');
const ms = require("ms")

const limiter = rateLimit({
  skip: (req) => req.url === '/reset',
  windowMs: ms("1m"), // 1 minute
  limit: 70, // Limit each IP to 100 requests per `window` (here, per 1 minute).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

module.exports = limiter