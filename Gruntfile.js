module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Name of project folder
    var folder = grunt.option('project');

    grunt.initConfig({
        // Deploy to FTP server
        'sftp-deploy': {
            build: {
                auth: {
                    host: 'ftp2.ftptoyoursite.com',
                    authKey: 'smgKey'
                },
                src: 'projects/' + folder,
                dest: '/c3charts/projects/' + folder,
                serverSep: '/'
            }
        }
    });

    grunt.registerTask('deploy', [
        'sftp-deploy'
    ]);
};
