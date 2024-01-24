import { loadNotes, saveNote, onNewNote, onSelected, editNotes, updateNote } from './tsocket.js';
import { renderNotes, appendNote } from './ui.js';



onNewNote(appendNote);
loadNotes(renderNotes);



const saveForm = document.querySelector('#saveform');
const first_name = document.querySelector('#editfirst_name');
const last_name = document.querySelector('#editlast_name');
const position = document.querySelector('#editposition');


const editList = document.querySelector('.editcontainer');
const editForm = document.querySelector('#editform');
const addmodal = new bootstrap.Modal('#exampleModal');
const editmodal = new bootstrap.Modal('#editModal'); 

//saveForm.addEventListener('submit', onHandleSubmit);

let saveId = '';

const fillform = (note) => {
	first_name.value = note.first_name;
	last_name.value = note.last_name;
	position.value = note.position;
	saveId = note._id;
};

onSelected(fillform);

saveForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	saveNote(saveForm['first_name'].value, saveForm['last_name'].value, saveForm['position'].value);
	

	saveForm.reset();
	
	addmodal.hide();
});

editForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	updateNote(saveId, first_name.value, last_name.value, position.value);
	//console.log('test');

	editmodal.hide();

});