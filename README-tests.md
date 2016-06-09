* __README-test__

* [1] workflow for tests is generally:
* [a] write test in typescript (or javascript - skip [b])
* [b] compile to javascript via 'gulp ts2js-test' (or using tsc directly)
* [c] add the js-file-path to the array arg of Promise.all in test/index.html
* [d1] run the all the tests in default browser:
  * $> gulp test
* [d2] run the only unit tests in default browser:
  * $> gulp unit

* NOTE: for other browsers:
  * use the URLs for ./test/index.html or ./test/index_unit.html respectively


* NOTE: without gulp:
* [~d1] $> bash test.sh (for cygwin - path may need to be edited) 
* [~d1w] $> test.bat (for windows - path may need to be edited) 
  * kill server by ctrl-c
* [~d2] $> bash test_unit.sh (for cygwin - path may need to be edited)
* [~d2w] $> test_unit.bat (for windows - path may need to be edited) 

* NOTE: edit bash cygstart to 'xdg-open' for linux
  * default browser
* NOTE: edit bash cygstart to 'open' for mac 
  * default-browser as example - change browser as desired via 'open -a <name>' 



