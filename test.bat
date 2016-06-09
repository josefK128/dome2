echo "Running all tests (**/*.spec.js) in the test/modules/unit branch"
echo "starting back-end server to support e2e-test"
start node ../app/index 0  
TIMEOUT /T 3
start /WAIT cmd /c start chrome http://localhost/meta-forms-mf2/mf2/test/index.html
