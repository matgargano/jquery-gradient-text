/*global module, grunt */

module.exports = function(grunt) {
  'use strict';
  var paths = {
    'scripts': [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/gradient-text/dist/jquery.gradient.text.js',
      'js/_*.js',

    ],
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: [
          'sass/*.scss',
          'sass/**/*.scss',
        ],
        tasks: ['build-css'],
      },
      js: {
        files: [
          'js/_*.js',
          'js/**/_**.js',
          '!js/dist/*',
        ],
        tasks: ['build-js'],
      },

    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      target: {
        files: {
          'css/dist/style.min.css': ['css/dist/style.css'],
        },
      },
    },
    sass: {

      options: {
        loadPath: [
          'sass',

        ],
      },
      production: {
        options: {
          style: 'expanded',
          sourcemap: 'auto',
          precision: 4,
        },
        files: {
          'css/dist/style.css': 'sass/main.scss',
        },
      },
    },
    imagemin: {
      theme: {
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: '**/*.{png,jpg}',
            dest: 'images/',
          },
        ],
      },
    },

    shell: {

      jekyllServe: {
        command: 'jekyll serve',
      },
      jekyllBuild: {
        command: 'jekyll build',
      },

    },
    uglify: {
      'theme': {
        'options': {
          'preserveComments': false,
        },
        'files': {

          'js/dist/main.min.js': paths.scripts,
        },
      },
    },

    jshint: {
      all: ['js/_main.js'],
      options: {
        'forin': true,
        'noarg': true,
        'noempty': true,
        'eqeqeq': true,
        'bitwise': true,
        'undef': true,
        'unused': false,
        'curly': true,
        'browser': true,
        'strict': false,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('build', [
    'build-js',
    'build-css',
    'shell:jekyllBuild']);

  grunt.registerTask('serve', [
    'build-js',
    'build-css',
    'shell:jekyllServe']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build-css',
      ['sass:production', 'cssmin']);
  grunt.registerTask('build-js',
      ['jshint', 'uglify:theme']);
  grunt.registerTask('build-only', ['build-css','build-js']);

};
