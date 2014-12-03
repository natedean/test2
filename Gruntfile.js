
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        css: {
           src: [
                 'styles/*'
                ],
            dest: 'combined.css'
        },
        js : {
            src : [
                'js/*'
            ],
            dest : 'combined.js'
        }
    },//concat
    cssmin : {
            css:{
                src: 'combined.css',
                dest: 'combined.min.css'
            }
        },//cssmin
    uglify : {
        js: {
            files: {
                'combined.js' : [ 'combined.js' ]
            }
        }
    }//uglify
  });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js' ]);

};//initConfig