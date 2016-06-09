#!/bin/bash

echo "Running all tests (**/*.spec.js) in the test/modules/unit branch"
entry="cygstart http://localhost/meta-forms-mf2/mf2/test/index_unit.html"
command=$entry
$command
