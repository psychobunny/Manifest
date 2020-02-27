"use strict";

const express = require('express');
const winston = require('winston');
const request = require('request');
const async = require('async');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const benchpress = require('benchpressjs');
const app = express();

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	colorize: true
});

function parse(filepath, options, callback) {
	async.waterfall([
		(next) => {
			fs.readFile(filepath, 'utf-8', next);
		},
		(buffer, next) => {
			benchpress.compileParse(buffer.toString(), options, next);
		},
	], callback);
}


app.engine('tpl', (filepath, options, callback) => {
	const tpls = ['views/partials/header.tpl', filepath, 'views/partials/footer.tpl'];
	let sendHtml = '';

	async.eachSeries(tpls, (tpl, next) => {
		parse(tpl, options, (err, html) => {
			if (err) {
				return next(err);
			}

			sendHtml = sendHtml + html;
			next();
		});
	}, (err) => {
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

const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;

	winston.info('Manifest is ready and listening on http://%s:%s', host, port);
});


app.use('/static', express.static('static', {}));
app.get('/*', (req, res, next) => {
	const route = Object.values(req.params).join('');
	const template = route.replace(/\/*(\d)*\/*$/, '');

	request('https://community.nodebb.org/api/' + route, { json: true }, (err, response, body) => {
		if (err) {
			return console.log(err);
		}
		
		body = response.statusCode === 200 ? body : {};
		res.render(template, body);
	});

});
