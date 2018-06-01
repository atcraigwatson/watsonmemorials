'use strict';

module.exports = function (grunt) {

    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        exec: {
            jekyllServe: {
                cmd: 'bundle exec jekyll serve',
            },
            jekyllBuild: {
                cmd: 'bundle exec jekyll build',
            },
        },

        // watch for files to change and run tasks when they do
        watch: {
            sass: {
                files: ['_sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['_js/*.js'],
                tasks: ['uglify']
            }
        },

        // compile sass
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            build: {
                files: {
                    'css/style.min.css': '_sass/style.scss'
                }
            }
        },

        postcss: {
            options: {
                map: true,
        
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }),
                ]
            },
            dist: {
                src: '_site/css/*.css'
            }
        },

        // Minify JS
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/scripts.min.js': ['_js/bootstrap.min.js', '_js/arrow-toggle.js', '_js/shortlist.js', '_js/limit-item-load.js']
                }
            }
        },

        // run tasks in parallel
        concurrent: {
            serve: [
                'uglify',
                'sass',
                'watch',
                'exec:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        },

    });

    // Register the grunt serve task
    grunt.registerTask('serve', ['concurrent:serve']);

    // Register the grunt build task
    grunt.registerTask('build', ['sass', 'exec:jekyllBuild', 'postcss']);

    // Register build as the default task fallback
    grunt.registerTask('default', ['exec:jekyllServe']);

};