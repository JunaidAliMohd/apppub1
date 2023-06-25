let mongoose = require("mongoose");
let dotenv = require("dotenv");
let express = require("express");
let cors = require("cors");
let path = require("path");
dotenv.config();

let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,"./client/build")));

app.get("/getEmployees",async (req, res) => {
    let employeesData = await Employee.find();
    res.json(employeesData);
});

app.listen(2424, () => {
    console.log("Listening to port 2424");
})





let connectToMDB = async () => {
    try {
        await mongoose.connect(process.env.mdburl);
        console.log("connected to mdb");
        saveToDB();
    } catch {
        console.log("unable to connet to mdb");
    }
};

let employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "Too small name"],
        maxLength: [20, "Too big name"],
    },
    gender: {
        type: String,
        required: true,
        lowercase:true,
        enum:["male","female"],
    },
    mobileNo:String,
    age: {
        type: Number,
        min: [18, "You are too young to create account"],
        max: [100, "You are too old to create account"],
        required: true,
    },
    email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'User phone number required']
  },
    password: String,
    department:String,
    location:String,
});

let Employee = new mongoose.model("employee",employeeSchema);

let saveToDB = async() => {
    try {
        let vijay = new Employee({
            name: "Vijay",
            gender:"MALE",
            mobileNo:1234567890,
            email: "vijay@gmail.com",
            age: 26,
            department: "Markating",
            location: "Hyderabad",
        });

        Employee.insertMany([vijay]);
        console.log("saved to db successfully");
    } catch {
        console.log("unable to save to db");
    }
}





connectToMDB();
