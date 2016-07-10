#!/bin/bash

echo "Running all tests (**/*.spec.js) in the test/unit/modules branch"
entry="cygstart http://localhost/dome2/app/index.test.html"
command=$entry
$command
