(function () {
  'use strict';

  // common required modules
  var path = require('path');
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var gutil = require('gulp-util');
  var runSequence = require('run-sequence').use(gulp);

  // modules required in `md` task
  var marked = require('marked');
  var gulpMarked = require('gulp-marked');
  var hljs = require('highlight.js');
  var buffer = require('gulp-buffer');
  
  // modules required in `express` task
  var express = require('express');
  var serveIndex = require('serve-index');
  var compression = require('compression');

  // other modules
  var browserSync = require('browser-sync');
  var del = require('del');


  /**
  * @Default config info
  **/
  var config = {
    baseUrl: '/',
    dir: {
      src: 'md-src',
      dist: 'dist',
      destDocs: 'docs'
    },
    paths: {
      cwd: process.cwd()
    },
    server: {
      hostname: 'localhost',
      port: '9000'
    }
  };

  var srcPath = path.join(config.paths.cwd, config.dir.src, '**', '/*.md');
  var destPath = path.join(config.paths.cwd, config.dir.dist);
  var docsDestPath = path.join(destPath, config.dir.destDocs);


  function renderer() {
    var renderer = new marked.Renderer();

    renderer.heading = function (text, level) {
      var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      return '<h' + level + '>' +
                '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                  '<span class="octicon octicon-link"></span>' +
                  text +
                '</a>' +
              '</h' + level + '>';
    };

    return renderer;
  }

  function wrap( contents ) {

    var template = 
      '<!DOCTYPE html>\n'
        +'<html>\n'
          +'<head>\n'
            +'<meta charset="utf-8">\n'
            +'<meta http-equiv="X-UA-Compatible" content="IE=edge">\n'
            +'<title>Markdown</title>\n'
            +'<link rel="stylesheet" href="/assets/css/md-gfm.css">\n'
            +'<link rel="stylesheet" href="/assets/css/sprint-hl.css">\n'
            +'<link rel="stylesheet" href="/assets/css/sprint-md.css">\n'
          +'</head>\n'
          +'<body>\n'
            +'<div class="markdown-format container">\n'
              +'<%= content %>\n'
            +'</div>\n'
          +'</body>\n'
        +'</html>';
    
    return gutil.template( template, {
      content : contents.toString(),
      file    : contents
    });
  }

  /**
  * @task: Markdown task
  * @desc: convert .md files into .html and generates proper html tags to render it into the browser
  * @command: `gulp md2html`
  **/
  gulp.task('md2html', function(cb) {

    var options = {
      renderer: renderer(), 
      gfm: true, 
      smartypants: true, 
      highlight: function(code, lang) {
        var lang = lang ? lang : 'html';

        hljs.configure({
          tabReplace: '    ',         // 4 spaces
          classPrefix: 'sprint-'      // don't append class prefix
                                      // … other options aren't changed
        })

        var result = hljs.highlight(lang, code);
        return result.value;

      }
    }

    gulp.src(srcPath)
      .pipe(gulpMarked(options))
      .pipe(buffer().on('data', function(file) {
        var contents = String(file.contents);
        file.contents = Buffer(wrap(contents));
      }))
      .pipe(gulp.dest(docsDestPath))

    cb();
  });



  /**
  * @task: Express Task
  * @desc: helps to start and listening to the server
  * @command: `gulp express`
  **/
  gulp.task('express', function (cb) {

    var app = express();

    app.post(config.baseUrl, function(req, res, next) {
        req.method = 'GET';
        next();
    });

    app.use(compression({
        threshold: 512
    }));

    app.use(config.baseUrl, express.static(config.dir.dist));

    app.use(config.baseUrl, serveIndex(config.dir.dist, {
        icons: true
    }));

    app.listen(config.server.port, cb);

  });

  /**
  * @task: Browser-sync Task
  * @desc: helps to open the browser automatically
  * @command: `gulp browser-sync`
  **/
  gulp.task('browser-sync', ['express'], function (cb) {

    var hostname = config.server.hostname;

    var watchFiles = [path.join(config.dir.dist, '**', '*')];
    browserSync({
      host: hostname,
      proxy: hostname+':'+config.server.port,
      files: watchFiles,
      open: true,
      startPath: path.join(config.baseUrl, config.dir.destDocs)
    }, cb);

  });

  /**
  * @task: Watch
  * @desc: helps to watch .md files for changes
  * @command: `gulp watch`
  **/
  gulp.task('watch', function (cb) {
    // Watch for .md file changes
    $.watch(config.dir.src+'/**/*.md', $.batch(function(events, done){
        runSequence('md2html', done);
    }));
  });


  /**
  * @task: Serve
  * @desc: helps to start the server and opens the browser automatically
  * @command: `gulp serve`
  **/
  gulp.task('serve', function (cb) {
    runSequence(['browser-sync', 'watch'], cb);
  });


  /**
  * @task: Serve
  * @desc: helps to start the server and opens the browser automatically
  * @command: `gulp serve`
  **/
  gulp.task('clean:dist', function (cb) {

    del([
      path.join(docsDestPath, '**', '*')
    ], cb);

    cb();
  });


  /**
  * @task: Default
  * @desc: default task which execute other tasks
  * @command: `gulp`
  **/
  gulp.task('default', ['clean:dist'], function(cb) {
    runSequence('md2html', 'serve', cb);
  });

})();

