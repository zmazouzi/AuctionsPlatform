

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username : {type:String , lowercase: true  ,required : true, unique : true},
    password : {type:String , lowercase: true  ,required : true },
    email  : {type:String , lowercase: true  ,required : true , unique:true},
});



UserSchema.methods.comparePassword = function (password) {
    return password == this.password ;
}




module.exports = mongoose.model("user",UserSchema);