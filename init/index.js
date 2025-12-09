const mongoose = require("mongoose");
const initData = require("./data.js");
const Note = require("../models/note.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/enggnoteshub";
main().then(() => {
    console.log("connected to DB");
})
    .catch((err) =>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async() => {
    await Note.deleteMany({});
    initData.data = initData.sampleNote.map((obj) => ({...obj, 
        owner: "692649b1ef49a2a62f17a74e",}));
    await Note.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();





