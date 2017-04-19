module.exports = function(grunt) {

  // Configure task(s)
  grunt.initConfig({

    // Leave me alone I'm all Grunt
    pkg: grunt.file.readJSON('package.json'),

    // Grunt Contrib Watch
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify:dev']
      },
      scss: {
        files: ['src/scss/*.scss'],
        tasks: ['sass:dev']
      }
    },

    // Grunt Contrib Uglify
    uglify: {
      build: {
        files: {
          'dist/scripts.min.js': ['src/js/*.js']
        }
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        files: {
          'dist/scripts.min.js': ['src/js/*.js']
        }
      }
    },

    // Grunt Sass
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'dist/style.min.css' : 'src/scss/index.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/style.min.css' : 'src/scss/index.scss'
        }
      }
    },

    // Grunt PostCSS
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        ]
      },
      dist: {
        src: 'dist/*.css'
      }
    },

    //Grunt Browser Sync
    browserSync: {
      dev: {
        bsFiles: {
          src : [
              'dist/*.css',
              '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch'); // Does NOT need a task registering use the "grunt watch" command to start watching for changes
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register task(s)
  grunt.registerTask('default', ['uglify:dev', 'sass:dev', 'postcss', 'browserSync', 'watch']); // Default tasks to run using the "grunt" command during development
  grunt.registerTask('build', ['uglify:build', 'sass:build', 'postcss']); // Build tasks to run using the "grunt build" command when the code is ready for production

}
