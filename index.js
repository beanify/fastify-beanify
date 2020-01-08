const fastifyPlugin=require('fastify-plugin')

const Beanify=require('beanify')
const beanifyEnvOptions=require('beanify-env-options')

module.exports=fastifyPlugin((fastify,opts,done)=>{
  const beanify=new Beanify(beanifyEnvOptions())

  fastify.addHook('onClose',()=>{
    fastify.log.info('closing beanify')
    beanify.close(()=>{
      fastify.log.info('beanify closed')
    })
  })

  fastify.decorate('beanify',beanify)
  fastify.decorateRequest('beanify',beanify)
  fastify.decorateReply('inject',function (opts){
    return beanify
            .inject(opts)
            .then((res)=>{
              this.send(res)
              return res
            })
            .catch((err)=>{
              this.code(400)
              this.send(err)
            })
  })



  beanify.ready((err)=>{
    if(!err){
      beanify.addHook("onError",(err)=>{
        fastify.log.error(err)
      })
    }else{
      fastify.log.error("beanify not ready:"+err.message)
    }
    done(err)
  })
},{
  name:'fastify-beanify'
})
