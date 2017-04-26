module.exports = function(config){
  var express = require('express');
  var router = express.Router();
  var util = require('util');
  var fs = require('fs');

  router.get('/', function(req, res){
    return res.render(config['project-path'] + '/views/home');
  });

  router.get('/resources/:target_type/:target', function(req, res){
    switch (req.params.target_type) {
      case 'js':{
        switch (req.params.target) {
          case 'ui-bootstrap-tpls-2.4.0.min':
            break;
          default:
          {
            return res.sendStatus(404);
          }
        }
      }
        break;
      case 'ejs':{
        switch (req.params.target) {
          case 'home':
          case 'tab1':
          case 'tab2':
            break;
          default:
          {
            return res.sendStatus(404);
          }
        }
        return res.render(util.format('%s/views/%s/%s', config['project-path'], req.params.target_type, req.params.target));
      }
      default:
      {
        return res.sendStatus(404);
      }
    }

    return fs.readFile(util.format('%s/views/%s/%s.%s', config['project-path'], req.params.target_type, req.params.target, req.params.target_type), function(err, file){
      if(err){
        // console.error(err);
        return res.sendStatus(500);
      }
      return res.status(200).send(file);
    });
  });

  return router;
}
