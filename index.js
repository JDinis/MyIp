let http = require('http');
var geoip = require('geoip-lite');
var publicIp = require('public-ip');

http.createServer(function(req,res){
	res.setHeader('Content-Type', 'text/html');
	publicIp.v4().then(ip => {
		res.write(ip);
		var rsp = geoip.lookup(ip);
		res.write("</br>");
		res.end(rsp.country);
		console.log(rsp);
		console.log(ip);
	});
}).listen(8080);

console.log("Listening on port:8080");