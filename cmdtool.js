var path = require('path');
const tt = require("./index.js")
var argv = require('yargs').argv;
let config = {};
let swaggerPath = "";
console.log(argv["swagger"]);

if(argv["host"])
{
  config.host =argv["host"];
}

if(argv["swagger"]) {
  swaggerPath = argv["swagger"];
}
else {
  console.log("--swagger {path} is required, where path is the path to the swagger.json file. ")
  return;
}

if(argv["host"]) {
  config.host = argv["host"];
}
else {
  config.host = "`127.0.0.1:${appConfig.listenPort}`";
}

let pathToSwagger = path.resolve(__dirname, swaggerPath);
console.log(pathToSwagger);
let swagger = require(pathToSwagger);

const config2 = {
  assertionFormat: 'expect',
  testModule: 'request',
  templatesPath: ''
  //host: "127.0.0.1:" + appConfig.listenPort
  //  pathParams : {"x-mrg-client-type": "web", "cultureCode": "sv-SE", "market": "se"}
};

tt.testGen(swagger, config2);
