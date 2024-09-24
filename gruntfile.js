"use strict";

module.exports = function (grunt) {
  const sass = require("node-sass");

  // Load all Grunt tasks that are listed in package.json
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    exec: {
      jekyllServe: {
        cmd: "bundle exec jekyll serve",
      },
      jekyllBuild: {
        cmd: "bundle exec jekyll build",
      },
    },

    // watch for files to change and run tasks when they do
    watch: {
      sass: {
        files: ["_sass/**/*.scss"],
        tasks: ["sass"],
      },
      js: {
        files: ["_js/*.js"],
        tasks: ["uglify"],
      },
    },

    // compile sass
    sass: {
      options: {
        implementation: sass,
        style: "compressed",
        sourceMap: true,
      },
      build: {
        files: {
          "css/styles.min.css": "_sass/styles.scss",
        },
      },
    },

    // Minify JS
    uglify: {
      options: {
        mangle: false,
      },
      my_target: {
        files: {
          "js/scripts.min.js": ["_js/bootstrap.min.js", "_js/img-lazy-load.js"],
        },
      },
    },

    // run tasks in parallel
    concurrent: {
      serve: ["uglify", "sass", "watch", "exec:jekyllServe"],
      options: {
        logConcurrentOutput: true,
      },
    },
  });

  // Register the grunt serve task
  grunt.registerTask("serve", ["concurrent:serve"]);

  // Register the grunt build task
  grunt.registerTask("build", ["sass", "exec:jekyllBuild"]);

  // Register build as the default task fallback
  grunt.registerTask("default", ["exec:jekyllServe"]);
};
