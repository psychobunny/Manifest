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
		sass: {
			development: {
				files: {
					"static/bin/manifest.css": "source/manifest.scss"
				}
			}
		},
		watch: {
			css: {
				files: "source/**/*.scss",
				tasks: ['sass'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: ["views/**/*.tpl"],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['express:dev', 'sass', 'watch']);
};