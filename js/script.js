import {  buttons } from "./functions.js"

document.addEventListener('DOMContentLoaded', function () {

  let btnOpenModal = document.getElementById('btnOpenModal'); // for open modal => id ="btnOpenModal"
  let modal = document.getElementById('windowModal'); // for reference where is show the modal in screen => id="windowModal"
  let modalUpdate = document.getElementById('modal'); // for reference where is show the modal in screen => id="modal"
  let containerNotes = document.getElementById('containerNotes'); // Is aggregate a HTML => id="containerNotes"

  if (JSON.parse(localStorage.getItem('tasks'))) containerNotes.innerHTML = JSON.parse(localStorage.getItem('tasks'));

  btnOpenModal.addEventListener("click", function () {
    modal.style.display = "block"; // show modal => of none a block

  })

  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    let textTitle = document.getElementById('title');  // Input for the title => id="title"
    let textNote = document.getElementById('note'); //Input for subject => id="note"

    if (textTitle.value.trim() === '' && textNote.value.trim() === '') {
      modal.style.display = 'none';
      return; // For not show and not create note empty 
    }

    let section = document.createElement('section'); // Div for each note
    section.innerHTML = buttons;
    let container = document.createElement('div'); // Div for each note

    let containerTitle = document.createElement('h2'); // For the title 
    containerTitle.textContent = textTitle.value

    let containerNote = document.createElement('p'); // For the subject
    containerNote.textContent = textNote.value;

    container.appendChild(section) // Is added a title
    container.appendChild(containerTitle) // Is added a title
    container.appendChild(containerNote) // Is added a subject

    containerNotes.appendChild(container)  // Is create the note with the elements

    const items = containerNotes.querySelectorAll('div');

    const localDiv = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('')
    window.localStorage.setItem('tasks', JSON.stringify(localDiv))



    if (!textTitle.textContent && !textNote.textContent) {
      document.getElementById('form').reset()  // Clear fields of the form
      modal.style.display = "none"

    }

  })

  document.addEventListener('click',  function (e) {
    if (e.target.matches('.delete')) {
      const div = e.target.closest("div");
      div.remove();
      window.localStorage.removeItem('tasks');
      const items = containerNotes.querySelectorAll('div');

      const localDiv = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('');
      window.localStorage.setItem('tasks', JSON.stringify(localDiv));

    }

    if (e.target.matches('.edit')) {
      const elemDiv = e.target.closest('div');
      const title = elemDiv.querySelector('h2').textContent;
      const note = elemDiv.querySelector('p').textContent;

      modalUpdate.querySelector('input.title').value = title;
      modalUpdate.querySelector('textarea.note').value = note;
      modalUpdate.style.display = 'block';

      modalUpdate.querySelector('button').onclick = () => {
        modalUpdate.style.display = 'none';
      }

      modalUpdate.querySelector('form').onsubmit = (event) => {
        event.preventDefault();


        const inputTitle = modalUpdate.querySelector('input.title');
        const inputNota = modalUpdate.querySelector('textarea.note');

        if (inputTitle.value.trim() === '' && inputNota.value.trim() === '') {
          modalUpdate.style.display = 'none'
        }



        elemDiv.querySelector('h2').textContent = inputTitle.value
        elemDiv.querySelector('p').textContent = inputNota.value


        if (!title.textContent && !note.textContent) {
          modalUpdate.querySelector('form').reset()  // Clear fields of the form
          modalUpdate.style.display = "none";

          window.localStorage.removeItem('tasks');
          const items = containerNotes.querySelectorAll('div');

          const localDiv = Array.from(items).map(item => `<div> ${item.innerHTML} </div>`).join('');
          window.localStorage.setItem('tasks', JSON.stringify(localDiv));


        }
      }

    }

  })

});