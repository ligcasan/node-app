const image_row = require('../models').image;
const snoowrap = require('snoowrap');

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
  populate_with_reddit(req, res) {
    const reddit = new snoowrap({
      userAgent: '',
      clientId: '',
      clientSecret: '',
      username: '',
      password: ''
    });

    const fetchSize = 10;

    reddit.getSubreddit('pics').getNew({limit: fetchSize})
    .then(
      (data) => {
        for(var cnt=0; cnt<fetchSize; cnt++) {
          image_row.create({
            reddit_id: data[cnt]['id'],
            title: data[cnt]['title'],
            url: data[cnt]['url']
          });
	}

        return res.status(201).send({
          'message': 'Created.'
        });
      }
    )
    .catch(error => res.status(400).send(error));
  }
};
