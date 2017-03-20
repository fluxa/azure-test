
module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        copy: {
            build: {
                expand: true,
                cwd: './public/',
                src: ['build_base.html'],
                dest: './public/',
                rename: function(dest, src) {
                    return dest + src.replace('_base','');
                }
            }
        }
        
        , less: {
            ui: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "./public/css/ui.css": "./app/client/less/ui.less"
                }
            }
        }
        
        , uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        }
        
        , clean: {
            js: {
                src: ['./public/build/script.js']
            }
            , css: {
                src: ['./public/build/style.css']
            }
            , all: {
                src: ['./public/build/*.css','./public/build/*.js']
            }
            , temp: {
                src: ['./public/build/*.css','./public/build/*.js']
            }
            , build: {
                src: ['./public/build/*.min.css','./public/build/*.min.js']
            }
            , buildTemp: {
                src: ['./public/css/ui.css']
            }
        }
        
        , rev: {
            files: {
                src: ['./public/build/*.min.{js,css}']
            }
        }
        
        , useminPrepare: {
            html: ['./public/build.html'],
            options:  {
                dest: './public/'
            }
        }
        
        , usemin: {
            html: ['./public/build.html']
        }
        , watch: {
            scripts: {
                files: ['app/client/less/*.less'],
                tasks: ['build-dev'],
                options: {
                    spawn: false,
                },
            },
        }
        
        , leadingIndent : {
            options: {
                indentation : "spaces"
            },
            zero: {
                options: {
                    indentation : "spaces",
                    failIfNoFiles: true
                },
                src: ['app/*/*.js', 'config/*.js', 'locales/*/*.json', 'app/client/less/*.less']
            }
        }
        , jsbeautifier : {
          files : ["app/**/*.js", 'config/*.js', 'app/client/less/*.less'],
          options : {
            css: {
                fileTypes: [".less"],
                indentSize: 4
            }
          }
        },
      
        jshint : {
           all: ["tests/**/*.js"],
           options: {
                undef: true,
                mocha: true,
                node: true,
            globals: {
                require: true,
                module: true,
                console: true
                }
            }
        }

        , mochaTest : {
           all: {
           options: {
                reporter: 'spec',
                //reporter: 'xunit',
                captureFile: './build/reports/mocha/xunit.xml',
                timeout: 600000
                },
                src: ['tests/**/*.js']
            }
        }
    });  

    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-leading-indent');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Tasks
    grunt.registerTask('tidy', ['leadingIndent','jsbeautifier']);
    grunt.registerTask('build-dev', ['clean:all',   'copy:build', 'less:ui']);
    grunt.registerTask('build',     ['clean:build', 'copy:build', 'less:ui', 'useminPrepare','concat',    'uglify', 'cssmin', 'rev', 'usemin', 'clean:buildTemp']);
    grunt.registerTask('build-js',  ['clean:build', 'copy:build', 'less:ui', 'useminPrepare','concat:js', 'uglify', 'rev', 'usemin', 'clean:js']);
    grunt.registerTask('build-css', ['clean:build', 'copy:build', 'less:ui', 'useminPrepare','concat:css','cssmin', 'rev', 'usemin', 'clean:css']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask("apiTests", ["jshint", "mochaTest:all"]);
};
