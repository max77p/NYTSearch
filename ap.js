

$('.searchBtn').on("click", function (event) {
    var search = $('#searchTerm').val();
    var records = $('#numberOfRecords').val();

    var startyear = $('#startYear').val();//yyyymmdd

    var endyear = $('#endYear').val();//yyyymmdd

    var queryUrl;
    if (search && !startyear && !endyear) {//gives whatever search
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&q=" + search;
    }
    else if (search && startyear && endyear) {//gives specific search
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&q=" + search + "&begin_date=" + startyear + "&end_date=" + endyear;

    }
    else if (search && startyear && !endyear){
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&q=" + search + "&begin_date=" + startyear;
    }
    else if (search && !startyear && endyear){
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=85a9b5f65ee34104ba2b489ac87cb883" + "&q=" + search +"&end_date=" + endyear;
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

        var docLength;
        var doc = response.response['docs'];
        console.log(doc.length);
        if (records) {
            docLength = records;
        }
        else if (!records) {
            docLength = doc.length;
        }

        console.log(records);
        console.log(docLength);

        if('pub_date' in doc[0]){
            console.log("yes");
        }
        

        for (var i = 0; i < docLength; i++) {
            var pubdate;
            var pubdateexists;
            var author;

            var li = $('<li>');
            li.addClass("eachArticle");

            if ('pub_date' in doc[i]) {//check if publication date exists
                var p = $('<p>');
                pubdate = (doc[i].pub_date).slice(0, 10);
                p.text(" Publication Date: " + pubdate);
                li.append(p);
            }
            else {
                var p = $('<p>');
                pubdate = "Publication date not available";
                p.text(pubdate);
                li.append(p);
                
            }

            if ('byline' in doc[i]) {//check if author name exists in database
                var p = $('<p>');
                author = (doc[i]['byline'].original);
                p.text(author);
                li.append(p);
            }
            else {
                var p = $('<p>');
                author = "Author not available";
                p.text(author);
                li.append(p);
            }
        
            var a = $('<a>');
            a.attr("href", doc[i].web_url);
            a.text(doc[i].snippet);

            li.append(a);
            $('.ordered').append(li);
        }


    });

});


$('.clearBtn').on("click", function (event) {
    event.preventDefault();
    $('.ordered').empty();

});
