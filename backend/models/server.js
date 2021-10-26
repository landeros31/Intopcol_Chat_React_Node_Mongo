//Servidor express

const express = require('express')
const http=require('http')
const socketio =require('socket.io')
const path =require('path');
const Sockets = require('./sockets');
const cors =require('cors');
const  {dbConecction}  = require('../database/config');



class Server{

    constructor(){

        this.app= express();
        this.port=process.env.PORT;


        ///Db conecction

        dbConecction();

        //http server
    
        this.server = http.createServer(this.app)

        //configuracion socket
        //configuracion socket
        this.io = socketio(this.server,{/* configuraciones*/ });
       
    }

    middlewares(){

        //desplegar directorio publico

        this.app.use(express.static(path.resolve(__dirname,'../public') )); 
        ///cors
        this.app.use(cors())

        ////parseo del body
        this.app.use(express.json());
        
        ///aPI endpoints
        
        this.app.use('/api/login', require('../router/auth'));
        this.app.use('/api/mensajes', require('../router/mensajes'));

        
    }

    configurarSockets(){

        new Sockets(this.io);
    }

    execute(){

        //inicializar middlewares
        this.middlewares();

        //inicializar sockets
        this.configurarSockets();

        //inicializar server
        this.server.listen(this.port,()=>{
            console.log("servidor corriendo en puerto ",this.port)
        });
    }
}

module.exports=Server;