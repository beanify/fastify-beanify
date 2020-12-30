# fastify-beanify

[Fastify](https://github.com/fastify/fastify) plugin to integrate [Beanify](https://github.com/beanify/beanify)

## Install

```bash
npm i fastify-beanify --save
```

with yarn

```bash
yarn add fastify-beanify
```

## Usage

```javascript
const { fastify: Fastify } = require('fastify')
const Beanify = require('fastify-beanify')

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
```

## Options

- `beanify`: beanify configuration.check [here](https://github.com/beanify/beanify/blob/master/docs/Beanify.md#factory)
- `autoload`: (array) beanify plug-ins that need to be loaded automatically.default []
  - `dir`: (required) - Base directory containing plugins to be loaded
  - `dirAsScope`: Make each directory a new scope.default false

## Fastify Decorators

- `beanify`: the scope beanify instance.check [here](https://github.com/beanify/beanify/blob/master/docs/Beanify.md#instance-properties)

## Fastify Request Decorators

- `beanify`: the scope beanify instance.check [here](https://github.com/beanify/beanify/blob/master/docs/Beanify.md#instance-properties)

## Fastify Reply Decorators

- `inject(opts)`: start a beanify request.check [here](https://github.com/beanify/beanify/blob/master/docs/Inject.md)

## Beanify Decorators

- `$fastify`: the scope fastify instance.check [here](https://github.com/fastify/fastify/blob/master/docs/Server.md#server-methods)
