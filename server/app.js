var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "beteladb"; // "username:password@example.com/mydb"
var collections = ["users"]
var db = require("mongojs").connect(databaseUrl, collections);
var crypto = require('crypto');

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
	db.users.find('', function(err, us) {
	if( err || !us) console.log("No users found");
	  else 
	{
		res.writeHead(200, {'Content-Type': 'text/plain'});
		str='';
        us.forEach( function(user) {
			str = str + user.username +'\n';
		});
		res.end( str);
	}
  });
});

app.get('/user/:username', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//res.end( req.params.username);
	user = req.params.username;
	db.users.find({username:user}, function(err, us) {
		 str='';
		 if( err || !us) console.log("No users found");
		 else 
		{
            us.forEach( function(user) {
				str = str + 'User is '+ user.username +'\n';
				str = str + 'and email is '+ user.email +'\n';
				res.end( str);
			});
		 }
      }); 
});

app.post('/insert', function (req, res){
  console.log("POST: ");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  user = req.body.username;
  passwd = req.body.password;
  emailid = req.body.email;

    var salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(passwd, salt, 10000, 512, function(err, derivedKey) {
        passwd = derivedKey;
    });
  
  db.users.save({email: emailid, password: passwd, username: user}, function(err, saved) {
  if( err || !saved ) res.end( "User not saved"); 
  else res.end( "User saved");
});
  
  
 
});



app.listen(1212);