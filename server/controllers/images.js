const image_row = require('../models').image;

module.exports = {
  create(req, res) {
    return image_row
      .create({
        reddit_id: req.body.reddit_id,
        title: req.body.title,
        url: req.body.url
      })
      .then(obj => res.status(201).send(obj))
      .catch(error => res.status(400).send(error));
  },
};
