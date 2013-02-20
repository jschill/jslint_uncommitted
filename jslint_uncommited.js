(function () {
  var exec = require('child_process').exec,
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

    files.forEach(function (file) {
      filename = file.substr(file.lastIndexOf('/') + 1);
      if (jsExtRegExp.test(file)) {
        cmd = jsLintCmd + ' ' + gitRoot + '/' + file;
        exec(cmd, function (error, stdout, stderr) {
          if (((stdout.length > 0)  && !isOkRegExp.test(stdout)) || (stderr.length > 0)) {
            throw "JSLint error in " + file + "\n" + stdout;
          }
        });
      }
    });
  };

  var run = function (gitRoot) {
    exec(filesToLintCmd, function (error, stdout, stderr) {
      lintFiles(gitRoot, stdout.split("\n"));
    });
  };

  exec(gitRootCmd, function (error, stdout, stderr) {
    run(stdout.trim());
  });
}());
