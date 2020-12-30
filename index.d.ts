import { Beanify, Inject } from 'beanify'
import { FastifyPluginCallback, FastifyInstance } from 'fastify'
import { FastifyBeanifyOptions } from './types/options'

declare const fastifyBeanify: FastifyPluginCallback<FastifyBeanifyOptions>
export = fastifyBeanify

declare module 'fastify' {
  interface FastifyInstance {
    beanify: Beanify
  }

  interface FastifyRegister {
    (
      plugin: FastifyPluginCallback<FastifyBeanifyOptions>,
      opts: FastifyBeanifyOptions
    ): FastifyInstance
  }

  interface FastifyRequest {
    beanify: Beanify
  }

  interface FastifyReply {
    inject(opts: Inject): Promise<void>
  }
}

declare module 'beanify' {
  interface Beanify {
    $fastify: FastifyInstance
  }
}
