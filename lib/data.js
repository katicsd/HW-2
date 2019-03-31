const fs = require("fs");
const DATA_FOLDER = "./data/";
module.exports = class Data{
    static create(schema,id,data,callback){
        if (typeof id == 'object' && typeof data.id != 'undefined') {
            data = id;
            id = data.id;
        }
        else{
            data.id = id;
        }
        fs.open(fileName(schema,id), 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('Data already exists!');
                }
                return callback(err);
            }
            fs.write(fd, JSON.stringify(data), (err) => {
                return callback(err);
            });
        });
    }
    static update(schema,id,data,callback){

    }
    static delete(schema,id,callback){
        fs.unlink(fileName(schema,id),(err)=>{

        });
    }
}

function fileName(schema,id){
    return DATA_FOLDER + "/" + schema + "/" + id + '.json';
}
