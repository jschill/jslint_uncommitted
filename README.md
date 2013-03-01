jslint_uncommitted
=================

JSLint uncommitted javascript-files in a Git repository using Node.js

You can also use the pre-commit hook to lint your javascript-files on the fly when committing to your repository.


Requirements
------------

* Git
* Node
* JSLint
* ..and probably a Mac. I haven't tested it elsewhere.


Installation
------------

* Put the jslint_uncommitted.js script somewhere in your git repository 
* Run "node jslint_uncommitted.js"

Or if you want to use the pre-commit hook

* Put the jslint_uncommitted.js script somewhere in your git repository 
* Put the pre-commit in your {project_root_dir}/.git/hooks directory
* Change the LINTSCRIPT variable in pre-commit to point to where you placed jslint_uncommitted.js
* Make sure the pre-commit is executable, ie: "chmod +x pre-commit"


Credits
-------
* https://github.com/jrburke/dvcs_jslint
* https://github.com/wbecker/dvcs_hook-jslint-node
* http://www.madr.se/b/jslint-git-hook
* http://stackoverflow.com/questions/1837681/pre-commit-hook-for-jslint-in-mercurial-and-git