var path = require('path');
const tt = require("./index.js")
console.log(process.argv);
var argv = require('yargs').argv;
const config = {
  assertionFormat: 'expect',
  testModule: 'request',
  templatesPath: ''
};

let swaggerPath = "";
console.log(argv["swagger"]);


if (argv["swagger"]) {
  swaggerPath = argv["swagger"];
}
else {
  console.log("--swagger {path} is required, where path is the path to the swagger.json file. ")
  return;
}

let pathToSwagger = path.resolve(__dirname, swaggerPath);
console.log(pathToSwagger);
let swagger = require(pathToSwagger);

if (argv["msmode"]) {
  swagger.host = "localhost:' + appConfig.listenPort + '";
  config.msMode = true;
  config.msPath = "../../lib/" + swagger.info.title + "-server.js";
}
if (argv["mspath"]) {
  config.msPath = argv["mspath"];
}

if (argv["host"]) {
  swagger.host = argv["host"];
}


tt.testGen(swagger, config);
