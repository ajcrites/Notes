
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var notes = require('./routes/notes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/notes');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/notes', notes.findAll);
app.post('/notes', notes.addNote);
app.del('/notes', notes.remove);
app.put('/notes', notes.update);
app.post('/user', user.addUser);
app.get('/user', user.findUsers);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
