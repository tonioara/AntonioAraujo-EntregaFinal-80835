
//carrito en localstorage
let carritoOpen=JSON.parse(localStorage.getItem('carritoAbierto')) || false




/// USANDO Carrito
let Carrito=JSON.parse(localStorage.getItem('carrito')) || []
const total=document.getElementById('total')
const comprar=document.getElementById('comprar')
comprar.addEventListener('click',()=>{
    Carrito=[]
    localStorage.removeItem('carrito')
    mostrarCarrito();
})



const carritobtn= document.getElementById(`carrrito-btn`)
const aside= document.getElementById('cart-panel')
const cartProdcutos=document.getElementById('cartProdcutos')


/// Card Hamburguesa
const contenedorCard=document.getElementById('menuGrid')

/// card Pizzas
const contenedorCardPizzas=document.getElementById('pizzas-card')

///FUNCIONALIDADES


carritobtn.addEventListener('click', (e)=>{
    if(!aside.classList.contains('active')){
        carritoOpen=true
    }else{
        carritoOpen=false
    }
    aside.classList.toggle('active')
    localStorage.setItem('carritoAbierto',JSON.stringify(carritoOpen))
})
/*
if(carritoOpen){
    aside.classList.add('active')
}
else{
    aside.classList.remove('active')
}*/


const hamburguesas = [
    {
        id: "001",
        nombre: "Hamburguesa Clásica",
        descripcion: "Carne 100% de res, lechuga fresca, tomate, cebolla morada, pepinillos y nuestra salsa especial de la casa.",
        imagen: "./Imagenes/burguer-simple.jpeg",
        precio: 280
    },
    {
        id: "002",
        nombre: "Hamburguesa BBQ Extrema",
        descripcion: "Doble carne de res, aros de cebolla crujientes, tocino ahumado, queso cheddar derretido y una generosa capa de salsa BBQ ahumada.",
        imagen: "./Imagenes/burguer-completa.jpeg",
        precio: 350
    },
    {
        id: "003",
        nombre: "Hamburguesa Vegetariana Delicia",
        descripcion: "Patty artesanal de lentejas y champiñones, aguacate fresco, lechuga, tomate y mayonesa vegana, todo en pan integral tostado.",
        imagen: "./Imagenes/burguer-remolacha.jpeg",
        precio: 320
    },
    {
        id: "004",
        nombre: "Hamburguesa Picante Explosiva",
        descripcion: "Carne de res, queso pepper jack, jalapeños en rodajas, cebolla caramelizada y nuestra salsa extra picante para los más valientes.",
        imagen: "./Imagenes/burguer-negra.jpeg",
        precio: 410
    },
    {
        id: "005",
        nombre: "Hamburguesa Mañanera con Huevo",
        descripcion: "Carne de res jugosa, queso suizo, tocino crujiente y un huevo frito perfectamente cocido, ideal para cualquier momento del día.",
        imagen: "./Imagenes/Burguer-huevo.jpeg",
        precio: 300
    },
    {
        id: "006",
        nombre: "Hamburguesa Doble Queso",
        descripcion: "Dos patties de carne de res, doble ración de queso americano y cheddar, pepinillos y cebolla picada con nuestra salsa especial.",
        imagen: "./Imagenes/burguer-aros.jpeg", 
        precio: 330
    },
    {
        id: "007",
        nombre: "Hamburguesa Hawaiana Tropical",
        descripcion: "Carne de res, queso provolone, jamón cocido y una rodaja de piña a la parrilla con un toque de salsa teriyaki.",
        imagen: "./Imagenes/Burguer-especial.jpeg", 
        precio: 400
    },
    {
        id: "008",
        nombre: "Hamburguesa Gourmet de Champiñones",
        descripcion: "Carne de res, champiñones salteados con ajo y hierbas, queso suizo gratinado y mayonesa trufada en pan brioche.",
        imagen: "./Imagenes/burguer-completa.jpeg", 
        precio: 390
    }
]
const pizzas =[
    {
      id: "pizza001",
      nombre: "Pizza Margherita Clásica",
      descripcion: "La clásica pizza napolitana con salsa de tomate San Marzano, mozzarella fresca, albahaca y un toque de aceite de oliva.",
      precio: 300,
      imagen: "./Imagenes/pizzas.jpeg",
      alt: "Pizza Margherita con albahaca"
    },
    {
     id: "pizza002",
     nombre: "Pizza Pepperoni Picante",
     descripcion: "Una explosión de sabor con salsa de tomate, abundante mozzarella y rodajas de pepperoni ligeramente picante.",
     precio: 340,
     imagen: "./Imagenes/pizzas001.webp",
     alt: "Pizza de Pepperoni"
    },
    {
     id: "pizza003",
     nombre: "Pizza Cuatro Estaciones",
     descripcion: "Una deliciosa combinación dividida en cuatro secciones: champiñones, jamón cocido, alcachofas y aceitunas negras, sobre base de tomate y mozzarella.",
     precio: 320,
     imagen: "./Imagenes/pizzas002.jpg",
     alt: "Pizza Cuatro Estaciones"
    },
    {
      id: "pizza004",
      nombre: "Pizza Vegetariana Gourmet",
      descripcion: "Para los amantes de lo natural: salsa de tomate, mozzarella, pimientos de colores, cebolla morada, champiñones y calabacín a la parrilla.",
      precio:350,
      imagen: "./Imagenes/pizzas002.jpg",
      alt: "Pizza Vegetariana con vegetales frescos"
    }
  ] 
  function cargarCarPizzas(){

    pizzas.forEach((e)=>{
        let cardPizzas=`
        <div class="card menu-item " style="width: 18rem;" id=${e.id+'V'}>
          <img src="${e.imagen}" class="card-img-top" alt="${e.alt}">
    
           <h3>${e.nombre}</h3>
           <p class="card-text">${e.descripcion}</p>
           <span class="price">$ ${e.precio}</span>
           <button id= "add-to-cart "class="button-card">
			Agregar al carrito
		    </button>
        </div>
        `
        contenedorCardPizzas.innerHTML += cardPizzas
    })
  }
function cargarCardHamburguesas(){
    hamburguesas.forEach((el)=>{
        let card= 
        `
        <div class="card menu-item " style="width: 18rem;" id=${el.id+'V'}>
             <img src="${el.imagen}" class="card-img-top" alt="${el.alt}">
            
              <h3>${el.nombre}</h3>
              <p class="card-text">${el.descripcion}</p>
              <span class="price">$ ${el.precio}</span>
              <button id= "add-to-cart" class="button-card">
					Agregar al carrito
				</button>
             
        </div>
        `
        contenedorCard.innerHTML += card
    })
}

function run (){
    
    cargarCardHamburguesas()
    cargarCarPizzas()
    cargarEventosAgregarCarrito()
    mostrarCarrito()
    
}
function cargarEventosAgregarCarrito (){
    const agregarCarritobtn= document.querySelectorAll('.button-card')
    console.log(agregarCarritobtn)
   
    const btnAgregarCarrito= Array.from(agregarCarritobtn)
    

    btnAgregarCarrito.forEach((el)=>{
        el.addEventListener('click', (e)=>{
            const idProducto=e.target.parentNode.id
            let hambur=buscadoraIdProducto(idProducto)
            console.log(hambur)
            agregarProductoACarrito(hambur)
            mostrarCarrito()


        })
    })
}
function eventosParaBorrar(){
    const btnBorrar=document.querySelectorAll('.borrar-car')

    const btnEliminarDeCarrito = Array.from(btnBorrar)
   
    btnEliminarDeCarrito.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            const idDesdeHTML=e.target.parentNode.id
            
            let hambABorrar = buscadoraIdProducto(idDesdeHTML);
            if (hambABorrar) {
                borrarProducto(hambABorrar);
            } 
            mostrarCarrito(); // Actualiza el DOM del carrito    
        })
        
    })

}
function buscadoraIdProducto(idRecibido) {
    let idLimpio = idRecibido.slice(0, -1).trim()

    let productoEncontrado = hamburguesas.find(el => {
        return el.id.trim() === idLimpio.trim(); 
    });
    if (!productoEncontrado) {
        productoEncontrado = pizzas.find(el => {
            return el.id.trim() === idLimpio.trim();
        });
    }
    return productoEncontrado
}
function borrarProducto(productoABorrar){

        let indexAborrar = Carrito.findIndex(e => {
            return e.producto.id === productoABorrar.id
        })
    // let indexAborrar=Carrito.findIndex(e => e.id===idABorrar)   
   
    if (indexAborrar !== -1) {
        if (Carrito[indexAborrar].cantidad > 1) {

            Carrito[indexAborrar].cantidad--;
            
            
        } else {
          Carrito.splice(indexAborrar, 1);
          
         }
         localStorage.setItem('carrito', JSON.stringify(Carrito))
   }   
}
function agregarProductoACarrito(productoAgregar){
    const productoExistente = Carrito.find(item => {
        return item.producto.id === productoAgregar.id;
    });
    if(productoExistente){
        productoExistente.cantidad++
    }else{
        Carrito.push({
            producto: productoAgregar,
            cantidad:1
        })
    }
    
   
	localStorage.setItem('carrito', JSON.stringify(Carrito))
}
function mostrarCarrito(){
    cartProdcutos.innerHTML=''
    let totalAcumulado=0


    Carrito.forEach((itemCarrito)=>{
        const producto=itemCarrito.producto
        const cantidad=itemCarrito.cantidad
        let productoEnCarrito= 
        `
        <div class="card menu-item-2" id=${producto.id+'C'}>
           <img src="${producto.imagen} "class="img-fluid m-auto " style="width: 60px""  alt="${producto.alt}">

              <h3 class="">${producto.nombre}</h3>
              <span class="price2">$ ${producto.precio}</span>
               <p class="card-text">Cantidad ${cantidad}</p>
               <button id= "delete-cart "class="borrar-car"> Eliminar</button>
              
        </div>
        
        `
        cartProdcutos.innerHTML += productoEnCarrito
        totalAcumulado += producto.precio * cantidad;
    })
    total.innerHTML=''
    total.innerHTML = `Total = $ ${totalAcumulado}`


    eventosParaBorrar()
}
run()