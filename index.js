'use strict';
var fetch = require("isomorphic-fetch");
var originUrl = require('git-remote-origin-url');
var exec = require("child_process").exec;
var url = require('url');
var process = require('process');
var gitCmd = 'git remote add upstream ';
var repoInfoAPI = 'https://api.github.com/repos';

module.exports = function (dir, originName, cb) {
	dir = dir || '.';
	originName = originName || 'upstream';

	originUrl(dir, function (err, remote) {
		if (err) {
			return cb(err,null);
		}
	    var remotePath = url.parse(remote).path.replace(/\.[^/.]+$/, "");
	    fetch(repoInfoAPI + remotePath)
	        .then((data) => data.json())
	        .then((res) => {
	        	if(res.fork) {
	        		process.chdir(dir);
		        	exec(gitCmd + res.parent.clone_url, function (error, stdout, stderr) {
		        		console.log(error, stdout, stderr);
					    cb(error, stdout);
					});
	        	} else {
	        		cb('Not a fork',null);
	        	}
	        });
	});
};
