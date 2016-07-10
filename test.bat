echo "Running all tests (**/*.spec.js) in the test/e2e/modules branch"
echo "starting back-end server to support e2e-test"
start node ./studio/index   
TIMEOUT /T 3
start /WAIT cmd /c start chrome http://localhost/dome2/app/index.e2e.html
