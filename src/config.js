const mongoose = require("mongoose");
const { MONGODB_URI } = require('./envconfig');
const connect = mongoose.connect(process.env.MONGODB_URI);
//const connect = mongoose.connect("mongodb://localhost:27017/Logindata");
//const connect = mongoose.connect("mongodb+srv://admin:aor211991@triseven.2gyremh.mongodb.net/user?retryWrites=true&w=majority")

connect.then(() => {
	console.log("Database connected Successfully");
})
.catch(() => {
	console.log("Not connected");
});

const LoginSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	 created_at: {
      type: Date,
      default: Date.now()
 
    }

}
);

const CrudSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	}, 
	 created_at: {
      type: Date,
      default: Date.now()
 
    },
     updated_at: {
      type: Date,
      default: Date.now()
 
    }


})


const collection = mongoose.model("user", LoginSchema, "user");
const crudcollection = mongoose.model("employee", CrudSchema, "employee");

module.exports = {
	collection,
	crudcollection,
};