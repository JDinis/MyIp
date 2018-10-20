let http = require('http');
var geoip = require('geoip-lite');
var publicIp = require('public-ip');
var cities = require('cities');

http.createServer(function(req,res){
	res.setHeader('Content-Type', 'text/html');
	publicIp.v4().then(ip => {
		res.write(ip);
		var rsp = geoip.lookup(ip);
		res.write("</br>");
		res.write("City: "+cities.gps_lookup(rsp.ll[0],rsp.ll[1]).toString());
		res.write("</br>");
		res.write("Country: "+rsp.country);
		res.write("</br>");
		res.write("Region: "+rsp.region);
		console.log(rsp);
		console.log(rsp.ll);
		console.log(rsp.ll[0]);
		console.log(rsp.ll[1]);
		console.log(cities.gps_lookup(""+rsp.ll[0],""+rsp.ll[1]));
	});
}).listen(8080);

console.log("Listening on port:8080");