# github-upstreamer [![Build Status](https://travis-ci.org/hemanth/github-upstreamer.svg?branch=master)](https://travis-ci.org/hemanth/github-upstreamer)

> Auto configure a remote for a fork!


## Install

```
$ npm install --save github-upstreamer
```


## Usage

```js
const githubUpstreamer = require('github-upstreamer');

githubUpstreamer('unicorns');
//=> 'unicorns & rainbows'
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


## License

MIT © [Hemanth.HM](http://h3manth.com)
