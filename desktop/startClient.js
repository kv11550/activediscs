const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
const cconfig = require('cconfig')(path.join(__dirname, 'config.js'));
const port = cconfig.VMSREPORT_PORT;
const ssl = cconfig.ssl;

app.use(express.static('public'));

if (ssl) {

  const options = {
        pfx: fs.readFileSync(ssl.pfx),
        passphrase: ssl.passphrase,
    };


  https.createServer(options, app).listen(port, function(){
    console.log("app server listening on port " + port);
  });

} else {

  http.createServer(app).listen(port, function(){
        console.log("app server listening on port " + port);
      });

}

