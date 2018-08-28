const decision_row = require('../models').user_decision;

module.exports = {
  create(req, res) {
    return decision_row
      .create({
        user_id: req.body.userId,
        status: req.body.status,
        image_id: req.body.imageId
      })
      .then(obj => res.status(201).send(obj))
      .catch(error => res.status(400).send(error));
  }
}
