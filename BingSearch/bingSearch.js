var query = 'ajay';

var acctKey = 'HO8LgLyuxFsT5zeV5kbgPbVHpg7v64KfqYK52mFaKlQ';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search/v1/Image';
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var request = require('request').defaults({
  headers:{
    'Authorization' : 'Basic ' + auth
  }
});


request.get({
  url : rootUri,
  qs  : {
    $format : 'json',
    Query   : "'" + query + "'", // the single quotes are required!
  }
}, function(err, response, body) {
  if (err)
    console.log ('Err:' + err);
  if (response.statusCode !== 200){
    console.log ('Invalid response:' + response.statusCode + response.body);
  }
  else{
    var results = JSON.parse(response.body);
    var fs = require('fs');
    //console.log(results.d.results);
    fs.writeFile('jsonOP.txt', results.d.results, function(err){
      if (err)
        console.log ('Erros writing file:' + err);
    });

    console.log(results.d.results.length);

    for (var i=0; i< results.d.results.length;i++){
      console.log(results.d.results[i].MediaUrl);
    }

    console.log ('End data');
  }
});
