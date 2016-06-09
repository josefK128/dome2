#!/bin/bash


echo "Running all tests (**/*.spec.js) in the test/modules branch"
echo "starting back-end server to support e2e-test"
node ../app/index 0 &
s_pid=$!
sleep 3
entry="cygstart http://localhost/meta-forms-mf2/mf2/test/index.html"
command=$entry
$command
c_pid=$!
wait $s_pid
