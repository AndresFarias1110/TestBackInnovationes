const Query = require("../helpers/query");
const DB = "Innovationes";
const BSON = require("bson");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    Query.findOne(DB, "Authorizations", { token })
      .then((auth) => {
        if (!auth) {
          return res
            .status(401)
            .json({ error: "Not authorized to access this resource" });
        } else {
          Query.findOne(DB, "Aplications", {
            _id: new BSON.ObjectId(auth.application_id),
          })
            .then((app) => {
              if (app) {
                next();
              } else {
                res
                  .status(401)
                  .json({ error: "Not authorized to access this resource" });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                status_code: 0,
                error_msg: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          status_code: 0,
          error_msg: err,
        });
      });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
