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
    const fetchSize = 100;

    reddit.getSubreddit('pics').getNew({limit: fetchSize})
    .then(
      (data) => {
        for(var cnt=0; cnt<fetchSize; cnt++) {
          var url = data[cnt]['url'];
          if(url.startsWith("https://imgur") &&
	          !url.endsWith(".jpg")) {
   	        const subString = url.split('/').pop()
	          url = 'https://i.imgur.com/' + subString + '.jpg';
	        }
          image_row.create({
            reddit_id: data[cnt]['id'],
            title: data[cnt]['title'],
            url: url
          });
	      }

        return res.status(201).send({
          'message': 'Created.'
        });
      }
    )
    .catch(error => res.status(400).send(error));
  },

  fetch_todays_entry(req, res) {
    const today = new Date().setHours(0,0,0,0);
    image_row.findAll({
      offset: req.query.offset,
      limit: req.query.limit,
      order: ['id'],
      where: {
        createdAt: {
	        gt: today
	      }
      },
    })
    .then(
      (data) => {
   	    var obj = {'message': 'Successful.'};
	      obj.data = {};
        data.forEach((row) => {
      	  obj.data[row['dataValues']['id']] = {
	          reddit_id: row['dataValues']['reddit_id'],
	          title: row['dataValues']['title'],
	          url: row['dataValues']['url']
	        };
	      });

        return res.status(200).send(obj);
      }
    );
  }
};
