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
  var configurationFile = grunt.file.readYAML('config.yml');

  var config = {
    file: configurationFile.resume.default.file,
    folder: configurationFile.resume.default.folder,
    theme: configurationFile.resume.default.theme
  };

  grunt.initConfig({

    config: config,

    copy: {
      main: {
        src: '<%= config.folder %>/<%= config.file %>',
        dest: 'resume.json',
      },
    },

    shell: {
      serve: {
        command: 'resume serve'
      },
      pdf: {
        command: 'resume export -t <%= config.theme %> resume.pdf'
      },
      html: {
        command: 'resume export -t <%= config.theme %> resume.html'
      },
      md: {
        command: 'resume export -t <%= config.theme %> resume.md'
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // copy resume.json and resume.jpg, serve the current theme (calls index.js)
  grunt.registerTask('serve', ['copy:main', 'shell:serve']);
  //
  grunt.registerTask('pdf', ['shell:pdf']);
  grunt.registerTask('html', ['shell:html']);
  grunt.registerTask('md', ['shell:md']);
  grunt.registerTask('default', ['serve']);

};
