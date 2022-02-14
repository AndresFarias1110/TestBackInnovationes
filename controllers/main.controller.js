'use strinct';

const Query = require('../helpers/query');
const DB = 'Innovationes';

class MainController {

	all(req, res, next) {
		res.json({ message: 'Example request create.' });
	}

	create(req, res, next) {
		Query.createSchema(DB, req.body.collection, JSON.parse(req.body.data))
		.then(rs => res.json({ recordSet: rs }))
		.catch(err => res.json({ error: err }));
	}

	info(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	update(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	delete(req, res, next) {
		res.json({ message: 'Example request.' });
	}
}

module.exports = new MainController();
