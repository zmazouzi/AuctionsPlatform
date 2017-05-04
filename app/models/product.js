

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    name : {type:String , lowercase: true  ,required : true, unique : true},
    price : {type:Number , lowercase: true  ,required : true },

});




module.exports = mongoose.model("product",ProductSchema);