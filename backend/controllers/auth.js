const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");


const createUser = async(req,res=response)=>{

    try {
        
        const {email,password}=req.body;

        ///verificar que el email no exita
        const existeEmail = await User.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: "el correo ya existe"
            })
        }

        const user = new User(req.body);
        ///encriptar contraseña
        const salt= bcrypt.genSaltSync();
        user.password= bcrypt.hashSync(password, salt);

        //guardar en BD
        await user.save();

        // Generar el jWT
        const token= await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }
}

// login
const login= async(req,res)=>{

    const {email,password}=req.body;

    try {
        // verificar si existe el correo
        const userDB = await User.findOne({email});
        if ( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // validar el password 
        const validPassword = bcrypt.compareSync(password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no es correcto'
            });
        }

        // Generar el JWT
        const token= await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador"
        });
    }

} 

// renewToken
const renewToken= async(req,res)=>{
    const uid= req.uid;

    // Generar un nuevo JWT
    const token = await generateJWT(uid);

    // obtener el usuario por uid
    const user= await User.findById(uid);

    res.json({
        ok: true,
        user,
        token,
        
    })
}


module.exports={createUser,login,renewToken}