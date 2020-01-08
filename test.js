const Fastify=require('fastify')
const fastifyPlugin=require('fastify-plugin')

const fastifyBeanify=require("./index")

const fastify=Fastify({
  logger: true
})

fastify.register(fastifyBeanify,{})
fastify.register(fastifyPlugin((fastify,opts,done)=>{

  fastify.beanify.route({
    url:'fastifyBeanify.math.add',
  },({body},res)=>{
    // res(new Error("not found"),body.a+body.b)
    // res(new Error("not found"))
    res(null,body.a+body.b)
  })

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