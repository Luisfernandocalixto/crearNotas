import {  buttons } from "./functions.js"

document.addEventListener('DOMContentLoaded', function () {

  let boton = document.getElementById('abrirModal') // para abrir modal => id ="abrirModal"
  let modal = document.getElementById('ventanaModal') // para referenciar donde se muestra el modal en pantalla => id="ventanaModal"
  let modalActualizar = document.getElementById('modal') // para referenciar donde se muestra el modal en pantalla => id="modal"
  let resultado = document.getElementById('contenedorNotas') // Se agrega al HTML => id="contenedorNotas"

  if (JSON.parse(localStorage.getItem('tareas'))) resultado.innerHTML = JSON.parse(localStorage.getItem('tareas'));

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

    let section = document.createElement('section') // Div para cada nota
    section.innerHTML = buttons;
    let contenedor = document.createElement('div') // Div para cada nota

    let contenedorTitulo = document.createElement('h2') // Para el titulo 
    contenedorTitulo.textContent = textoTitulo.value

    let contenedorNota = document.createElement('p') // Para el asunto
    contenedorNota.textContent = textoNota.value

    contenedor.appendChild(section) // Se agrega el titulo
    contenedor.appendChild(contenedorTitulo) // Se agrega el titulo
    contenedor.appendChild(contenedorNota) // Se agrega el asunto

    resultado.appendChild(contenedor)  // Se crea la nota con los elementos

    const items = resultado.querySelectorAll('div');

    const localDivs = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('')
    window.localStorage.setItem('tareas', JSON.stringify(localDivs))



    if (!textoTitulo.textContent && !textoNota.textContent) {
      document.getElementById('formulario').reset()  // Limpiar campos del form
      modal.style.display = "none"

    }

  })

  document.addEventListener('click',  function (e) {
    if (e.target.matches('.eliminar')) {
      const div = e.target.closest("div");
      div.remove();
      window.localStorage.removeItem('tareas');
      const items = resultado.querySelectorAll('div');

      const localDivs = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('');
      window.localStorage.setItem('tareas', JSON.stringify(localDivs));

    }

    if (e.target.matches('.editar')) {
      const elemDiv = e.target.closest('div');
      const titulo = elemDiv.querySelector('h2').textContent;
      const nota = elemDiv.querySelector('p').textContent;

      modalActualizar.querySelector('input.titulo').value = titulo;
      modalActualizar.querySelector('textarea.nota').value = nota;
      modalActualizar.style.display = 'block';

      modalActualizar.querySelector('button').onclick = () => {
        modalActualizar.style.display = 'none';
      }

      modalActualizar.querySelector('form').onsubmit = (event) => {
        event.preventDefault()


        const inputTitulo = modalActualizar.querySelector('input.titulo');
        const inputNota = modalActualizar.querySelector('textarea.nota');

        if (inputTitulo.value.trim() === '' && inputNota.value.trim() === '') {
          modalActualizar.style.display = 'none'
        }



        elemDiv.querySelector('h2').textContent = inputTitulo.value
        elemDiv.querySelector('p').textContent = inputNota.value


        if (!titulo.textContent && !nota.textContent) {
          modalActualizar.querySelector('form').reset()  // Limpiar campos del form
          modalActualizar.style.display = "none";

          window.localStorage.removeItem('tareas');
          const items = resultado.querySelectorAll('div');

          const localDivs = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('');
          window.localStorage.setItem('tareas', JSON.stringify(localDivs));


        }
      }

    }

  })

});