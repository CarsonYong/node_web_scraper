// var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://substack.net/images/'
var base = 'http://substack.net'

request(url, function(error, response, html){
  
  if(!error && response.statusCode == 200) {
    response.setEncoding('utf-8');
    var $ = cheerio.load(html);
    var data ="";
    $('tr').each(function(i, element){
      // var td = $(this).prev();
      var a = $(element);
      var td = $(a).children().next();
      var test = a.text().match(/\([rwd-]*\)/g)
      var filePermissions = new Array(test).join('(');
      var fileType = new Array($(td[1]).children().text().match(/.\w{3}$/)).join('(');
      var path = $(td[1]).children().toString().split('"')[1];
      data += filePermissions+","+fileType+","+base+path +"\n"
      console.log(data)

    })
    fs.writeFile('./images.csv', data)
  }
})

