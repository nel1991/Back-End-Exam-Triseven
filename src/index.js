const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { collection, crudcollection } = require('./config');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash');
var http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const port = 5000;
const io = new Server(server);
const fm = [];
const { v4: uuid } = require('uuid');
uuid();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
	secret:"secret key",
	saveUninitialized: true,
	resave: false,
	cookie: { maxAge : 60000}	
}));

app.use(flash());


app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
	//res.render('login');
	res.render('login', { messages:req.flash()});

});

app.get("/home", (req, res) => {
	res.render('home');
});

app.get("/signup", (req, res) => {
	
	res.render('signup', { messages:req.flash()});
});

app.get("/login", (req, res) => {
	//res.render('login');
	res.render('login', { messages:req.flash()});
});


app.post("/signup", async(req, res) =>{
	const data = {
		id:req.body.id,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		created_at: req.body.date
	}

	const existingUser = await collection.findOne({username: data.username});

	if(existingUser){
		req.flash("error", "Already exist");
		return res.redirect('/signup');
		//res.send("User already exist. Try a different one");
	} else {
	req.flash("success", 'Saved');
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(data.password, saltRounds);
	data.password = hashedPassword;

	const userdata = await collection.insertMany(data);
	//
	return res.redirect('/signup');
	console.log(userdata);
		

	}

});


app.post("/login", async (req, res) => {
		try{
			const check = await collection.findOne({username: req.body.username});
			if(!check){
				req.flash("error", "Username not found");
				return res.redirect('/login');
				//res.send("not found");
			}

			const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
			if(isPasswordMatch){
				res.render("home");
			}else {
				req.flash("error", "Incorrect Password or Username");
				return res.redirect('/login');
				//res.send("Incorrect Password");
			}

		}
		catch{
			req.flash("error", "Wrong Details");
			return res.redirect('/login');
			//res.send("Wrong Details");
		}
});





io.on('connection', (socket) => {
	console.log('connected: ', socket.id);



	const emitNotes = async () => {
		const notes = await crudcollection.find()
		io.emit('server:loadnotes', notes)
	}
	emitNotes()

	socket.on('client:newnote', async (data) => {
		const newNote = new crudcollection(data);
		const savedNote = await newNote.save()
		//console.log(savedNote);
		io.emit('server:newnote', savedNote);
	});
	socket.on("client:deletenote", async (id) => {
		await crudcollection.findByIdAndDelete(id)
		emitNotes()
		//console.log(id);
	})
	socket.on('client:getnote', async (id) => {
		const note = await crudcollection.findById(id);
		console.log(note);
		io.emit('server:selectednote', note)

	});

	socket.on('client:updatenote', async (updatedNote) => {
		
		//console.log(data);
		await crudcollection.findByIdAndUpdate(updatedNote._id, {
			first_name: updatedNote.first_name,
			last_name: updatedNote.last_name,
			position: updatedNote.position
		});
		emitNotes();
	});
	
});

/*server.listen(5000)
console.log(`Server running on Port: ${port}`);*/
server.listen(port, () =>{
	console.log(`The Server running on Port: ${port}`);

});

