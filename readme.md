# github-upstreamer [![Build Status](https://travis-ci.org/hemanth/github-upstreamer.svg?branch=master)](https://travis-ci.org/hemanth/github-upstreamer)

> Auto configure a remote for a fork!


## Install

```
$ npm install --save github-upstreamer
```


## Usage

```js
const githubUpstreamer = require('github-upstreamer');

githubUpstreamer(dir, name, function(err, res){
	if(err) {
		console.error(err);
	} else {
		console.log('Upstream is set!');
	}
});
```


## API

### githubUpstreamer([path], [name], cb)

#### path

Type: `string`
Default: `.`

Path to the git repo.

#### name

Type: `string`  
Default: `upstream`

Remote name for the fork.


## CLI

```
$ npm install --global github-upstreamer
```

```
$ github-upstreamer --help

  Set upstream for your github fork.

  Usage
    $ github-upstreamer

  Options
   --name  Lorem. [Default: upstream]
   --dir path/to/repository [Default: "."]

  Examples
    $ github-upstreamer
    $ github-upstreamer --name upstream2 --dir /path/to/repo
```

## Usecase:

Say a github user `monkey` forked `yeoman/generator-node`:

```sh
$ git remote -v
origin	https://github.com/monkey/generator-node.git (fetch)
origin	https://github.com/monkey/generator-node.git (push)

$ github-upstreamer # magic happens

$ git remote -v

origin	https://github.com/monkey/generator-node.git (fetch)
origin	https://github.com/monkey/generator-node.git (push)
upstream	https://github.com/yeoman/generator-node.git (fetch)
upstream	https://github.com/yeoman/generator-node.git (push)
```

## License

MIT © [Hemanth.HM](http://h3manth.com)
