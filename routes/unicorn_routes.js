var Unicorn = require('../unicorn_models/unicorns');
var bodyparser = require('body-parser');

module.exports = function(app, appSecret) {

	app.use(bodyparser.json());

	app.get('/unicorns', function (req, res){
		Unicorn.find({}, function (err, data){
			if (err) return res.status(500).send({'msg' : 'could not retreive unicorn'});
			res.json(data);
		});
	});

	app.post('/unicorns', function(req, res){
		var newUnicorn = new Unicorn(req.body);
		newUnicorn.save(function(err, data){
			if (err) return res.status(500).send({'msg' : 'could not save unicorn'});
			res.json(data);
		});
	});

	app.put('/unicorns/:id', function(req,res){
		var updatedUnicorn = req.body
		delete req.body._id;
		Unicorn.update({_id: req.params.id}, updatedUnicorn, function(err){
			if (err) return res.status(500).send({'msg' : 'could not save unicorn'});
			res.json(req.body);
		});
	});

	app.delete('/unicorns/:id', function(req,res){
		Unicorn.remove({_id: req.params.id}, function(err){
			if (err) return res.status(500).send({'msg' : 'could not delete unicorn'});
			res.json(req.body);
		});
	});

}
