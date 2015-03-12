module.exports = function(grunt) {

  // Read configuration from _config.yml
  var configuration = grunt.file.readYAML('config.yml');

  grunt.initConfig({

    config: configuration.resume,

    copy: {
      main: {
        src: '<%= config.folder %>/<%= config.file %>',
        dest: 'resume.json',
      },
    },
    shell: {
      resume: {
        command: 'resume serve'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('resume:serve', ['copy:main', 'shell:resume']);
  grunt.registerTask('default', ['resume:serve']);

};
