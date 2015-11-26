'use strict';
var parse = require('url').parse;
var chdir = require('process').chdir;
var exec = require('child_process').exec;
var fetch = require("isomorphic-fetch");
var originUrl = require('git-remote-origin-url');
var githubUpstreamUrl = require('github-upstream-url');
var gitCmd = 'git remote add ';

module.exports = function (dir, originName, cb) {
	// Default args must fix this mess.
	cb = ( typeof dir === 'function' ? dir :
		   typeof originName === 'function' ? originName : cb );
	dir = (typeof dir === 'function' || typeof dir === 'undefined') ? '.' : dir
	originName = (typeof originName === 'function' || typeof originName === 'undefined') ? 'upstream' : originName

	originUrl(dir, function (err, remote) {
		if (err) {
			return cb(err,null);
		}
	    var remotePath = parse(remote).path.replace(/\.[^/.]+$/, "").replace(/\//,'');
	    githubUpstreamUrl(remotePath)
	    	.then((url) => {
	    		if(url) {
	    			process.chdir(dir);
	    			exec(`${gitCmd}${originName} ${url}`, (error, stdout, stderr) => cb(error, stdout));
	    		} else {
	    		  	cb(null,'Not a fork!');
	    		  }
	    	 })
	    	.catch((err) => cb(err));
	});
};
