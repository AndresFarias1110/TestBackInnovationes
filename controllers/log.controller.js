"use strinct";

const Query = require("../helpers/query");
const DB = "Innovationes";
const COLLECTION = "Logs";
const Joi = require("joi");

class LogController {
  all(req, res, next) {
    Query.findAll(DB, COLLECTION)
      .then((rs) => {
        res.json({ recordSet: rs });
      })
      .catch((error) => {
        res.json({ recordSet: null, error });
      });
  }

  create(req, res, next) {
    const logValidates = Joi.object({
      application_id: Joi.string().alphanum().min(8).max(30).required(),
      type: Joi.string().required(),
      priority: Joi.string().required(),
      path: Joi.string().required(),
      request: Joi.string().required(),
      response: Joi.string().required(),
    });
    const resultValidate = logValidates.validate(req.body);
    if (resultValidate.error) {
      res.status(400).json({ error_msg: 'some data is not formatted' });
    } else {
      Query.insertOne(DB, COLLECTION, req.body)
        .then((rs) => res.json({ recordSet: rs }))
        .catch((err) => res.json({ error: err }));
    }
  }

  info(req, res, next) {
    res.json({ message: "Example request." });
  }

  update(req, res, next) {
    Query.insertOne(DB, COLLECTION, { _id: params.id }, req.body)
      .then((rs) => res.json({ recordSet: rs }))
      .catch((err) => res.json({ error: err }));
  }

  delete(req, res, next) {
    Query.delete(DB, COLLECTION, { _id: req.params.id })
      .then((rs) => res.json({ recordSet: rs }))
      .catch((err) => res.json({ error: err }));
  }
}

module.exports = new LogController();
