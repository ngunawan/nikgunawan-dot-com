module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
    
    grunt.initConfig({
        less: {
            options: {
                cleancss: true, //prettify css
                syncImport: true, //reads @import synchronously
                paths: ['css/less']
            },
            src: {
                expand: true,
                cwd: "css/less", //all src matches are relative to this path
                src: "*.less", //pattern to match
                dest: "css", //destination path prefix
                ext: ".css" //replace any existing value with this extension in generated dest path
            }
        },
        watch: {
            less: {
                files: 'css/less/*.less',
                tasks: ['less', 'postcss', 'cssmin']
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/main.min.css': ['css/style.css', 'css/mediaquery.css']
                }
            }
        },
        postcss: {
            options: {
//                map: true, // inline sourcemaps
//
//                // or
//                map: {
//                    inline: false, // save all sourcemaps as separate files...
//                    annotation: 'dist/css/maps/' // ...to the specified directory
//                },
                processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        }


    });

    grunt.registerTask('default', ['less', 'postcss', 'cssmin', 'watch']);

};
