
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        themeHeader: '/*!\n' +
            ' * Theme Name: <%= pkg.theme.name %>\n' +
            ' * Theme URI: <%= pkg.theme.uri %>\n' +
            ' * Author: <%= pkg.theme.author %>\n' +
            ' * Author URI: <%= pkg.theme.authorUri %>\n' +
            ' * Description: <%= pkg.description %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' * License: <%= pkg.theme.license %>\n' +
            ' * License URI: <%= pkg.theme.licenseUri %>\n' +
            ' * Text Domain: <%= pkg.theme.textDomain %>\n' +
            ' * Tags: <%= pkg.theme.tags %>\n' +
            ' * <%= pkg.theme.additionalInfo %>\n' +
            ' */\n',

        // https://github.com/sindresorhus/grunt-header
        header: {
            dist: {
                options: {
                    text: '<%= themeHeader %>'
                },
                files: {
                    // dest & src are both the resulting css file
                    'style.css': 'style.css'
                }
            },
            dev: {
                options: {
                    text: '<%= themeHeader %>'
                },
                files: {
                    'style.css': 'style-dev.css'
                }
            }
        },
        // https://github.com/sass/node-sass
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true,
                },
                files: {
                    'style.css': 'sass/style.scss',
                }
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true,
                },
                files: {
                    'style-dev.css': 'sass/style.scss',
                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ios 6', 'android 4'],
                map: false
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/',
            },
            // prefix main file
            single_file: {
              options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ios 6', 'android 4'],
                map: false
              },
              src: 'style.css',
              dest: 'style.css'
            },
        },
        

        // javascript linting with jshint
        jshint: {
            options: {
                "force": true
            },
            all: [
                'Gruntfile.js',
                '/js/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            options: {
                sourceMap: false
            },
          /*
            main: {
                files: {
                    'js/main.js': [
                        'sass/bower_components/fastclick/index.js',
                        'sass/bower_components/drop/dist/js/classList.js',
                        'sass/bower_components/astro/dist/js/astro.js',
                        'sass/bower_components/drop/dist/js/drop.js',
                        'js/components/skip-link-focus-fix.js',
                        'js/components/init.js',
                    ],
                    'js/html5.js' : [
                        'sass/bower_components/html5shiv-dist/html5shiv.js'
                    ],
                    'js/jquery.flexslider-min.js' : [
                        'js/components/jquery.flexslider.js'
                    ],
                    'js/jquery.mixitup-min.js' : [
                        'js/components/jquery.mixitup.js'
                    ]
                }
            }
            */
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        // watch for changes and trigger sass, jshint, uglify and livereload
        // if we're watching, then we're deving
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['sass:dev', 'autoprefixer',  'header:dev']
            },
            js: {
                files: 'js/components/init.js',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            livereload: {
                options: { livereload: true },
                files: ['style.css', 'js/*.js', '*.php', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}']
            },
        },

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-header');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // register task
    // default to dev
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['sass:dist', 'autoprefixer', 'jshint', 'uglify', 'header:dist', 'imagemin']);
};
