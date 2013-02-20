(function () {
  var self = this,
      exec = require('child_process').exec,
      okRegExp = /No problems found/,
      jsExtRegExp = /\.js\s*$/,
      filesToLintCmd = 'git diff --name-only',
      gitRootCmd = 'git rev-parse --show-toplevel',
      lintSettings = '--indent 2 --maxerr 10 --node --devel --browser --sloppy --nomen --eqeq --vars --plusplus',
      lintPredef = '--predef Backbone';

  exec(gitRootCmd, function (error, stdout, stderr) {
    run(stdout.trim());
  });

  var run = function (gitRoot) {
    exec(filesToLintCmd, function (error, stdout, stderr) {
      lintFiles(gitRoot, stdout.split("\n"));
    });
  };

  var lintFiles = function (gitRoot, files) {
    var jsLintCmd = gitRoot + '/node_modules/.bin/jslint ' + lintSettings + ' ' + lintPredef;
    var cmd;
    files.forEach(function (file) {
      if (jsExtRegExp.test(file)) {
        cmd = jsLintCmd + ' ' + gitRoot + '/' + file;
        exec(cmd, function (error, stdout, stderr) {
          if (((stdout.length > 0)  && !okRegExp.test(stdout)) || (stderr.length > 0)) {
            throw "JSLint error in " + file + "\n" + stdout;
          }
        });
      }
    });
  };
}());
