const beanifyPlugin = require("beanify-plugin")

module.exports = beanifyPlugin((beanify, opts, done) => {
    beanify.route({
        url: 'fastifyBeanify.math.add',
    }, ({ body }, res) => {
        // res(new Error("not found"),body.a+body.b)
        // res(new Error("not found"))
        res(null, body.a + body.b)
    })

    done()
})