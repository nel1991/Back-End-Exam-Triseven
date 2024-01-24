import { deleteNote, getNoteById, updateNote } from './tsocket.js';

const notesList = document.querySelector('.rowtwo');
const first_name = document.querySelector('#editfirst_name');
const last_name = document.querySelector('#editlast_name');
const position = document.querySelector('#editposition');

const editList = document.querySelector('.editcontainer');



const noteUI = note => {
	const tr = document.createElement('tr')
	tr.innerHTML = `
	
		<tr>		 
		<th scope="row" id="inc">
		</th>
		<td class="rowtwo">${note.first_name}</td>
		<td>${note.last_name}</td>
		<td>${note.position}</td>
		<td>${note.created_at}</td>	
		<td><button class="btn btn-warning update" data-id="${note._id}" data-bs-toggle="modal" data-bs-target="#editModal" style="color:white;">Edit</button> <button class="btn btn-danger delete" data-id="${note._id}">Delete</button> </td>	 
		</tr>
	
	`

	const btnDelete = tr.querySelector('.delete');
	const btnUpdate = tr.querySelector('.update');
	//console.log(btnDelete);

	btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id));
	btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id));
	


	return tr
}



export const renderNotes = notes => {
	//console.log(notes);
	notesList.innerHTML = "";
	notes.forEach(note => notesList.append(noteUI(note)))
}



export const appendNote = note => {
	notesList.append(noteUI(note))
}

