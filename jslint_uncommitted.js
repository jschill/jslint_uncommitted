(function () {
  var fileToLint = process.argv[2],
    exec = require('child_process').exec,
    jsExtRegExp = /\.js\s*$/,
    filesToLintCmd = 'git diff --name-only',
    gitRootCmd = 'git rev-parse --show-toplevel',
    lintSettings = '--indent 2 --maxerr 10 --node --devel --browser --sloppy --nomen --eqeq --vars --plusplus',
    lintPredef = '--predef Backbone';

  var lintFiles = function (gitRoot, files) {
    var jsLintCmd = gitRoot + '/node_modules/.bin/jslint ' + lintSettings + ' ' + lintPredef,
      isOkRegExp = / is OK\./, /* Example: "filname.js is OK." */
      filename,
      cmd;

    // If single file, re-create as array
    if (typeof files === 'string') {
      files = [ files ];
    }

    files.forEach(function (file) {
      if (jsExtRegExp.test(file)) {
        cmd = jsLintCmd + ' ' + gitRoot + '/' + file;
        exec(cmd, function (error, stdout, stderr) {
          if (((stdout.length > 0)  && !isOkRegExp.test(stdout)) || (stderr.length > 0)) {
            console.log(stdout);
          } else {
            console.log('JSLint OK');
          }
        });
      }
    });
  };

  var run = function (gitRoot) {
    if (fileToLint === undefined) {
      exec(filesToLintCmd, function (error, stdout, stderr) {
        lintFiles(gitRoot, stdout.split("\n"));
      });
    } else {
      lintFiles(gitRoot, fileToLint);
    }
  };

  exec(gitRootCmd, function (error, stdout, stderr) {
    run(stdout.trim());
  });
}());
