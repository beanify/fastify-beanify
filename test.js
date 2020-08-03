const Fastify=require('fastify')
const fastifyPlugin=require('fastify-plugin')

const fastifyBeanify=require("./index")

const fastify=Fastify({
  logger: true
})

fastify.register(fastifyBeanify,{
  autoLoad:['services']
})
fastify.register(fastifyPlugin((fastify,opts,done)=>{

  fastify.get('/add',(req,res)=>{
    // console.log(req.inject)
    // console.log(res.inject)
    const aa= res.inject({
      url:'fastifyBeanify.math.add',
      body:{
        a:parseInt(req.query.a),
        b:parseInt(req.query.b)
      }
    })

    aa.then((arg)=>{
      console.log({
        arg
      })
    })

    console.log({
      aa
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