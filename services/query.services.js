module.exports = class Query{
       static async insert (model,options,handlers){
          try {
            const data = await model.create(options)
           return handlers.res.status(201).json({success:!0,body:{code:200,status:'Success',data}})
          } catch (error) {
            handlers.next(error)
          }
       }
       static async update (model,options,handlers,id){
        try {
            const data = await model.update(options,{where:{id}})
           return handlers.res.status(200).json({success:!0,body:{code:200,status:'Success',data}})
          } catch (error) {
            handlers.next(error)
          }
       }
       static async delete (model,options,handlers,id){
        try {
            const data = await model.destroy(options,{where:{id}})
           return handlers.res.status(201).json({success:!0,body:{code:200,status:'Success',data}})
          } catch (error) {
            handlers.next(error)
          }
       }

     
}