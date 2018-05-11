

$('.testBtn').on("click", function (event) {
    var search = $('#searchTerm').val();
    var records = $('#numberOfRecords').val();

    var startyear = $('#startYear').val();//yyyymmdd

    var endyear = $('#endYear').val();//yyyymmdd

    var queryUrl;
    if (search && !startyear && !endyear) {//gives whatever search
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&q=" + search;
    }
    else if (search && startyear && endyear) {//gives specific search
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&page=0" + "&q=" + search + "&begin_date=" + startyear + "&end_date=" + endyear;

    }
    else {
        alert("please input at least search");//tells user to at least put search item
    }


    event.preventDefault();


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        console.log(Object.keys(response));

        console.log(response.response['docs']);
      
     
            var doc= response.response['docs'];
            




        console.log(doc[0]['byline'].original);

        for (var i = 0; i < records; i++) {
            var pubdate = (doc[i].pub_date).slice(0, 10);
            var author = (doc[i]['byline'].original);

            var newdiv = $('<div>');
            var li = $('<li>');
            newdiv.addClass("eachArticle");
            var p = $('<p>');

            p.text(author);
            newdiv.append(p);

            var p = $('<p>');
            p.text(" Publication Date: " + pubdate);

            var a = $('<a>');
            a.attr("href", doc[i].web_url);
            a.text(doc[i].snippet);

            //newdiv.append(p);
            newdiv.append(p);

            newdiv.append(a);
            li.append(newdiv);
            $('.ordered').append(li);
        }


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