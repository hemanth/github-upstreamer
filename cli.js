#!/usr/bin/env node
'use strict';
var meow = require('meow');
var githubUpstreamer = require('./');

var cli = meow([
	'Usage',
	'  $ github-upstreamer',
	'',
	'Options',
	' --name  Lorem. [Default: upstream]',
	' --dir path/to/repository [Default: "."]',
	'',
	'Examples',
	'  $ github-upstreamer',
	'  $ github-upstreamer --name upstream2 --dir /path/to/repo',
]);

githubUpstreamer(cli.flags.dir, cli.flags.name, function(err, res){
	if(err) {
		console.error(err);
	} else {
		console.log('Upstream is set!');
	}
})
