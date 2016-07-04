#!/bin/bash


echo "Running all tests (**/*.spec.js) in the test/modules branch"
echo "starting back-end server to support e2e-test"
node ./studio/index &
s_pid=$!
sleep 3
entry="cygstart http://localhost/dome2/test/index.html"
command=$entry
$command
c_pid=$!
wait $s_pid
