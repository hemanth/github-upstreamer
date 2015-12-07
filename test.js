var githubUpstreamer = require('./');
var assert = require('assert');
var execSync = require('child_process').execSync;
var chdir = require('process').chdir;
var join = require('path').join;

describe("Test github-upstreamer", function(done) {
	beforeEach(function(done) {
		this.timeout(3500);
		execSync('git clone https://github.com/hemanth/maybe-hugs.git fixture');
		done();
	});

	afterEach(function(done) {
		this.timeout(3500);
		execSync('rm -rf fixture');
		done();
	});

	it('should work on a non-fork repo', function (done) {
		this.timeout(3500);
		var cwd = process.cwd();
		chdir('/');
		githubUpstreamer((err, res) => {
			assert.equal(!err, true, "No error");
			assert.equal(res, null, "It's not a fork");
			chdir(cwd);
		});
		chdir(cwd);
		done();
	});

	it('sould set the upstream to the orginal author', function(done) {
		this.timeout(3500);
		githubUpstreamer('./fixture',(err, res) => {
			assert.equal(!err, true, "No error");
			assert.equal(res, '', "Must have added the upstream");
			console.log(`${__dirname}/fixture`);
			assert.equal(
				/zkat/.test(execSync(`cd ${__dirname}/fixture && git config --get remote.upstream.url`, {encoding: 'utf-8'})),
				true,
				'Must have set the upstream to original author');
		});
		done();
	});


	it('sould set the upstream to the orginal author for the given name', function(done){
		this.timeout(3500);
		githubUpstreamer("./fixture", "upstream2", (err, res) => {
			assert.equal(!err, true, "No error");
			assert.equal(res, '', "Must have added the upstream");
		    assert.equal(
		    	/zkat/.test(execSync(`cd ${__dirname}/fixture && git config --get remote.upstream2.url`, {encoding: 'utf-8'})),
		    	true,
		    	'Must have set the upstream to original author');
		});
	    done();
	});
});


