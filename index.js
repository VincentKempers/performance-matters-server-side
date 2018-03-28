var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var sparqlquery =  `
   PREFIX dc: <http://purl.org/dc/elements/1.1/>
   PREFIX foaf: <http://xmlns.com/foaf/0.1/>
   PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
   SELECT DISTINCT  ?cho ?img ?date ?title ?desc WHERE {
    ?cho dc:type "Poster."^^xsd:string .
    ?cho dc:subject "Pop music."^^xsd:string .
    ?cho dc:title ?title .
    ?cho dc:description ?desc .
    ?cho foaf:depiction ?img .
    ?cho sem:hasBeginTimeStamp ?date .
  FILTER (?title != "[Poster.]"^^xsd:string)
  FILTER (?title != "Paradiso Talentenshow."^^xsd:string)
  FILTER (?title != "Talentenshow."^^xsd:string)
  FILTER (?title != "Talentengala."^^xsd:string)
  FILTER (?title != "Paradiso talentenshow."^^xsd:string)
  FILTER (?title != "Talentenshow Paradiso."^^xsd:string)
  FILTER (?title != "Paradiso Talenten Gala."^^xsd:string)
  FILTER (?title != "Paradiso TalentenGala."^^xsd:string)
  FILTER (?title != "Talenten Gala!"^^xsd:string)
  FILTER (?title != "Paradiso Talentenshow Gala."^^xsd:string)
  }
  ORDER BY ?date
  LIMIT 1000`
var encodedquery = encodeURIComponent(sparqlquery);
var host = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on'

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'imgs')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.redirect('/poster')
})


app.get('/poster', function (req, res) {
  request(host, function(error, request, body){
    var data = JSON.parse(body);
    var rows = data.results.bindings;
    var collection = rows.map(function(d){
      return {
        title: d.title.value,
        desc: d.desc.value,
        date: d.date.value
      };
    });
    res.render('index', { data: collection });
  });
});

app.get('/offline', function (req, res) {
  res.render('offline');
});


app.get('/poster/:id', function (req, res){
  request(host + req.params.id, function(error, request, body){
    var data = JSON.parse(body);
    var rows = data.results.bindings;
    var collection = rows.map(function(d){
      if (d.title.value === req.params.id) {
        return {
          title: d.title.value,
          date: d.date.value,
          desc: d.desc.value,
          slug: d.title.value.replace(/[ ]/g, '').toLowerCase(),
          img: d.img.value
        }
      }
    });
    res.render('detail', { data: collection });
  });
});

app.listen(3009);
