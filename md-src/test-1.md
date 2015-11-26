# Gulp-mdvars
> Parse VarStream metadatas in a markdown file and reemit the cleaned up
 markdown content with [Gulp](http://gulpjs.com/).

### Blockquotes

##### normal
> Normal Blockquote

##### italic
> *Normal Blockquote - italic*

##### bold
> **Normal Blockquote - bold**


-> This is centered Text <-

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Heading 1
======

Heading 1
------

hr
___

hr 2
---

hr 3
***

[![NPM version](https://badge.fury.io/js/gulp-mdvars.svg)](https://npmjs.org/package/gulp-mdvars) [![Build status](https://secure.travis-ci.org/nfroidure/gulp-mdvars.svg)](https://travis-ci.org/nfroidure/gulp-mdvars) [![Dependency Status](https://david-dm.org/nfroidure/gulp-mdvars.svg)](https://david-dm.org/nfroidure/gulp-mdvars) [![devDependency Status](https://david-dm.org/nfroidure/gulp-mdvars/dev-status.svg)](https://david-dm.org/nfroidure/gulp-mdvars#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/nfroidure/gulp-mdvars/badge.svg?branch=master)](https://coveralls.io/r/nfroidure/gulp-mdvars?branch=master)

## Usage

```html
<div class="hello">
	hello
</div>
```

Usage
-----

```ruby
var test = "string";
require 'github/markup'
GitHub::Markup.render('README.markdown', "* One\n* Two")
```


First, install `gulp-mdvars` as a development dependency:

```bash
npm install --save-dev gulp-mdvars
```

Then, add it to your `gulpfile.js`:

```javascript
var mdvars = require('gulp-mdvars');
var marked = require('gulp-marked');

gulp.task('mdvars', function() {
  gulp.src(['assets/contents/*.md'])
    .pipe(mdvars({
      prop: 'metadata', // Datas will be set to the file object in the given property
     }))
    .pipe(marked()) // Do whatever you want with the cleaned up datas
    .pipe(gulp.dest('www/'));
});
```

```js
var test2 = "require";
```

`gulp-mdvars` is build on top of [mdvars](https://github.com/nfroidure/mdvars)
 and [varstream](https://github.com/nfroidure/VarStream) NPM modules. Please
 report specific issues in the corresponding repository.

## API

### mdvars(options)

#### options.prop
Type: `String`
Default value: `'metadata'`

A string value indicating in wich property metadatas must be filled.

## Stats

[![NPM](https://nodei.co/npm/gulp-mdvars.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-mdvars/)
[![NPM](https://nodei.co/npm-dl/gulp-mdvars.png)](https://nodei.co/npm/gulp-mdvars/)