const Mensaje =require('../models/message')

const obtenerChat=async(req,res)=>{

const miId=req.uid
const mensajesDe = req.params.de;

const last30=await Mensaje.find({
    $or:[
        {to: miId, from:mensajesDe},
        {to:mensajesDe, from:miId},
    ]
})

  .sort({createdAt: 'asc'})
  .limit(30);

res.json({
    ok:true,
    mensajes:last30

})


}
module.exports={obtenerChat}