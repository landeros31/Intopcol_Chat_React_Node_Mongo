const { usuarioConectado,
    usuarioDesconectado, 
    getUsuarios,
    grabarMensaje} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets{

constructor(io){

this.io=io;

this.socketEvents();
}

socketEvents(){

//on conecction
this.io.on('connection', async (socket) => {

    const [valido, uid]= comprobarJWT(socket.handshake.query['x-token'])

    if(!valido){
        console.log("socket no identificado")
        return socket.disconnect();
    }

        await usuarioConectado( uid);

        // Unir al usuario a una sala de socket.io
        socket.join(uid);


        ///validar el jwt(si no es valido desconectar)

        //saber usuario activo

        //emitir los usuarios conectados

        this.io.emit( 'lista-usuarios', await getUsuarios())

        //socket join

        //escuchar cuando cliente envia mensaje

        socket.on('mensaje-personal', async (payload)=>{
            const mensaje= await grabarMensaje(payload);
            this.io.to(payload.to).emit('mensaje-personal', mensaje);
            this.io.to(payload.from).emit('mensaje-personal', mensaje);
        });

        //disconnect

        //emitir todos los user conectados

        socket.on('disconnect', async()=>{

        await usuarioDesconectado( uid );
        this.io.emit( 'lista-usuarios', await getUsuarios())
        })

});

}

}

module.exports=Sockets;