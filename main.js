const express = require('express')
const Contenedor = require('./clase')

const productos = new Contenedor('productos.txt')

const app = express()
const puerto=8080


app.get('/', (req, resp) =>{
    resp.status(200).send('<h1 style="color: red">Bienvenidos al servidor express</h1>')
})


app.get('/productos', (req, resp) =>{
    const getAll = async () =>{ //Se hace con funcion Async y Await porque de otra forma me tiraba un objeto vacio
        resp.json(await productos.getAll())
    }
    getAll();
})

app.get('/productoRandom', (req, resp) =>{
    const getRandom = async () =>{ //Se hace con funcion Async y Await porque de otra forma me tiraba un objeto vacio
        // Se utiliza math random para poder generar un id random que se buscara en los productos del archivo "productos.txt"
        const numeroAleatorio = Math.ceil(Math.random() * (await productos.getAll()).length) // await productos.getAll()).length es para conseguir la cantidad de objetos en el archivo para poder hacer un randorm sin importar si agregamos o quitamos archivos
        resp.json(await productos. getById(numeroAleatorio))
    }
    getRandom();
})


app.listen(puerto, () =>{
    console.log(`Servidor escuchando puerto ${puerto}`)
})