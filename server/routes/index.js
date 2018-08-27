const imagesController = require('../controllers').images;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Cullective API'
  }));

  app.post('/api/images', imagesController.create);
};
