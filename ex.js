const { fastify: Fastify } = require('fastify')
const Beanify = require('./index')

const fastify = Fastify({
  logger: true
})

fastify.register(Beanify, {
  autoload: [
    {
      dir: 'services',
      dirAsScope: true
    }
  ]
})
fastify.route({
  url: '/test',
  method: 'GET',
  async handler (req, rep) {
    await rep.inject({
      url: 'add',
      body: {
        a: 1,
        b: 2
      }
    })
  }
})
fastify.ready(() => {
  fastify.beanify.print()
})
fastify.listen(3000)
