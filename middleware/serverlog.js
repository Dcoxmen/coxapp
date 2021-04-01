//@desc  Logs request actions to console
const serverlog = (req, res, next) => {
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
    next()
}
module.exports = serverlog