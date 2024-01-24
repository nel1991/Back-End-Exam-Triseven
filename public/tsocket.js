const socket = io();

export const loadNotes = (callback) => {
	socket.on("server:loadnotes", callback);
};


export const saveNote = (first_name, last_name, position) => {
	socket.emit('client:newnote',{
		first_name,
		last_name,
		position,

	});
};

export const onNewNote = (callback) => {

	socket.on('server:newnote', callback);
}

export const deleteNote = id => {
	socket.emit('client:deletenote', id)
}

export const getNoteById = (id) => {
	socket.emit('client:getnote', id);
}

export const editNotes = (callback) => {
	socket.on("server:editnotes", callback);
};


export const onSelected = (callback) => {
	socket.on('server:selectednote', callback);

	//console.log(note)
}

export const updateNote = (id, first_name, last_name, position) => {
	socket.emit("client:updatenote", {
		_id: id,
		first_name,
		last_name,
		position,
	});
}