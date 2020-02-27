"use strict";

var express = require('express');
var winston = require('winston');
var async = require('async');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var Benchpress = require('benchpressjs');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	colorize: true
});

function parse(filepath, options, callback) {
	async.waterfall([
		function (next) {
			fs.readFile(filepath, 'utf-8', next);
		},
		function (buffer, next) {
			Benchpress.compileParse(buffer.toString(), options, next);
		},
	], callback);
}


app.engine('tpl', function (filepath, options, callback) {
	var tpls = ['views/partials/header.tpl', filepath, 'views/partials/footer.tpl'];
	var sendHtml = '';

	async.eachSeries(tpls, function(tpl, next) {
		parse(tpl, options, function(err, html) {
			if (err) {
				return next(err);
			}

			sendHtml = sendHtml + html;
			next();
		});
	}, function(err) {
		if (err) {
			return callback(err);
		}
		
		callback(err, sendHtml);
	});
});

app.set('view engine', 'tpl');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
	extended: true,
}));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	winston.info('Manifest is ready and listening on http://%s:%s', host, port);
});


app.use('/static', express.static('static', {}));
app.get('/*', function(req, res, next) {
	var route = Object.values(req.params).join('').replace(/\/$/, '');
	res.render(route, {});
});
