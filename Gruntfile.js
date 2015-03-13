var _ = require('lodash');

module.exports = function(grunt) {

  var updateDefaults = function(defaults, override){
    if (override.file){
      defaults.file = override.file;
    }

    if (override.folder) {
      defaults.folder = override.folder;
    }

    if (override.theme) {
      defaults.theme = override.theme;
    }
  };

  // Read configuration from _config.yml
  var configuration = grunt.file.readYAML('config.yml');
  var defaults = configuration.preset.default;

  grunt.initConfig({

    configuration: configuration,
    defaults: defaults,

    copy: {
      resume: {
        src: '<%= defaults.folder %>/<%= defaults.file %>',
        dest: 'resume.json',
      },
    },
    watch: {
      resume: {
        files: ['<%= defaults.folder %>/*.{json,jpg}'],
        tasks: ['copy:resume', 'shell:index'],
        options: {
          event: ['added', 'changed'],
          livereload: true
        }
      }
    },
    shell: {
      serve: {
        command: 'resume serve',
        // options: {
        //   stderr: true,
        //   execOptions: {
        //     cwd: 'tasks'
        //   }
        // }
      },
      index: {
        command: 'node export index.html'
      },
      pdf: {
        command: 'resume export -t <%= defaults.theme %> resume.pdf'
      },
      html: {
        command: 'resume export -t <%= defaults.theme %> resume.html'
      },
      md: {
        command: 'resume export -t <%= defaults.theme %> resume.md'
      },
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dist: {
        options: {
          open: false,
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  // Load the plugin that watches file changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // lite web server
  grunt.loadNpmTasks('grunt-contrib-connect');



  // copy resume.json and resume.jpg, serve the current theme (calls index.js)
  grunt.registerTask('serve', ['copy:resume', 'shell:index','connect:dist', 'watch:resume']);

  // create a resume.pdf
  grunt.registerTask('pdf', 'export a pdf based on resume.json', function(theme){
    // extend with pdf defaults
    _.assign(defaults, configuration.preset['pdf']);

    // passed resume presets
    if (theme) {
      _.assign(defaults, configuration.preset[theme]);
    }
    grunt.task.run('shell:pdf');
  });

  grunt.registerTask('html', 'export a html based on resume.json', function(theme){
    // extend with pdf defaults
    _.assign(defaults, configuration.preset['html']);

    // passed resume presets
    if (theme) {
      _.assign(defaults, configuration.preset[theme]);
    }
    grunt.task.run('shell:html');
  });

  grunt.registerTask('default', ['serve']);

};
