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
	console.log('I recived a GET request!');
	getEmployees( request, response );
});
app.post('/contactlist', function(request, response){
	//console.log(request.body);
	addEmployee( request, response );
});

function addEmployee( req, res ){
	var record = console.log(req.body);
	console.log( record );
	pool.getConnection( function(err, conn){
		var insertquery = "INSERT INTO employees (employeeNumber,email,firstName,lastName,jobTitle) VALUES (" + record.employeeNumber +","+record.email + "," + record.firstName + "," + record.lastName + "," + record.jobTitle + ");";
		console.log( 'insertquery :', insertquery);
		conn.query( insertquery , function(err, rows) {
             if (!err)
			{
				res.json( rows );
			}else{
				console.log('Error while performing the query..check function addEmployee() for more details..');
			}
         })
	});
}


function getEmployees(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from employees", function(err, rows) {
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