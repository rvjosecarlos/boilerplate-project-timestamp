// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get( "/api/", timesStampMicroservicioActual ); 
app.get("/api/:fecha", timesStampMicroservicio);

//Objeto que se despacha
const fechaObj = {
  "unix": undefined,
  "utc": undefined
}

// Middleware para app.get("/api/:fecha")
function timesStampMicroservicio( req, res ){

  const { fecha } = req.params;  

  console.log(fecha);

  const validaFecha = new Date( fecha );

  // Valia que la fecha tenga un formato valido, o intenta convertir el formato a entero unix.
  if( validaFecha.toDateString() !== 'Invalid Date' ){
    fechaObj.unix = Number(validaFecha);
    fechaObj.utc = validaFecha.toUTCString();
    res.json( fechaObj );
  }
  else if( !isNaN(parseInt( fecha )) ){
    fechaObj.unix = parseInt( fecha );
    fechaObj.utc = new Date(fechaObj.unix).toUTCString();
    res.json( fechaObj );
  }
  else{
    res.json( { error : "Invalid Date" } );
  }      

}

// Middelware para las solicitudes vacias
function timesStampMicroservicioActual( req, res ){

    fechaObj.unix = Number( new Date() );
    fechaObj.utc = new Date().toUTCString();
    res.json( fechaObj );
}


// listen for requests :)
var listener = app.listen(5000/*process.env.PORT*/, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
