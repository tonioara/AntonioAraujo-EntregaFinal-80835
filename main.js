


//carrito en localstorage
let carritoOpen=JSON.parse(localStorage.getItem('carritoAbierto')) || false


/// USANDO Carrito
let Carrito=JSON.parse(localStorage.getItem('carrito')) || []
const total=document.getElementById('total')

const comprar=document.getElementById('comprar')
comprar.addEventListener('click',()=>{
    if(Carrito.length== 0){
        Swal.fire({
            title:'No tiene nada en el carrito',
            showConfirmButton: true,
            timer:1500
        })
    }
    Swal.fire({
        title: "Termaninando su compra?",
        text: "Estas seguro que quiere terminar su compra?",
        background: 'rgba(87, 77, 77, 0.94)',
        color: 'white',
        
        showCancelButton: true,
        confirmButtonColor: "#998f8f",
        cancelButtonColor: "#998f8f",
        confirmButtonText: " Si! "
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
             title: "Gracias por su compra",
             text: "Pronto le haremos llegar sus productos",
             background: 'rgba(97, 93, 93, 0.94)',
              color: 'white',
          })
          Carrito=[]
          localStorage.removeItem('carrito')
          mostrarCarrito();
        }else{
            Swal.fire({
                title:'Puede seguir comprando...',
                timer:1000,
                background: 'rgba(75, 73, 73, 0.94)',
                color: 'white',
                showConfirmButton: false,
                showCancelButton:false
            })
        }
      });
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

///FORMULARIO INICIO SESION
const inicioSesion= document.getElementById('inicio-sesion')
const inicioCard = document.getElementById('tarjeta-inicio');
const registerCard = document.getElementById('registrarse');
const mainContent = document.getElementById('pagina-completa');
const verRegistroCard = document.getElementById('ver-registroCard');
const verIniciarCard = document.getElementById('ver-iniciarCard');
const cargarDatosInicio = document.getElementById('form-iniciar');
const cargarDatosRegistro = document.getElementById('form-registrarse');

const logoutButton = document.getElementById('logoutButton');

inicioSesion.style.display='flex'
inicioCard.style.display='flex'
registerCard.style.display='none'

verRegistroCard.addEventListener('click',()=>{
    inicioCard.style.display='none'
    registerCard.style.display='block'
})
verIniciarCard.addEventListener('click',()=>{
    inicioCard.style.display='flex'
    registerCard.style.display='none'
})
//Datos para el inicio de sesion
const usuarioNombreInput=document.getElementById('username')
const usuarioContraInput=document.getElementById('password')

cargarDatosInicio.addEventListener('submit',(e)=>{
    e.preventDefault()
    usuarioNombre=usuarioNombreInput.value.trim()
    usuarioPass=usuarioContraInput.value.trim()
    console.log(usuarioNombre)
    console.log(usuarioPass)

    if(usuarioNombre !== '' && usuarioPass !== ''){
        inicioSesion.style.display='none'
        Swal.fire({
            titleText: 'Bienvenido a BurguerHouse  ' + usuarioNombre+ ' !!',
            icon: "success",
            background: 'rgba(233, 81, 81, 0.94)',
            color: 'white',
            timer: 3000,
            
            showConfirmButton: false,
        })

        
    }
// datos para el registro de usuarios
//SIN TERMINARR AUN 
})


cargarDatosRegistro.addEventListener('click',(e)=>{
    e.preventDefault()
})

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


let hamburguesas
let pizzas

async function prodcutosObtenidos() {
    try{
        const resp= await fetch('./dataHamburguesas.json')
        const dataHamb= await resp.json()
        hamburguesas=dataHamb
        console.log(hamburguesas)
        const resp2= await fetch('./dataPizzas.json')
        const dataPizzas= await resp2.json()
        pizzas=dataPizzas
        console.log(pizzas)
    }
    catch(error){
        console.error(error)
    }
}
  function cargarCarPizzas(arrayDeProductos){
    contenedorCardPizzas.innerHTML=''

    arrayDeProductos.forEach((e)=>{
        let cardPizzas=`
        <div class="card menu-item " style="width: 18rem;" id=${e.id+'V'}>
          <img src="${e.imagen}" class="card-img-top" alt="${e.alt}">
    
           <h3>${e.nombre}</h3>
           <p class="card-text">${e.descripcion}</p>
           <span class="price">$ ${e.precio}</span>
           <button class="button-card">
			Agregar al carrito
		    </button>
        </div>
        `
        contenedorCardPizzas.innerHTML += cardPizzas
    })
    
  }
function cargarCardHamburguesas(arrayDeProductos){
    contenedorCard.innerHTML = ''
    arrayDeProductos.forEach((el)=>{
        let card= 
        `
        <div class="card menu-item " style="width: 18rem;" id=${el.id+'V'}>
             <img src="${el.imagen}" class="card-img-top" alt="${el.alt}">
            
              <h3>${el.nombre}</h3>
              <p class="card-text">${el.descripcion}</p>
              <span class="price">$ ${el.precio}</span>
              <button  class="button-card">
					Agregar al carrito
				</button>
             
        </div>
        `
        contenedorCard.innerHTML += card
        
    })
    
    
}
function MayorPrecioAMenor(){
    const mayorAMenor= document.getElementById('desdemayor')
   
    
    mayorAMenor.addEventListener('click',(e)=>{
       e.preventDefault()
       const hambuCopia=[...hamburguesas]
       const mayorPrecio= hambuCopia.sort((a,b)=>b.precio-a.precio)
       cargarCardHamburguesas(mayorPrecio)
       const pizzasCopia=[...pizzas]
       const mayorPrecioPizzas=pizzasCopia.sort((a,b)=>b.precio-a.precio)
       cargarCarPizzas(mayorPrecioPizzas)
       cargarEventosAgregarCarrito()
       

    })     
   }
   function menorPrecioAMayor (){
    const menorAMayor=document.getElementById('desdemenor')
    
     menorAMayor.addEventListener('click', (e)=>{
        e.preventDefault()
        const hambuCopia1=[...hamburguesas]
        const menorPrecio= hambuCopia1.sort((a,b)=>a.precio-b.precio)
        cargarCardHamburguesas(menorPrecio)
        const pizzasCopia1=[...pizzas]
        const menorPrecioPizzas=pizzasCopia1.sort((a,b)=>a.precio-b.precio)
        cargarCarPizzas(menorPrecioPizzas)
        cargarEventosAgregarCarrito()
    })
   }

    

async function run (){
    await prodcutosObtenidos();
    cargarCardHamburguesas(hamburguesas)
    cargarCarPizzas(pizzas)
    cargarEventosAgregarCarrito()
    mostrarCarrito()
    MayorPrecioAMenor()
    menorPrecioAMayor ()
   
    
}
function cargarEventosAgregarCarrito (){
    const agregarCarritobtn= document.querySelectorAll('.button-card')
    
   
    const btnAgregarCarrito= Array.from(agregarCarritobtn)
    

    btnAgregarCarrito.forEach((el)=>{
        el.addEventListener('click', (e)=>{
            const idProducto=e.target.parentNode.id
            
            let hambur=buscadoraIdProducto(idProducto)
            Swal.fire({
                titleText: 'Agregaste ' + hambur.nombre + ' al Carrito',
                imageUrl: hambur.imagen,
                background: 'rgba(97, 93, 93, 0.94)',
                color:'white',
                toast: true,
                timer: 1500,
                showConfirmButton: false,
                position: 'bottom-start',
            })
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
                Swal.fire({
                    titleText: 'Eliminaste  ' + hambABorrar.nombre + ' del Carrito',
                    toast: true,
                    timer: 1500,
                    background: 'rgba(97, 93, 93, 0.94)',
                    color:'white',
                    showConfirmButton: false,
                    position: 'top',
                })
            } 
            mostrarCarrito();
        })
        
    })

}
function buscadoraIdProducto(idRecibido) {
    let idLimpio = idRecibido.slice(0, -1).trim()
    
    let productoEncontrado = hamburguesas.find(el => {
        return el.id.trim() === idLimpio.trim(); 
    })

    if (!productoEncontrado) {
        productoEncontrado = pizzas.find(el => {
            return el.id.trim() === idLimpio.trim();
        })
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