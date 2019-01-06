let request = require('request');

request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function(err,response,body){
    let bodyjson = JSON.parse(body);
    let randomQuote = bodyjson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;
});

setInterval(() => {
    request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",function(err,response,body){
    let bodyjson = JSON.parse(body);
    let randomQuote = bodyjson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuote;
});
}, 50000);