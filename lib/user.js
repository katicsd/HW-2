class User{
    static _fields = {
        name    : {
            type        : "string",
            minLength   : 3,
            maxLength   : 40,
        }
    }
    constructor(data){

    }
    get name(){
        return this._name;
    }
    get email(){
        return this._email;
    }
    get address(){
        return this._address;
    }

    save(){
        
    }
}
