const { rateLimit } = require("express-rate-limit")

const Rate_Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests. Try again later!",
})

module.exports = Rate_Limiter