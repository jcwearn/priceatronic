var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var index = path.join(__dirname, "../", "views/index.html");
  res.sendFile(index);
});

module.exports = router;
