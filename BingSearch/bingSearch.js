if (process.argv.length < 3){
  console.log('Usage bingSearch <search string> [<skip>]');
  return;
}

var query = process.argv[2];
var skip = 0;
if (process.argv[3])
  skip = process.argv[3];


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
    Adult   : "'" + 'Off' + "'",
    $skip   : skip,
    $top    :100,
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
    /*console.log(results.d.results);
    fs.writeFile('jsonOP.txt', results.d.results, function(err){
      if (err)
        console.log ('Erros writing file:' + err);
    });
    console.log(results.d.results.length);
    */

    fs.mkdir(query, function(err){
      if (err){
        console.log ('Error creating folder ' + query);
      }

      var downloadCount = 0;
      for (var i=0; i< results.d.results.length;i++){
        //console.log(results.d.results[i].MediaUrl);
        var ud = require('./urlDownload');
        
        ud(results.d.results[i].MediaUrl, query, function(data){
          downloadCount = downloadCount + 1;
          console.log (downloadCount + data);
          if (downloadCount === results.d.results.length){
            console.log('****************ALL DONE***********************');
          }
        });
      }
    });
  }
});
