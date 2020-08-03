# fastify-beanify

## .env

* BEANIFY_NATS_URL
* BEANIFY_NATS_SERVERS
* BEANIFY_NATS_USER
* BEANIFY_NATS_PASS
* BEANIFY_NATS_TOKEN
* etc...


## install
```bash
npm i fastify-beanify
```

## example
```javascript
const Fastify=require('fastify')
const fastifyPlugin=require('fastify-plugin')

const fastifyBeanify=require("fastify-beanify")

const fastify=Fastify({
  logger: true
})

fastify.register(fastifyBeanify,{
  autoLoad:[]
})
fastify.register(fastifyPlugin((fastify,opts,done)=>{

  fastify.get('/add',(req,res)=>{
    res.inject({
      url:'fastifyBeanify.math.add',
      body:{
        a:parseInt(req.query.a),
        b:parseInt(req.query.b)
      }
    })
  })

  done()
}))

fastify.ready((err)=>{
  console.log({
    fastifyErr:err
  })
})

fastify.listen(3000)
```