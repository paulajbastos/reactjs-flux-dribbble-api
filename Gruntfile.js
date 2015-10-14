module.exports = function(grunt) {

	var config = {
	    src: './Client',
	    dest: './wwwroot'
	};

	var files = {
	    entry: config.src + '/scripts/app.jsx',
	    code: [ config.src + '/scripts/*.js', config.src + '/scripts/*.jsx', config.src + '/scripts/**/*.js', config.src + '/scripts/**/*.jsx'],
	    styles: [ config.src + '/styles/sass/*.sass', config.src + '/styles/sass/*.scss', config.src + '/styles/sass/**/*.sass', config.src + '/styles/sass/**/*.scss' ],
	    html: config.src + '/*.html',
	    sass: config.src + '/styles/sass/bundle.scss'
	};

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
	    	dist: {
		        files: {
		          './Client/styles/bundle.css' : './Client/styles/sass/bundle.scss'
		        }
	      	}
	    },
		browserify: {
	        dist: {
	            options: {
	               transform: [["babelify", {"stage": 0}]  ]
	            },
	            files: {
	               "./Client/producion.js": [files.entry]
	            }
	        }
	    },
	    watch: {
	     	scripts: {
	        	files: [files.code],
	        	tasks: ['clean:scripts', "browserify",'concat:js'],
	        	//MUST INSTALL LIVE RELOAD ADD ON FOR BROWSER
		        options: {
		          livereload: true
		        }
	     	}
	     	,css: {
	        	files: [files.styles],
		        tasks: ['clean:styles','sass','concat:css'],
		        //MUST INSTALL LIVE RELOAD ADD ON FOR BROWSER
		        options: {
		          livereload: true
		        }
	    	}
	  	},
	  	clean: {
	        styles: {
	          src: [ './Client/styles/bundle.css', './Client/bundle.css' ]
	        },
	        scripts: {
	          src: [ './Client/producion.js', './Client/bundle.js' ]
	        },
	        build: {
		        files: [{
		          dot: true,
		          src: [
		            config.dest
		          ]
		        }]
	      	}
	    },
	  	concat: { 
			js: {
				src: [
					//'./Client/bootstrap/js/bootstrap.js',
					'./Client/producion.js'
				],
				dest: './Client/bundle.js'
			}
			,css: {
				src: [
					//'./Client/materialdesign/material.css',
					'./Client/bootstrap/css/bootstrap.css',
					'./Client/styles/bundle.css'
				],
				dest: './Client/bundle.css'
			}
		},
	    htmlmin: {
	      dist: {
	        options: {
	              removeComments: true,
	              collapseWhitespace: true
	            },  
	            files: {
	              './wwwroot/index.html': './Client/index.html'
	            }
	        }
	    },
	    cssmin: {
	      minify: {
	        options: {
	          	banner: '/*\n' +
	                  'Theme Name: Desafio - Front-End\n' +
	                  'Description: Desafio - Front-End\n' +
	                  'Author: Paula J Bastos\n' +
	                  'Theme URI: http://www.paulajbastos.com\n' +
	                  'Author URI: http://paulajbastos.com\n' +
	                  'Version: 1.0\n' +
	                  'License: GNU General Public License v2 or later\n' +
	                  'License URI: http://www.gnu.org/licenses/gpl-2.0.html\n' +
	                  //'Tags: white, orange, purple\n' +
	                  'Text Domain: Desafio Front-End\n' +
	                  '*/\n'
	        },
	        files: {
	          './wwwroot/bundle.css': ['./Client/bundle.css']
	        }
	      }
	    },
	    uglify: {
	        assets: {
	          	src: './Client/bundle.js',
	        	dest: './wwwroot/bundle.js'
	        }
	    },
	    copy: {
			main: {
				files: [
					{ expand: true, flatten: true, src: './Client/fonts/*', dest: './wwwroot/fonts/' }
				]
			}
		}	
  	});
  
	
  	grunt.loadNpmTasks('grunt-react');
  	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-htmlmin');
  	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean:build', 'sass', 'browserify', 'concat', 'htmlmin', 'cssmin', 'uglify', 'copy']);

};
