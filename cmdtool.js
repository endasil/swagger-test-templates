const path = require('path');
const fs = require('fs');
const tt = require("./index.js")
console.log(process.argv);
const argv = require('yargs').argv;
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
let savePath = "./generated-tests/specs/";
if(argv["savepath"])
{
  savePath = argv["savepath"];
}
let output = tt.testGen(swagger, config);

try
{
  fs.mkdirSync(savePath);
}
catch(err)
{
  if(err.code !== "EEXIST")
  {
    throw err;
  }
}

for(let i = 0; i < output.length; i++ )
{
  console.log("saving file: " + savePath + output[i].name);
  fs.writeFileSync(savePath + output[i].name, output[i].test);
}
