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
});