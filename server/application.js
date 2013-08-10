var application_root = __dirname,
    express = require("express"),
	path = require("path"),
	mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost:27017/beteladb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var userSchema = mongoose.Schema({
    username: String,
	passwd: String,
	email: String
});

var User = mongoose.model('User', userSchema);

var app = express();


// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

app.get('/users', function (req, res) {
	// db.users.find('', function(err, us) {
		// if( err || !us) console.log("No us found");
		  // else 
		// {
			// res.writeHead(200, {'Content-Type': 'text/plain'});
			// str='';
			// us.forEach( function(user) {
				// str = str + user.username +'\n';
			// });
			// res.end( str);
		// }
	// });
});

app.get('/user/:username', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.end( req.params.username);
	// user = req.params.username;
	// db.users.find({username:user}, function(err, us) {
		 // str='';
		 // if( err || !us) console.log("No us found");
		 // else 
		// {
			// us.forEach( function(user) {
				// str = str + 'User is '+ user.username +'\n';
				// str = str + 'and email is '+ user.email +'\n';
				// res.end( str);
			// });
		 // }
      // }); 
});



app.post('/u', function (req, res){
    console.log("POST: ");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    /*var user = req.body.username;
    var pass = req.body.password;
    var emailid = req.body.email;*/

   /* console.log('username:' + user);
    console.log('password:' + pass);
    console.log('email:' + emailid);*/

    //var newUser = new User({ username: user, passwd: pass, email: emailid});
    //console.log(newUser.username); // 'Silence'

    //db.users.save({email: emailid, password: pass, username: user}, function(err, saved) {
    // if( err || !saved ) res.end( "User not saved");
    // else res.end( "User saved");
    // });

    res.end('{\"msg\": \"OK\"}');
});

app.post('/insertuser', function (req, res){
  console.log("POST: ");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var user = req.body.username;
  var pass = req.body.password;
  var emailid = req.body.email;
  
  console.log('username:' + user);
  console.log('password:' + pass);
  console.log('email:' + emailid);
  
  var newUser = new User({ username: user, passwd: pass, email: emailid});
  console.log(newUser.username); // 'Silence'
  
  //db.users.save({email: emailid, password: pass, username: user}, function(err, saved) {
  // if( err || !saved ) res.end( "User not saved"); 
  // else res.end( "User saved");
	// });   
});


console.log("Server launched on port 1212 ...");
app.listen(1212);