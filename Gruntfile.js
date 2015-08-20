module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-concurrent');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
            // copy files from PROJECT to TMP
            toTMP:  {
                files: [
                    { expand: true, cwd: 'js/PROJECT/', src: ['**'], dest: 'js/TMP/' },
                ]
            },
            // copy files from TMP to IWG
            toBIN: {
                files: [
                    { expand: true, cwd: 'js/TMP/', src: ['**'], dest: 'js/BIN/' },
                ] 
            }
		},
		typescript: {
            base: {
                src: ['js/TMP/**/*.ts'],
                dest: './',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5', //or es3 
                    sourceMap: false,
                    removeComments: true,
                    declaration: false
                }
            }
        },
		clean: {
            // remove .ts files
            ts: ["js/TMP/**/*.ts"],
            // remove TMP folder
            tmp: ["js/TMP"]
        },
		
	});	
	
	    grunt.registerTask('default', ["clean:tmp",'copy:toTMP', 'typescript', 'clean:ts', "copy:toBIN" ]);

} 
