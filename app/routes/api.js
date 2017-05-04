
var Product = require('../models/product');
var User = require('../models/user');

var jwt = require("jsonwebtoken")


module.exports = function(router) {
    /* ====================
     User Registration Route
     ==================== */
    router.post('/users', function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            // If criteria is met, save user to database
            user.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'Username or Email already exists!' }); // Cannot save if username or email exist in the database
                } else {
                    res.json({ success: true, message: 'user created!' }); // If all criteria met, save user
                }
            });
        }
    });

    /* ====================
     User Authentication Route
     ==================== */

    router.post('/authenticate',function (req,res) {
        User.findOne({ username : req.body.username}).select('email username password').exec(function (err,user) {
            if (err) throw err;
            else if(!user){
                res.json({success : false , message : "could not authenticate"})
            }
            else if (user){
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword){
                    res.json({success : false , message :" could not authenticate password"});

                }
                else{
                    var token = jwt.sign({username : user.username , email : user.email} , "secret" , {expiresIn : '24h'});
                    res.json({ success : true , message :" user loged in ", token : token})
                    console.log(token)
                }
            }
        })
    });


    /* ====================
     User Products Route
     ====================
     */

    router.post('/products', function(req, res) {
        var product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;

        if (req.body.name == null || req.body.name == '' || req.body.price == null || req.body.price == '' ) {
            res.json({ success: false, message: 'Ensure name  and price were provided' });
        } else {
            // If criteria is met, save user to database
            product.save(function(err) {
                if (err) {
                    res.json({ success: false, message: 'product already exists!' }); // Cannot save if username or email exist in the database
                } else {
                    res.json({ success: true, message: 'product created!' }); // If all criteria met, save user
                }
            });
        }
    });


    router.get('/findProducts', function(req, res) {

        // use mongoose to get all todos in the database
        Product.find(function(err, products) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(products); // return all todos in JSON format
        });
    });

    router.delete('/deleteProducts/:id',function (req,res,next) {
        Product.findByIdAndRemove({_id : req.params.id}).then(function (data) {
            res.send(data);
        })

    });









    return router; // Return router object to server
}
