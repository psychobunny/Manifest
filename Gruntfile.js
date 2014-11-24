module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			dev: {
				options: {
					script: 'server.js'
				}
			},
		},
		less: {
			development: {
				files: {
					"public/bin/manifest.css": "source/manifest.less"
				}
			}
		},
		watch: {
			css: {
				files: "source/*.less",
				tasks: ['less'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: ["public/*.html", "public/*.js"],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['express:dev', 'less', 'watch']);
};