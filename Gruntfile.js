'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      jasmine: {
        src: ['test/karma_tests/*test.js'],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true,
            expect: true
          }
        }
      },
      mocha: {
        src: ['test/server/*test.js'],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        }
      },
      server: {
        src: ['Gruntfile.js', 'server.js', 'models/*.js', 'routes/*.js']
      },
      client: {
        src: ['app/**/*.js'],
        options: {
          globals: {
            angular: true
          }
        }
      },
      options: {
        node: true
      }
    },

    simplemocha: {
      dev: {
        src: ['test/server/*.js']
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
    },

    watch: {
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.registerTask('karmatest', ['webpack:karma_test', 'karma:test']);
  grunt.registerTask('mochatest', ['simplemocha:dev']);
  grunt.registerTask('test:all', ['karmatest', 'mochatest']);
  grunt.registerTask('build:test', ['webpack:test']);
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('jshint:all', ['jshint:jasmine', 'jshint:mocha', 'jshint:server', 'jshint:client']);
};
