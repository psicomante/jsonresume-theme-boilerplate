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
      main: {
        src: '<%= defaults.folder %>/<%= defaults.file %>',
        dest: 'resume.json',
      },
    },

    shell: {
      serve: {
        command: 'resume serve'
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
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // copy resume.json and resume.jpg, serve the current theme (calls index.js)
  grunt.registerTask('serve', ['copy:main', 'shell:serve']);

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
