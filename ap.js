

$('.testBtn').on("click",function(event){
    var search=$('#searchTerm').val();
    var records=$('#numberOfRecords').val();
    var queryURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883"+"&q="+search+"?page=0";
    event.preventDefault();

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
    console.log(response);
});

});







/*
var url = "https://api.nytimes.com/svc/suggest/v1/timestags";
url += '?' + $.param({
 'api-key': "85a9b5f65ee34104ba2b489ac87cb883",
 'query': "north korea",
 'max': 10
});
$.ajax({
 url: url,
 method: 'GET',
}).done(function(result) {
 console.log(result);
}).fail(function(err) {
 throw err;
});*/