var express = require("express");
var app = express();
var sql = require('mysql');
var bodyParser = require('body-parser');

var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'classicmodels'
});


app.use(express.static( __dirname + "/public") );
app.use( bodyParser.json() );

app.get('/contactlist', function(request, response){
	//console.log('I recived a GET request!');
	getContacts( request, response );
});
app.post('/contactlist', function(request, response){
	//console.log(request.body);
	addContact( request, response );
});

function addContact( req, res ){
	pool.getConnection( function(err, conn){
		conn.query( "INSERT INTO contacts (name,email,number) VALUES('"+req.body.name + "','" + req.body.email + "','" + req.body.number + "');" , function(err, rows) {
             if (!err)
			{
				res.json( rows );

			}else{
				console.log('Error while performing the query..check function addEmployee() for more details..', err);
			}
         })
	});
}


function getContacts(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from contacts", function(err, rows) {
             if (!err)
			{
				res.json( rows );
			}else{
				console.log('Error while performing the query..check function getEmployees() for more details..');
			}
         })
	});
}

app.listen(3000);

console.log('listening on port 3000');