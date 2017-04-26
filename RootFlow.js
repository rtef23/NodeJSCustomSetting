#!/usr/bin/env node

var os = require('./utils/OS');
var config = require('./private/configs/serverConfig.json');
var util = require('util');

os.getIP('ipv4').then(function(succ){
  config.path = process.cwd();

  console.log('######SERVER INFO######\nIP : %s\nProject path : %s', succ, config.path);
  var httpServer = require(config.path + '/bin/WebFlow')({
    "server-name" : "NewHTTPServerName",
    "project-path" : config.path,
    "protocol" : config.http.protocol,
    "port" : config.http.port,
    "ip" : succ
  }).then(function(succ){
    //success when http server launch
    console.log('###### E N D ######');
  }).catch(function(err){
    //fail when http server launch
    throw new Error(util.format('Error occurs on launching http server\n%s', err));
  });
}).catch(function(err){
    throw new Error('Error occurs on reading server IP addr');
});
