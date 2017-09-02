/*global module, grunt*/

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON('package.json'),

    // Banner definitions
    meta: {
      banner: '/*\n' +
      ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      ' *  <%= pkg.description %>\n' +
      ' *  <%= pkg.homepage %>\n' +
      ' *\n' +
      ' *  Made by <%= pkg.author.name %>\n' +
      ' *  Under <%= pkg.license %> License\n' +
      ' */\n',
    },

    // Concat definitions
    concat: {
      options: {
        banner: '<%= meta.banner %>',
      },
      dist: {
        src: ['src/jquery.gradient.text.js'],
        dest: 'dist/jquery.gradient.text.js',
      },
    },

    // Lint definitions
    jshint: {
      files: ['src/jquery.gradient.text.js', 'test/**/*'],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    jscs: {
      src: 'src/**/*.js',
      options: {
        config: '.jscsrc',
      },
    },

    // Minify definitions
    uglify: {
      dist: {
        src: ['dist/jquery.gradient.text.js'],
        dest: 'dist/jquery.gradient.text.min.js',
      },
      options: {
        banner: '<%= meta.banner %>',
      },
    },
    watch: {
      files: ['src/*', 'test/**/*'],
      tasks: ['default'],
    },
    shell: {
      bower: {
        command: 'cd docs-src && npm install && grunt',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('travis', ['jshint']);
  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['jshint', 'build']);
};
