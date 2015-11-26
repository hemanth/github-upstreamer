var githubUpstreamer = require('./');
var assert = require('assert');
var execSync = require('child_process').execSync;
var chdir = require('process').chdir;
var join = require('path').join;

execSync('git clone https://github.com/hemanth/maybe-hugs.git fixture');

describe("Test github-upstreamer", function(done) {
	it('should work on a non-fork repo', function (done) {
		githubUpstreamer((err, res) => {
			assert.equal(!err, true, "No error");
			assert.equal(res, null, "It's not a fork");
			done();
		});
	});

	it('sould set the upstream to the orginal author', function(done) {
		this.timeout(3500);
		githubUpstreamer('./fixture',(err, res) => {
			assert.equal(!err, true, "No error");
			assert.equal(res, '', "Must have added the upstream");
			var cwd = process.cwd();
		    chdir(join(__dirname, 'fixture'));
			assert.equal(
				/zkat/.test(execSync('git config --get remote.upstream.url', {encoding: 'utf-8'})),
				true,
				'Must have set the upstream to original author');
			chdir(cwd);
			done();
		});
	});


	it('sould set the upstream to the orginal author for the given name', function(done){
		this.timeout(3500);
		githubUpstreamer("./fixture", "upstream2", (err, res) => {
			console.log(err,res);
			assert.equal(!err, true, "No error");
			assert.equal(res, '', "Must have added the upstream");
			var cwd = process.cwd();
		    chdir(join(__dirname, 'fixture'));
		    assert.equal(
		    	/zkat/.test(execSync('git config --get remote.upstream2.url', {encoding: 'utf-8'})),
		    	true,
		    	'Must have set the upstream to original author');
			chdir(cwd);
			done();
		});
	});
});


