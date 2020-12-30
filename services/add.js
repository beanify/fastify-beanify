const { route } = require('beanify-autoload')

module.exports = route({
  handler (req, rep) {
    const { a = 10, b = 20 } = req.body
    rep.send(a + b)
  }
})
