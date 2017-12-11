module.exports = function(grunt)
{
    // loaded grunt plugins
    grunt.loadNpmTasks('grunt-contrib-connect');
    // build grunt commands
	grunt.initConfig(
	{
        connect: {
			dev: {
				options: {
					port: 8080,
					base: "./",
					keepalive: true
				}
			}   
        }
    });

    // grunt executables
    grunt.registerTask('server',  ['connect:dev']);

}