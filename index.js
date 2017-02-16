var express = require('express');
var app = express();
var auth0Valerio = require('valerio-auth0');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// Auth0 Routes
app.use('/', auth0Valerio.router({
    domain: 'rodrigoibarra.auth0.com',
    client_id: '4ceBlUH076OKGR4mANDbqyHKDAQOwdIu',
    client_secret: '3snOL757RwdqOQWmnCoYpJrEPqEj7kbtAFVaOSFLUHmbSafkLnOyI-WmnvLz0I04',
    url: process.env.URL || 'http://localhost:5000',
    session_secret: 'cualquiercosa'
}));

app.get('/dashboard', auth0Valerio.middlware.requiresLogin, function(req, res) {
    // res.json(res.locals.user);
    // res.send(res.locals.user.name);
    res.render('pages/thanks');
});

app.get('/usuarios', auth0Valerio.middlware.requiresLogin, function (req, res) {
    res.json(res.locals.user);
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/en', function(request, response) {
    response.render('pages/indexEn');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


