const Beanify = require('beanify')
const AutoLoad = require('beanify-autoload')
const path = require('path')
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  const loads = opts.autoload || []

  const beanify = Beanify(opts.beanify || {})

  for (let load of loads) {
    if (typeof dir === 'string') {
      load = {
        dir: load
      }
    }
    beanify.register(AutoLoad, {
      dir: path.join(process.cwd(), load.dir),
      dirAsScope: load.dirAsScope || false
    })
  }

  fastify.addHook('onClose', () => {
    fastify.log.info('closing beanify')
    beanify.close(() => {
      fastify.log.info('beanify closed')
    })
  })

  fastify.decorateRequest('beanify', beanify)
  fastify.decorateReply('inject', function (opts) {
    return beanify
      .inject(opts)
      .then(data => {
        this.send(data)
        return data
      })
      .catch(e => {
        this.code(400)
        this.send(e)
        throw e
      })
  })
  fastify.decorate('beanify', beanify)
  beanify.decorate('$fastify', fastify)

  beanify.ready(done)
})
