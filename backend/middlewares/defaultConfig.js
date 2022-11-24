function defaultConfig(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-token");
  
  if ('OPTIONS' == req.method) {
      res.sendStatus(200);
  }
  else {
    next();
  }
}

export default defaultConfig;