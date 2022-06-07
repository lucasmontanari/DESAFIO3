const fs = require('fs')

module.exports= class Contenedor{ //module.exports permite importar la clase en otro archivo usando require
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
        fs.promises.appendFile(`./${nombreArchivo}`, '')
    }

    async save(objeto){
        let data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        if(!data){
            objeto.id=1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(arr))
            return objeto.id
        }else{
            data=JSON.parse(data);
            let ultimoItem=data[data.length-1] //Se hace de esta forma para siempre encontrar el Id del ultimo elemento del array
            objeto.id=ultimoItem.id+1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(data))
            return objeto.id
        }
    }
    
    async getById(numeroID){
        let data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        data=JSON.parse(data)
        function findID(objeto) { //Funcion para encontrar el objeto con el Id buscado
            return objeto.id === numeroID;
        }
        if(!data.find(findID)){ //Se usa find para encontrar el objeto buscado
            return null
        }else{
            return data.find(findID);
        }
    }

    async getAll(){
        let data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        try{
            data=JSON.parse(data) //JSON.parse transforma el texto resivido en un array de objetos nuevamente
            if(data){return data} //Si no hay data no retorna nada y muestra el mensaje catcheado por que ocurre un error
        }
        catch(error){
            console.log("El archivo no contiene ningun producto")
        }
    }

    async deleteById(idABorrar){
        let data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
        data=JSON.parse(data)
        let arregloFiltrado = data.filter((objeto) => objeto.id !== idABorrar); //Filta el array de objetos excluyendo el objeto que tenga el Id a Borrar
        await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(arregloFiltrado)) //Reescribo el archivo con el array filtrado
    }

    async deleteAll(){
        await fs.promises.writeFile(`./${this.nombreArchivo}`, '') //Reescribo el array con nada
    }
}


//------------ El codigo siguiente se comenta ya que se uso un archivo para la clase y otro para la prueba como se sugiere en la consigna
//------------ Esto se hizo luego de probarlo todo en un archivo por eso esta repetido el codigo




//const productos = new Contenedor('productos.txt')
//
//const prueba = async () =>{
//    //Comienzo guardando tres productos y muestro que la funcion devuelve el Id correctamente
//    console.log(await productos.save({title: 'Death Note', price: 567.89, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_805388-MLA44665758739_012021-O.jpg'}))
//    console.log(await productos.save({title: 'Chainsaw Man', price: 601.56, thumbnail: 'https://www.normaeditorial.com/upload/media/albumes/0001/07/fb73dc7a21d6a8f594f276d740675be20348aa57.jpeg'}))
//    console.log(await productos.save({title: 'Naruto Shippuden', price: 598.23, thumbnail: 'https://i.pinimg.com/736x/f3/5a/19/f35a190feaedcb257518c09d0f79b14f.jpg'}))
//    //Busco el producto con Id 3
//    console.log(await productos.getById(3))
//    //Busco el producto con Id 4, el return debe ser null ya que no existe ese Id
//    console.log(await productos.getById(4))
//    //Muestro todos los productos
//    console.log(await productos.getAll())
//    //Borro el producto con Id 2 y Muestro todos los productos nuevamente
//    await productos.deleteById(2)
//    console.log(await productos.getAll())
//    //Agrego un nuevo producto y muestro que tiene Id 4 ya que la consigna dice que debe ser 1 más que el ultimo objeto agregado
//    console.log(await productos.save({title: 'Shingeki No Kyojin', price: 750.67, thumbnail: 'https://static.wikia.nocookie.net/shingeki-no-kyojin/images/3/36/Volumen_1_%28Japones%29.png/revision/latest?cb=20180720023530&path-prefix=es'}))
//    //Muesto los productos con el nuevo agregado
//    console.log(await productos.getAll())
//    //Borro todos los productos y muesto un mensaje que no hay productos al no encontrar ninguno con la funcion getAll
//    await productos.deleteAll()
//    console.log(await productos.getAll()) //Al final consologuea un "Undefined" porque la funcion no retorna nada ya que no hay productos
//}
//
//prueba();