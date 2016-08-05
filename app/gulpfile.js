'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var spawn = require('child_process').spawn;
var mocha = require('gulp-mocha-co');
var request = require('request');
var async = require('async');
var appNode = null;

gulp.task('eslint', function() {
   return gulp.src('*.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});

gulp.task('watch', function(){
   this.failOnError = false;
   gulp.start(['test']);
   gulp.watch(['*.js', '**/*.js', '*.json', '**/*.json', '!node_modules/**'], ['eslint', 'test']);
});

gulp.task('default', ['eslint', 'watch']);

gulp.task('start-app', function(done){
   if(appNode)
      appNode.kill();

   appNode = spawn('node', ['app.js'], {stdio: 'inherit'});
   appNode.on('close', function(code){
      if(code === 8)
         gulp.log('Error detected, waiting for changes...');
   });
   var up = false;
   var escapeCount = 1000;
   async.doUntil(
     cb => {
       request('http://localhost:3000/status', (err)=>{
         up = !err;
         if(!up && escapeCount < 0)
           up = true;

         escapeCount--;
         setTimeout(() => cb(null), 25);
       });
     },
     () => up,
     () => done()
   );
});

gulp.task('test', ['start-app'], function(){
   return gulp.src('tests/**/*.js', {read: false})
              .pipe(mocha({reporter: 'spec'}));
});

process.on('exit', function() {
   if(appNode)
      appNode.kill();
});
