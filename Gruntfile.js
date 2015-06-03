'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'routes.js', 'models/**/*.js',
              'test/**/*.js', 'lib/**/*.js']
      },
      options: {
        jshintrc: './config/.jshintrc',
        ignores: ['./test/client/bundle.js']
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      },
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: true,
        ui: 'bdd',
        reporter: 'tap'
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'bundle.js'
        }
      },
      karma_test: {
        entry: __dirname + '/test/karma_tests/test_entry.js',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
        }
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }

  });

  grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
  grunt.registerTask('karmatest', ['webpack:karma_test', 'karma:test']);
  grunt.registerTask('build:test', ['webpack:test']);
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
};
