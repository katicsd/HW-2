const db = require("./lib/data.js");

db.create("user","123",{id:123,name:"Dani"},(err)=>{
    console.log(err);
})
