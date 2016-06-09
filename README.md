* __dome2 README__

* [1] clone the repo - call it, say, 'dome2' - cd to 'dome2'

* [2] run (as admin):
```npm install```

* [3] modify index.html
  * replace <base href= 'path to client-root'>
  * For example: suppose the repo is at $DOCUMENT_ROOT/k/dome2
  * then use:  <base href="/k/dome2/"> for the base href.
  * Then application URL = "http://(domain)/k/dome2/app/index-ts.html"
  *                     or "http://(domain)/k/dome2/app/index-js.html"
    * index-ts.html uses dynamic transpile from modules-ts ts-files to js
    * index-js.html uses statically transpiled js-files in modules

* [4] run in browser URL = http://(domain)/(pathOfDist)/dome2/app/index-ts.html
