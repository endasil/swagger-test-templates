For use with microservices

Add the following dependency to package.json
"swagger-test-templates": "https://github.com/endasil/swagger-test-templates.git"
and run a npm install / update
Add the following script

"gentests": "node node_modules/swagger-test-templates/cmdtool.js --swagger ../../config/swagger.json --msmode",

generate test templates by running 
npm run gentests
The templaes will now appear in the generated-tests folder
