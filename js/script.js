let boton = document.getElementById('abrirModal') // para abrir modal => id ="abrirModal"
let modal = document.getElementById('ventanaModal') // para referenciar donde se muestra el modal en pantalla => id="ventanaModal"

boton.addEventListener("click", function () {
  modal.style.display = "block" // mostrar modal => de none a block

})

document.getElementById('formulario').addEventListener('submit', (event) => {
  event.preventDefault()

  let textoTitulo = document.getElementById('titulo')  // Entrada para el titulo => id="titulo"
  let textoNota = document.getElementById('nota') //Entrada para asunto => id="nota"

  if (textoTitulo.value.trim() === '' && textoNota.value.trim() === '') {
    modal.style.display = 'none'
    return // Para no mostrar ni crear nota vacia 
  }

  let contenedor = document.createElement('div') // Div para cada nota

  let contenedorTitulo = document.createElement('h2') // Para el titulo 
  contenedorTitulo.textContent = textoTitulo.value

  let contenedorNota = document.createElement('p') // Para el asunto
  contenedorNota.textContent = textoNota.value

  contenedor.appendChild(contenedorTitulo) // Se agrega el titulo
  contenedor.appendChild(contenedorNota) // Se agrega el asunto

  let resultado = document.getElementById('contenedorNotas') // Se agrega al HTML => id="contenedorNotas"
  resultado.appendChild(contenedor)  // Se crea la nota con los elementos


  if (!textoTitulo.textContent && !textoNota.textContent) {
    document.getElementById('formulario').reset()  // Limpiar campos del form
    modal.style.display = "none"

  }

})
